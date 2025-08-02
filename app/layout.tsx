import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { cn } from '@/lib/utils';
import { TanstackProviders } from '@/providers/tanstack-query';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: {
        default: 'Medi Direct',
        template: '%s | Medi Direct',
    },
    description:
        'Medi Direct is a platform that connects patients with healthcare providers, offering a seamless experience for booking appointments, accessing medical records, and managing health information.',
    keywords: [
        'Medi Direct',
        'healthcare',
        'tele medicine',
        'patient support',
        'medical records',
        'appointment booking',
        'health management',
        'healthcare technology',
        'patient care',
        'health services',
        'healthcare solutions',
        'digital health',
        'healthcare platform',
        'healthcare app',
        'healthcare innovation',
        'patient engagement',
        'healthcare accessibility',
        'health equity',
        'health disparities',
    ],

    authors: [
        {
            name: 'Medi Direct Team',
            url: 'https://medidirect.org',
        },
    ],
    creator: 'Medi Direct Team',
    openGraph: {
        title: 'Medi Direct',
        description:
            'Medi Direct is a platform that connects patients with healthcare providers, offering a seamless experience for booking appointments, accessing medical records, and managing health information.',
        siteName: 'Medi Direct',
        images: [
            {
                url: 'https://res.cloudinary.com/dkvxi5iws/image/upload/v1751829214/logo_putfge.jpg', // Adjusted to use relative path
                width: 1200,
                height: 630,
                alt: 'Medi Direct OG Image',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Medi Direct',
        description:
            'Medi Direct is a platform that connects patients with healthcare providers, offering a seamless experience for booking appointments, accessing medical records, and managing health information.',
        images: [
            'https://res.cloudinary.com/dkvxi5iws/image/upload/v1751829214/logo_putfge.jpg',
        ],
        creator: '@MediDirect',
    },
    icons: {
        icon: '/favicon.ico',
        shortcut: '/favicon.ico',
        apple: '/apple-touch-icon.png',
    },
    manifest: '/site.webmanifest',
    robots: {
        index: true,
        follow: true,
        nocache: false, // Prevent caching of the page
    },
    alternates: {
        canonical: 'https://medidirect.org', // Canonical URL for the site
        types: {
            'application/rss+xml': '/feed.xml', // RSS feed URL
            'application/atom+xml': '/atom.xml', // Atom feed URL
        },
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                suppressHydrationWarning
                className={cn(`antialiased`, inter.className)}
            >
                <TanstackProviders>{children}</TanstackProviders>
            </body>
        </html>
    );
}
