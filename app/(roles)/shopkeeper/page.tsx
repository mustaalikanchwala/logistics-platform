'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  Menu, Package, MapPin, Bell, Plus, Clock,
  CheckCircle, Truck, ZapOff, Zap, LogOut, RefreshCw
} from 'lucide-react';
import DashboardSidebar from '@/components/layout/DashboardSidebar';
import RoleSwitcher from '@/components/shared/RoleSwitcher';
import OrderStatusBadge from '@/components/shared/OrderStatusBadge';
import LogisticsMap from '@/components/map/LogisticsMap';
import {
  getSession, logout, getOrdersForShopkeeper, getBatchesForShopkeeper,
  placeOrder, getVendors, getUserById, getDB, type DbOrder, type DbBatch, type DbUser,
} from '@/lib/store';

export default function ShopkeeperPage() {
  const router = useRouter();
  const [user, setUser] = useState<DbUser | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [orders, setOrders] = useState<DbOrder[]>([]);
  const [batches, setBatches] = useState<DbBatch[]>([]);
  const [notification, setNotification] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [routeProgress, setRouteProgress] = useState(0);
  const prevVersionRef = useRef<number>(-1);

  // Form state
  const [vendorId, setVendorId] = useState('');
  const [product, setProduct] = useState('');
  const [qty, setQty] = useState('1');
  const [weight, setWeight] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<string | null>(null);

  const vendors = getVendors();

  // Auth check
  useEffect(() => {
    const u = getSession();
    if (!u || u.role !== 'shopkeeper') { router.push('/login'); return; }
    setUser(u);
  }, [router]);

  // Sync store → state
  const syncState = useCallback(() => {
    if (!user) return;
    const db = getDB();
    if (db.version === prevVersionRef.current) return;
    prevVersionRef.current = db.version;

    const myOrders = getOrdersForShopkeeper(user.id);
    const myBatches = getBatchesForShopkeeper(user.id);
    const prevOrders = orders;

    // Detect new status changes → notification
    for (const o of myOrders) {
      const prev = prevOrders.find(p => p.id === o.id);
      if (prev && prev.status !== o.status) {
        if (o.status === 'pickup_scheduled') setNotification('📦 Your order is grouped into a batch! Waiting for a delivery partner…');
        if (o.status === 'in_transit') setNotification('🚚 Delivery partner picked up your parcel! On the way!');
        if (o.status === 'delivered') setNotification('✅ Your order has been delivered! Thank you!');
      }
    }

    setOrders(myOrders);
    setBatches(myBatches);
  }, [user, orders]);

  // Polling
  useEffect(() => {
    if (!user) return;
    syncState();
    const timer = setInterval(syncState, 1500);
    window.addEventListener('slp_update', syncState);
    return () => { clearInterval(timer); window.removeEventListener('slp_update', syncState); };
  }, [user, syncState]);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSubmitting(true);
    const vendor = vendors.find(v => v.id === vendorId);
    const order = placeOrder(user.id, vendorId, product, parseInt(qty), parseFloat(weight));
    setOrderSuccess(`Order placed to ${vendor?.storeName}!`);
    setProduct(''); setQty('1'); setWeight(''); setVendorId('');
    setShowForm(false);
    setSubmitting(false);
    setTimeout(() => setOrderSuccess(null), 3000);
    // Trigger immediate sync
    setTimeout(syncState, 200);
  };

  const handleLogout = () => { logout(); router.push('/login'); };

  if (!user) return null;

  // Find active batch (one with in_progress or accepted status for this shopkeeper)
  const activeBatch = batches.find(b => b.status === 'accepted' || b.status === 'in_progress');
  const partner = activeBatch?.partnerId ? getUserById(activeBatch.partnerId) : null;

  const myWaypoints = activeBatch
    ? activeBatch.route.map(s => ({ px: s.px, py: s.py, lat: s.lat, lng: s.lng }))
    : [];
  const myMarkers = activeBatch
    ? activeBatch.route.map(s => ({
        px: s.px, py: s.py,
        type: s.type as 'pickup' | 'drop',
        label: s.displayName,
        highlighted: s.userId === user.id,
      }))
    : [];

  const stats = [
    { label: 'Total Orders', value: orders.length, color: '#7C3AED', bg: '#EDE9FE', icon: Package },
    { label: 'Pending', value: orders.filter(o => o.status === 'pending').length, color: '#F59E0B', bg: '#FEF3C7', icon: Clock },
    { label: 'In Transit', value: orders.filter(o => o.status === 'in_transit' || o.status === 'picked_up').length, color: '#3B82F6', bg: '#DBEAFE', icon: Truck },
    { label: 'Delivered', value: orders.filter(o => o.status === 'delivered').length, color: '#059669', bg: '#D1FAE5', icon: CheckCircle },
  ];

  return (
    <div className="dash-layout">
      <DashboardSidebar role="shopkeeper" mobileOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="dash-content">
        {/* Topbar */}
        <header className="dash-topbar">
          <button className="dash-menu-btn lg:hidden" onClick={() => setSidebarOpen(true)}><Menu size={22} /></button>
          <div>
            <h1 className="dash-page-title">My Dashboard</h1>
            <p className="dash-page-sub">{user.storeName} · {user.location.address}</p>
          </div>
          <div className="dash-topbar-right">
            <div className="dash-notif-btn">
              <Bell size={18} />
              {orders.filter(o => o.status === 'in_transit').length > 0 && <span className="dash-notif-dot" />}
            </div>
            <div className="dash-user-chip">
              <div className="dash-user-avatar" style={{ background: 'linear-gradient(135deg,#7C3AED,#5B21B6)' }}>{user.avatarInitials}</div>
              <span>{user.displayName}</span>
            </div>
            <button className="dash-logout-btn" onClick={handleLogout} title="Logout"><LogOut size={16} /></button>
          </div>
        </header>

        {/* Notification banner */}
        {notification && (
          <div className="notif-banner notif-banner--purple" onClick={() => setNotification(null)}>
            <Zap size={16} /> {notification} <span className="notif-close">✕</span>
          </div>
        )}

        {/* Order success toast */}
        {orderSuccess && (
          <div className="notif-banner notif-banner--green">
            <CheckCircle size={16} /> {orderSuccess} — waiting to be grouped with other orders into a batch.
          </div>
        )}

        {/* Pending waiting banner */}
        {orders.filter(o => o.status === 'pending').length > 0 && !orderSuccess && (
          <div className="notif-banner notif-banner--amber">
            <RefreshCw size={15} className="spin-slow" />
            {orders.filter(o => o.status === 'pending').length} order{orders.filter(o => o.status === 'pending').length > 1 ? 's' : ''} waiting to be grouped…
            (Need ≥2 orders total to form a batch)
          </div>
        )}

        {/* Stats */}
        <div className="stat-grid">
          {stats.map(s => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="stat-card">
                <div className="stat-icon" style={{ background: s.bg, color: s.color }}><Icon size={20} /></div>
                <div>
                  <p className="stat-value">{s.value}</p>
                  <p className="stat-label">{s.label}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="dash-main-grid" style={{ padding: '1.25rem 2rem 2rem' }}>
          {/* Left: Place Order + Order List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Place Order Card */}
            <section className="card">
              <div className="card-header">
                <h2 className="card-title"><Plus size={18} style={{ color: '#7C3AED' }} /> Place New Order</h2>
                {!showForm && (
                  <button className="place-order-btn" onClick={() => setShowForm(true)}>
                    <Plus size={14} /> New Order
                  </button>
                )}
              </div>

              {showForm ? (
                <form onSubmit={handlePlaceOrder} className="pickup-form">
                  <div className="form-row">
                    <label className="form-label">Select Vendor</label>
                    <select
                      className="form-input"
                      value={vendorId}
                      onChange={e => setVendorId(e.target.value)}
                      required
                    >
                      <option value="">-- Choose a vendor --</option>
                      {vendors.map(v => (
                        <option key={v.id} value={v.id}>
                          {v.storeName} — {v.location.address.split(',')[0]}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-row">
                    <label className="form-label">Product / Item</label>
                    <input className="form-input" placeholder="e.g. Assorted Grocery Pack" value={product} onChange={e => setProduct(e.target.value)} required />
                  </div>
                  <div className="form-row-2">
                    <div>
                      <label className="form-label">Quantity</label>
                      <input className="form-input" type="number" min="1" value={qty} onChange={e => setQty(e.target.value)} required />
                    </div>
                    <div>
                      <label className="form-label">Weight (kg)</label>
                      <input className="form-input" type="number" min="1" step="0.5" placeholder="kg" value={weight} onChange={e => setWeight(e.target.value)} required />
                    </div>
                  </div>
                  <div className="form-actions">
                    <button type="button" className="form-cancel-btn" onClick={() => setShowForm(false)}>Cancel</button>
                    <button type="submit" className="form-submit-btn form-submit-btn--purple" disabled={submitting}>
                      <Package size={15} /> {submitting ? 'Placing…' : 'Place Order'}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="place-order-empty">
                  <Package size={32} style={{ color: '#C4B5FD' }} />
                  <p>Order goods from any vendor.<br />When 2+ orders are placed, they auto-group into a batch.</p>
                  <button className="place-order-cta" onClick={() => setShowForm(true)}>
                    <Plus size={15} /> Place Your First Order
                  </button>
                </div>
              )}
            </section>

            {/* My Orders */}
            <section className="card">
              <div className="card-header">
                <h2 className="card-title"><Package size={18} style={{ color: '#7C3AED' }} /> My Orders</h2>
                <span className="card-badge card-badge--purple">{orders.length}</span>
              </div>
              <div className="order-list">
                {orders.length === 0 ? (
                  <p style={{ textAlign: 'center', color: '#94A3B8', padding: '1.5rem', fontSize: '.875rem' }}>
                    No orders yet. Place your first order above!
                  </p>
                ) : (
                  [...orders].sort((a, b) => b.createdAt - a.createdAt).map(o => {
                    const vendor = getUserById(o.vendorId);
                    const batch = batches.find(b => b.id === o.batchId);
                    const batchPartner = batch?.partnerId ? getUserById(batch.partnerId) : null;
                    return (
                      <div key={o.id} className={`order-card ${o.status === 'in_transit' || o.status === 'picked_up' ? 'order-card--active' : ''}`}>
                        <div className="order-card-top">
                          <div>
                            <p className="order-id">{o.id}</p>
                            <p className="order-product">{o.productName}</p>
                          </div>
                          <OrderStatusBadge status={o.status} />
                        </div>
                        <div className="order-meta">
                          <span className="order-meta-item"><Package size={12} /> {o.quantity} units · {o.weight} kg</span>
                          <span className="order-meta-item"><MapPin size={12} /> {vendor?.storeName}</span>
                          {o.batchId && <span className="order-batch-tag">Batch: {o.batchId}</span>}
                        </div>
                        {batchPartner && (
                          <div className="order-partner-chip">
                            <div className="opc-avatar">{batchPartner.avatarInitials}</div>
                            <span>{batchPartner.displayName} · {batchPartner.vehicleNumber}</span>
                          </div>
                        )}
                        {o.status === 'pending' && (
                          <p className="order-pending-hint">
                            <Clock size={11} /> Waiting for 1+ more order to form a batch…
                          </p>
                        )}
                        {o.status === 'pickup_scheduled' && (
                          <p className="order-pending-hint" style={{ color: '#2563EB' }}>
                            <Zap size={11} /> Batched! Waiting for a delivery partner to accept…
                          </p>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </section>
          </div>

          {/* Right: Live Map */}
          <section className="card" id="tracking">
            <div className="card-header">
              <h2 className="card-title"><MapPin size={18} style={{ color: '#7C3AED' }} /> Live Tracking</h2>
              {activeBatch && <span className="live-badge"><span className="live-dot" />LIVE</span>}
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
                {/* Route stops */}
                <div className="route-stops-list">
                  <p className="route-stops-title">Delivery Route — {activeBatch.route.length} stops</p>
                  {activeBatch.route.map(stop => (
                    <div
                      key={stop.stopNumber}
                      className={`route-stop ${stop.userId === user.id ? 'route-stop--highlight' : ''} route-stop--${stop.status}`}
                    >
                      <div className="route-stop-num">{stop.stopNumber}</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p className="route-stop-name">{stop.displayName}</p>
                        <p className="route-stop-addr">{stop.address}</p>
                      </div>
                      <div className="route-stop-right">
                        <span className="route-stop-type">{stop.type === 'pickup' ? '📦' : '🏪'}</span>
                        <span className="route-stop-eta">{stop.eta}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="map-waiting">
                <ZapOff size={40} style={{ color: '#D1D5DB' }} />
                <p className="map-waiting-title">No active delivery yet</p>
                <p className="map-waiting-sub">
                  {orders.length === 0
                    ? 'Place an order above to get started!'
                    : orders.some(o => o.status === 'pending')
                    ? 'Your order is pending. Need 1 more order from any shopkeeper to form a batch.'
                    : 'Batch created! Waiting for a delivery partner to accept.'}
                </p>
              </div>
            )}
          </section>
        </div>
      </div>

      <RoleSwitcher currentRole="shopkeeper" />
    </div>
  );
}
