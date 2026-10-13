"use client";

import React, { useState } from "react";
import Image from "next/image";
import { AMENITIES, PROJECT_DETAILS } from "@/data/project";
import LightboxModal from "./LightboxModal";
import Reveal from "./Reveal";
import {
  ArrowUpDown,
  Building2,
  Bath,
  Maximize2,
  CreditCard,
  ShieldCheck,
  Leaf,
  Accessibility,
  Eye,
  Sparkles,
} from "lucide-react";

export default function Amenities() {
  const [isArtworkOpen, setIsArtworkOpen] = useState(false);

  // Map icon name to Lucide Icon
  const getIcon = (name: string) => {
    switch (name) {
      case "ArrowUpDown":
        return ArrowUpDown;
      case "Building2":
        return Building2;
      case "Bath":
        return Bath;
      case "Maximize2":
        return Maximize2;
      case "CreditCard":
        return CreditCard;
      case "ShieldCheck":
        return ShieldCheck;
      case "Leaf":
        return Leaf;
      case "Accessibility":
        return Accessibility;
      default:
        return Building2;
    }
  };

  return (
    <section
      id="amenities"
      className="py-20 sm:py-28 bg-ivory text-charcoal relative"
      aria-label="Commercial Amenities"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            <Reveal direction="left" distance={40} delay={50}>
              <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-gold-dark font-semibold mb-3">
                <span className="w-8 h-px bg-gold-dark" />
                <span>Infrastructure &amp; Services</span>
              </div>
            </Reveal>

            <Reveal direction="left" distance={50} delay={150}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-charcoal-950 font-normal tracking-tight">
                The Opulence <br />
                <span className="italic">of The Opus.</span>
              </h2>
            </Reveal>

            <Reveal direction="left" distance={40} delay={250}>
              <p className="mt-4 text-sm sm:text-base text-charcoal-600 font-light leading-relaxed">
                &ldquo;An array of amenities and services await you.&rdquo; Built to
                the highest commercial engineering specifications, catering to
                productive modern enterprises.
              </p>
            </Reveal>
          </div>

          <Reveal direction="right" distance={40} delay={200}>
            <button
              type="button"
              onClick={() => setIsArtworkOpen(true)}
              className="inline-flex items-center space-x-2 px-5 py-3 text-xs font-semibold tracking-wider uppercase bg-white border border-ivory-300 hover:border-gold hover:text-gold-dark text-charcoal-800 rounded-sm shadow-sm hover:shadow-md transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-gold"
            >
              <Eye className="w-4 h-4 text-gold-dark" />
              <span>Enlarge Brochure Plate</span>
            </button>
          </Reveal>
        </div>

        {/* Main Content: Split Showcase featuring Official Amenities Artwork */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Official Brochure Amenities Artwork Card (Sticky Pin on Page Scroll) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 self-start">
            <Reveal direction="left" distance={40} delay={100}>
              <div
                onClick={() => setIsArtworkOpen(true)}
                className="group relative bg-charcoal-950 rounded-sm p-5 sm:p-6 border border-charcoal-800 hover:border-gold/80 transition-all duration-300 shadow-xl hover:shadow-2xl cursor-pointer overflow-hidden"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") setIsArtworkOpen(true);
                }}
                aria-label="Enlarge Comprehensive Commercial Amenities plate"
              >
                {/* Expanding Top Gold Accent */}
                <div className="h-0.5 w-full bg-gradient-to-r from-gold via-gold-300 to-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left absolute top-0 left-0" />

                {/* Top Badge & Enlarge Icon */}
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-black/60 border border-gold/60 text-gold text-[10px] sm:text-[11px] font-mono tracking-widest uppercase rounded-xs">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Amenities Plate</span>
                  </span>

                  <div className="p-1.5 bg-white/10 hover:bg-white/20 text-white rounded-xs border border-white/20 transition-colors">
                    <Maximize2 className="w-3.5 h-3.5 text-gold" />
                  </div>
                </div>

                {/* The Genuine Brochure Image */}
                <div className="relative w-full aspect-square rounded-sm overflow-hidden bg-black flex items-center justify-center my-2">
                  <Image
                    src={PROJECT_DETAILS.amenitiesImage}
                    alt="Comprehensive Commercial Amenities Plate"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-contain group-hover:scale-105 transition-transform duration-700 ease-out"
                    priority
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                </div>

                {/* Card Editorial Info */}
                <div className="mt-4 pt-3 border-t border-charcoal-800/80 space-y-1.5">
                  <h3 className="font-serif text-lg sm:text-xl text-ivory-50 group-hover:text-gold transition-colors font-medium">
                    Comprehensive Commercial Amenities
                  </h3>
                  <p className="text-xs text-ivory-300/80 font-light leading-relaxed">
                    Brochure amenities artwork showcasing the 8 core operational advantages of The Opus 1 commercial campus.
                  </p>
                  <p className="text-[11px] font-mono text-gold/80 pt-1 flex items-center space-x-1">
                    <span>Click anywhere on card to enlarge</span>
                    <span>↗</span>
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: 8 Amenities Specifications Grid (Auto-scrolls as Website Scrolls) */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {AMENITIES.map((item, idx) => {
                const Icon = getIcon(item.iconName);
                return (
                  <div
                    key={item.id}
                    className="p-5 sm:p-5.5 bg-white rounded-sm border border-ivory-300 hover:border-gold/80 transition-all duration-300 shadow-sm hover:shadow-lg flex flex-col justify-between group card-hover-gold w-full relative overflow-hidden"
                  >
                    <div className="h-0.5 w-full bg-gradient-to-r from-gold via-gold-300 to-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left absolute top-0 left-0" />
                    <div>
                      <div className="flex items-center justify-between mb-3.5">
                        <div className="p-2.5 bg-ivory-100 text-gold-dark group-hover:bg-gold group-hover:text-charcoal-950 rounded-sm transition-all duration-300 border border-ivory-200 group-hover:rotate-3 shadow-xs">
                          <Icon className="w-4.5 h-4.5" />
                        </div>
                        <span className="text-xs font-mono text-charcoal-400">
                          0{idx + 1}
                        </span>
                      </div>

                      <h4 className="text-base font-serif font-medium text-charcoal-900 group-hover:text-gold-dark transition-colors mb-1.5 leading-snug">
                        {item.title}
                      </h4>
                      <p className="text-xs text-charcoal-600 leading-relaxed font-light">
                        {item.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-ivory-100 flex items-center justify-between text-[10px] font-mono text-gold-dark">
                      <span>Brochure Certified</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-gold group-hover:scale-125 transition-transform" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Brochure Verification Bottom Strip */}
        <Reveal direction="up" distance={25} delay={400}>
          <div className="mt-12 p-5 sm:p-6 bg-sand-light rounded-sm border border-sand-dark/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
            <div className="flex items-center space-x-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse shrink-0" />
              <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed font-light">
                <strong className="font-semibold text-charcoal-900">Verified Commercial Scope:</strong> All 8 commercial amenities reflect official Profile The Opus 1 sanctioned specifications, including IGBC Green standards and private executive washrooms.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsArtworkOpen(true)}
              className="shrink-0 text-xs font-mono uppercase tracking-wider text-gold-dark hover:underline font-semibold"
            >
              Inspect Plate &rarr;
            </button>
          </div>
        </Reveal>
      </div>

      {/* Lightbox for Amenities Brochure Artwork */}
      <LightboxModal
        isOpen={isArtworkOpen}
        onClose={() => setIsArtworkOpen(false)}
        media={{
          src: PROJECT_DETAILS.amenitiesImage,
          title: "The Opulence of The Opus — Brochure Amenities Plate",
          category: "Official Amenities Certification",
          caption:
            "Original graphic plate from page 7 of the developer brochure displaying all eight key commercial infrastructure attributes.",
        }}
      />
    </section>
  );
}
