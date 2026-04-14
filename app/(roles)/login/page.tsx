'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Truck, Eye, EyeOff, ArrowRight, Store, Factory, Package, AlertCircle, Trash2 } from 'lucide-react';
import { login, saveSession, clearDB, DEMO_USERS } from '@/lib/store';

type Tab = 'shopkeeper' | 'vendor' | 'partner';

const TAB_CONFIG: Record<Tab, { label: string; icon: React.ElementType; color: string; gradient: string }> = {
  shopkeeper: { label: 'Shopkeeper', icon: Store, color: '#7C3AED', gradient: 'linear-gradient(135deg,#7C3AED,#5B21B6)' },
  vendor:     { label: 'Vendor',     icon: Factory, color: '#EA580C', gradient: 'linear-gradient(135deg,#EA580C,#C2410C)' },
  partner:    { label: 'Delivery Partner', icon: Truck, color: '#059669', gradient: 'linear-gradient(135deg,#059669,#047857)' },
};

const ROLE_INTRO: Record<Tab, string> = {
  shopkeeper: 'Place orders to vendors. Track your deliveries in real-time. Get notified when your batch is grouped and assigned to a partner.',
  vendor:     'See incoming orders from shopkeepers. Monitor which batches include your goods. Track the delivery partner in real-time.',
  partner:    'Get real-time batch requests. First to accept wins the delivery! Navigate optimised routes and mark stops completed.',
};

export default function LoginPage() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>('shopkeeper');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetMsg, setResetMsg] = useState('');

  const tabUsers = DEMO_USERS.filter(u =>
    tab === 'partner' ? u.role === 'partner' : u.role === tab
  );

  const handleAutoFill = (uname: string) => {
    setUsername(uname);
    setPassword('pass123');
    setError('');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const user = login(username, password);
    if (!user) {
      setError('Invalid username or password. Try the demo accounts below.');
      return;
    }
    setLoading(true);
    saveSession(user);
    const path =
      user.role === 'vendor' ? '/vendor' :
      user.role === 'partner' ? '/partner' :
      '/shopkeeper';
    setTimeout(() => router.push(path), 400);
  };

  const handleReset = () => {
    clearDB();
    setResetMsg('✅ All orders & batches cleared!');
    setTimeout(() => setResetMsg(''), 2500);
  };

  const TabIcon = TAB_CONFIG[tab].icon;

  return (
    <div className="login-page">
      {/* Animated BG */}
      <div className="login-bg">
        <div className="login-bg-orb orb1" />
        <div className="login-bg-orb orb2" />
        <div className="login-bg-orb orb3" />
        <div className="login-grid" />
      </div>

      <div className="login-container" style={{ maxWidth: 900 }}>
        {/* Header */}
        <div className="login-header">
          <div className="login-logo">
            <Truck size={22} className="login-logo-icon" />
            <span className="login-logo-text">IdeaLab Logistics</span>
          </div>
          <h1 className="login-title">Shared Logistics Platform</h1>
          <p className="login-subtitle">
            A Rapido-style grouped delivery network. Place orders, watch them batch, and race to accept.
          </p>
        </div>

        <div className="login-two-col">
          {/* Left: Form */}
          <div className="login-form-panel">
            {/* Role Tabs */}
            <div className="login-tabs">
              {(Object.entries(TAB_CONFIG) as [Tab, typeof TAB_CONFIG[Tab]][]).map(([key, cfg]) => {
                const Icon = cfg.icon;
                return (
                  <button
                    key={key}
                    className={`login-tab ${tab === key ? 'login-tab--active' : ''}`}
                    style={{ '--tab-color': cfg.color } as React.CSSProperties}
                    onClick={() => { setTab(key); setUsername(''); setPassword(''); setError(''); }}
                  >
                    <Icon size={15} />
                    {cfg.label}
                  </button>
                );
              })}
            </div>

            {/* Role intro */}
            <div className="login-role-intro" style={{ borderLeftColor: TAB_CONFIG[tab].color }}>
              <p>{ROLE_INTRO[tab]}</p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="login-form">
              <div className="lf-field">
                <label className="lf-label">Username</label>
                <input
                  className="lf-input"
                  placeholder={`e.g. ${tabUsers[0]?.username ?? 'username'}`}
                  value={username}
                  onChange={e => { setUsername(e.target.value); setError(''); }}
                  required
                  autoComplete="username"
                />
              </div>
              <div className="lf-field">
                <label className="lf-label">Password</label>
                <div className="lf-password-wrap">
                  <input
                    className="lf-input"
                    type={showPass ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={e => { setPassword(e.target.value); setError(''); }}
                    required
                    autoComplete="current-password"
                  />
                  <button type="button" className="lf-eye-btn" onClick={() => setShowPass(v => !v)}>
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="lf-error">
                  <AlertCircle size={14} /> {error}
                </div>
              )}

              <button
                type="submit"
                className="lf-submit-btn"
                style={{ background: loading ? '#374151' : TAB_CONFIG[tab].gradient } as React.CSSProperties}
                disabled={loading}
              >
                {loading ? (
                  <><span className="cta-spinner" /> Signing in…</>
                ) : (
                  <><TabIcon size={16} /> Sign in as {TAB_CONFIG[tab].label} <ArrowRight size={15} /></>
                )}
              </button>
            </form>

            <p className="lf-hint">All passwords are <strong>pass123</strong></p>

            {/* Reset DB */}
            <button className="lf-reset-btn" onClick={handleReset}>
              <Trash2 size={12} /> Reset Demo Data
            </button>
            {resetMsg && <p className="lf-reset-msg">{resetMsg}</p>}
          </div>

          {/* Right: Demo accounts */}
          <div className="login-accounts-panel">
            <p className="accounts-title">
              <Package size={14} style={{ color: TAB_CONFIG[tab].color }} />
              {TAB_CONFIG[tab].label} Accounts — click to auto-fill
            </p>
            <div className="accounts-list">
              {tabUsers.map(u => (
                <button
                  key={u.id}
                  className={`account-card ${username === u.username ? 'account-card--selected' : ''}`}
                  style={{ '--ac-color': TAB_CONFIG[tab].color } as React.CSSProperties}
                  onClick={() => handleAutoFill(u.username)}
                >
                  <div className="ac-avatar" style={{ background: TAB_CONFIG[tab].gradient }}>
                    {u.avatarInitials}
                  </div>
                  <div className="ac-info">
                    <p className="ac-name">{u.displayName}</p>
                    <p className="ac-store">{u.storeName}</p>
                    <p className="ac-addr">{u.location.address.split(',').slice(-1)[0].trim()}</p>
                  </div>
                  <div className="ac-badge">
                    @{u.username}
                  </div>
                </button>
              ))}
            </div>

            {/* How it works */}
            <div className="login-howto">
              <p className="howto-title">How to demo</p>
              <ol className="howto-steps">
                <li>Open <strong>3+ browser tabs</strong></li>
                <li>Log in as <strong>2 shopkeepers</strong> + <strong>1 partner</strong></li>
                <li>Both shopkeepers place orders → auto-grouped</li>
                <li>Partner sees <strong>⚡ ACCEPT</strong> notification</li>
                <li>Watch statuses update everywhere!</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
