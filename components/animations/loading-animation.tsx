'use client';

import { useEffect, useRef } from 'react';

import gsap from 'gsap';

export function LoadingAnimation() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const dots = containerRef.current.querySelectorAll('.loading-dot');

        // Create the animation
        const tl = gsap.timeline({
            repeat: -1,
            yoyo: true,
        });

        tl.fromTo(
            dots,
            { y: 0, opacity: 0.3 },
            {
                y: -15,
                opacity: 1,
                duration: 0.5,
                stagger: 0.1,
                ease: 'power2.inOut',
            },
        );

        return () => {
            tl.kill();
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="flex justify-center items-center h-screen"
        >
            <div className="flex space-x-3">
                <div className="bg-emerald-600 rounded-full w-4 h-4 loading-dot"></div>
                <div className="bg-emerald-600 rounded-full w-4 h-4 loading-dot"></div>
                <div className="bg-emerald-600 rounded-full w-4 h-4 loading-dot"></div>
            </div>
        </div>
    );
}
