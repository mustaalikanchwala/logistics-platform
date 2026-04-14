'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  Menu, MapPin, Bell, Navigation, CheckCircle, Truck,
  Package, Star, TrendingUp, Zap, LogOut, Weight, Users, Clock, Play
} from 'lucide-react';
import DashboardSidebar from '@/components/layout/DashboardSidebar';
import RoleSwitcher from '@/components/shared/RoleSwitcher';
import LogisticsMap from '@/components/map/LogisticsMap';
import {
  getSession, logout, getOpenBatches, getActiveBatchForPartner,
  acceptBatch, markStopCompleted, getUserById, getDB,
  type DbBatch, type DbUser,
} from '@/lib/store';

export default function PartnerPage() {
  const router = useRouter();
  const [user, setUser] = useState<DbUser | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openBatches, setOpenBatches] = useState<DbBatch[]>([]);
  const [activeBatch, setActiveBatch] = useState<DbBatch | null>(null);
  const [routeProgress, setRouteProgress] = useState(0);
  const [activeSegment, setActiveSegment] = useState(0);
  const [acceptResult, setAcceptResult] = useState<{ batchId: string; success: boolean; message: string } | null>(null);
  const [accepting, setAccepting] = useState<string | null>(null); // batchId being accepted
  const [newBatchNotif, setNewBatchNotif] = useState<DbBatch | null>(null);
  const prevVersionRef = useRef<number>(-1);
  const prevOpenCountRef = useRef<number>(0);

  useEffect(() => {
    const u = getSession();
    if (!u || u.role !== 'partner') { router.push('/login'); return; }
    setUser(u);
  }, [router]);

  const handleProgress = useCallback((p: number, seg: number) => {
    setRouteProgress(p);
    setActiveSegment(seg);
  }, []);

  const syncState = useCallback(() => {
    if (!user) return;
    const db = getDB();
    if (db.version === prevVersionRef.current) return;
    prevVersionRef.current = db.version;

    const open = getOpenBatches();
    const myBatch = getActiveBatchForPartner(user.id);

    // New batch notification (Rapido style)
    if (open.length > prevOpenCountRef.current && !myBatch) {
      const newest = open[open.length - 1];
      setNewBatchNotif(newest);
    }
    prevOpenCountRef.current = open.length;

    setOpenBatches(open);
    setActiveBatch(myBatch);
  }, [user]);

  useEffect(() => {
    if (!user) return;
    syncState();
    const timer = setInterval(syncState, 1000);
    window.addEventListener('slp_update', syncState);
    return () => { clearInterval(timer); window.removeEventListener('slp_update', syncState); };
  }, [user, syncState]);

  const handleAccept = async (batchId: string) => {
    if (!user) return;
    setAccepting(batchId);
    setNewBatchNotif(null);
    // Small delay to simulate network
    await new Promise(r => setTimeout(r, 350));
    const result = acceptBatch(batchId, user.id);
    setAcceptResult({ batchId, ...result });
    setAccepting(null);
    if (result.success) {
      syncState();
      setTimeout(() => setAcceptResult(null), 3000);
    } else {
      setTimeout(() => setAcceptResult(null), 4000);
    }
  };

  const handleLogout = () => { logout(); router.push('/login'); };

  if (!user) return null;

  const completedStops = activeBatch?.route.filter(s => s.status === 'completed').length ?? 0;
  const totalStops = activeBatch?.route.length ?? 0;

  const waypoints = activeBatch
    ? activeBatch.route.map(s => ({ px: s.px, py: s.py, lat: s.lat, lng: s.lng }))
    : [];
  const markers = activeBatch
    ? activeBatch.route.map(s => ({ px: s.px, py: s.py, type: s.type as 'pickup' | 'drop', label: s.displayName, highlighted: false }))
    : [];

  const stats = [
    { label: 'Completed', value: user.completedDeliveries ?? 0, color: '#059669', bg: '#D1FAE5', icon: CheckCircle },
    { label: 'Active Orders', value: activeBatch?.orderIds.length ?? 0, color: '#6366F1', bg: '#EEF2FF', icon: Package },
    { label: "Today's Earnings", value: '₹1,240', color: '#EA580C', bg: '#FFF7ED', icon: TrendingUp },
    { label: 'Rating', value: user.rating ?? '—', color: '#F59E0B', bg: '#FEF3C7', icon: Star },
  ];

  return (
    <div className="dash-layout">
      <DashboardSidebar role="partner" mobileOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="dash-content">
        <header className="dash-topbar">
          <button className="dash-menu-btn lg:hidden" onClick={() => setSidebarOpen(true)}><Menu size={22} /></button>
          <div>
            <h1 className="dash-page-title">Delivery Partner</h1>
            <p className="dash-page-sub">{user.displayName} · {user.vehicle} · {user.vehicleNumber}</p>
          </div>
          <div className="dash-topbar-right">
            <div className="dash-notif-btn">
              <Bell size={18} />
              {openBatches.length > 0 && <span className="dash-notif-dot" style={{ background: '#059669' }} />}
            </div>
            <div className="dash-user-chip">
              <div className="dash-user-avatar" style={{ background: 'linear-gradient(135deg,#059669,#047857)' }}>{user.avatarInitials}</div>
              <span>{user.displayName}</span>
            </div>
            <button className="dash-logout-btn" onClick={handleLogout} title="Logout"><LogOut size={16} /></button>
          </div>
        </header>

        {/* ⚡ Rapido-style "New Batch" flash notification */}
        {newBatchNotif && !activeBatch && (
          <div className="rapido-flash">
            <div className="rapido-flash-inner">
              <div className="rapido-flash-pulse" />
              <div>
                <p className="rapido-flash-title">⚡ New delivery batch available!</p>
                <p className="rapido-flash-sub">
                  {newBatchNotif.label} · {newBatchNotif.orderIds.length} orders · {newBatchNotif.totalWeight} kg · ₹{newBatchNotif.earnings}
                </p>
              </div>
              <button
                className="rapido-accept-quick"
                onClick={() => handleAccept(newBatchNotif.id)}
                disabled={accepting === newBatchNotif.id}
              >
                {accepting === newBatchNotif.id ? <span className="cta-spinner" /> : <Zap size={16} />}
                {accepting === newBatchNotif.id ? 'Accepting…' : 'ACCEPT'}
              </button>
              <button className="rapido-dismiss" onClick={() => setNewBatchNotif(null)}>✕</button>
            </div>
          </div>
        )}

        {/* Accept result toast */}
        {acceptResult && (
          <div className={`notif-banner ${acceptResult.success ? 'notif-banner--green' : 'notif-banner--red'}`}>
            {acceptResult.success ? <CheckCircle size={16} /> : <Zap size={16} />}
            {acceptResult.message}
            <span className="notif-close" onClick={() => setAcceptResult(null)}>✕</span>
          </div>
        )}

        {/* Active route progress banner */}
        {activeBatch && (
          <div className="dash-alert dash-alert--green">
            <Navigation size={16} />
            <span>
              Active: <strong>{activeBatch.label}</strong> — {completedStops}/{totalStops} stops · {Math.round(routeProgress * 100)}% complete
            </span>
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
                  <p className="stat-value" style={{ color: s.color }}>{s.value}</p>
                  <p className="stat-label">{s.label}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── ACTIVE ROUTE VIEW ── */}
        {activeBatch ? (
          <div className="dash-main-grid" style={{ padding: '1.25rem 2rem 2rem' }}>
            {/* Map */}
            <section className="card card--full-map">
              <div className="card-header">
                <h2 className="card-title"><MapPin size={18} style={{ color: '#059669' }} /> Live Route Map</h2>
                <span className="live-badge"><span className="live-dot live-dot--green" />NAVIGATING</span>
              </div>
              <div className="route-progress-row">
                <div className="route-progress-label"><Truck size={14} style={{ color: '#059669' }} /> Stop {Math.min(activeSegment + 1, totalStops)} of {totalStops}</div>
                <div className="route-progress-bar-inline">
                  <div className="route-progress-fill-inline" style={{ width: `${routeProgress * 100}%` }} />
                </div>
                <span className="route-progress-pct">{Math.round(routeProgress * 100)}%</span>
              </div>
              <LogisticsMap
                waypoints={waypoints}
                markers={markers}
                showPartner
                duration={90_000}
                onProgress={handleProgress}
                className="map--large"
              />
            </section>

            {/* Stop Sequence */}
            <section className="card" id="stops">
              <div className="card-header">
                <h2 className="card-title"><CheckCircle size={18} style={{ color: '#059669' }} /> Stop Sequence</h2>
                <span className="card-badge card-badge--green">{totalStops} stops</span>
              </div>
              <div className="batch-summary-card">
                <div className="bs-row"><Weight size={14} /><span>Load: <strong>{activeBatch.totalWeight} kg</strong></span></div>
                <div className="bs-row"><Users size={14} /><span>Shopkeepers: <strong>{activeBatch.shopkeeperIds.length}</strong></span></div>
                <div className="bs-row"><Package size={14} /><span>Orders: <strong>{activeBatch.orderIds.length}</strong></span></div>
                <div className="bs-row"><TrendingUp size={14} /><span>Earnings: <strong>₹{activeBatch.earnings}</strong></span></div>
              </div>

              <div className="stop-cards">
                {activeBatch.route.map((stop, i) => {
                  const isCurrentSeg = i === activeSegment;
                  const isDone = stop.status === 'completed';
                  const stopOrders = stop.orderIds.map(id => ({ id }));

                  return (
                    <div key={i} className={`stop-card stop-card--${stop.type} ${isCurrentSeg ? 'stop-card--current' : ''} ${isDone ? 'stop-card--done' : ''}`}>
                      <div className="stop-num-col">
                        <div className="stop-num">{stop.stopNumber}</div>
                        {i < activeBatch.route.length - 1 && <div className="stop-connector" />}
                      </div>
                      <div className="stop-body">
                        <div className="stop-top">
                          <div>
                            <p className="stop-type-label">{stop.type === 'pickup' ? '📦 PICKUP' : '🏪 DROP-OFF'}</p>
                            <p className="stop-name">{stop.displayName}</p>
                            <p className="stop-addr">{stop.address}</p>
                          </div>
                          <div className="stop-eta-col">
                            <p className="stop-eta">{stop.eta}</p>
                            <span className={`stop-status-badge stop-status--${stop.status}`}>
                              {stop.status === 'completed' ? '✓ Done' : stop.status === 'arrived' ? '📍 Here' : '⏳ Pending'}
                            </span>
                          </div>
                        </div>

                        {/* Order IDs at this stop */}
                        <div className="stop-orders">
                          {stop.orderIds.map(oid => (
                            <div key={oid} className="stop-order-pill">
                              <span style={{ fontWeight: 700 }}>{oid}</span>
                            </div>
                          ))}
                        </div>

                        {/* Mark Completed button */}
                        {!isDone && !isCurrentSeg && (
                          <button
                            className="stop-complete-btn"
                            onClick={() => markStopCompleted(activeBatch.id, i)}
                          >
                            <CheckCircle size={13} /> Mark Completed
                          </button>
                        )}
                        {!isDone && isCurrentSeg && (
                          <button
                            className="stop-complete-btn stop-complete-btn--primary"
                            onClick={() => markStopCompleted(activeBatch.id, i)}
                          >
                            <CheckCircle size={13} /> ✅ Mark This Stop Done
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        ) : (
          /* ── NO ACTIVE BATCH – Show waiting / available batches ── */
          <div style={{ padding: '1.5rem 2rem 2rem' }}>
            {openBatches.length === 0 ? (
              <div className="partner-waiting">
                <div className="partner-waiting-pulse" />
                <div className="pw-icon"><Truck size={40} /></div>
                <h2 className="pw-title">Waiting for deliveries…</h2>
                <p className="pw-sub">
                  When shopkeepers place orders and they get grouped, you'll see a batch here.<br />
                  <strong>First partner to accept wins the delivery!</strong>
                </p>
                <div className="pw-hint">💡 Open another tab as a shopkeeper and place 2 orders to see a batch appear here.</div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div className="open-batches-header">
                  <Zap size={20} style={{ color: '#059669' }} />
                  <h2>{openBatches.length} Batch{openBatches.length > 1 ? 'es' : ''} Available — First to accept wins!</h2>
                </div>

                {openBatches.map(batch => {
                  const isAccepting = accepting === batch.id;
                  const failed = acceptResult?.batchId === batch.id && !acceptResult.success;

                  return (
                    <div key={batch.id} className="open-batch-card">
                      {/* Batch header */}
                      <div className="obc-header">
                        <div>
                          <p className="obc-id">{batch.id}</p>
                          <p className="obc-label">{batch.label}</p>
                        </div>
                        <span className="obc-badge">🟢 Available</span>
                      </div>

                      {/* Stats row */}
                      <div className="obc-stats">
                        <div className="obc-stat">
                          <p className="obc-stat-val">{batch.orderIds.length}</p>
                          <p className="obc-stat-key">Orders</p>
                        </div>
                        <div className="obc-stat">
                          <p className="obc-stat-val">{batch.route.length}</p>
                          <p className="obc-stat-key">Stops</p>
                        </div>
                        <div className="obc-stat">
                          <p className="obc-stat-val">{batch.totalWeight} kg</p>
                          <p className="obc-stat-key">Load</p>
                        </div>
                        <div className="obc-stat obc-stat--earn">
                          <p className="obc-stat-val">₹{batch.earnings}</p>
                          <p className="obc-stat-key">Earnings</p>
                        </div>
                      </div>

                      {/* Route preview */}
                      <div className="obc-route">
                        {batch.route.map((stop, i) => {
                          const entity = getUserById(stop.userId);
                          return (
                            <div key={i} className="obc-stop">
                              <span className="obc-stop-num">{stop.stopNumber}</span>
                              <span>{stop.type === 'pickup' ? '📦' : '🏪'}</span>
                              <span className="obc-stop-name">{stop.displayName}</span>
                              <span className="obc-stop-area">{stop.address.split(',').pop()?.trim()}</span>
                              <span className="obc-stop-eta">{stop.eta}</span>
                            </div>
                          );
                        })}
                      </div>

                      {/* Map preview */}
                      {batch.route.length >= 2 && (
                        <LogisticsMap
                          waypoints={batch.route.map(s => ({ px: s.px, py: s.py, lat: s.lat, lng: s.lng }))}
                          markers={batch.route.map(s => ({ px: s.px, py: s.py, type: s.type as 'pickup' | 'drop', label: s.displayName, highlighted: false }))}
                          showPartner={false}
                          duration={60_000}
                        />
                      )}

                      {/* ACCEPT BUTTON (Rapido-style) */}
                      {failed ? (
                        <div className="accept-failed">
                          ❌ {acceptResult?.message}
                        </div>
                      ) : (
                        <button
                          className={`rapido-accept-btn ${isAccepting ? 'rapido-accept-btn--loading' : ''}`}
                          onClick={() => handleAccept(batch.id)}
                          disabled={isAccepting}
                        >
                          {isAccepting
                            ? <><span className="cta-spinner" /> Claiming batch…</>
                            : <><Zap size={18} /> ACCEPT DELIVERY · ₹{batch.earnings}</>}
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      <RoleSwitcher currentRole="partner" />
    </div>
  );
}
