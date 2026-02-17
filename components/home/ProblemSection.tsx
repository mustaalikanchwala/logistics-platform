'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Repeat, Car, CloudOff } from 'lucide-react';
import Card from '@/components/ui/Card';
import SectionHeading from '@/components/ui/SectionHeading';

const problems = [
    {
        title: 'Fragmented Operations',
        description: 'Multiple suppliers and transporters operate independently without coordination.',
        Icon: AlertCircle,
    },
    {
        title: 'Duplicated Trips',
        description: 'Same routes traveled multiple times by different vehicles, wasting resources.',
        Icon: Repeat,
    },
    {
        title: 'Traffic Congestion',
        description: 'Uncoordinated deliveries contribute to urban traffic and delays.',
        Icon: Car,
    },
    {
        title: 'High Emissions',
        description: 'Inefficient logistics lead to increased fuel consumption and carbon footprint.',
        Icon: CloudOff,
    },
];

export default function ProblemSection() {
    return (
        <section className="py-20 bg-[#F4F4F4]">
            <div className="container mx-auto px-4">
                <SectionHeading
                    title="The Challenge"
                    subtitle="Current logistics operations in Mira Bhayandar face critical inefficiencies"
                    centered
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {problems.map((problem, index) => {
                        const Icon = problem.Icon;
                        return (
                            <motion.div
                                key={problem.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Card className="h-full">
                                    <div className="flex flex-col items-center text-center">
                                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                                            <Icon className="text-red-600" size={32} />
                                        </div>
                                        <h3 className="text-xl font-bold text-[#0C2B4E] mb-3">
                                            {problem.title}
                                        </h3>
                                        <p className="text-gray-600">
                                            {problem.description}
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
