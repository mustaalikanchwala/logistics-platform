'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard, Package, MapPin, Truck, BarChart3, Leaf, X,
  Store, Factory, ClipboardList, Route, PlusCircle, Star, LogOut
} from 'lucide-react';
import { getSession, logout, type DbUser } from '@/lib/store';

type Role = 'shopkeeper' | 'vendor' | 'partner';

const NAV_CONFIG: Record<Role, {
  label: string;
  color: string;
  gradient: string;
  icon: React.ElementType;
  items: { href: string; label: string; icon: React.ElementType }[];
}> = {
  shopkeeper: {
    label: 'Shopkeeper',
    color: '#7C3AED',
    gradient: 'linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)',
    icon: Store,
    items: [
      { href: '/shopkeeper', label: 'My Dashboard', icon: LayoutDashboard },
      { href: '/shopkeeper#orders', label: 'My Orders', icon: Package },
      { href: '/shopkeeper#tracking', label: 'Live Tracking', icon: MapPin },
    ],
  },
  vendor: {
    label: 'Vendor',
    color: '#EA580C',
    gradient: 'linear-gradient(135deg, #EA580C 0%, #C2410C 100%)',
    icon: Factory,
    items: [
      { href: '/vendor', label: 'My Dashboard', icon: LayoutDashboard },
      { href: '/vendor#request', label: 'New Pickup Request', icon: PlusCircle },
      { href: '/vendor#batches', label: 'My Batches', icon: ClipboardList },
      { href: '/vendor#tracking', label: 'Track Partner', icon: MapPin },
    ],
  },
  partner: {
    label: 'Delivery Partner',
    color: '#059669',
    gradient: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
    icon: Truck,
    items: [
      { href: '/partner', label: 'My Dashboard', icon: LayoutDashboard },
      { href: '/partner#batches', label: 'Available Batches', icon: Package },
      { href: '/partner#route', label: 'Active Route', icon: Route },
      { href: '/partner#earnings', label: 'Earnings', icon: BarChart3 },
    ],
  },
};

interface Props {
  role: Role;
  mobileOpen?: boolean;
  onClose?: () => void;
}

export default function DashboardSidebar({ role, mobileOpen, onClose }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const config = NAV_CONFIG[role];
  const RoleIcon = config.icon;
  const [user, setUser] = useState<DbUser | null>(null);

  useEffect(() => {
    setUser(getSession());
  }, []);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`sidebar ${mobileOpen ? 'sidebar--open' : ''}`}
        style={{ '--sidebar-color': config.color } as React.CSSProperties}
      >
        {/* Top brand */}
        <div className="sidebar-brand" style={{ background: config.gradient }}>
          <div className="sidebar-brand-icon">
            <Truck size={20} />
          </div>
          <div>
            <p className="sidebar-brand-name">IdeaLab Logistics</p>
            <p className="sidebar-brand-sub">Shared Delivery Platform</p>
          </div>
          {/* Mobile close */}
          <button className="sidebar-close lg:hidden" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Role badge */}
        <div className="sidebar-role">
          <div className="sidebar-role-icon" style={{ background: `${config.color}20`, color: config.color }}>
            <RoleIcon size={18} />
          </div>
          <div>
            <p className="sidebar-role-label" style={{ color: config.color }}>{config.label}</p>
            <p className="sidebar-role-sub">Role Dashboard</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          {config.items.map((item) => {
            const Icon = item.icon;
            const basePath = item.href.split('#')[0];
            const isActive = pathname === basePath;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`sidebar-nav-item ${isActive ? 'sidebar-nav-item--active' : ''}`}
                style={{ '--item-color': config.color } as React.CSSProperties}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User */}
        <div className="sidebar-user" style={{ marginTop: 'auto' }}>
          <div className="sidebar-avatar" style={{ background: config.gradient }}>
            {user?.avatarInitials ?? '??'}
          </div>
          <div className="sidebar-user-info">
            <p className="sidebar-user-name">{user?.displayName ?? 'Loading...'}</p>
            <p className="sidebar-user-sub">{user?.storeName ?? user?.vehicleNumber ?? ''}</p>
          </div>
          <button onClick={handleLogout} className="sidebar-logout" title="Sign out" style={{ border: 'none', background: 'none' }}>
            <LogOut size={15} />
          </button>
        </div>
      </aside>
    </>
  );
}
