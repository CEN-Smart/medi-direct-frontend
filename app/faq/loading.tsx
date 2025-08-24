import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function FAQLoading() {
    return (
        <div className="bg-white min-h-screen">
            <Header />

            <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50">
                {/* Hero Section Skeleton */}
                <section className="px-4 py-20">
                    <div className="mx-auto max-w-4xl text-center">
                        <Skeleton className="mx-auto mb-6 rounded-full w-16 h-16" />
                        <Skeleton className="mx-auto mb-6 w-96 h-12" />
                        <Skeleton className="mx-auto mb-8 w-80 h-6" />
                        <Skeleton className="mx-auto rounded-xl w-full max-w-2xl h-12" />
                    </div>
                </section>

                {/* Category Filter Skeleton */}
                <section className="px-4 py-8 border-gray-200 border-b">
                    <div className="mx-auto max-w-6xl">
                        <div className="flex flex-wrap justify-center gap-3">
                            {Array.from({ length: 9 }).map((_, index) => (
                                <Skeleton
                                    key={index}
                                    className="rounded-full w-32 h-10"
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQ Items Skeleton */}
                <section className="px-4 py-12">
                    <div className="space-y-4 mx-auto max-w-4xl">
                        {Array.from({ length: 8 }).map((_, index) => (
                            <Card
                                key={index}
                                className="border-l-4 border-l-blue-500"
                            >
                                <CardContent className="p-6">
                                    <div className="flex justify-between items-start gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <Skeleton className="rounded-full w-8 h-8" />
                                                <Skeleton className="rounded-full w-20 h-5" />
                                            </div>
                                            <Skeleton className="mb-2 w-full h-6" />
                                            <div className="flex gap-2">
                                                <Skeleton className="rounded-full w-16 h-5" />
                                                <Skeleton className="rounded-full w-20 h-5" />
                                                <Skeleton className="rounded-full w-14 h-5" />
                                            </div>
                                        </div>
                                        <Skeleton className="flex-shrink-0 w-5 h-5" />
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* Contact Support Section Skeleton */}
                <section className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-16">
                    <div className="mx-auto max-w-4xl text-center">
                        <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl">
                            <Skeleton className="bg-white/20 mx-auto mb-4 w-64 h-8" />
                            <Skeleton className="bg-white/20 mx-auto mb-6 w-96 h-6" />
                            <div className="flex sm:flex-row flex-col justify-center gap-4">
                                <Skeleton className="bg-white/20 w-40 h-12" />
                                <Skeleton className="bg-white/20 w-32 h-12" />
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <Footer />
        </div>
    );
}
