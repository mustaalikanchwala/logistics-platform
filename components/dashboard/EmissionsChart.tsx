'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { emissionsChartData } from '@/lib/mockData';

export default function EmissionsChart() {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-[#0C2B4E] mb-6">CO₂ Emissions (kg)</h3>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={emissionsChartData}>
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
                    <Bar dataKey="before" fill="#ef4444" name="Before Optimization" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="after" fill="#22c55e" name="After Optimization" radius={[8, 8, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
