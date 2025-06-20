import Link from "next/link"
import { Phone, Mail, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">MD</span>
              </div>
              <span className="text-xl font-bold">MediDirect</span>
            </div>
            <p className="text-gray-400 mb-4">Connecting patients to quality diagnostic services across Lagos.</p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+234 800 MEDI DIRECT</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>hello@medidirect.ng</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Lagos, Nigeria</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">For Patients</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/search" className="hover:text-white">
                  Find Centres
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-white">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-white">
                  My Dashboard
                </Link>
              </li>
              <li>
                <Link href="/support" className="hover:text-white">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">For Centres</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/for-centres" className="hover:text-white">
                  Join MediDirect
                </Link>
              </li>
              <li>
                <Link href="/centre-dashboard" className="hover:text-white">
                  Centre Dashboard
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-white">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/resources" className="hover:text-white">
                  Resources
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/about" className="hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2024 MediDirect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
