"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { PROJECT_DETAILS } from "@/data/project";
import { Menu, X, Phone, ArrowUpRight } from "lucide-react";

interface NavbarProps {
  onEnquireClick?: () => void;
}

export default function Navbar({ onEnquireClick }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: "Overview", href: "#overview" },
    { label: "Location", href: "#location" },
    { label: "Offices", href: "#offices" },
    { label: "Specifications", href: "#specifications" },
    { label: "Amenities", href: "#amenities" },
    { label: "Contact", href: "#contact" },
  ];

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleEnquireAction = () => {
    setMobileMenuOpen(false);
    if (onEnquireClick) {
      onEnquireClick();
    } else {
      const contactSection = document.getElementById("enquire");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200/80 py-3.5"
            : "bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/60 py-4 sm:py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left: Developer Logo & Project Name */}
            <a
              href="#overview"
              onClick={(e) => handleNavClick(e, "#overview")}
              className="flex items-center space-x-3.5 sm:space-x-5 group focus:outline-none focus:ring-2 focus:ring-gold rounded-sm"
              aria-label="The Opus 1 by Profile Home"
            >
              {/* Profile Logo Mark */}
              <div className="relative h-7 w-24 sm:h-8 sm:w-28 transition-transform duration-200 group-hover:opacity-90">
                <Image
                  src={PROJECT_DETAILS.profileLogoDark}
                  alt="Profile Developer Brand"
                  fill
                  className="object-contain object-left"
                  priority
                />
              </div>

              {/* Vertical Divider */}
              <span
                className="h-5 w-px bg-slate-300"
                aria-hidden="true"
              />

              {/* Project Wordmark */}
              <div className="flex flex-col">
                <span className="font-serif tracking-wider font-semibold text-base sm:text-lg text-charcoal-900 group-hover:text-charcoal transition-colors">
                  THE OPUS 1
                </span>
                <span className="text-[9px] tracking-widest uppercase text-slate-500 font-medium">
                  Shivajinagar, Pune
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav
              className="hidden lg:flex items-center space-x-7"
              aria-label="Main Navigation"
            >
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-xs font-semibold uppercase tracking-widest py-1 transition-colors relative group focus:outline-none focus:text-gold-600 text-charcoal-700 hover:text-gold-600"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold transition-all duration-200 group-hover:w-full" />
                </a>
              ))}
            </nav>

            {/* Right: CTA & Contact */}
            <div className="hidden sm:flex items-center space-x-4">
              <a
                href={`tel:${PROJECT_DETAILS.phoneRaw}`}
                className="text-xs font-medium flex items-center space-x-1.5 transition-colors text-charcoal-700 hover:text-gold-600"
                aria-label={`Call ${PROJECT_DETAILS.phone}`}
              >
                <Phone className="w-3.5 h-3.5 text-gold-600" />
                <span className="hidden xl:inline">{PROJECT_DETAILS.phone}</span>
              </a>

              <button
                type="button"
                onClick={handleEnquireAction}
                className="group relative inline-flex items-center space-x-2 px-5 py-2.5 text-xs font-semibold tracking-wider uppercase text-charcoal-950 bg-gold hover:bg-gold-400 active:bg-gold-500 rounded-sm transition-all shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold overflow-hidden"
              >
                <span className="relative z-10">Enquire Now</span>
                <ArrowUpRight className="w-3.5 h-3.5 relative z-10 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
              </button>
            </div>

            {/* Mobile Menu Hamburger Toggle */}
            <div className="flex items-center space-x-2 lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-gold text-charcoal-800 hover:text-charcoal-950 hover:bg-slate-100 transition-colors"
                aria-expanded={mobileMenuOpen}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden flex flex-col bg-white text-charcoal-900 animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
        >
          {/* Mobile Header Bar */}
          <div className="flex items-center justify-between p-5 border-b border-slate-200 bg-white">
            <div className="flex items-center space-x-3">
              <div className="relative h-7 w-24">
                <Image
                  src={PROJECT_DETAILS.profileLogoDark}
                  alt="Profile Developer Brand"
                  fill
                  className="object-contain object-left"
                />
              </div>
              <span className="h-4 w-px bg-slate-300" />
              <span className="font-serif tracking-wider font-semibold text-base text-charcoal-900">
                THE OPUS 1
              </span>
            </div>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-charcoal-600 hover:text-charcoal-950 hover:bg-slate-100 rounded-sm focus:outline-none focus:ring-2 focus:ring-gold transition-colors"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 overflow-y-auto px-6 py-8 space-y-6 bg-white">
            <div className="space-y-4">
              {navLinks.map((link, idx) => (
                <div key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="block text-2xl font-serif tracking-wide text-charcoal-900 hover:text-gold-600 transition-colors py-1"
                  >
                    <span className="text-xs font-mono text-gold-600 mr-3">
                      0{idx + 1}
                    </span>
                    {link.label}
                  </a>
                  <div className="h-px bg-slate-100 mt-3" />
                </div>
              ))}
            </div>

            <div className="pt-6 space-y-4">
              <p className="text-xs uppercase tracking-widest text-gold-600 font-semibold">
                Direct Contact
              </p>
              <a
                href={`tel:${PROJECT_DETAILS.phoneRaw}`}
                className="flex items-center space-x-3 text-sm text-charcoal-700 hover:text-charcoal-950 font-medium"
              >
                <Phone className="w-4 h-4 text-gold-600" />
                <span>{PROJECT_DETAILS.phone}</span>
              </a>
              <p className="text-xs text-charcoal-500 leading-relaxed">
                {PROJECT_DETAILS.address}
              </p>
            </div>
          </div>

          {/* Mobile Drawer Bottom Action */}
          <div className="p-6 border-t border-slate-200 bg-slate-50">
            <button
              type="button"
              onClick={handleEnquireAction}
              className="w-full flex items-center justify-center space-x-2 py-3.5 text-xs font-bold tracking-widest uppercase bg-gold text-charcoal-950 rounded-sm hover:bg-gold-400 transition-all shadow-md"
            >
              <span>Enquire Now</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
