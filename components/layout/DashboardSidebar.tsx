'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Package, Route, Truck, BarChart3, Leaf, X } from 'lucide-react';

const navItems = [
    { href: '/dashboard', label: 'Overview', Icon: LayoutDashboard },
    { href: '/dashboard/deliveries', label: 'Deliveries', Icon: Package },
    { href: '/dashboard/routes', label: 'Routes', Icon: Route },
    { href: '/dashboard/vehicles', label: 'Vehicles', Icon: Truck },
    { href: '/dashboard/analytics', label: 'Analytics', Icon: BarChart3 },
    { href: '/dashboard/emissions', label: 'Emissions', Icon: Leaf },
];

interface DashboardSidebarProps {
    mobileOpen?: boolean;
    onClose?: () => void;
}

export default function DashboardSidebar({ mobileOpen, onClose }: DashboardSidebarProps) {
    const pathname = usePathname();

    return (
        <>
            {/* Mobile Overlay */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={onClose}
                ></div>
            )}

            {/* Sidebar */}
            <aside
                className={`fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-[#0C2B4E] text-white transition-transform duration-300 z-50 lg:translate-x-0 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="flex items-center justify-between p-4 lg:hidden">
                    <h2 className="text-xl font-bold">Dashboard</h2>
                    <button onClick={onClose} className="text-white">
                        <X size={24} />
                    </button>
                </div>

                <nav className="p-4 space-y-2">
                    {navItems.map((item) => {
                        const Icon = item.Icon;
                        const isActive = pathname === item.href;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={onClose}
                                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${isActive
                                        ? 'bg-[#1D546C] text-white'
                                        : 'text-gray-300 hover:bg-[#1A3D64] hover:text-white'
                                    }`}
                            >
                                <Icon size={20} />
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>
            </aside>
        </>
    );
}
