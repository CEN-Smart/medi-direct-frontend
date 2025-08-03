'use client';

import { useEffect, useRef } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { animations } from '@/lib/animations';
import { Database, Eye, Globe, Lock, Shield, UserCheck } from 'lucide-react';

export function Privacy() {
    const heroRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (heroRef.current) animations.pageEnter(heroRef.current);
        if (contentRef.current) animations.fadeInOnScroll(contentRef.current);
    }, []);

    const sections = [
        {
            icon: Database,
            title: 'Information We Collect',
            content: [
                'Personal Information: Name, email address, phone number, date of birth, and address when you create an account or book services.',
                'Medical Information: Health conditions, medical history, and service preferences to help match you with appropriate healthcare providers.',
                'Payment Information: Billing details and payment method information processed securely through our payment partners.',
                'Usage Data: How you interact with our platform, including pages visited, search queries, and booking patterns.',
                'Device Information: IP address, browser type, operating system, and device identifiers for security and optimization purposes.',
            ],
        },
        {
            icon: UserCheck,
            title: 'How We Use Your Information',
            content: [
                'Service Delivery: To facilitate bookings, connect you with healthcare centres, and provide customer support.',
                'Communication: To send booking confirmations, reminders, updates, and important service notifications.',
                'Personalization: To recommend relevant services and improve your experience on our platform.',
                'Safety & Security: To verify identities, prevent fraud, and maintain the security of our platform.',
                'Legal Compliance: To comply with applicable laws, regulations, and legal processes.',
                'Analytics: To understand usage patterns and improve our services (using anonymized data).',
            ],
        },
        {
            icon: Shield,
            title: 'Information Sharing',
            content: [
                'Healthcare Providers: We share necessary booking and medical information with centres you choose to visit.',
                'Service Providers: Trusted third parties who help us operate our platform (payment processors, SMS providers, etc.).',
                'Legal Requirements: When required by law, court order, or to protect our rights and safety.',
                'Business Transfers: In case of merger, acquisition, or sale of assets (with user notification).',
                'Consent: Any other sharing will only occur with your explicit consent.',
                'We never sell your personal information to third parties for marketing purposes.',
            ],
        },
        {
            icon: Lock,
            title: 'Data Security',
            content: [
                'Encryption: All sensitive data is encrypted in transit and at rest using industry-standard protocols.',
                'Access Controls: Strict access controls ensure only authorized personnel can access your information.',
                'Regular Audits: We conduct regular security audits and vulnerability assessments.',
                'Secure Infrastructure: Our platform is hosted on secure, compliant cloud infrastructure.',
                'Staff Training: All employees receive regular training on data protection and privacy practices.',
                'Incident Response: We have procedures in place to quickly respond to any security incidents.',
            ],
        },
        {
            icon: Eye,
            title: 'Your Privacy Rights',
            content: [
                'Access: Request a copy of the personal information we hold about you.',
                'Correction: Update or correct any inaccurate personal information.',
                'Deletion: Request deletion of your personal information (subject to legal requirements).',
                'Portability: Request your data in a portable format to transfer to another service.',
                'Restriction: Request that we limit how we process your information.',
                'Objection: Object to certain types of processing of your personal information.',
                'Withdraw Consent: Withdraw consent for processing where consent is the legal basis.',
            ],
        },
        {
            icon: Globe,
            title: 'International Transfers',
            content: [
                'Data Location: Your data is primarily stored and processed within Nigeria.',
                'International Partners: Some service providers may be located outside Nigeria.',
                'Safeguards: We ensure appropriate safeguards are in place for any international transfers.',
                'Adequacy Decisions: We only transfer data to countries with adequate data protection laws.',
                'Standard Contractual Clauses: We use approved contractual clauses for transfers where necessary.',
                'Your Rights: Your privacy rights remain protected regardless of where your data is processed.',
            ],
        },
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section
                ref={heroRef}
                className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100"
            >
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <Shield className="w-16 h-16 text-blue-600 mx-auto mb-6" />
                        <h1 className="text-5xl font-bold text-gray-900 mb-6">
                            Privacy Policy
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                            Your privacy is fundamental to our mission. This
                            policy explains how we collect, use, and protect
                            your personal information when you use MediDirect.
                        </p>
                        <div className="bg-blue-100 rounded-lg p-6 text-left">
                            <p className="text-blue-800">
                                <strong>Last Updated:</strong> January 2024
                                <br />
                                <strong>Effective Date:</strong> January 1, 2024
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

                        {/* Contact Information */}
                        <Card className="bg-blue-50 border-blue-200">
                            <CardHeader>
                                <CardTitle className="text-2xl text-blue-900">
                                    Contact Us About Privacy
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-blue-800 mb-4">
                                    If you have any questions about this Privacy
                                    Policy or how we handle your personal
                                    information, please contact us:
                                </p>
                                <div className="space-y-2 text-blue-800">
                                    <p>
                                        <strong>Email:</strong>{' '}
                                        privacy@medidirect.ng
                                    </p>
                                    <p>
                                        <strong>Phone:</strong> +234 800 MEDI
                                        DIRECT
                                    </p>
                                    <p>
                                        <strong>Address:</strong> MediDirect
                                        Privacy Office, Lagos, Nigeria
                                    </p>
                                    <p>
                                        <strong>Response Time:</strong> We aim
                                        to respond to all privacy inquiries
                                        within 72 hours
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Updates Notice */}
                        <Card className="bg-yellow-50 border-yellow-200">
                            <CardContent className="pt-6">
                                <h3 className="text-xl font-bold text-yellow-900 mb-4">
                                    Policy Updates
                                </h3>
                                <p className="text-yellow-800">
                                    We may update this Privacy Policy from time
                                    to time to reflect changes in our practices
                                    or applicable laws. We will notify you of
                                    any material changes by email and by posting
                                    the updated policy on our website. Your
                                    continued use of our services after such
                                    notification constitutes acceptance of the
                                    updated policy.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>
        </div>
    );
}
