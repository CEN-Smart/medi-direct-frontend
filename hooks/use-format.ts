import { useEffect, useState } from 'react';

export function useFormat() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    interface FormatOptions {
        value: string | number;
        type: 'currency' | 'date';
        country: 'en-NG' | 'en-US';
    }

    const formatValue = (
        value: FormatOptions['value'],
        type: FormatOptions['type'],
        country: FormatOptions['country'],
    ) => {
        if (!mounted) {
            return value;
        }

        if (type === 'currency') {
            return new Intl.NumberFormat(country, {
                style: 'currency',
                currency: 'NGN',
            }).format(Number(value));
        }

        if (type === 'date') {
            return new Date(value).toLocaleDateString();
        }

        return value;
    };

    const formatString = (value: string, charNum: number) => {
        if (value.length <= charNum) {
            return value;
        }
        return value.substring(0, charNum) + '...';
    };

    // Make every first letter of each word uppercase
    const formatTitleCase = (value: string) => {
        return value
            .split(' ')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    const formatInputValue = (value: string) => {
        return value
            .replace(/\s/g, '') // Remove existing spaces
            .replace(/,/g, '') // Remove existing commas
            .replace(/\D/g, '') // Remove non-digit characters
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') // Add commas every 3 digits
            .trim(); // Remove trailing spaces
    };

    return { formatValue, formatString, formatInputValue, formatTitleCase };
}
