'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { Mail, MapPin, Phone } from 'lucide-react';

import { FormLogo } from './auth-forms/form-logo';

const footerCompanyLinks = [
    { href: '/about', label: 'About Us' },
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
    { href: '/contact', label: 'Contact' },
];

const footerForCentresLinks = [
    { href: '/for-centres', label: 'Join MediDirect' },
    { href: '/pricing', label: 'Pricing' },
];
const footerForPatientsLinks = [
    { href: '/search', label: 'Find Centres' },
    { href: '/how-it-works', label: 'How It Works' },
];

export function Footer() {
    const pathname = usePathname();
    const isDashboardRoute = pathname.includes('dashboard');
    const isAuthRoute = pathname.includes('auth');
    return (
        <>
            {isDashboardRoute || isAuthRoute ? null : (
                <footer className="bg-gray-900 text-white py-16">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            <div>
                                <div className="flex items-center space-x-2 mb-4">
                                    <Link
                                        href="/"
                                        className="flex items-center"
                                    >
                                        <FormLogo className="mx-0" />
                                    </Link>
                                </div>
                                <p className="text-gray-400 mb-4">
                                    Connecting patients to quality diagnostic
                                    services across Lagos and beyond.
                                </p>
                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center gap-2">
                                        <Phone className="w-4 h-4" />
                                        <span>+234 800 MEDI DIRECT</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Mail className="w-4 h-4" />
                                        <span>hello@medidirect.ng</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4" />
                                        <span>Lagos, Nigeria</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="font-semibold mb-4">
                                    For Patients
                                </h3>
                                <ul className="space-y-2 text-sm text-gray-400">
                                    {footerForPatientsLinks.map((link) => (
                                        <li key={link.href}>
                                            <Link
                                                href={link.href}
                                                className={cn(
                                                    `hover:text-white text-gray-400`,
                                                    {
                                                        'text-white ml-2':
                                                            pathname ===
                                                            link.href,
                                                    },
                                                )}
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h3 className="font-semibold mb-4">
                                    For Centres
                                </h3>
                                <ul className="space-y-2 text-sm text-gray-400">
                                    {footerForCentresLinks.map((link) => (
                                        <li key={link.href}>
                                            <Link
                                                href={link.href}
                                                className={cn(
                                                    `hover:text-white text-gray-400`,
                                                    {
                                                        'text-white ml-2':
                                                            pathname ===
                                                            link.href,
                                                    },
                                                )}
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h3 className="font-semibold mb-4">Company</h3>
                                <ul className="space-y-2 text-sm text-gray-400">
                                    {footerCompanyLinks.map((link) => (
                                        <li key={link.href}>
                                            <Link
                                                href={link.href}
                                                className={cn(
                                                    `hover:text-white text-gray-400`,
                                                    {
                                                        'text-white ml-2':
                                                            pathname ===
                                                            link.href,
                                                    },
                                                )}
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
                            <p>
                                &copy; {new Date().getFullYear()} MediDirect.
                                All rights reserved.
                            </p>
                        </div>
                    </div>
                </footer>
            )}
        </>
    );
}
