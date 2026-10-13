"use client";

import React from "react";
import Image from "next/image";
import { PROJECT_DETAILS } from "@/data/project";
import Reveal from "./Reveal";
import MarqueeBanner from "./MarqueeBanner";
import { Phone, Mail, MapPin, MessageSquare, ArrowUp, Building, Sparkles } from "lucide-react";

export default function ContactFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { label: "Overview", href: "#overview" },
    { label: "Location", href: "#location" },
    { label: "Offices", href: "#offices" },
    { label: "Specifications", href: "#specifications" },
    { label: "Amenities", href: "#amenities" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <footer
      id="contact"
      className="bg-charcoal-950 text-white relative border-t border-charcoal-800 overflow-hidden"
      aria-label="Footer and Developer Contact Information"
    >
      {/* Top Footer Marquee Ribbon */}
      <MarqueeBanner />

      {/* Upper Footer: Contact Channels & Developer Profile */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Column 1: Developer Branding & Track Record - Left to Right Reveal */}
          <div className="lg:col-span-5 space-y-6">
            <Reveal direction="left" distance={45} delay={100}>
              <div className="space-y-4">
                <div className="relative h-9 w-32">
                  <Image
                    src={PROJECT_DETAILS.profileLogoLight}
                    alt="Profile Developer Logo"
                    fill
                    className="object-contain object-left"
                  />
                </div>

                <div className="pt-2">
                  <span className="font-serif text-2xl font-normal text-ivory-50 tracking-wide block">
                    THE OPUS 1
                  </span>
                  <span className="text-xs font-mono uppercase tracking-widest text-gold block">
                    JM Road&apos;s New Business Hub
                  </span>
                </div>
              </div>
            </Reveal>

            <Reveal direction="left" distance={40} delay={200}>
              <p className="text-xs sm:text-sm text-ivory-300 font-light leading-relaxed max-w-sm">
                &ldquo;What sets us apart is our dedication to being particular in
                every decision we make. We meticulously plan every detail, from
                project locations to layouts, to provide you with the finest
                spaces.&rdquo;
              </p>
            </Reveal>

            {/* Verified Developer Portfolio Metric from brochure page 8 */}
            <Reveal direction="left" distance={40} delay={300}>
              <div className="p-4 bg-charcoal-900 border border-charcoal-800 rounded-sm hover:border-gold/40 transition-colors group card-hover-modern">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-gold" />
                  <div className="text-2xl font-serif font-normal text-gold">
                    3 MILLION SQ.FT
                  </div>
                </div>
                <div className="text-[10px] font-mono tracking-widest uppercase text-ivory-300 mt-1">
                  Delivered, Ongoing &amp; Upcoming Portfolio Across Pune
                </div>
              </div>
            </Reveal>
          </div>

          {/* Column 2: Site & Corporate Addresses */}
          <div className="lg:col-span-4 space-y-6">
            <Reveal direction="up" distance={35} delay={150}>
              <h3 className="text-xs font-mono uppercase tracking-widest text-gold font-semibold">
                Project &amp; Corporate Locations
              </h3>
            </Reveal>

            {/* Site Address */}
            <Reveal direction="up" distance={30} delay={220}>
              <div className="space-y-1.5 p-4 bg-charcoal-900/60 rounded-sm border border-charcoal-800 hover:border-gold/30 transition-colors">
                <div className="flex items-center space-x-2 text-xs font-mono text-ivory-200">
                  <MapPin className="w-3.5 h-3.5 text-gold shrink-0" />
                  <span className="uppercase font-semibold">Site Address</span>
                </div>
                <p className="text-xs sm:text-sm text-ivory-300 font-light leading-relaxed pl-5.5">
                  {PROJECT_DETAILS.address}
                </p>
              </div>
            </Reveal>

            {/* Corporate Office */}
            <Reveal direction="up" distance={30} delay={300}>
              <div className="space-y-1.5 p-4 bg-charcoal-900/60 rounded-sm border border-charcoal-800 hover:border-gold/30 transition-colors">
                <div className="flex items-center space-x-2 text-xs font-mono text-ivory-200">
                  <Building className="w-3.5 h-3.5 text-gold shrink-0" />
                  <span className="uppercase font-semibold">Corporate Office</span>
                </div>
                <p className="text-xs sm:text-sm text-ivory-300 font-light leading-relaxed pl-5.5">
                  {PROJECT_DETAILS.corporateOffice}
                </p>
              </div>
            </Reveal>
          </div>

          {/* Column 3: Direct Connect & Quick Links - Slides in from Right */}
          <div className="lg:col-span-3 space-y-6">
            <Reveal direction="right" distance={45} delay={150}>
              <h3 className="text-xs font-mono uppercase tracking-widest text-gold font-semibold">
                Direct Contact
              </h3>
            </Reveal>

            <div className="space-y-3">
              <Reveal direction="right" distance={40} delay={220}>
                <a
                  href={`tel:${PROJECT_DETAILS.phoneRaw}`}
                  className="flex items-center space-x-3 p-3 bg-charcoal-900 hover:bg-charcoal-800 border border-charcoal-800 hover:border-gold/60 rounded-sm transition-all group card-hover-modern"
                >
                  <div className="p-2 bg-charcoal-800 group-hover:bg-gold text-gold group-hover:text-charcoal-950 rounded-xs transition-colors">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-mono text-charcoal-400">
                      Telephone
                    </span>
                    <span className="text-xs font-mono font-medium text-white group-hover:text-gold transition-colors">
                      {PROJECT_DETAILS.phone}
                    </span>
                  </div>
                </a>
              </Reveal>

              <Reveal direction="right" distance={40} delay={300}>
                <a
                  href={`mailto:${PROJECT_DETAILS.email}`}
                  className="flex items-center space-x-3 p-3 bg-charcoal-900 hover:bg-charcoal-800 border border-charcoal-800 hover:border-gold/60 rounded-sm transition-all group card-hover-modern"
                >
                  <div className="p-2 bg-charcoal-800 group-hover:bg-gold text-gold group-hover:text-charcoal-950 rounded-xs transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-mono text-charcoal-400">
                      Email Desk
                    </span>
                    <span className="text-xs font-mono font-medium text-white group-hover:text-gold transition-colors">
                      {PROJECT_DETAILS.email}
                    </span>
                  </div>
                </a>
              </Reveal>

              <Reveal direction="right" distance={40} delay={380}>
                <a
                  href={PROJECT_DETAILS.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-3 bg-charcoal-900 hover:bg-charcoal-800 border border-charcoal-800 hover:border-emerald-500/60 rounded-sm transition-all group card-hover-modern"
                >
                  <div className="p-2 bg-charcoal-800 group-hover:bg-emerald-600 text-emerald-400 group-hover:text-white rounded-xs transition-colors">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-mono text-charcoal-400">
                      WhatsApp Chat
                    </span>
                    <span className="text-xs font-medium text-white group-hover:text-emerald-300 transition-colors">
                      Instant Sales Assistance
                    </span>
                  </div>
                </a>
              </Reveal>
            </div>
          </div>
        </div>

        {/* Navigation Bar */}
        <Reveal direction="up" distance={20} delay={420}>
          <div className="mt-14 pt-8 border-t border-charcoal-800/80 flex flex-wrap items-center justify-between gap-4">
            <nav className="flex flex-wrap items-center gap-6 text-xs font-mono uppercase tracking-wider text-charcoal-400">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="hover:text-gold transition-colors relative group py-1"
                >
                  <span>{link.label}</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </nav>

            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center space-x-2 text-xs font-mono text-charcoal-400 hover:text-gold transition-colors p-1 group"
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 text-gold group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </Reveal>
      </div>

      {/* Bottom Legal Band */}
      <div className="bg-charcoal-950 border-t border-charcoal-900 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-[11px] text-charcoal-500 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="leading-relaxed text-center md:text-left">
            &copy; {new Date().getFullYear()} The Opus 1 by Profile. All rights
            reserved. Information presented is compiled from official brochure
            specifications.
          </p>

          <div className="flex items-center space-x-4 text-[10px] font-mono text-charcoal-600">
            <span>Commercial Office Property</span>
            <span>•</span>
            <span>Shivajinagar, Pune 411005</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
