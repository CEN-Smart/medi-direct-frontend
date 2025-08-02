'use client';

import Link from 'next/link';

import { useEffect, useRef } from 'react';

import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { animations } from '@/lib/animations';
import {
    ArrowRight,
    Award,
    CheckCircle,
    Heart,
    Target,
    Users,
} from 'lucide-react';

export function About() {
    const heroRef = useRef<HTMLDivElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);
    const teamRef = useRef<HTMLDivElement>(null);
    const valuesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (heroRef.current) animations.pageEnter(heroRef.current);
        if (statsRef.current) animations.fadeInOnScroll(statsRef.current);
        if (teamRef.current) animations.fadeInOnScroll(teamRef.current);
        if (valuesRef.current) animations.fadeInOnScroll(valuesRef.current);
    }, []);

    const stats = [
        { number: '50+', label: 'Partner Centres', icon: Users },
        { number: '10,000+', label: 'Happy Patients', icon: Heart },
        { number: '25+', label: 'Medical Services', icon: Target },
        { number: '99%', label: 'Satisfaction Rate', icon: Award },
    ];

    const team = [
        {
            name: 'Dr. Adebayo Johnson',
            role: 'Chief Medical Officer',
            image: '/placeholder.svg?height=300&width=300',
            bio: '15+ years in healthcare management and digital health innovation.',
        },
        {
            name: 'Funmi Adeyemi',
            role: 'Chief Technology Officer',
            image: '/placeholder.svg?height=300&width=300',
            bio: 'Former Google engineer with expertise in healthcare technology platforms.',
        },
        {
            name: 'Kemi Okafor',
            role: 'Head of Operations',
            image: '/placeholder.svg?height=300&width=300',
            bio: 'Healthcare operations specialist with 12+ years of experience.',
        },
    ];

    const values = [
        {
            icon: Heart,
            title: 'Patient-Centric Care',
            description:
                'Every decision we make prioritizes patient health, safety, and satisfaction.',
        },
        {
            icon: CheckCircle,
            title: 'Quality Assurance',
            description:
                'We maintain the highest standards through rigorous vetting and continuous monitoring.',
        },
        {
            icon: Users,
            title: 'Accessibility',
            description:
                'Making quality healthcare accessible to everyone, regardless of location or background.',
        },
        {
            icon: Target,
            title: 'Innovation',
            description:
                'Leveraging technology to transform how healthcare services are discovered and delivered.',
        },
    ];

    return (
        <div className="min-h-screen bg-white">
            <Header />

            {/* Hero Section */}
            <section
                ref={heroRef}
                className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100"
            >
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-5xl font-bold text-gray-900 mb-6">
                            Transforming Healthcare
                            <span className="text-blue-600 block">
                                Access in Nigeria
                            </span>
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                            MediDirect is revolutionizing how Nigerians access
                            quality diagnostic services. We connect patients
                            with trusted healthcare centres, making medical care
                            more accessible, transparent, and efficient.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/search">
                                <Button size="lg" className="group">
                                    Find Centres Near You
                                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                            <Link href="/for-centres">
                                <Button variant="outline" size="lg">
                                    Partner With Us
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section ref={statsRef} className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <Card
                                key={index}
                                className="text-center hover:shadow-lg transition-shadow duration-300"
                            >
                                <CardContent className="p-6">
                                    <stat.icon className="w-8 h-8 text-blue-600 mx-auto mb-4" />
                                    <div className="text-3xl font-bold text-gray-900 mb-2">
                                        {stat.number}
                                    </div>
                                    <div className="text-gray-600">
                                        {stat.label}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">
                                Our Mission
                            </h2>
                            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                To democratize access to quality healthcare by
                                creating a seamless platform that connects
                                patients with trusted diagnostic centres across
                                Nigeria. We believe everyone deserves access to
                                reliable, affordable, and convenient healthcare
                                services.
                            </p>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                Our Vision
                            </h3>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                {`To become Nigeria's leading healthcare
                                marketplace, where finding and booking medical
                                services is as easy as ordering food online,
                                while maintaining the highest standards of
                                medical care and patient safety.`}
                            </p>
                        </div>
                        <div className="relative">
                            <picture>
                                <img
                                    src="/logo.jpg"
                                    alt="Healthcare facility"
                                    className="rounded-lg shadow-xl"
                                />
                            </picture>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section ref={valuesRef} className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Our Core Values
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            These principles guide everything we do and shape
                            how we serve our community
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <Card
                                key={index}
                                className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
                            >
                                <CardContent className="p-8">
                                    <value.icon className="w-12 h-12 text-blue-600 mx-auto mb-6" />
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                                        {value.title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {value.description}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section
                ref={teamRef}
                className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100"
            >
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Meet Our Leadership Team
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Experienced professionals dedicated to transforming
                            healthcare in Nigeria
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {team.map((member, index) => (
                            <Card
                                key={index}
                                className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-4"
                            >
                                <CardContent className="p-8">
                                    <picture>
                                        <img
                                            src={
                                                member.image ||
                                                '/placeholder.svg'
                                            }
                                            alt={member.name}
                                            className="w-32 h-32 rounded-full mx-auto mb-6 object-cover"
                                        />
                                    </picture>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                                        {member.name}
                                    </h3>
                                    <p className="text-blue-600 font-medium mb-4">
                                        {member.role}
                                    </p>
                                    <p className="text-gray-600 leading-relaxed">
                                        {member.bio}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-blue-600">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold text-white mb-6">
                        Ready to Experience Better Healthcare?
                    </h2>
                    <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                        Join thousands of Nigerians who trust MediDirect for
                        their healthcare needs
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/search">
                            <Button
                                size="lg"
                                variant="secondary"
                                className="group"
                            >
                                Find Healthcare Centres
                                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                        <Link href="/auth/signup">
                            <Button
                                size="lg"
                                variant="outline"
                                className="text-white border-white hover:bg-white hover:text-blue-600 bg-transparent"
                            >
                                Create Account
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
