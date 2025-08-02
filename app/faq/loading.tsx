import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function FAQLoading() {
    return (
        <div className="min-h-screen bg-white">
            <Header />

            <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50">
                {/* Hero Section Skeleton */}
                <section className="py-20 px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <Skeleton className="w-16 h-16 rounded-full mx-auto mb-6" />
                        <Skeleton className="h-12 w-96 mx-auto mb-6" />
                        <Skeleton className="h-6 w-80 mx-auto mb-8" />
                        <Skeleton className="h-12 w-full max-w-2xl mx-auto rounded-xl" />
                    </div>
                </section>

                {/* Category Filter Skeleton */}
                <section className="py-8 px-4 border-b border-gray-200">
                    <div className="max-w-6xl mx-auto">
                        <div className="flex flex-wrap gap-3 justify-center">
                            {Array.from({ length: 9 }).map((_, index) => (
                                <Skeleton
                                    key={index}
                                    className="h-10 w-32 rounded-full"
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQ Items Skeleton */}
                <section className="py-12 px-4">
                    <div className="max-w-4xl mx-auto space-y-4">
                        {Array.from({ length: 8 }).map((_, index) => (
                            <Card
                                key={index}
                                className="border-l-4 border-l-blue-500"
                            >
                                <CardContent className="p-6">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <Skeleton className="w-8 h-8 rounded-full" />
                                                <Skeleton className="h-5 w-20 rounded-full" />
                                            </div>
                                            <Skeleton className="h-6 w-full mb-2" />
                                            <div className="flex gap-2">
                                                <Skeleton className="h-5 w-16 rounded-full" />
                                                <Skeleton className="h-5 w-20 rounded-full" />
                                                <Skeleton className="h-5 w-14 rounded-full" />
                                            </div>
                                        </div>
                                        <Skeleton className="w-5 h-5 flex-shrink-0" />
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* Contact Support Section Skeleton */}
                <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                            <Skeleton className="h-8 w-64 mx-auto mb-4 bg-white/20" />
                            <Skeleton className="h-6 w-96 mx-auto mb-6 bg-white/20" />
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Skeleton className="h-12 w-40 bg-white/20" />
                                <Skeleton className="h-12 w-32 bg-white/20" />
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <Footer />
        </div>
    );
}
