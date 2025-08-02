'use client';

import { useEffect, useRef } from 'react';

import { cn } from '@/lib/utils';
import L from 'leaflet';
import marker2xn from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';

L.Icon.Default.mergeOptions({
    iconRetinaUrl: marker2xn,
    iconUrl: markerIcon,
    shadowUrl: shadowUrl,
});

interface LocationMapClientProps {
    latitude: number;
    longitude: number;
    name: string;
    className?: string;
}

export function LocationMapClient({
    latitude,
    longitude,
    name,
    className,
}: LocationMapClientProps) {
    const mapRef = useRef<HTMLDivElement | null>(null);

    // Initialize map
    useEffect(() => {
        if (!mapRef.current) return;
        const map = L.map(mapRef.current).setView([latitude, longitude], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);
        const marker = L.marker([latitude, longitude]).addTo(map);

        marker.bindPopup(name.toUpperCase()).openPopup();

        return () => {
            map.remove();
        };
    }, [latitude, longitude, name]);

    // Validate coordinates
    if (!latitude || !longitude || isNaN(latitude) || isNaN(longitude)) {
        return (
            <div
                className={cn(
                    'min-h-64 w-full flex items-center justify-center bg-gray-100 rounded-lg',
                )}
            >
                <p className="text-gray-500">Invalid location coordinates</p>
            </div>
        );
    }

    return (
        <div
            id="map"
            ref={mapRef}
            className={cn('min-h-64 w-full overflow-hidden', className)}
        ></div>
    );
}
