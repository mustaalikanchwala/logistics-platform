import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#0C2B4E] text-white">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* About */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Smart Logistics</h3>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            Building sustainable and smart logistics for Mira Bhayandar through collaborative delivery planning.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/about" className="text-gray-300 hover:text-[#1D546C] transition-colors">
                                    About Platform
                                </Link>
                            </li>
                            <li>
                                <Link href="/features" className="text-gray-300 hover:text-[#1D546C] transition-colors">
                                    Features
                                </Link>
                            </li>
                            <li>
                                <Link href="/stakeholders" className="text-gray-300 hover:text-[#1D546C] transition-colors">
                                    Stakeholders
                                </Link>
                            </li>
                            <li>
                                <Link href="/dashboard" className="text-gray-300 hover:text-[#1D546C] transition-colors">
                                    Dashboard
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Contact</h3>
                        <ul className="space-y-3">
                            <li className="flex items-center space-x-2 text-gray-300 text-sm">
                                <Mail size={16} />
                                <span>info@smartlogistics.in</span>
                            </li>
                            <li className="flex items-center space-x-2 text-gray-300 text-sm">
                                <Phone size={16} />
                                <span>+91 22 1234 5678</span>
                            </li>
                            <li className="flex items-center space-x-2 text-gray-300 text-sm">
                                <MapPin size={16} />
                                <span>Mira Bhayandar, Maharashtra</span>
                            </li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Follow Us</h3>
                        <div className="flex space-x-4">
                            <a
                                href="#"
                                className="w-10 h-10 bg-[#1A3D64] rounded-lg flex items-center justify-center hover:bg-[#1D546C] transition-colors"
                                aria-label="LinkedIn"
                            >
                                <Linkedin size={20} />
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 bg-[#1A3D64] rounded-lg flex items-center justify-center hover:bg-[#1D546C] transition-colors"
                                aria-label="Twitter"
                            >
                                <Twitter size={20} />
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 bg-[#1A3D64] rounded-lg flex items-center justify-center hover:bg-[#1D546C] transition-colors"
                                aria-label="Facebook"
                            >
                                <Facebook size={20} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
                    <p>&copy; {currentYear} Smart Collaborative Logistics Platform. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
