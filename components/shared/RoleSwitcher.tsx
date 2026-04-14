'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Store, Factory, Truck, LogIn } from 'lucide-react';

const roles = [
  { id: 'shopkeeper', label: 'Shopkeeper', icon: Store, route: '/shopkeeper', color: '#7C3AED' },
  { id: 'vendor',      label: 'Vendor',      icon: Factory, route: '/vendor',      color: '#EA580C' },
  { id: 'partner',     label: 'Partner',     icon: Truck,   route: '/partner',     color: '#059669' },
];

interface Props { currentRole: string; }

export default function RoleSwitcher({ currentRole }: Props) {
  const router = useRouter();

  return (
    <div className="role-switcher">
      <p className="role-switcher-label">Switch Role</p>
      <div className="role-switcher-buttons">
        {roles.map((r) => {
          const Icon = r.icon;
          const isActive = r.id === currentRole;
          return (
            <button
              key={r.id}
              className={`role-switch-btn ${isActive ? 'role-switch-btn--active' : ''}`}
              style={{ '--btn-color': r.color } as React.CSSProperties}
              onClick={() => router.push(r.route)}
              title={r.label}
            >
              <Icon size={14} />
              <span>{r.label}</span>
            </button>
          );
        })}
        <button
          className="role-switch-btn"
          onClick={() => router.push('/login')}
          title="Login as different user"
        >
          <LogIn size={14} />
          <span>Login</span>
        </button>
      </div>
    </div>
  );
}
