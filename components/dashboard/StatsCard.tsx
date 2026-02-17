import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
    title: string;
    value: string;
    change: string;
    trend: 'up' | 'down';
    Icon: LucideIcon;
}

export default function StatsCard({ title, value, change, trend, Icon }: StatsCardProps) {
    const trendColor = trend === 'up' ? 'text-green-600' : 'text-red-600';

    return (
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#1D546C] to-[#0C2B4E] rounded-lg flex items-center justify-center">
                    <Icon className="text-white" size={24} />
                </div>
                <span className={`text-sm font-semibold ${trendColor}`}>
                    {change}
                </span>
            </div>
            <h3 className="text-gray-600 text-sm mb-1">{title}</h3>
            <p className="text-3xl font-bold text-[#0C2B4E]">{value}</p>
        </div>
    );
}
