'use client';

import React from 'react';
import { motion } from 'framer-motion';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import SectionHeading from '@/components/ui/SectionHeading';

const metrics = [
    { value: 30, label: 'Reduced Trips', suffix: '%' },
    { value: 25, label: 'Lower Fuel Cost', suffix: '%' },
    { value: 20, label: 'Emission Reduction', suffix: '%' },
];

export default function ImpactSection() {
    return (
        <section className="py-20 gradient-hero">
            <div className="container mx-auto px-4">
                <SectionHeading
                    title="Measurable Impact"
                    subtitle="Real results from collaborative logistics optimization"
                    centered
                    light
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-12">
                    {metrics.map((metric, index) => (
                        <motion.div
                            key={metric.label}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className="text-center"
                        >
                            <AnimatedCounter value={metric.value} suffix={metric.suffix} />
                            <p className="text-xl text-gray-200 mt-4 font-medium">
                                {metric.label}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
