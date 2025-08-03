import { Metadata } from 'next';

import { Privacy } from '@/components/privacy';

export const metadata: Metadata = {
    title: 'Privacy Policy - Medi Direct',
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
            url: 'https://medidirect.org/privacy',
        },
    ],
    creator: 'Medi Direct Team',
    openGraph: {
        title: 'Privacy Policy - Medi Direct',
        description:
            'Medi Direct is a platform that connects patients with healthcare providers, offering a seamless experience for booking appointments, accessing medical records, and managing health information.',
        url: 'https://medidirect.org/privacy',
        siteName: 'Medi Direct',
        images: [
            {
                url: 'https://res.cloudinary.com/dkvxi5iws/image/upload/v1751829214/logo_putfge.jpg', // Adjusted to use relative path
                width: 1200,
                height: 630,
                alt: 'Medi Direct Logo',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        images: [
            {
                url: 'https://res.cloudinary.com/dkvxi5iws/image/upload/v1751829214/logo_putfge.jpg', // Adjusted to use relative path
                width: 1200,
                height: 630,
                alt: 'Medi Direct OG Image',
            },
        ],
        card: 'summary_large_image',
        title: 'Medi Direct',
    },
};

const PrivacyPage = () => {
    return <Privacy />;
};

export default PrivacyPage;
