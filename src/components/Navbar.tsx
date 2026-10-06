"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SvuLogo } from "./Logos";
import { Menu, X, ArrowRight } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#FFF9EE]/95 backdrop-blur-md border-b border-[#FFE9C2] transition-all">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-24 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center group">
          <SvuLogo />
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-[#0C1230]">
          <Link
            href="#students"
            className="hover:text-[#1F45D6] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-[#1F45D6] after:transition-all"
          >
            Students
          </Link>
          <Link
            href="#employers"
            className="hover:text-[#1F45D6] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-[#1F45D6] after:transition-all"
          >
            Employers
          </Link>
          <Link
            href="#career-centers"
            className="hover:text-[#1F45D6] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-[#1F45D6] after:transition-all"
          >
            Career Centers
          </Link>
          <Link
            href="#contact"
            className="hover:text-[#1F45D6] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-[#1F45D6] after:transition-all"
          >
            Contact Us
          </Link>
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex items-center justify-center bg-[#001546] hover:bg-[#002270] text-white font-medium text-sm px-6 py-2 rounded-full transition-all shadow-sm active:scale-95"
            aria-label="Toggle navigation menu"
          >
            Menu
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#FFE9C2] bg-[#FFF9EE] px-6 py-6 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-4">
            <Link
              href="#students"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-[#0C1230] hover:text-[#1F45D6] py-2 border-b border-[#FFE9C2]/60 flex items-center justify-between"
            >
              <span>Students</span>
              <ArrowRight className="w-4 h-4 text-[#5A6382]" />
            </Link>
            <Link
              href="#employers"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-[#0C1230] hover:text-[#1F45D6] py-2 border-b border-[#FFE9C2]/60 flex items-center justify-between"
            >
              <span>Employers</span>
              <ArrowRight className="w-4 h-4 text-[#5A6382]" />
            </Link>
            <Link
              href="#career-centers"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-[#0C1230] hover:text-[#1F45D6] py-2 border-b border-[#FFE9C2]/60 flex items-center justify-between"
            >
              <span>Career Centers</span>
              <ArrowRight className="w-4 h-4 text-[#5A6382]" />
            </Link>
            <Link
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-[#0C1230] hover:text-[#1F45D6] py-2 flex items-center justify-between"
            >
              <span>Contact Us</span>
              <ArrowRight className="w-4 h-4 text-[#5A6382]" />
            </Link>
            <div className="pt-4 flex flex-col gap-2.5">
              <button className="w-full bg-[#1F45D6] text-white font-medium text-sm py-3 rounded-full hover:bg-[#1a3cb8] transition shadow-sm">
                Sign In
              </button>
              <button className="w-full bg-[#FFB21A] text-[#001546] font-bold text-sm py-3 rounded-full hover:bg-[#ffc247] transition shadow-sm">
                Sign Up as Student
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
