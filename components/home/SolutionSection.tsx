'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Route, Package, MapPin, BarChart3, Leaf } from 'lucide-react';
import Card from '@/components/ui/Card';
import SectionHeading from '@/components/ui/SectionHeading';

const solutions = [
    {
        title: 'Shared Scheduling',
        description: 'Coordinate delivery times across stakeholders',
        Icon: Calendar,
    },
    {
        title: 'Route Optimization',
        description: 'AI-powered route planning for efficiency',
        Icon: Route,
    },
    {
        title: 'Load Sharing',
        description: 'Maximize vehicle capacity utilization',
        Icon: Package,
    },
    {
        title: 'Real-Time Tracking',
        description: 'GPS monitoring of all deliveries',
        Icon: MapPin,
    },
    {
        title: 'Analytics Dashboard',
        description: 'Data-driven insights and reporting',
        Icon: BarChart3,
    },
    {
        title: 'Emission Monitoring',
        description: 'Track and reduce carbon footprint',
        Icon: Leaf,
    },
];

export default function SolutionSection() {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <SectionHeading
                    title="Our Solution"
                    subtitle="A comprehensive platform that brings all stakeholders together for smarter logistics"
                    centered
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {solutions.map((solution, index) => {
                        const Icon = solution.Icon;
                        return (
                            <motion.div
                                key={solution.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Card className="h-full">
                                    <div className="flex flex-col items-center text-center">
                                        <div className="w-16 h-16 bg-gradient-to-br from-[#1D546C] to-[#0C2B4E] rounded-full flex items-center justify-center mb-4">
                                            <Icon className="text-white" size={28} />
                                        </div>
                                        <h3 className="text-xl font-bold text-[#0C2B4E] mb-3">
                                            {solution.title}
                                        </h3>
                                        <p className="text-gray-600">
                                            {solution.description}
                                        </p>
                                    </div>
                                </Card>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
