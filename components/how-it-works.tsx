import { Search, Calendar, FileText } from "lucide-react"

const steps = [
  {
    icon: Search,
    title: "Search & Compare",
    description: "Find diagnostic centres near you and compare prices, ratings, and services.",
  },
  {
    icon: Calendar,
    title: "Book Appointment",
    description: "Select your preferred date and time slot, then confirm your booking instantly.",
  },
  {
    icon: FileText,
    title: "Get Results",
    description: "Receive your test results digitally and access them anytime from your dashboard.",
  },
]

export function HowItWorks() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Getting your diagnostic tests done has never been easier
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <step.icon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
