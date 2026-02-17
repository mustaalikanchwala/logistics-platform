import type { Metadata } from 'next';
import SectionHeading from '@/components/ui/SectionHeading';

export const metadata: Metadata = {
    title: 'About Platform - Smart Logistics',
    description: 'Learn about the Smart Collaborative Logistics Platform for Mira Bhayandar',
};

export default function AboutPage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="gradient-hero py-20">
                <div className="container mx-auto px-4">
                    <SectionHeading
                        title="About the Platform"
                        subtitle="Transforming logistics through collaboration and technology"
                        centered
                        light
                    />
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-3xl font-bold text-[#0C2B4E] mb-6">Our Mission</h2>
                    <p className="text-lg text-gray-700 leading-relaxed mb-6">
                        The Smart Collaborative Logistics Platform is designed to revolutionize the way goods are transported in Mira Bhayandar. By connecting suppliers, transporters, retailers, and local authorities on a single platform, we enable coordinated delivery planning that reduces duplicated trips, optimizes routes, and significantly lowers emissions.
                    </p>
                    <p className="text-lg text-gray-700 leading-relaxed">
                        Our platform leverages advanced AI algorithms, real-time GPS tracking, and comprehensive analytics to create a more efficient, sustainable, and profitable logistics ecosystem for all stakeholders.
                    </p>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-20 bg-[#F4F4F4]">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-3xl font-bold text-[#0C2B4E] mb-12 text-center">How It Works</h2>

                    <div className="space-y-8">
                        <div className="bg-white rounded-lg p-6 shadow-md">
                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-[#1D546C] text-white rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                                    1
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-[#0C2B4E] mb-2">Stakeholder Registration</h3>
                                    <p className="text-gray-700">
                                        Suppliers, transporters, retailers, and authorities register on the platform and provide their logistics requirements and capabilities.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg p-6 shadow-md">
                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-[#1D546C] text-white rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                                    2
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-[#0C2B4E] mb-2">Smart Matching & Planning</h3>
                                    <p className="text-gray-700">
                                        Our AI algorithms analyze delivery requests, vehicle availability, and route data to create optimized delivery schedules that maximize efficiency.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg p-6 shadow-md">
                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-[#1D546C] text-white rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                                    3
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-[#0C2B4E] mb-2">Coordinated Execution</h3>
                                    <p className="text-gray-700">
                                        Deliveries are executed according to the optimized plan, with real-time GPS tracking and updates shared across all stakeholders.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg p-6 shadow-md">
                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-[#1D546C] text-white rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                                    4
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-[#0C2B4E] mb-2">Analytics & Improvement</h3>
                                    <p className="text-gray-700">
                                        Comprehensive analytics provide insights into performance, emissions, and cost savings, enabling continuous improvement.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Vision Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-3xl font-bold text-[#0C2B4E] mb-6">Our Vision</h2>
                    <p className="text-lg text-gray-700 leading-relaxed">
                        We envision Mira Bhayandar as a model smart city where logistics operations are seamlessly coordinated, environmentally sustainable, and economically efficient. By reducing traffic congestion, lowering emissions, and improving delivery reliability, we aim to enhance the quality of life for all residents while supporting local businesses and economic growth.
                    </p>
                </div>
            </section>
        </div>
    );
}
