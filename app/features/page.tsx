'use client';

import type { Metadata } from 'next';
import { motion } from 'framer-motion';
import { Route, Truck, Users, MapPin, BarChart3, Leaf } from 'lucide-react';
import Card from '@/components/ui/Card';
import SectionHeading from '@/components/ui/SectionHeading';

const features = [
    {
        title: 'Smart Route Optimization',
        description: 'AI-powered algorithms analyze traffic patterns, delivery windows, and vehicle capacity to create the most efficient routes.',
        Icon: Route,
    },
    {
        title: 'Shared Fleet Utilization',
        description: 'Enable multiple stakeholders to share transportation resources, reducing empty trips and maximizing vehicle capacity.',
        Icon: Truck,
    },
    {
        title: 'Stakeholder Coordination',
        description: 'Seamless communication platform connecting suppliers, transporters, retailers, and authorities.',
        Icon: Users,
    },
    {
        title: 'Real-Time GPS Tracking',
        description: 'Monitor all deliveries in real-time with live GPS tracking and estimated arrival times.',
        Icon: MapPin,
    },
    {
        title: 'Data Analytics Dashboard',
        description: 'Comprehensive analytics and reporting tools to measure performance and identify optimization opportunities.',
        Icon: BarChart3,
    },
    {
        title: 'Emission Monitoring',
        description: 'Track carbon emissions and environmental impact with detailed sustainability metrics.',
        Icon: Leaf,
    },
];

export default function FeaturesPage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="gradient-hero py-20">
                <div className="container mx-auto px-4">
                    <SectionHeading
                        title="Platform Features"
                        subtitle="Comprehensive tools for modern logistics management"
                        centered
                        light
                    />
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-20 bg-[#F4F4F4]">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => {
                            const Icon = feature.Icon;
                            return (
                                <motion.div
                                    key={feature.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <Card className="h-full hover:shadow-2xl">
                                        <div className="flex flex-col h-full">
                                            <div className="w-16 h-16 bg-gradient-to-br from-[#1D546C] to-[#0C2B4E] rounded-lg flex items-center justify-center mb-4">
                                                <Icon className="text-white" size={32} />
                                            </div>
                                            <h3 className="text-2xl font-bold text-[#0C2B4E] mb-4">
                                                {feature.title}
                                            </h3>
                                            <p className="text-gray-600 leading-relaxed flex-grow">
                                                {feature.description}
                                            </p>
                                        </div>
                                    </Card>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 text-center max-w-3xl">
                    <h2 className="text-4xl font-bold text-[#0C2B4E] mb-6">
                        Ready to Transform Your Logistics?
                    </h2>
                    <p className="text-xl text-gray-600 mb-8">
                        Join the Smart Collaborative Logistics Platform and start optimizing your operations today.
                    </p>
                    <a
                        href="/contact"
                        className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-lg bg-[#1D546C] text-white hover:bg-[#164558] hover:shadow-lg hover:scale-105 transition-all duration-300"
                    >
                        Get Started
                    </a>
                </div>
            </section>
        </div>
    );
}
