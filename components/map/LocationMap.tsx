'use client';

import dynamic from 'next/dynamic';

// Dynamically import the map component to avoid SSR issues
const DynamicMap = dynamic(
    () => import('./LocationMapClient').then((mod) => mod.LocationMapClient),
    {
        ssr: false,
        loading: () => (
            <div className="min-h-64 w-full bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-gray-500">Loading map...</div>
            </div>
        ),
    },
);
interface LocationMapProps {
    latitude: number;
    longitude: number;
    name: string;
    className?: string;
}

export function LocationMap({
    latitude,
    longitude,
    name,
    className,
}: LocationMapProps) {
    return (
        <DynamicMap
            latitude={latitude}
            longitude={longitude}
            name={name}
            className={className}
        />
    );
}
