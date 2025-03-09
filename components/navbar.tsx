"use client"

import Link from "next/link"
import { useState } from "react"
import { ModeToggle } from "@/components/mode-toggle"
import Image from "next/image"

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <nav className="neon-navbar sticky top-0 z-50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Oregano1-U7axibsYQDXo1ua1aflRL7Wn3cHtmu.png"
              alt="Oregano Logo"
              width={40}
              height={40}
              className="hover:scale-110 transition-transform duration-200"
            />
            <span className="text-2xl font-bold text-[#2fff00] drop-shadow-[0_0_0.3rem_#2fff00]">Oregano</span>
          </Link>
          <div className="flex items-center space-x-6">
            <Link href="/about" className="text-[#2fff00] hover:text-white transition-colors">
              About Us
            </Link>
            <Link href="/vision" className="text-[#2fff00] hover:text-white transition-colors">
              Our Vision
            </Link>
            <Link href="/contact" className="text-[#2fff00] hover:text-white transition-colors">
              Contact Us
            </Link>
            <Link href="/login" className="text-[#2fff00] hover:text-white transition-colors">
              {isLoggedIn ? "Logout" : "Login"}
            </Link>
            <ModeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
}

