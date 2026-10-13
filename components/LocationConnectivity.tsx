"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CONNECTIVITY_DATA, PROJECT_DETAILS } from "@/data/project";
import LightboxModal from "./LightboxModal";
import Reveal from "./Reveal";
import {
  MapPin,
  ExternalLink,
  Train,
  Home,
  Activity,
  Landmark,
  ShoppingBag,
  Hotel,
  Clock,
  Maximize2,
  Sparkles,
} from "lucide-react";

export default function LocationConnectivity() {
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  const getCategoryIcon = (name: string) => {
    switch (name) {
      case "Train":
        return Train;
      case "Home":
        return Home;
      case "Activity":
        return Activity;
      case "Landmark":
        return Landmark;
      case "ShoppingBag":
        return ShoppingBag;
      case "Hotel":
        return Hotel;
      default:
        return MapPin;
    }
  };

  return (
    <section
      id="location"
      className="py-20 sm:py-28 bg-ivory text-charcoal relative overflow-hidden"
      aria-label="Location and Connectivity"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header: Left-to-Right Reveal */}
        <div className="max-w-3xl mb-16">
          <Reveal direction="left" distance={40} delay={50}>
            <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-gold-dark font-semibold mb-3">
              <span className="w-8 h-px bg-gold-dark" />
              <span>Strategic Setting</span>
            </div>
          </Reveal>

          <Reveal direction="left" distance={50} delay={150}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-charcoal-950 font-normal tracking-tight">
              Connected to the <br />
              <span className="italic">Heart of Pune.</span>
            </h2>
          </Reveal>

          <Reveal direction="left" distance={40} delay={250}>
            <p className="mt-4 text-base text-charcoal-600 font-light leading-relaxed">
              JM Road in Shivajinagar provides an unrivaled commercial
              confluence — uniting Pune&apos;s legal corridors, commercial centers,
              transit interchanges, and premier residential neighborhoods.
            </p>
          </Reveal>
        </div>

        {/* Map & Address Feature Card: Left-to-Right + Right-to-Left Split */}
        <div className="mb-16 bg-white rounded-sm border border-ivory-300 shadow-md overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left: Interactive Brochure Map Visual - Slides in from Left */}
            <div className="lg:col-span-7 relative bg-charcoal-950 min-h-[320px] sm:min-h-[420px] group overflow-hidden">
              <Reveal direction="left" distance={50} delay={200} className="w-full h-full">
                <div className="relative w-full h-[360px] sm:h-[440px]">
                  <Image
                    src={PROJECT_DETAILS.locationMapImage}
                    alt="The Opus 1 JM Road Location Blueprint"
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />
                  <div className="absolute inset-0 bg-charcoal-950/20 group-hover:bg-charcoal-950/0 transition-colors" />

                  {/* Enlarge button overlay */}
                  <button
                    type="button"
                    onClick={() => setIsMapModalOpen(true)}
                    className="absolute bottom-4 right-4 px-3.5 py-2 bg-black/80 hover:bg-gold hover:text-charcoal-950 text-white text-xs font-mono tracking-wider uppercase rounded-sm flex items-center space-x-2 backdrop-blur-md transition-all shadow-md z-10"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Enlarge Brochure Map</span>
                  </button>
                </div>
              </Reveal>
            </div>

            {/* Right: Address & Direct Maps Link - Slides in from Right */}
            <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between space-y-6">
              <Reveal direction="right" distance={50} delay={250}>
                <div className="space-y-4">
                  <div className="inline-flex items-center space-x-1.5 text-[11px] font-mono tracking-widest uppercase text-gold-dark font-semibold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Official Site Address</span>
                  </div>
                  <h3 className="text-2xl font-serif text-charcoal-950 font-normal">
                    The Opus 1
                  </h3>
                  <p className="text-sm text-charcoal-700 leading-relaxed font-light">
                    {PROJECT_DETAILS.address}
                  </p>

                  <div className="pt-2 text-xs text-charcoal-500 space-y-1">
                    <p>• Landmark: Behind Hotel Surbhi</p>
                    <p>• Access: Direct 12M Frontage Road</p>
                    <p>• District: Shivajinagar, Pune 411005</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-ivory-200 space-y-3">
                  <a
                    href={PROJECT_DETAILS.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center space-x-2.5 px-6 py-3.5 bg-charcoal-950 hover:bg-gold hover:text-charcoal-950 text-white text-xs font-semibold tracking-wider uppercase rounded-sm transition-all focus:outline-none focus:ring-2 focus:ring-gold shadow-md hover:shadow-lg active:scale-98"
                  >
                    <MapPin className="w-4 h-4 text-gold" />
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <p className="text-[11px] text-center text-charcoal-400 font-mono">
                    Verified Destination: maps.app.goo.gl/1ZGhMzNrHtJuNNZTA
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>

        {/* Grouped Connectivity Grid */}
        <div className="space-y-6">
          <Reveal direction="left" distance={30} delay={100}>
            <div className="flex items-center justify-between">
              <h3 className="text-xl sm:text-2xl font-serif text-charcoal-950">
                Key Travel Distances
              </h3>
              <span className="text-xs font-mono text-gold-dark flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5" />
                <span>Brochure-Stated Estimates</span>
              </span>
            </div>
          </Reveal>

          {/* Staggered Left-to-Right Cascading Connectivity Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {CONNECTIVITY_DATA.map((group, idx) => {
              const Icon = getCategoryIcon(group.iconName);
              return (
                <Reveal
                  key={group.category}
                  direction="left"
                  distance={35}
                  delay={100 + idx * 80}
                  className="flex"
                >
                  <div className="p-6 bg-white rounded-sm border border-ivory-300 hover:border-gold/70 transition-all duration-300 shadow-sm hover:shadow-xl space-y-4 card-hover-gold w-full group relative overflow-hidden">
                    {/* Expanding Top Gold Line: Left to Right on hover */}
                    <div className="h-0.5 w-full bg-gradient-to-r from-gold via-gold-300 to-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left absolute top-0 left-0" />
                    <div className="flex items-center space-x-3 border-b border-ivory-200 pb-3">
                      <div className="p-2 bg-ivory-100 group-hover:bg-gold group-hover:text-charcoal-950 text-gold-dark rounded-sm transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h4 className="text-base font-serif font-medium text-charcoal-900 group-hover:text-gold-dark transition-colors">
                        {group.category}
                      </h4>
                    </div>

                    <ul className="space-y-2.5">
                      {group.destinations.map((dest, dIdx) => (
                        <li
                          key={dIdx}
                          className="flex items-baseline justify-between text-xs text-charcoal-700"
                        >
                          <span className="font-light pr-2">
                            {dest.name}
                          </span>
                          <span className="font-mono font-medium text-charcoal-950 shrink-0 text-gold-dark">
                            {dest.time}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>

      {/* Lightbox Modal for Location Map */}
      <LightboxModal
        isOpen={isMapModalOpen}
        onClose={() => setIsMapModalOpen(false)}
        media={{
          src: PROJECT_DETAILS.locationMapImage,
          title: "The Opus 1 — JM Road Strategic Location Map",
          category: "Geographic Location Map",
          caption:
            "Brochure map plate showing The Opus 1 behind Hotel Surbhi, between Chaturshringi Road and Shivaji Road, Revenue Colony, Pune.",
        }}
      />
    </section>
  );
}
