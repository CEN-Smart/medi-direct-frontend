import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatPhone(phone: string) {
    // Remove all non-digit characters but keep the leading '+' if it exists
    const digits = phone.replace(/[^\d+]/g, '');
    if (digits.startsWith('0')) return '+234' + digits.slice(1);
    if (!digits.startsWith('+')) return '+234' + digits;
    return digits;
}

export const baseUrl = process.env.NEXT_PUBLIC_DATABASE_URL;
export const appSecret = process.env.NEXT_PUBLIC_APP_SECRET;

export const tokenKey = 'token';

export const fileUploadKey = 'files';

export const user = 'user';
