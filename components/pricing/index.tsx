'use client';

import Link from 'next/link';

import { useEffect, useRef, useState } from 'react';

import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { animations } from '@/lib/animations';
import {
    ArrowRight,
    Calculator,
    Check,
    Crown,
    Shield,
    Star,
    TrendingUp,
    Zap,
} from 'lucide-react';

export function Pricing() {
    const heroRef = useRef<HTMLDivElement>(null);
    const plansRef = useRef<HTMLDivElement>(null);
    const featuresRef = useRef<HTMLDivElement>(null);
    const [isAnnual, setIsAnnual] = useState(false);

    useEffect(() => {
        if (heroRef.current) animations.pageEnter(heroRef.current);
        if (plansRef.current) animations.fadeInOnScroll(plansRef.current);
        if (featuresRef.current) animations.fadeInOnScroll(featuresRef.current);
    }, []);

    const plans = [
        {
            name: 'Starter',
            icon: Zap,
            description: 'Perfect for small diagnostic centres getting started',
            monthlyPrice: 25000,
            annualPrice: 250000,
            features: [
                'Up to 100 bookings per month',
                'Basic profile listing',
                'Email support',
                'Mobile app access',
                'Basic analytics',
                'Payment processing',
                'Customer reviews',
                'Standard listing priority',
            ],
            popular: false,
            color: 'blue',
        },
        {
            name: 'Professional',
            icon: Star,
            description: 'Ideal for growing centres with multiple services',
            monthlyPrice: 50000,
            annualPrice: 500000,
            features: [
                'Up to 500 bookings per month',
                'Enhanced profile with photos',
                'Priority email & phone support',
                'Advanced analytics dashboard',
                'Custom booking forms',
                'Automated reminders',
                'Marketing tools',
                'Higher listing priority',
                'Multi-location support',
                'Staff management tools',
            ],
            popular: true,
            color: 'green',
        },
        {
            name: 'Enterprise',
            icon: Crown,
            description: 'For large healthcare networks and hospital chains',
            monthlyPrice: 100000,
            annualPrice: 1000000,
            features: [
                'Unlimited bookings',
                'Premium profile customization',
                '24/7 dedicated support',
                'Advanced reporting & insights',
                'API access',
                'White-label options',
                'Custom integrations',
                'Top listing priority',
                'Multi-location management',
                'Advanced staff tools',
                'Custom onboarding',
                'Account manager',
            ],
            popular: false,
            color: 'purple',
        },
    ];

    const additionalServices = [
        {
            name: 'Professional Photography',
            price: '₦15,000',
            description: 'High-quality photos of your facility and equipment',
        },
        {
            name: 'Content Writing',
            price: '₦10,000',
            description:
                'Professional service descriptions and centre profile content',
        },
        {
            name: 'SEO Optimization',
            price: '₦20,000/month',
            description: "Improve your centre's visibility in search results",
        },
        {
            name: 'Social Media Management',
            price: '₦25,000/month',
            description: 'Professional social media presence and marketing',
        },
    ];

    const patientFeatures = [
        'Free account creation and booking',
        'No hidden fees for patients',
        'Secure payment processing',
        '24/7 customer support',
        'Mobile app access',
        'Booking history and reminders',
        'Review and rating system',
        'Insurance integration (coming soon)',
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
                        <Calculator className="w-16 h-16 text-blue-600 mx-auto mb-6" />
                        <h1 className="text-5xl font-bold text-gray-900 mb-6">
                            Simple, Transparent Pricing
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                            Choose the perfect plan for your healthcare centre.
                            No setup fees, no long-term contracts, and you can
                            upgrade or downgrade anytime.
                        </p>

                        {/* Billing Toggle */}
                        <div className="flex items-center justify-center gap-4 mb-8">
                            <span
                                className={`font-medium ${!isAnnual ? 'text-blue-600' : 'text-gray-600'}`}
                            >
                                Monthly
                            </span>
                            <button
                                onClick={() => setIsAnnual(!isAnnual)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                    isAnnual ? 'bg-blue-600' : 'bg-gray-300'
                                }`}
                                aria-label="Toggle billing period"
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                        isAnnual
                                            ? 'translate-x-6'
                                            : 'translate-x-1'
                                    }`}
                                />
                            </button>
                            <span
                                className={`font-medium ${isAnnual ? 'text-blue-600' : 'text-gray-600'}`}
                            >
                                Annual
                            </span>
                            {isAnnual && (
                                <Badge className="bg-green-100 text-green-800">
                                    Save 17%
                                </Badge>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Plans */}
            <section ref={plansRef} className="py-20">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {plans.map((plan, index) => (
                            <Card
                                key={index}
                                className={`relative hover:shadow-xl transition-all duration-300 hover:-translate-y-2 ${
                                    plan.popular
                                        ? 'ring-2 ring-blue-600 scale-105'
                                        : ''
                                }`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                        <Badge className="bg-blue-600 text-white px-4 py-1">
                                            Most Popular
                                        </Badge>
                                    </div>
                                )}

                                <CardHeader className="text-center pb-8">
                                    <plan.icon
                                        className={`w-12 h-12 mx-auto mb-4 ${
                                            plan.color === 'blue'
                                                ? 'text-blue-600'
                                                : plan.color === 'green'
                                                  ? 'text-green-600'
                                                  : 'text-purple-600'
                                        }`}
                                    />
                                    <CardTitle className="text-2xl">
                                        {plan.name}
                                    </CardTitle>
                                    <p className="text-gray-600 mt-2">
                                        {plan.description}
                                    </p>

                                    <div className="mt-6">
                                        <div className="text-4xl font-bold text-gray-900">
                                            ₦
                                            {(isAnnual
                                                ? plan.annualPrice
                                                : plan.monthlyPrice
                                            ).toLocaleString()}
                                        </div>
                                        <div className="text-gray-600">
                                            per {isAnnual ? 'year' : 'month'}
                                        </div>
                                        {isAnnual && (
                                            <div className="text-sm text-green-600 mt-1">
                                                Save ₦
                                                {(
                                                    plan.monthlyPrice * 12 -
                                                    plan.annualPrice
                                                ).toLocaleString()}{' '}
                                                annually
                                            </div>
                                        )}
                                    </div>
                                </CardHeader>

                                <CardContent>
                                    <ul className="space-y-3 mb-8">
                                        {plan.features.map(
                                            (feature, featureIndex) => (
                                                <li
                                                    key={featureIndex}
                                                    className="flex items-start gap-3"
                                                >
                                                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                                    <span className="text-gray-700">
                                                        {feature}
                                                    </span>
                                                </li>
                                            ),
                                        )}
                                    </ul>

                                    <Link href="/for-centres">
                                        <Button
                                            className={`w-full ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                                            variant={
                                                plan.popular
                                                    ? 'default'
                                                    : 'outline'
                                            }
                                        >
                                            Get Started
                                            <ArrowRight className="ml-2 w-4 h-4" />
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Additional Services */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-gray-900 mb-4">
                                Additional Services
                            </h2>
                            <p className="text-xl text-gray-600">
                                Optional add-ons to help your centre stand out
                                and attract more patients
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {additionalServices.map((service, index) => (
                                <Card
                                    key={index}
                                    className="hover:shadow-lg transition-shadow duration-300"
                                >
                                    <CardContent className="p-6">
                                        <div className="flex justify-between items-start mb-3">
                                            <h3 className="text-xl font-bold text-gray-900">
                                                {service.name}
                                            </h3>
                                            <Badge
                                                variant="outline"
                                                className="text-blue-600 border-blue-600"
                                            >
                                                {service.price}
                                            </Badge>
                                        </div>
                                        <p className="text-gray-600">
                                            {service.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Patient Features */}
            <section ref={featuresRef} className="py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-16">
                            <Shield className="w-16 h-16 text-green-600 mx-auto mb-6" />
                            <h2 className="text-4xl font-bold text-gray-900 mb-4">
                                Always Free for Patients
                            </h2>
                            <p className="text-xl text-gray-600">
                                Patients never pay to use MediDirect. Our
                                platform is completely free for healthcare
                                seekers.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            {patientFeatures.map((feature, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-3 p-4 bg-green-50 rounded-lg"
                                >
                                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                                    <span className="text-gray-700">
                                        {feature}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
                            Frequently Asked Questions
                        </h2>

                        <div className="space-y-8">
                            <Card>
                                <CardContent className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                                        How does billing work?
                                    </h3>
                                    <p className="text-gray-600">
                                        {`You're billed monthly or annually based
                                        on your chosen plan. All payments are
                                        processed securely, and you can upgrade,
                                        downgrade, or cancel anytime without
                                        penalties.`}
                                    </p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                                        What happens if I exceed my booking
                                        limit?
                                    </h3>
                                    <p className="text-gray-600">
                                        {`We'll notify you when you're approaching
                                        your limit. You can upgrade your plan
                                        anytime, or we'll automatically suggest
                                        the best plan for your usage.`}
                                    </p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                                        Is there a setup fee?
                                    </h3>
                                    <p className="text-gray-600">
                                        No setup fees, no hidden costs. The
                                        price you see is what you pay. We
                                        believe in transparent, straightforward
                                        pricing.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                                        Can I change plans anytime?
                                    </h3>
                                    <p className="text-gray-600">
                                        {`Yes! You can upgrade or downgrade your
                                        plan at any time. Changes take effect
                                        immediately, and we'll prorate any
                                        billing adjustments.`}
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-blue-600">
                <div className="container mx-auto px-4 text-center">
                    <TrendingUp className="w-16 h-16 text-white mx-auto mb-6" />
                    <h2 className="text-4xl font-bold text-white mb-6">
                        Ready to Grow Your Healthcare Centre?
                    </h2>
                    <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                        Join hundreds of healthcare centres already using
                        MediDirect to connect with more patients and streamline
                        their booking process.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/for-centres">
                            <Button
                                size="lg"
                                variant="secondary"
                                className="group"
                            >
                                Start Free Trial
                                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                        <Link href="/contact">
                            <Button
                                size="lg"
                                variant="outline"
                                className="text-white border-white hover:bg-white hover:text-blue-600 bg-transparent"
                            >
                                Contact Sales
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
