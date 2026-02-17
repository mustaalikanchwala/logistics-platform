'use client';

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { deliveryChartData } from '@/lib/mockData';

export default function DeliveryChart() {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-[#0C2B4E] mb-6">Delivery Trends</h3>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={deliveryChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#fff',
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                        }}
                    />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="deliveries"
                        stroke="#0C2B4E"
                        strokeWidth={2}
                        name="Total Deliveries"
                        dot={{ fill: '#0C2B4E', r: 4 }}
                    />
                    <Line
                        type="monotone"
                        dataKey="optimized"
                        stroke="#1D546C"
                        strokeWidth={2}
                        name="Optimized Deliveries"
                        dot={{ fill: '#1D546C', r: 4 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
