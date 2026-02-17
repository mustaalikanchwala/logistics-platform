'use client';

import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import Card from '@/components/ui/Card';
import SectionHeading from '@/components/ui/SectionHeading';

export default function ContactPage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="gradient-hero py-20">
                <div className="container mx-auto px-4">
                    <SectionHeading
                        title="Contact Us"
                        subtitle="Get in touch with our team"
                        centered
                        light
                    />
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-20 bg-[#F4F4F4]">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <Card>
                            <h3 className="text-2xl font-bold text-[#0C2B4E] mb-6">Send us a message</h3>
                            <form className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1D546C] focus:border-transparent"
                                        placeholder="Your name"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1D546C] focus:border-transparent"
                                        placeholder="your.email@example.com"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-2">
                                        Organization
                                    </label>
                                    <input
                                        type="text"
                                        id="organization"
                                        name="organization"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1D546C] focus:border-transparent"
                                        placeholder="Your organization"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={5}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1D546C] focus:border-transparent resize-none"
                                        placeholder="Tell us about your logistics needs..."
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-[#1D546C] text-white font-semibold rounded-lg hover:bg-[#164558] hover:shadow-lg transition-all duration-300"
                                >
                                    <Send size={20} />
                                    <span>Send Message</span>
                                </button>
                            </form>
                        </Card>

                        {/* Contact Information */}
                        <div className="space-y-6">
                            <Card>
                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 bg-[#1D546C] rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Mail className="text-white" size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-[#0C2B4E] mb-1">Email</h4>
                                        <p className="text-gray-600">info@smartlogistics.in</p>
                                        <p className="text-gray-600">support@smartlogistics.in</p>
                                    </div>
                                </div>
                            </Card>

                            <Card>
                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 bg-[#1D546C] rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Phone className="text-white" size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-[#0C2B4E] mb-1">Phone</h4>
                                        <p className="text-gray-600">+91 22 1234 5678</p>
                                        <p className="text-gray-600">+91 22 8765 4321</p>
                                    </div>
                                </div>
                            </Card>

                            <Card>
                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 bg-[#1D546C] rounded-lg flex items-center justify-center flex-shrink-0">
                                        <MapPin className="text-white" size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-[#0C2B4E] mb-1">Address</h4>
                                        <p className="text-gray-600">
                                            Smart Logistics Hub<br />
                                            Mira Bhayandar<br />
                                            Maharashtra 401107, India
                                        </p>
                                    </div>
                                </div>
                            </Card>

                            <Card className="bg-gradient-to-br from-[#0C2B4E] to-[#1A3D64]">
                                <h4 className="font-semibold text-white mb-3">Office Hours</h4>
                                <div className="space-y-2 text-gray-200">
                                    <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                                    <p>Saturday: 10:00 AM - 2:00 PM</p>
                                    <p>Sunday: Closed</p>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
