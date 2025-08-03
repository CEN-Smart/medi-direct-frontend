import { FeaturedCentres } from '@/components/featured-centres';
import { HowItWorks } from '@/components/how-it-works';
import { SearchSection } from '@/components/search-section';

export function Home() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="bg-linear-to-br from-blue-50 to-green-50 py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                            Find Diagnostic Services
                            <span className="text-blue-600"> Near You</span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Connect with verified diagnostic centres across
                            Lagos and other states. Compare prices, read
                            reviews, and book appointments instantly.
                        </p>
                    </div>

                    <SearchSection />
                </div>
            </section>

            <HowItWorks />
            <FeaturedCentres />
        </div>
    );
}
