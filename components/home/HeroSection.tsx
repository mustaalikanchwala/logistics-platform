'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';

export default function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-hero">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                    backgroundSize: '40px 40px'
                }}></div>
            </div>

            <div className="container mx-auto px-4 py-32 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center max-w-5xl mx-auto"
                >
                    {/* Main Headline */}
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                        Building Sustainable & Smart Logistics for{' '}
                        <span className="text-[#1D546C] bg-white px-4 py-1 rounded-lg inline-block">
                            Mira Bhayandar
                        </span>
                    </h1>

                    {/* Subtext */}
                    <p className="text-xl md:text-2xl text-gray-200 mb-12 leading-relaxed">
                        Collaborative delivery planning, optimized routes, and reduced emissions.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Button href="/features" variant="primary" size="lg">
                            Explore Platform
                        </Button>
                        <Button href="/dashboard" variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-[#0C2B4E]">
                            View Dashboard
                        </Button>
                    </div>

                    {/* Stats Preview */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-20"
                    >
                        <div className="text-center">
                            <div className="text-4xl md:text-5xl font-bold text-white mb-2">30%</div>
                            <div className="text-gray-300">Reduced Trips</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl md:text-5xl font-bold text-white mb-2">25%</div>
                            <div className="text-gray-300">Lower Fuel Cost</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl md:text-5xl font-bold text-white mb-2">20%</div>
                            <div className="text-gray-300">Emission Reduction</div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Bottom Wave */}
            <div className="absolute bottom-0 left-0 right-0">
                <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
                        fill="#F4F4F4"
                    />
                </svg>
            </div>
        </section>
    );
}
