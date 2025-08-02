'use client';

import { useEffect, useRef } from 'react';

import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { animations } from '@/lib/animations';
import {
    AlertTriangle,
    CreditCard,
    FileText,
    Gavel,
    Shield,
    Users,
} from 'lucide-react';

export function Terms() {
    const heroRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (heroRef.current) animations.pageEnter(heroRef.current);
        if (contentRef.current) animations.fadeInOnScroll(contentRef.current);
    }, []);

    const sections = [
        {
            icon: Users,
            title: 'Acceptance of Terms',
            content: [
                'By accessing or using MediDirect, you agree to be bound by these Terms of Service and all applicable laws and regulations.',
                'If you do not agree with any of these terms, you are prohibited from using or accessing this platform.',
                'These terms apply to all users of the platform, including patients, healthcare centres, and visitors.',
                'You must be at least 18 years old to use our services or have parental/guardian consent.',
                'By using our services, you represent that you have the legal capacity to enter into these terms.',
            ],
        },
        {
            icon: Shield,
            title: 'User Responsibilities',
            content: [
                'Provide accurate, current, and complete information when creating your account and booking services.',
                'Maintain the security of your account credentials and notify us immediately of any unauthorized access.',
                'Use the platform only for lawful purposes and in accordance with these terms.',
                'Respect the privacy and rights of other users and healthcare providers on the platform.',
                'Comply with all applicable local, state, and federal laws when using our services.',
                "Not attempt to interfere with, compromise, or disrupt the platform's security or functionality.",
            ],
        },
        {
            icon: FileText,
            title: 'Platform Services',
            content: [
                'MediDirect is a marketplace platform that connects patients with healthcare centres and diagnostic services.',
                'We facilitate bookings but do not provide medical services directly - all medical services are provided by independent healthcare centres.',
                'We do not practice medicine, provide medical advice, or make medical diagnoses.',
                'Healthcare centres are independent contractors responsible for their own services, staff, and medical practices.',
                'We reserve the right to modify, suspend, or discontinue any part of our services at any time.',
                'Service availability may vary by location and is subject to healthcare centre availability.',
            ],
        },
        {
            icon: CreditCard,
            title: 'Payments and Fees',
            content: [
                'Payment for services is processed securely through our approved payment partners.',
                'Prices displayed are set by individual healthcare centres and may vary.',
                'All payments are subject to the terms and conditions of our payment processors.',
                'Refunds are subject to the cancellation policy of the specific healthcare centre and our platform policies.',
                'We may charge service fees for platform usage, which will be clearly disclosed before payment.',
                'You are responsible for any applicable taxes related to your use of our services.',
            ],
        },
        {
            icon: AlertTriangle,
            title: 'Disclaimers and Limitations',
            content: [
                "MediDirect provides the platform 'as is' without warranties of any kind, express or implied.",
                'We do not guarantee the accuracy, completeness, or reliability of any content on the platform.',
                'We are not liable for any medical outcomes, misdiagnoses, or treatment decisions made by healthcare providers.',
                'Our liability is limited to the maximum extent permitted by applicable law.',
                'We do not warrant that the platform will be uninterrupted, secure, or error-free.',
                'Users assume all risks associated with their use of the platform and medical services obtained through it.',
            ],
        },
        {
            icon: Gavel,
            title: 'Dispute Resolution',
            content: [
                'Any disputes arising from these terms or your use of the platform will be resolved through binding arbitration.',
                'Arbitration will be conducted in Lagos, Nigeria, under Nigerian law.',
                'You waive your right to participate in class action lawsuits against MediDirect.',
                'Before initiating arbitration, you must first contact us to attempt to resolve the dispute informally.',
                'Certain disputes may be resolved in small claims court if they qualify under applicable law.',
                'These dispute resolution provisions survive termination of your account or these terms.',
            ],
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
                        <FileText className="w-16 h-16 text-blue-600 mx-auto mb-6" />
                        <h1 className="text-5xl font-bold text-gray-900 mb-6">
                            Terms of Service
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                            These terms govern your use of MediDirect and
                            outline the rights and responsibilities of all
                            parties using our healthcare marketplace platform.
                        </p>
                        <div className="bg-blue-100 rounded-lg p-6 text-left">
                            <p className="text-blue-800">
                                <strong>Last Updated:</strong> January 2024
                                <br />
                                <strong>Effective Date:</strong> January 1, 2024
                                <br />
                                <strong>Governing Law:</strong> Federal Republic
                                of Nigeria
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Sections */}
            <section ref={contentRef} className="py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto space-y-12">
                        {sections.map((section, index) => (
                            <Card
                                key={index}
                                className="hover:shadow-lg transition-shadow duration-300"
                            >
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-4 text-2xl">
                                        <section.icon className="w-8 h-8 text-blue-600" />
                                        {section.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-4">
                                        {section.content.map(
                                            (item, itemIndex) => (
                                                <li
                                                    key={itemIndex}
                                                    className="flex items-start gap-3"
                                                >
                                                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                                                    <p className="text-gray-700 leading-relaxed">
                                                        {item}
                                                    </p>
                                                </li>
                                            ),
                                        )}
                                    </ul>
                                </CardContent>
                            </Card>
                        ))}

                        {/* Medical Disclaimer */}
                        <Card className="bg-red-50 border-red-200">
                            <CardHeader>
                                <CardTitle className="text-2xl text-red-900 flex items-center gap-3">
                                    <AlertTriangle className="w-8 h-8" />
                                    Important Medical Disclaimer
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4 text-red-800">
                                    <p>
                                        <strong>
                                            MediDirect is not a healthcare
                                            provider.
                                        </strong>{' '}
                                        We are a technology platform that
                                        connects patients with independent
                                        healthcare centres and diagnostic
                                        services.
                                    </p>
                                    <p>
                                        All medical services, diagnoses,
                                        treatments, and medical advice are
                                        provided solely by the healthcare
                                        centres and medical professionals you
                                        choose to visit through our platform.
                                    </p>
                                    <p>
                                        <strong>
                                            In case of medical emergencies,
                                            contact emergency services
                                            immediately.
                                        </strong>
                                        Do not rely on our platform for urgent
                                        medical situations.
                                    </p>
                                    <p>
                                        Always consult with qualified healthcare
                                        professionals for medical advice,
                                        diagnosis, and treatment decisions.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Contact Information */}
                        <Card className="bg-blue-50 border-blue-200">
                            <CardHeader>
                                <CardTitle className="text-2xl text-blue-900">
                                    Questions About These Terms?
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-blue-800 mb-4">
                                    If you have any questions about these Terms
                                    of Service, please contact our legal team:
                                </p>
                                <div className="space-y-2 text-blue-800">
                                    <p>
                                        <strong>Email:</strong>{' '}
                                        legal@medidirect.ng
                                    </p>
                                    <p>
                                        <strong>Phone:</strong> +234 800 MEDI
                                        DIRECT
                                    </p>
                                    <p>
                                        <strong>Address:</strong> MediDirect
                                        Legal Department, Lagos, Nigeria
                                    </p>
                                    <p>
                                        <strong>Business Hours:</strong> Monday
                                        - Friday, 9:00 AM - 5:00 PM WAT
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Changes Notice */}
                        <Card className="bg-yellow-50 border-yellow-200">
                            <CardContent className="pt-6">
                                <h3 className="text-xl font-bold text-yellow-900 mb-4">
                                    Changes to Terms
                                </h3>
                                <p className="text-yellow-800">
                                    We reserve the right to modify these Terms
                                    of Service at any time. We will notify users
                                    of material changes via email and platform
                                    notifications. Continued use of our services
                                    after such modifications constitutes
                                    acceptance of the updated terms. We
                                    recommend reviewing these terms periodically
                                    for any changes.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
