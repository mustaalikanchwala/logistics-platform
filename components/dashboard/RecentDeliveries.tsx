import React from 'react';
import { recentDeliveries } from '@/lib/mockData';

const statusColors: Record<string, string> = {
    'In Transit': 'bg-blue-100 text-blue-800',
    'Delivered': 'bg-green-100 text-green-800',
    'Scheduled': 'bg-yellow-100 text-yellow-800',
};

export default function RecentDeliveries() {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-[#0C2B4E] mb-6">Recent Deliveries</h3>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-gray-200">
                            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">ID</th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Supplier</th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Destination</th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">ETA</th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Driver</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentDeliveries.map((delivery) => (
                            <tr key={delivery.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                <td className="py-3 px-4 text-sm font-medium text-[#0C2B4E]">{delivery.id}</td>
                                <td className="py-3 px-4 text-sm text-gray-700">{delivery.supplier}</td>
                                <td className="py-3 px-4 text-sm text-gray-700">{delivery.destination}</td>
                                <td className="py-3 px-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[delivery.status]}`}>
                                        {delivery.status}
                                    </span>
                                </td>
                                <td className="py-3 px-4 text-sm text-gray-700">{delivery.eta}</td>
                                <td className="py-3 px-4 text-sm text-gray-700">{delivery.driver}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
