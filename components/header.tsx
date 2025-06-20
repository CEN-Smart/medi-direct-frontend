"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">MD</span>
            </div>
            <span className="text-xl font-bold text-gray-900">MediDirect</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/search" className="text-gray-600 hover:text-blue-600 transition-colors">
              Find Centres
            </Link>
            <Link href="/how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors">
              How It Works
            </Link>
            <Link href="/for-centres" className="text-gray-600 hover:text-blue-600 transition-colors">
              For Centres
            </Link>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                <User className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button size="sm">Login</Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="sm">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <div className="flex flex-col space-y-4 mt-8">
                <Link href="/search" className="text-lg font-medium">
                  Find Centres
                </Link>
                <Link href="/how-it-works" className="text-lg font-medium">
                  How It Works
                </Link>
                <Link href="/for-centres" className="text-lg font-medium">
                  For Centres
                </Link>
                <hr />
                <Link href="/dashboard" className="text-lg font-medium">
                  Dashboard
                </Link>
                <Link href="/auth/login">
                  <Button className="w-full">Login</Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
