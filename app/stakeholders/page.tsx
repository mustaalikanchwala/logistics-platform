'use client';

import type { Metadata } from 'next';
import { motion } from 'framer-motion';
import { Factory, Truck, Store, Building2 } from 'lucide-react';
import Card from '@/components/ui/Card';
import SectionHeading from '@/components/ui/SectionHeading';

const stakeholders = [
    {
        title: 'Suppliers',
        description: 'Streamline distribution, reduce logistics costs, and improve delivery reliability through coordinated scheduling.',
        benefits: ['Lower transportation costs', 'Better delivery windows', 'Real-time visibility'],
        Icon: Factory,
    },
    {
        title: 'Transporters',
        description: 'Maximize fleet utilization, reduce empty miles, and increase profitability through shared logistics.',
        benefits: ['Higher vehicle utilization', 'Optimized routes', 'Reduced fuel costs'],
        Icon: Truck,
    },
    {
        title: 'Retailers',
        description: 'Receive timely deliveries, reduce inventory costs, and improve customer satisfaction with predictable logistics.',
        benefits: ['Reliable deliveries', 'Lower inventory costs', 'Better planning'],
        Icon: Store,
    },
    {
        title: 'Local Authorities',
        description: 'Reduce traffic congestion, lower emissions, and support sustainable urban development goals.',
        benefits: ['Reduced congestion', 'Lower emissions', 'Smart city goals'],
        Icon: Building2,
    },
];

export default function StakeholdersPage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="gradient-hero py-20">
                <div className="container mx-auto px-4">
                    <SectionHeading
                        title="Stakeholders"
                        subtitle="Benefits for everyone in the logistics ecosystem"
                        centered
                        light
                    />
                </div>
            </section>

            {/* Stakeholders Grid */}
            <section className="py-20 bg-[#F4F4F4]">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {stakeholders.map((stakeholder, index) => {
                            const Icon = stakeholder.Icon;
                            return (
                                <motion.div
                                    key={stakeholder.title}
                                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                >
                                    <Card className="h-full hover:shadow-2xl">
                                        <div className="flex items-start space-x-4 mb-4">
                                            <div className="w-16 h-16 bg-gradient-to-br from-[#1D546C] to-[#0C2B4E] rounded-lg flex items-center justify-center flex-shrink-0">
                                                <Icon className="text-white" size={32} />
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-bold text-[#0C2B4E]">
                                                    {stakeholder.title}
                                                </h3>
                                            </div>
                                        </div>

                                        <p className="text-gray-700 mb-6 leading-relaxed">
                                            {stakeholder.description}
                                        </p>

                                        <div className="border-t border-gray-200 pt-4">
                                            <h4 className="font-semibold text-[#0C2B4E] mb-3">Key Benefits:</h4>
                                            <ul className="space-y-2">
                                                {stakeholder.benefits.map((benefit) => (
                                                    <li key={benefit} className="flex items-center space-x-2 text-gray-600">
                                                        <div className="w-2 h-2 bg-[#1D546C] rounded-full"></div>
                                                        <span>{benefit}</span>
                                                    </li>
                                                ))}
                                            </ul>
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
                        Join Our Growing Network
                    </h2>
                    <p className="text-xl text-gray-600 mb-8">
                        Become part of the collaborative logistics revolution in Mira Bhayandar.
                    </p>
                    <a
                        href="/contact"
                        className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-lg bg-[#1D546C] text-white hover:bg-[#164558] hover:shadow-lg hover:scale-105 transition-all duration-300"
                    >
                        Contact Us
                    </a>
                </div>
            </section>
        </div>
    );
}
