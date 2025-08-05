'use client';

import Link from 'next/link';

import { useEffect, useRef, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { animations } from '@/lib/animations';
import {
    CreditCard,
    HelpCircle,
    Minus,
    Phone,
    Plus,
    Search,
    Settings,
    Shield,
    Stethoscope,
    Users,
} from 'lucide-react';

interface FAQItem {
    id: string;
    question: string;
    answer: string;
    category: string;
    tags: string[];
}

const faqData: FAQItem[] = [
    // General Questions
    {
        id: '1',
        question: 'What is MediDirect and how does it work?',
        answer: "MediDirect is Nigeria's leading healthcare marketplace that connects patients with verified medical centers. Patients can search for medical services, compare prices, read reviews, and book appointments online. Healthcare centers can list their services, manage bookings, and grow their patient base through our platform.",
        category: 'General',
        tags: ['platform', 'how it works', 'overview'],
    },
    {
        id: '2',
        question: 'Is MediDirect available in my city?',
        answer: 'MediDirect is currently available in Lagos, Abuja, Port Harcourt, Kano, and Ibadan. We are rapidly expanding to other major cities across Nigeria. If your city is not yet covered, you can join our waitlist to be notified when we launch in your area.',
        category: 'General',
        tags: ['availability', 'cities', 'locations'],
    },
    {
        id: '3',
        question: 'How do I create an account on MediDirect?',
        answer: 'Creating an account is simple and free. Click on "Sign Up" at the top of our website, enter your email address, create a secure password, and verify your email. You can also sign up using your Google account for faster registration.',
        category: 'General',
        tags: ['account', 'registration', 'sign up'],
    },

    // Booking & Appointments
    {
        id: '4',
        question: 'How do I book an appointment through MediDirect?',
        answer: 'To book an appointment: 1) Search for the medical service you need, 2) Browse available centers and compare prices, 3) Select your preferred center and time slot, 4) Fill in your details and medical information, 5) Make payment online, 6) Receive confirmation via email and SMS.',
        category: 'Booking',
        tags: ['booking', 'appointments', 'how to book'],
    },
    {
        id: '5',
        question: 'Can I book appointments for family members?',
        answer: 'Yes, you can book appointments for family members. During the booking process, you can add their details and medical information. For minors, parental consent is automatically assumed. For adults, ensure you have their permission before booking on their behalf.',
        category: 'Booking',
        tags: ['family', 'booking for others', 'relatives'],
    },
    {
        id: '6',
        question: 'How far in advance can I book an appointment?',
        answer: "You can book appointments up to 3 months in advance, depending on the healthcare center's availability. Most centers allow booking 1-4 weeks ahead. Emergency and urgent care appointments can often be booked for the same day or next day.",
        category: 'Booking',
        tags: ['advance booking', 'scheduling', 'availability'],
    },
    {
        id: '7',
        question: 'Can I reschedule or cancel my appointment?',
        answer: "Yes, you can reschedule or cancel appointments through your dashboard. Free cancellation is allowed up to 24 hours before your appointment. Cancellations within 24 hours may incur a fee depending on the center's policy. Rescheduling is usually free if done at least 12 hours in advance.",
        category: 'Booking',
        tags: ['reschedule', 'cancel', 'appointment changes'],
    },

    // Payments & Pricing
    {
        id: '8',
        question: 'What payment methods do you accept?',
        answer: 'We accept all major payment methods including: Debit/Credit cards (Visa, Mastercard, Verve), Bank transfers, USSD payments, Mobile money (Opay, PalmPay), and Paystack. All payments are processed securely with 256-bit SSL encryption.',
        category: 'Payments',
        tags: ['payment methods', 'cards', 'bank transfer', 'mobile money'],
    },
    {
        id: '9',
        question: 'Are the prices on MediDirect final or can they change?',
        answer: "The prices displayed are the final prices you'll pay for the service. Healthcare centers commit to honoring the prices listed on our platform. However, if additional services or tests are recommended during your visit, those may incur extra charges which will be discussed with you beforehand.",
        category: 'Payments',
        tags: ['pricing', 'final prices', 'additional charges'],
    },
    {
        id: '10',
        question: 'Do you offer payment plans or installments?',
        answer: 'For expensive procedures (above ₦50,000), some healthcare centers offer payment plans. You can see this option during booking if available. We also partner with healthcare financing companies to provide flexible payment options for major treatments.',
        category: 'Payments',
        tags: ['payment plans', 'installments', 'financing'],
    },
    {
        id: '11',
        question: "Can I get a refund if I'm not satisfied?",
        answer: 'Refund policies vary by healthcare center and service type. Generally, refunds are available for cancellations made 24+ hours in advance. For service quality issues, we work with centers to resolve concerns. Medical consultations are typically non-refundable once completed, but we have a satisfaction guarantee program.',
        category: 'Payments',
        tags: ['refunds', 'satisfaction', 'cancellation policy'],
    },

    // For Healthcare Centers
    {
        id: '12',
        question: 'How can my healthcare center join MediDirect?',
        answer: 'Healthcare centers can join by clicking "For Centers" on our website and completing the registration process. You\'ll need to provide: Valid medical licenses, Center registration documents, Insurance certificates, Staff credentials, and facility photos. Our team will verify your documents within 3-5 business days.',
        category: 'Healthcare Centers',
        tags: ['join platform', 'center registration', 'verification'],
    },
    {
        id: '13',
        question: 'What are the fees for healthcare centers?',
        answer: 'We charge a small commission (5-8%) on completed bookings only. There are no upfront fees, monthly subscriptions, or hidden charges. You only pay when you receive patients through our platform. The exact commission rate depends on your service volume and partnership level.',
        category: 'Healthcare Centers',
        tags: ['fees', 'commission', 'pricing for centers'],
    },
    {
        id: '14',
        question: 'How do centers receive payments?',
        answer: 'Payments are automatically transferred to your registered bank account within 2-3 business days after service completion. You can track all payments through your center dashboard. We provide detailed financial reports and can accommodate weekly or monthly payment schedules based on your preference.',
        category: 'Healthcare Centers',
        tags: ['payments to centers', 'bank transfers', 'financial reports'],
    },

    // Medical Services
    {
        id: '15',
        question: 'What types of medical services are available?',
        answer: 'MediDirect offers a wide range of services including: General consultations, Specialist appointments, Diagnostic tests (X-rays, CT scans, MRI, blood tests), Dental services, Eye care, Physiotherapy, Mental health services, Preventive care, Health screenings, and Minor procedures.',
        category: 'Medical Services',
        tags: ['services available', 'medical specialties', 'diagnostics'],
    },
    {
        id: '16',
        question: 'Are all healthcare centers verified and licensed?',
        answer: 'Yes, all healthcare centers on MediDirect are thoroughly verified. We check: Valid medical licenses from relevant authorities, Professional indemnity insurance, Facility accreditation, Staff qualifications, and Patient safety standards. We conduct regular audits to maintain quality standards.',
        category: 'Medical Services',
        tags: ['verification', 'licensing', 'quality assurance'],
    },
    {
        id: '17',
        question: 'Can I see a doctor online through MediDirect?',
        answer: 'Yes, we offer telemedicine consultations with qualified doctors. You can book video consultations for non-emergency medical issues, follow-up appointments, prescription renewals, and health advice. Online consultations are available 24/7 with our partner doctors.',
        category: 'Medical Services',
        tags: ['telemedicine', 'online consultations', 'video calls'],
    },

    // Privacy & Security
    {
        id: '18',
        question: 'How is my medical information protected?',
        answer: 'We take medical privacy seriously and comply with international healthcare data protection standards. Your information is encrypted, stored securely, and only shared with healthcare providers you choose. We never sell or share your data with third parties without your explicit consent.',
        category: 'Privacy & Security',
        tags: ['medical privacy', 'data protection', 'confidentiality'],
    },
    {
        id: '19',
        question: 'Who can access my medical records?',
        answer: 'Only you and the healthcare providers you book appointments with can access your medical records. You have full control over your data and can revoke access at any time. Our staff cannot view your medical information unless required for customer support with your explicit permission.',
        category: 'Privacy & Security',
        tags: ['medical records', 'access control', 'data privacy'],
    },

    // Technical Support
    {
        id: '20',
        question: 'What should I do if I encounter technical issues?',
        answer: 'For technical issues: 1) Check our Help Center for common solutions, 2) Try refreshing your browser or clearing cache, 3) Contact our 24/7 support team via chat, email, or phone, 4) For urgent booking issues, call our emergency support line. We typically resolve technical issues within 30 minutes.',
        category: 'Technical Support',
        tags: ['technical issues', 'troubleshooting', 'support'],
    },
    {
        id: '21',
        question: 'Is there a mobile app for MediDirect?',
        answer: 'Yes, our mobile apps are available for both iOS and Android devices. The apps offer all website features plus push notifications for appointment reminders, exclusive mobile discounts, and offline access to your booking history. Download from the App Store or Google Play Store.',
        category: 'Technical Support',
        tags: ['mobile app', 'iOS', 'Android', 'download'],
    },

    // Emergency & Urgent Care
    {
        id: '22',
        question: 'Can I use MediDirect for medical emergencies?',
        answer: 'MediDirect is not for life-threatening emergencies. For emergencies, call 199 (Nigeria Emergency Number) or go to the nearest hospital emergency room immediately. However, you can use our platform to find urgent care centers for non-life-threatening urgent medical needs.',
        category: 'Emergency Care',
        tags: ['emergencies', 'urgent care', 'emergency numbers'],
    },
    {
        id: '23',
        question: 'How quickly can I get an urgent appointment?',
        answer: 'For urgent (non-emergency) care, many centers offer same-day appointments. Our "Urgent Care" filter shows centers with availability within 24 hours. Some centers reserve slots for urgent cases and can accommodate patients within 2-4 hours of booking.',
        category: 'Emergency Care',
        tags: ['urgent appointments', 'same day', 'quick booking'],
    },
];

const categories = [
    { name: 'All', icon: HelpCircle, color: 'bg-blue-500' },
    { name: 'General', icon: Users, color: 'bg-green-500' },
    { name: 'Booking', icon: Settings, color: 'bg-purple-500' },
    { name: 'Payments', icon: CreditCard, color: 'bg-yellow-500' },
    { name: 'Healthcare Centers', icon: Stethoscope, color: 'bg-red-500' },
    { name: 'Medical Services', icon: Stethoscope, color: 'bg-indigo-500' },
    { name: 'Privacy & Security', icon: Shield, color: 'bg-gray-500' },
    { name: 'Technical Support', icon: Phone, color: 'bg-orange-500' },
    { name: 'Emergency Care', icon: Phone, color: 'bg-red-600' },
];

export function Faq() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
    const [filteredFAQs, setFilteredFAQs] = useState(faqData);

    const heroRef = useRef<HTMLDivElement>(null);
    const categoriesRef = useRef<HTMLDivElement>(null);
    const faqsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (heroRef.current) animations.pageEnter(heroRef.current);
        if (categoriesRef.current)
            animations.fadeInOnScroll(categoriesRef.current);
        if (faqsRef.current) animations.fadeInOnScroll(faqsRef.current);
    }, []);

    useEffect(() => {
        let filtered = faqData;

        // Filter by category
        if (selectedCategory !== 'All') {
            filtered = filtered.filter(
                (faq) => faq.category === selectedCategory,
            );
        }

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(
                (faq) =>
                    faq.question
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    faq.answer
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    faq.tags.some((tag) =>
                        tag.toLowerCase().includes(searchTerm.toLowerCase()),
                    ),
            );
        }

        setFilteredFAQs(filtered);
    }, [searchTerm, selectedCategory]);

    const toggleExpanded = (id: string) => {
        const newExpanded = new Set(expandedItems);
        if (newExpanded.has(id)) {
            newExpanded.delete(id);
        } else {
            newExpanded.add(id);
        }
        setExpandedItems(newExpanded);
    };

    const getCategoryIcon = (categoryName: string) => {
        const category = categories.find((cat) => cat.name === categoryName);
        return category ? category.icon : HelpCircle;
    };

    const getCategoryColor = (categoryName: string) => {
        const category = categories.find((cat) => cat.name === categoryName);
        return category ? category.color : 'bg-blue-500';
    };

    return (
        <div className="min-h-screen bg-white">
            <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50">
                {/* Hero Section */}
                <section ref={heroRef} className="py-20 px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
                            <HelpCircle className="w-8 h-8 text-blue-600" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Frequently Asked Questions
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                            {`Find answers to common questions about MediDirect.
                            Can't find what you're looking for?`}
                            <Link
                                href="/contact"
                                className="text-blue-600 hover:text-blue-700"
                            >
                                Contact our support team
                            </Link>
                            .
                        </p>

                        {/* Search Bar */}
                        <div className="relative max-w-2xl mx-auto">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <Input
                                type="text"
                                placeholder="Search questions, answers, or topics..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0"
                            />
                        </div>
                    </div>
                </section>

                {/* Category Filter */}
                <section
                    ref={categoriesRef}
                    className="py-8 px-4 border-b border-gray-200"
                >
                    <div className="max-w-6xl mx-auto">
                        <div className="flex flex-wrap gap-3 justify-center">
                            {categories.map((category) => {
                                const Icon = category.icon;
                                const isActive =
                                    selectedCategory === category.name;
                                return (
                                    <Button
                                        key={category.name}
                                        variant={
                                            isActive ? 'default' : 'outline'
                                        }
                                        onClick={() =>
                                            setSelectedCategory(category.name)
                                        }
                                        className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                                            isActive
                                                ? `${category.color} text-white hover:opacity-90`
                                                : 'hover:bg-gray-50 border-gray-300'
                                        }`}
                                    >
                                        <Icon className="w-4 h-4" />
                                        {category.name}
                                        <Badge
                                            variant="secondary"
                                            className="ml-1 text-xs"
                                        >
                                            {category.name === 'All'
                                                ? faqData.length
                                                : faqData.filter(
                                                      (faq) =>
                                                          faq.category ===
                                                          category.name,
                                                  ).length}
                                        </Badge>
                                    </Button>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* FAQ Items */}
                <section ref={faqsRef} className="py-12 px-4">
                    <div className="max-w-4xl mx-auto">
                        {filteredFAQs.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Search className="w-8 h-8 text-gray-400" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    No results found
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    Try adjusting your search terms or browse
                                    different categories.
                                </p>
                                <Button
                                    onClick={() => {
                                        setSearchTerm('');
                                        setSelectedCategory('All');
                                    }}
                                    variant="outline"
                                >
                                    Clear filters
                                </Button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {filteredFAQs.map((faq) => {
                                    const isExpanded = expandedItems.has(
                                        faq.id,
                                    );
                                    const CategoryIcon = getCategoryIcon(
                                        faq.category,
                                    );

                                    return (
                                        <Card
                                            key={faq.id}
                                            className="overflow-hidden transition-all duration-300 hover:shadow-lg border-l-4 border-l-blue-500"
                                        >
                                            <CardContent className="p-0">
                                                <button
                                                    onClick={() =>
                                                        toggleExpanded(faq.id)
                                                    }
                                                    className="w-full p-6 text-left hover:bg-gray-50 transition-colors duration-200"
                                                >
                                                    <div className="flex items-start justify-between gap-4">
                                                        <div className="flex-1">
                                                            <div className="flex items-center gap-3 mb-2">
                                                                <div
                                                                    className={`w-8 h-8 ${getCategoryColor(faq.category)} rounded-full flex items-center justify-center`}
                                                                >
                                                                    <CategoryIcon className="w-4 h-4 text-white" />
                                                                </div>
                                                                <Badge
                                                                    variant="secondary"
                                                                    className="text-xs"
                                                                >
                                                                    {
                                                                        faq.category
                                                                    }
                                                                </Badge>
                                                            </div>
                                                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                                                {faq.question}
                                                            </h3>
                                                            <div className="flex flex-wrap gap-2">
                                                                {faq.tags
                                                                    .slice(0, 3)
                                                                    .map(
                                                                        (
                                                                            tag,
                                                                        ) => (
                                                                            <span
                                                                                key={
                                                                                    tag
                                                                                }
                                                                                className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full"
                                                                            >
                                                                                {
                                                                                    tag
                                                                                }
                                                                            </span>
                                                                        ),
                                                                    )}
                                                            </div>
                                                        </div>
                                                        <div className="flex-shrink-0">
                                                            {isExpanded ? (
                                                                <Minus className="w-5 h-5 text-gray-500" />
                                                            ) : (
                                                                <Plus className="w-5 h-5 text-gray-500" />
                                                            )}
                                                        </div>
                                                    </div>
                                                </button>

                                                {isExpanded && (
                                                    <div className="px-6 pb-6 border-t border-gray-100">
                                                        <div className="pt-4">
                                                            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                                                {faq.answer}
                                                            </p>
                                                        </div>
                                                    </div>
                                                )}
                                            </CardContent>
                                        </Card>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </section>

                {/* Contact Support Section */}
                <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                            <h2 className="text-3xl font-bold text-white mb-4">
                                Still have questions?
                            </h2>
                            <p className="text-blue-100 mb-6 text-lg">
                                {`Our support team is here to help you 24/7. Get
                                in touch and we'll respond within minutes.`}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button
                                    size="lg"
                                    className="bg-white text-blue-600 hover:bg-blue-50 font-semibold"
                                    onClick={() =>
                                        (window.location.href = '/contact')
                                    }
                                >
                                    <Phone className="w-5 h-5 mr-2" />
                                    Contact Support
                                </Button>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="border-white text-white hover:bg-white/10 bg-transparent"
                                    onClick={() =>
                                        window.open(
                                            'mailto:support@medidirect.ng',
                                        )
                                    }
                                >
                                    Email Us
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
