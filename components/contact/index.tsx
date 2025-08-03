'use client';

import Link from 'next/link';

import { useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { animations } from '@/lib/animations';
import {
    CheckCircle,
    Clock,
    HeadphonesIcon,
    Mail,
    MapPin,
    MessageCircle,
    Phone,
    Send,
} from 'lucide-react';

import { ContactUsForm } from './contact-us-form';

export function Contact() {
    const heroRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLDivElement>(null);
    const infoRef = useRef<HTMLDivElement>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        if (heroRef.current) animations.pageEnter(heroRef.current);
        if (formRef.current) animations.fadeInOnScroll(formRef.current);
        if (infoRef.current) animations.fadeInOnScroll(infoRef.current);
    }, []);

    const contactInfo = [
        {
            icon: Phone,
            title: 'Phone Support',
            details: ['+234 800 MEDI DIRECT', '+234 1 234 5678'],
            description: 'Available 24/7 for urgent inquiries',
        },
        {
            icon: Mail,
            title: 'Email Support',
            details: ['hello@medidirect.ng', 'support@medidirect.ng'],
            description: 'We respond within 24 hours',
        },
        {
            icon: MapPin,
            title: 'Office Location',
            details: ['123 Healthcare Avenue', 'Victoria Island, Lagos'],
            description: 'Visit us Monday - Friday, 9AM - 5PM',
        },
        {
            icon: Clock,
            title: 'Business Hours',
            details: [
                'Mon - Fri: 9:00 AM - 6:00 PM',
                'Sat: 10:00 AM - 4:00 PM',
            ],
            description: 'Emergency support available 24/7',
        },
    ];

    const supportOptions = [
        {
            icon: MessageCircle,
            title: 'General Inquiry',
            description:
                'Questions about our services, partnerships, or platform',
        },
        {
            icon: HeadphonesIcon,
            title: 'Technical Support',
            description:
                'Help with account issues, booking problems, or platform bugs',
        },
        {
            icon: Phone,
            title: 'Medical Emergency',
            description:
                'For medical emergencies, please call emergency services immediately',
        },
    ];

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-white">
                <div className="py-20 flex items-center justify-center min-h-[60vh]">
                    <Card className="max-w-md mx-auto text-center">
                        <CardContent className="p-8">
                            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-6" />
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                Message Sent Successfully!
                            </h2>
                            <p className="text-gray-600 mb-6">
                                {`Thank you for contacting us. We'll get back to
                                you within 24 hours.`}
                            </p>
                            <Button onClick={() => setIsSubmitted(false)}>
                                Send Another Message
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section
                ref={heroRef}
                className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100"
            >
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <MessageCircle className="w-16 h-16 text-blue-600 mx-auto mb-6" />
                        <h1 className="text-5xl font-bold text-gray-900 mb-6">
                            Get in Touch
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                            Have questions about MediDirect? Need help with
                            bookings? Our support team is here to help you
                            navigate your healthcare journey.
                        </p>
                    </div>
                </div>
            </section>

            {/* Support Options */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                            How Can We Help?
                        </h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            {supportOptions.map((option, index) => (
                                <Card
                                    key={index}
                                    className="text-center hover:shadow-lg transition-shadow duration-300"
                                >
                                    <CardContent className="p-6">
                                        <option.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                                        <h3 className="text-xl font-bold text-gray-900 mb-3">
                                            {option.title}
                                        </h3>
                                        <p className="text-gray-600">
                                            {option.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-4 py-20">
                <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    {/* Contact Form */}
                    <div ref={formRef}>
                        <Card className="hover:shadow-xl transition-shadow duration-300">
                            <CardHeader>
                                <CardTitle className="text-2xl flex items-center gap-3">
                                    <Send className="w-6 h-6 text-blue-600" />
                                    Send us a Message
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ContactUsForm
                                    setIsSubmitted={setIsSubmitted}
                                />
                            </CardContent>
                        </Card>
                    </div>

                    {/* Contact Information */}
                    <div ref={infoRef} className="space-y-8">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">
                                Contact Information
                            </h2>
                            <p className="text-gray-600 mb-8">
                                {` We're here to help! Reach out to us through any
                                of the following channels, and we'll get back to
                                you as soon as possible.`}
                            </p>
                        </div>

                        <div className="space-y-6">
                            {contactInfo.map((info, index) => (
                                <Card
                                    key={index}
                                    className="hover:shadow-lg transition-shadow duration-300"
                                >
                                    <CardContent className="p-6">
                                        <div className="flex items-start gap-4">
                                            <info.icon className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                                    {info.title}
                                                </h3>
                                                {info.details.map(
                                                    (detail, detailIndex) => (
                                                        <p
                                                            key={detailIndex}
                                                            className="text-gray-700 font-medium"
                                                        >
                                                            {detail}
                                                        </p>
                                                    ),
                                                )}
                                                <p className="text-gray-600 text-sm mt-2">
                                                    {info.description}
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {/* Emergency Notice */}
                        <Card className="bg-red-50 border-red-200">
                            <CardContent className="p-6">
                                <h3 className="text-xl font-bold text-red-900 mb-3 flex items-center gap-2">
                                    <Phone className="w-5 h-5" />
                                    Medical Emergency?
                                </h3>
                                <p className="text-red-800">
                                    For medical emergencies, please contact
                                    emergency services immediately at{' '}
                                    <strong>199</strong> or visit your nearest
                                    emergency room. MediDirect is not an
                                    emergency service.
                                </p>
                            </CardContent>
                        </Card>

                        {/* FAQ Link */}
                        <Card className="bg-blue-50 border-blue-200">
                            <CardContent className="p-6">
                                <h3 className="text-xl font-bold text-blue-900 mb-3">
                                    Frequently Asked Questions
                                </h3>
                                <p className="text-blue-800 mb-4">
                                    Looking for quick answers? Check out our FAQ
                                    section for common questions about bookings,
                                    payments, and platform usage.
                                </p>
                                <Button
                                    asChild
                                    variant="outline"
                                    className="text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white bg-transparent"
                                >
                                    <Link href="/faq">View FAQ</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
