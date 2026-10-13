"use client";

import React from "react";
import Image from "next/image";
import { PROJECT_DETAILS } from "@/data/project";
import Reveal from "./Reveal";
import { Compass, Eye, Building, LayoutGrid, Route, Sparkles } from "lucide-react";

export default function ProjectIntro() {
  const advantages = [
    {
      title: "Central Urban Location",
      desc: "Strategically situated off JM Road, Shivajinagar — one of Pune's most distinguished and connected institutional districts.",
      icon: Compass,
    },
    {
      title: "High Commercial Visibility",
      desc: "Commanding road frontage ensuring elevated corporate presence and brand prestige for occupants.",
      icon: Eye,
    },
    {
      title: "Contemporary Architectural Design",
      desc: "Sleek glass facade paired with vertical architectural fins, premium stone textures, and private terraces.",
      icon: Building,
    },
    {
      title: "Versatile Office Configurations",
      desc: "Four thoughtfully sized office spaces per floor ranging from 806 to 1,289 sq.ft., each featuring an attached private washroom.",
      icon: LayoutGrid,
    },
    {
      title: "Seamless Multimodal Transit Access",
      desc: "5 minutes from Shivajinagar Railway & Bus Stations, 15 minutes from Pune Junction, and rapid connections across Pune's business corridors.",
      icon: Route,
    },
  ];

  return (
    <section
      id="intro"
      className="py-20 sm:py-28 bg-ivory text-charcoal relative overflow-hidden"
      aria-label="Project Introduction"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header: Left-to-Right Reveal */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <Reveal direction="left" distance={40} delay={50}>
            <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-gold-dark font-semibold mb-3">
              <span className="w-8 h-px bg-gold-dark" />
              <span>Project Perspective</span>
            </div>
          </Reveal>

          <Reveal direction="left" distance={50} delay={150}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-charcoal-950 font-normal tracking-tight leading-tight">
              Creating a Distinctive <br />
              <span className="italic">Business Address.</span>
            </h2>
          </Reveal>

          <Reveal direction="left" distance={40} delay={250}>
            <p className="mt-5 text-base sm:text-lg text-charcoal-600 leading-relaxed font-light">
              Commercial success depends heavily on selecting the ideal location to
              establish business. Strategically positioned off JM Road, behind
              Hotel Surbhi, <strong>The Opus 1 by Profile</strong> delivers an architectural
              landmark combining commercial prominence with refined spatial planning.
            </p>
          </Reveal>
        </div>

        {/* Two-Column Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Left-to-Right Architectural Image Reveal */}
          <div className="lg:col-span-5 space-y-6">
            <Reveal direction="left" distance={60} delay={200}>
              <div className="relative aspect-[3/4] w-full rounded-sm overflow-hidden shadow-2xl border border-ivory-300 hover:border-gold/80 transition-all duration-500 group hover:-translate-y-2 hover:shadow-[0_25px_50px_rgba(18,19,22,0.2),0_0_35px_rgba(229,169,18,0.25)] cursor-pointer">
                <Image
                  src={PROJECT_DETAILS.exteriorImage}
                  alt="The Opus 1 Architectural Facade and Fin Detailing"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center group-hover:scale-110 group-hover:brightness-105 transition-all duration-700 ease-out"
                />
                {/* Ambient Light Sweep on Hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/85 via-charcoal-950/20 to-transparent transition-opacity duration-500" />
                <div className="absolute bottom-6 left-6 right-6 text-white transition-transform duration-500 group-hover:-translate-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-gold block mb-1 group-hover:text-gold-300 transition-colors">
                    Architectural Detail
                  </span>
                  <p className="font-serif text-sm sm:text-base italic text-ivory-100 group-hover:text-white transition-colors">
                    &ldquo;An artistic composition given a number relating to the
                    order in which it was made.&rdquo;
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Architecture Metadata Box — Highlighted Commercial Heritage */}
            <Reveal direction="left" distance={40} delay={350}>
              <div className="relative p-6 sm:p-7 bg-charcoal-950 text-white rounded-sm border-2 border-gold/70 space-y-4 shadow-2xl hover:shadow-[0_15px_40px_rgba(229,169,18,0.25)] hover:border-gold transition-all duration-300 overflow-hidden group">
                {/* Gold Top Accent Gradient Bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold via-gold-200 to-gold" />

                {/* Subtle Ambient Radial Glow */}
                <div className="absolute -right-10 -bottom-10 w-36 h-36 bg-gold/15 rounded-full blur-2xl pointer-events-none group-hover:bg-gold/25 transition-colors" />

                {/* Top Badge */}
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center space-x-2 px-3 py-1 bg-gold/15 border border-gold/50 rounded-xs">
                    <Sparkles className="w-3.5 h-3.5 text-gold animate-pulse" />
                    <span className="text-[11px] font-mono uppercase tracking-widest text-gold font-semibold">
                      Commercial Heritage
                    </span>
                  </div>
                  <span className="text-[10px] font-mono tracking-wider text-ivory-400 uppercase">
                    Proven Track Record
                  </span>
                </div>

                {/* Prominent Stat Metric */}
                <div className="flex items-baseline space-x-3 pt-1">
                  <span className="text-3xl sm:text-4xl font-serif font-bold text-gold tracking-tight">
                    3 Million+
                  </span>
                  <span className="text-xs sm:text-sm font-mono uppercase tracking-wider text-ivory-300">
                    Sq.Ft Delivered &amp; Ongoing
                  </span>
                </div>

                {/* Descriptive Copy */}
                <p className="text-xs sm:text-sm text-ivory-200/90 leading-relaxed font-light pt-2 border-t border-charcoal-800">
                  Developed by <strong className="font-semibold text-gold tracking-wide">PROFILE</strong> — backed by a proven portfolio of landmark destinations across Pune&apos;s prime commercial and residential sectors.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Staggered Right-to-Left Advantages */}
          <div className="lg:col-span-7 space-y-6">
            <Reveal direction="right" distance={40} delay={150}>
              <div className="border-l-2 border-gold pl-6 py-2 mb-8">
                <h3 className="text-xl sm:text-2xl font-serif text-charcoal-950 font-normal">
                  Thoughtful Architecture for Pune&apos;s Modern Enterprises
                </h3>
                <p className="mt-2 text-sm text-charcoal-600 leading-relaxed font-light">
                  Designed to cater to corporate offices, professional consultancies,
                  financial firms, and private practices seeking privacy, status, and
                  unmatched accessibility in Shivajinagar.
                </p>
              </div>
            </Reveal>

            {/* Staggered Advantages Cards */}
            <div className="space-y-4">
              {advantages.map((adv, idx) => {
                const IconComponent = adv.icon;
                return (
                  <Reveal
                    key={adv.title}
                    direction="right"
                    distance={45}
                    delay={150 + idx * 100}
                  >
                    <div className="p-5 sm:p-6 bg-white rounded-sm border border-ivory-200 hover:border-gold/70 transition-all duration-300 shadow-sm hover:shadow-xl flex items-start space-x-4 sm:space-x-5 card-hover-gold group relative overflow-hidden">
                      {/* Expanding Top Gold Line: Left to Right on hover */}
                      <div className="h-0.5 w-full bg-gradient-to-r from-gold via-gold-300 to-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left absolute top-0 left-0" />
                      <div className="p-2.5 bg-ivory-100 text-gold-dark group-hover:bg-gold group-hover:text-charcoal-950 rounded-sm shrink-0 border border-ivory-300 transition-colors">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-[11px] font-mono text-gold-dark font-medium">
                            0{idx + 1}.
                          </span>
                          <h4 className="text-base sm:text-lg font-serif font-semibold text-charcoal-900 group-hover:text-gold-dark transition-colors">
                            {adv.title}
                          </h4>
                        </div>
                        <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed font-light">
                          {adv.desc}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
