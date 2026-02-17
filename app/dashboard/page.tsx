'use client';

import React, { useState } from 'react';
import { Menu, Package, Route, Truck, Leaf } from 'lucide-react';
import DashboardSidebar from '@/components/layout/DashboardSidebar';
import StatsCard from '@/components/dashboard/StatsCard';
import DeliveryChart from '@/components/dashboard/DeliveryChart';
import EmissionsChart from '@/components/dashboard/EmissionsChart';
import RecentDeliveries from '@/components/dashboard/RecentDeliveries';
import { dashboardStats } from '@/lib/mockData';

export default function DashboardPage() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#F4F4F4]">
            <DashboardSidebar mobileOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            {/* Main Content */}
            <div className="lg:ml-64 p-6">
                {/* Mobile Menu Button */}
                <button
                    onClick={() => setSidebarOpen(true)}
                    className="lg:hidden mb-6 p-2 bg-[#0C2B4E] text-white rounded-lg"
                >
                    <Menu size={24} />
                </button>

                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-[#0C2B4E] mb-2">Dashboard Overview</h1>
                    <p className="text-gray-600">Monitor your logistics operations in real-time</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatsCard
                        title="Active Deliveries"
                        value="124"
                        change="+12%"
                        trend="up"
                        Icon={Package}
                    />
                    <StatsCard
                        title="Optimized Routes"
                        value="89"
                        change="+8%"
                        trend="up"
                        Icon={Route}
                    />
                    <StatsCard
                        title="Fleet Utilization"
                        value="87%"
                        change="+15%"
                        trend="up"
                        Icon={Truck}
                    />
                    <StatsCard
                        title="CO₂ Saved"
                        value="2.4T"
                        change="-18%"
                        trend="down"
                        Icon={Leaf}
                    />
                </div>

                {/* Charts Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <DeliveryChart />
                    <EmissionsChart />
                </div>

                {/* Route Map Placeholder */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <h3 className="text-xl font-bold text-[#0C2B4E] mb-6">Live Route Map</h3>
                    <div className="w-full h-80 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                        <div className="text-center">
                            <div className="text-6xl mb-4">🗺️</div>
                            <p className="text-gray-500 font-medium">Interactive Map Placeholder</p>
                            <p className="text-gray-400 text-sm mt-2">Real-time GPS tracking visualization</p>
                        </div>
                    </div>
                </div>

                {/* Recent Deliveries Table */}
                <RecentDeliveries />
            </div>
        </div>
    );
}
