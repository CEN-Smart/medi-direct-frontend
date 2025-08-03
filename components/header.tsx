'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useState } from 'react';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { links } from '@/docs';
import { useLandingPage } from '@/hooks/use-landing-page';
import { cn } from '@/lib/utils';
import { useLogoutUser } from '@/queries/authentication';
import { ChevronDown, LogOut, Menu, X } from 'lucide-react';

import { Logo } from './logo';

const resourcesLinks = [
    { href: '/about', label: 'About Us' },
    { href: '/faq', label: 'FAQ' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/contact', label: 'Contact' },
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
];

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();
    const isDashboardRoute = pathname.includes('dashboard');
    const { sticky } = useLandingPage();
    const logout = useLogoutUser();

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <header
            role="banner"
            className={cn(
                ` transition-all z-[1001] w-full top-0 bg-linear-to-t from-blue-50 to-white   duration-500`,
                {
                    'shadow-lg border-b border-blue-50 fixed bg-linear-to-b from-blue-50 to-white ':
                        sticky,
                },
            )}
        >
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Logo />

                    {isDashboardRoute ? (
                        <button
                            onClick={() => logout()}
                            className="text-gray-700  hover:text-red-600 cursor-pointer transition-colors md:flex hidden items-center gap-1"
                        >
                            <LogOut className="w-4 h-4" />
                            Logout
                        </button>
                    ) : (
                        <nav className="hidden md:flex items-center space-x-8">
                            {links.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={cn(
                                        'text-gray-700 hover:text-blue-600 transition-colors',
                                        {
                                            'text-blue-600 font-semibold':
                                                pathname === link.href,
                                        },
                                    )}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <DropdownMenu>
                                <DropdownMenuTrigger className="text-gray-700 hover:text-blue-600 flex gap-1 items-center transition-colors">
                                    Resources
                                    <ChevronDown className="ml-1 w-4 h-4" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    align="end"
                                    className="z-[1002]"
                                >
                                    {resourcesLinks.map((link) => (
                                        <DropdownMenuItem
                                            key={link.href}
                                            asChild
                                        >
                                            <Link
                                                href={link.href}
                                                className={cn(
                                                    'text-gray-700 hover:text-blue-600',
                                                    {
                                                        'text-blue-600 font-semibold':
                                                            pathname ===
                                                            link.href,
                                                    },
                                                )}
                                            >
                                                {link.label}
                                            </Link>
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </nav>
                    )}

                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMenu}
                        className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100"
                    >
                        {isMenuOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden py-4 border-t border-gray-200">
                        {isDashboardRoute ? (
                            <button
                                onClick={() => logout()}
                                className="text-gray-700 hover:text-red-600 cursor-pointer transition-colors flex items-center gap-1"
                            >
                                <LogOut className="w-4 h-4" />
                                Logout
                            </button>
                        ) : (
                            <nav className="flex flex-col space-y-4">
                                {links.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={cn(
                                            'text-gray-700 hover:text-blue-600 transition-colors px-2 py-1',
                                            {
                                                'text-blue-600 font-semibold':
                                                    pathname === link.href,
                                            },
                                        )}
                                        onClick={toggleMenu}
                                    >
                                        {link.label}
                                    </Link>
                                ))}

                                {resourcesLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={cn(
                                            'text-gray-700 hover:text-blue-600 transition-colors px-2 py-1',
                                            {
                                                'text-blue-600 font-semibold':
                                                    pathname === link.href,
                                            },
                                        )}
                                        onClick={toggleMenu}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </nav>
                        )}
                    </div>
                )}
            </div>
        </header>
    );
}
