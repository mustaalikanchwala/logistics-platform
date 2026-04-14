'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  Menu, Package, MapPin, Bell, Clock, Truck,
  CheckCircle, Zap, LogOut, Users
} from 'lucide-react';
import DashboardSidebar from '@/components/layout/DashboardSidebar';
import RoleSwitcher from '@/components/shared/RoleSwitcher';
import OrderStatusBadge from '@/components/shared/OrderStatusBadge';
import LogisticsMap from '@/components/map/LogisticsMap';
import {
  getSession, logout, getOrdersForVendor, getBatchesForVendor,
  getUserById, getDB, type DbOrder, type DbBatch, type DbUser,
} from '@/lib/store';

export default function VendorPage() {
  const router = useRouter();
  const [user, setUser] = useState<DbUser | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [orders, setOrders] = useState<DbOrder[]>([]);
  const [batches, setBatches] = useState<DbBatch[]>([]);
  const [notification, setNotification] = useState<string | null>(null);
  const [expandedBatch, setExpandedBatch] = useState<string | null>(null);
  const [routeProgress, setRouteProgress] = useState(0);
  const prevVersionRef = useRef<number>(-1);

  useEffect(() => {
    const u = getSession();
    if (!u || u.role !== 'vendor') { router.push('/login'); return; }
    setUser(u);
  }, [router]);

  const syncState = useCallback(() => {
    if (!user) return;
    const db = getDB();
    if (db.version === prevVersionRef.current) return;
    prevVersionRef.current = db.version;

    const myOrders = getOrdersForVendor(user.id);
    const myBatches = getBatchesForVendor(user.id);
    const prevOrders = orders;

    for (const o of myOrders) {
      const prev = prevOrders.find(p => p.id === o.id);
      if (!prev) {
        setNotification(`📦 New order from ${getUserById(o.shopkeeperId)?.storeName ?? 'a shopkeeper'}!`);
      } else if (prev.status !== o.status && o.status === 'pickup_scheduled') {
        setNotification(`✅ Your order is grouped into a batch! Waiting for a delivery partner…`);
      } else if (prev.status !== o.status && (o.status === 'picked_up' || o.status === 'in_transit')) {
        setNotification(`🚚 Delivery partner picked up goods — en route!`);
      }
    }

    setOrders(myOrders);
    setBatches(myBatches);
    if (myBatches.length > 0 && !expandedBatch) {
      setExpandedBatch(myBatches[myBatches.length - 1].id);
    }
  }, [user, orders, expandedBatch]);

  useEffect(() => {
    if (!user) return;
    syncState();
    const timer = setInterval(syncState, 1500);
    window.addEventListener('slp_update', syncState);
    return () => { clearInterval(timer); window.removeEventListener('slp_update', syncState); };
  }, [user, syncState]);

  const handleLogout = () => { logout(); router.push('/login'); };

  if (!user) return null;

  const activeBatch = batches.find(b => b.status === 'accepted' || b.status === 'in_progress');
  const partner = activeBatch?.partnerId ? getUserById(activeBatch.partnerId) : null;
  const myWaypoints = activeBatch
    ? activeBatch.route.map(s => ({ px: s.px, py: s.py, lat: s.lat, lng: s.lng }))
    : [];
  const myMarkers = activeBatch
    ? activeBatch.route.map(s => ({
        px: s.px, py: s.py, type: s.type as 'pickup' | 'drop',
        label: s.displayName, highlighted: s.userId === user.id,
      }))
    : [];

  const statusColor: Record<string, string> = {
    pending: '#F59E0B', pickup_scheduled: '#3B82F6',
    picked_up: '#8B5CF6', in_transit: '#3B82F6', delivered: '#059669',
  };

  const stats = [
    { label: 'Total Orders', value: orders.length, color: '#EA580C', bg: '#FFF7ED', icon: Package },
    { label: 'Pending Pickup', value: orders.filter(o => o.status === 'pending' || o.status === 'pickup_scheduled').length, color: '#F59E0B', bg: '#FEF3C7', icon: Clock },
    { label: 'Picked Up', value: orders.filter(o => o.status === 'picked_up' || o.status === 'in_transit').length, color: '#3B82F6', bg: '#DBEAFE', icon: Truck },
    { label: 'Delivered', value: orders.filter(o => o.status === 'delivered').length, color: '#059669', bg: '#D1FAE5', icon: CheckCircle },
  ];

  return (
    <div className="dash-layout">
      <DashboardSidebar role="vendor" mobileOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="dash-content">
        <header className="dash-topbar">
          <button className="dash-menu-btn lg:hidden" onClick={() => setSidebarOpen(true)}><Menu size={22} /></button>
          <div>
            <h1 className="dash-page-title">Vendor Dashboard</h1>
            <p className="dash-page-sub">{user.storeName} — {user.location.address}</p>
          </div>
          <div className="dash-topbar-right">
            <div className="dash-notif-btn">
              <Bell size={18} />
              {orders.filter(o => o.status === 'pending').length > 0 && <span className="dash-notif-dot" />}
            </div>
            <div className="dash-user-chip">
              <div className="dash-user-avatar" style={{ background: 'linear-gradient(135deg,#EA580C,#C2410C)' }}>{user.avatarInitials}</div>
              <span>{user.displayName}</span>
            </div>
            <button className="dash-logout-btn" onClick={handleLogout} title="Logout"><LogOut size={16} /></button>
          </div>
        </header>

        {notification && (
          <div className="notif-banner notif-banner--orange" onClick={() => setNotification(null)}>
            <Zap size={16} /> {notification} <span className="notif-close">✕</span>
          </div>
        )}

        <div className="stat-grid">
          {stats.map(s => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="stat-card">
                <div className="stat-icon" style={{ background: s.bg, color: s.color }}><Icon size={20} /></div>
                <div><p className="stat-value" style={{ color: s.color }}>{s.value}</p><p className="stat-label">{s.label}</p></div>
              </div>
            );
          })}
        </div>

        <div className="dash-main-grid" style={{ padding: '1.25rem 2rem 2rem' }}>
          {/* Left: incoming orders + batches */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

            {/* Incoming Orders */}
            <section className="card">
              <div className="card-header">
                <h2 className="card-title"><Package size={18} style={{ color: '#EA580C' }} /> Incoming Orders</h2>
                <span className="card-badge card-badge--orange">{orders.length}</span>
              </div>
              <div className="order-list">
                {orders.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '2rem 1.5rem', color: '#94A3B8', fontSize: '.875rem' }}>
                    <Package size={36} style={{ color: '#E2E8F0', marginBottom: '.75rem' }} />
                    <p>No orders received yet.</p>
                    <p style={{ marginTop: '.25rem', fontSize: '.8rem' }}>Shopkeepers will place orders and they appear here.</p>
                  </div>
                ) : (
                  [...orders].sort((a, b) => b.createdAt - a.createdAt).map(o => {
                    const sk = getUserById(o.shopkeeperId);
                    const batch = batches.find(b => b.id === o.batchId);
                    const batchPartner = batch?.partnerId ? getUserById(batch.partnerId) : null;
                    return (
                      <div key={o.id} className="order-card">
                        <div className="order-card-top">
                          <div>
                            <p className="order-id">{o.id}</p>
                            <p className="order-product">{o.productName}</p>
                          </div>
                          <OrderStatusBadge status={o.status} />
                        </div>
                        <div className="order-meta">
                          <span className="order-meta-item"><Users size={12} /> {sk?.storeName ?? o.shopkeeperId}</span>
                          <span className="order-meta-item"><Package size={12} /> {o.quantity} units · {o.weight} kg</span>
                          {o.batchId && <span className="order-batch-tag">Batch: {o.batchId}</span>}
                        </div>
                        {sk && <p style={{ fontSize: '.75rem', color: '#64748B', marginTop: '.4rem' }}>📞 {sk.phone} · 📍 {sk.location.address}</p>}
                        {batchPartner && (
                          <div className="order-partner-chip">
                            <div className="opc-avatar">{batchPartner.avatarInitials}</div>
                            <span>{batchPartner.displayName} is picking up</span>
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </section>

            {/* Active Batches */}
            {batches.length > 0 && (
              <section className="card">
                <div className="card-header">
                  <h2 className="card-title"><Truck size={18} style={{ color: '#EA580C' }} /> My Batches</h2>
                  <span className="card-badge card-badge--orange">{batches.length}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem', padding: '.75rem 1rem' }}>
                  {[...batches].sort((a, b) => b.createdAt - a.createdAt).map(batch => {
                    const isOpen = expandedBatch === batch.id;
                    const bPartner = batch.partnerId ? getUserById(batch.partnerId) : null;
                    const statusColors: Record<string, string> = {
                      open: '#F59E0B', accepted: '#3B82F6', in_progress: '#8B5CF6', completed: '#059669',
                    };
                    return (
                      <div key={batch.id} className="batch-card">
                        <button
                          className="batch-card-header"
                          onClick={() => setExpandedBatch(isOpen ? null : batch.id)}
                        >
                          <div className="batch-card-left">
                            <span className="batch-id-chip" style={{ background: `${statusColors[batch.status]}22`, color: statusColors[batch.status] }}>
                              {batch.id}
                            </span>
                            <div>
                              <p className="batch-label">{batch.label}</p>
                              <p className="batch-meta">{batch.orderIds.length} orders · {batch.totalWeight} kg · ₹{batch.earnings}</p>
                            </div>
                          </div>
                          <div className="batch-card-right">
                            <span className="batch-status" style={{ color: statusColors[batch.status] }}>
                              {batch.status === 'open' ? '⏳ Waiting' :
                               batch.status === 'accepted' ? '✅ Partner Assigned' :
                               batch.status === 'in_progress' ? '🚚 En Route' : '✓ Completed'}
                            </span>
                          </div>
                        </button>

                        {isOpen && (
                          <div className="batch-card-body">
                            {bPartner && (
                              <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem', padding: '.75rem', background: '#F0FDF4', borderRadius: 8, marginBottom: '.75rem' }}>
                                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#059669,#047857)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '.8rem' }}>
                                  {bPartner.avatarInitials}
                                </div>
                                <div>
                                  <p style={{ fontWeight: 700, fontSize: '.875rem', color: '#1F2937' }}>{bPartner.displayName}</p>
                                  <p style={{ fontSize: '.75rem', color: '#6B7280' }}>{bPartner.vehicle} · {bPartner.vehicleNumber}</p>
                                </div>
                                <span style={{ marginLeft: 'auto', background: '#D1FAE5', color: '#065F46', fontSize: '.75rem', fontWeight: 700, padding: '.2rem .6rem', borderRadius: 999 }}>
                                  ⭐ {bPartner.rating}
                                </span>
                              </div>
                            )}
                            <p className="batch-section-title">Route Stops</p>
                            {batch.route.map((stop, i) => (
                              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '.5rem', padding: '.4rem 0', borderBottom: '1px solid #F1F5F9', fontSize: '.82rem' }}>
                                <span style={{ width: 20, height: 20, borderRadius: '50%', background: stop.type === 'pickup' ? '#FBE9D9' : '#EDE9FE', color: stop.type === 'pickup' ? '#C2410C' : '#6D28D9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.68rem', fontWeight: 700, flexShrink: 0 }}>
                                  {stop.stopNumber}
                                </span>
                                <span style={{ fontSize: '.75rem' }}>{stop.type === 'pickup' ? '📦' : '🏪'}</span>
                                <span style={{ flex: 1, fontWeight: 600, color: '#1F2937' }}>{stop.displayName}</span>
                                <span style={{ color: '#6B7280', fontSize: '.75rem' }}>{stop.eta}</span>
                                <span style={{
                                  fontSize: '.68rem', fontWeight: 600, padding: '.1rem .45rem', borderRadius: 999,
                                  background: stop.status === 'completed' ? '#D1FAE5' : stop.status === 'arrived' ? '#FEF3C7' : '#F1F5F9',
                                  color: stop.status === 'completed' ? '#065F46' : stop.status === 'arrived' ? '#92400E' : '#6B7280',
                                }}>
                                  {stop.status === 'completed' ? '✓ Done' : stop.status === 'arrived' ? '📍' : '⏳'}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            )}
          </div>

          {/* Right: Track Partner */}
          <section className="card" id="tracking">
            <div className="card-header">
              <h2 className="card-title"><MapPin size={18} style={{ color: '#EA580C' }} /> Track Delivery Partner</h2>
              {activeBatch && <span className="live-badge"><span className="live-dot live-dot--green" />LIVE</span>}
            </div>

            {activeBatch && partner ? (
              <>
                <div className="partner-info-card">
                  <div className="partner-avatar" style={{ background: 'linear-gradient(135deg,#059669,#047857)' }}>{partner.avatarInitials}</div>
                  <div className="partner-info">
                    <p className="partner-name">{partner.displayName}</p>
                    <p className="partner-vehicle">{partner.vehicle} · {partner.vehicleNumber}</p>
                    <p className="partner-rating">⭐ {partner.rating}</p>
                  </div>
                  <div className="partner-progress-pill">{Math.round(routeProgress * 100)}%</div>
                </div>
                <LogisticsMap
                  waypoints={myWaypoints}
                  markers={myMarkers}
                  highlightStopLabel={user.storeName}
                  showPartner
                  duration={60_000}
                  onProgress={p => setRouteProgress(p)}
                />
                {/* Delivery timeline */}
                <div className="delivery-timeline">
                  <p className="timeline-title">Delivery Progress</p>
                  <div className="timeline-steps">
                    {activeBatch.route.map((stop, i) => (
                      <div key={i} className={`timeline-step timeline-step--${stop.status}`}>
                        <div className="timeline-dot" />
                        <div>
                          <p className="timeline-name">{stop.displayName}</p>
                          <p className="timeline-type">{stop.type === 'pickup' ? '📦 Pickup' : '🏪 Drop'} · {stop.eta}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="map-waiting">
                <Truck size={40} style={{ color: '#D1D5DB' }} />
                <p className="map-waiting-title">
                  {batches.some(b => b.status === 'open') ? 'Batch created — waiting for partner' : 'No active partner assigned yet'}
                </p>
                <p className="map-waiting-sub">
                  {orders.length === 0
                    ? 'Orders placed by shopkeepers will appear here.'
                    : batches.some(b => b.status === 'open')
                    ? 'A delivery partner will accept the batch shortly. Live tracking will activate here.'
                    : 'Once a delivery partner accepts a batch containing your orders, tracking will appear here.'}
                </p>
              </div>
            )}
          </section>
        </div>
      </div>

      <RoleSwitcher currentRole="vendor" />
    </div>
  );
}
