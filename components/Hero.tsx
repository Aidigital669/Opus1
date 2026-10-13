"use client";

import React from "react";
import Image from "next/image";
import { PROJECT_DETAILS } from "@/data/project";
import Reveal from "./Reveal";
import { ArrowDown, ArrowUpRight, Sparkles } from "lucide-react";

interface HeroProps {
  onExploreClick?: () => void;
  onEnquireClick?: () => void;
}

export default function Hero({ onExploreClick, onEnquireClick }: HeroProps) {
  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="overview"
      className="relative w-full max-w-full min-h-[92vh] lg:min-h-screen flex flex-col justify-center bg-charcoal-950 text-white overflow-hidden pt-28 pb-10 sm:pb-14"
      aria-label="The Opus 1 Hero Presentation"
    >
      {/* Background Architectural Render with Cinematic Ambient Motion */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="relative w-full h-full animate-ken-burns">
          <Image
            src={PROJECT_DETAILS.heroImage}
            alt="The Opus 1 Commercial Architectural Elevation in Shivajinagar Pune"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center lg:object-[center_35%]"
            quality={95}
          />
        </div>
        {/* Editorial Gradients & Subtle Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/60 to-charcoal-950/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal-950/90 via-charcoal-950/50 to-transparent hidden md:block" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-charcoal-950 to-transparent" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Left-to-Right Animated Headline & Actions */}
          <div className="lg:col-span-8 space-y-6">
            {/* Eyebrow: Left-to-Right Slide */}
            <Reveal direction="left" distance={40} delay={100}>
              <div className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 bg-black/60 backdrop-blur-md border border-gold/40 rounded-sm">
                <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                <span className="text-[11px] sm:text-xs font-mono tracking-widest3 uppercase text-gold">
                  {PROJECT_DETAILS.eyebrow}
                </span>
              </div>
            </Reveal>

            {/* Main Headline: Left-to-Right Slide */}
            <Reveal direction="left" distance={60} delay={250}>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-normal tracking-tight text-ivory-50 leading-[1.12]">
                A New Perspective <br className="hidden sm:inline" />
                <span className="italic font-normal text-gold-300">
                  on Business.
                </span>
              </h1>
            </Reveal>

            {/* Supporting Copy: Left-to-Right Slide */}
            <Reveal direction="left" distance={45} delay={400}>
              <div className="max-w-2xl text-base sm:text-lg md:text-xl text-ivory-200/90 font-light leading-relaxed">
                <span>Discover</span>
                <span className="block text-6xl sm:text-6xl md:text-6xl lg:text-8xl font-serif font-medium text-gold-300 leading-tight my-1.5">
                  <span className="whitespace-nowrap">The Opus 1</span>
                  <br />
                  <span className="whitespace-nowrap">by...Profile...</span>
                </span>
                <span className="block text-sm sm:text-base md:text-lg text-ivory-300/90 mt-2">
                  — a thoughtfully designed commercial destination.
                </span>
              </div>
            </Reveal>

            {/* CTAs: Left-to-Right Slide with Shimmer */}
            <Reveal direction="left" distance={30} delay={550}>
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={onExploreClick || (() => handleScrollTo("offices"))}
                  className="group relative inline-flex items-center space-x-2 px-7 py-3.5 text-xs sm:text-sm font-semibold tracking-widest uppercase bg-gold hover:bg-gold-light active:bg-gold-dark text-charcoal-950 rounded-sm transition-all shadow-lg hover:shadow-gold/30 hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold overflow-hidden"
                >
                  <span className="relative z-10">Explore Offices</span>
                  <ArrowDown className="w-4 h-4 relative z-10 transition-transform group-hover:translate-y-0.5" />
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                </button>

                <button
                  type="button"
                  onClick={onEnquireClick || (() => handleScrollTo("enquire"))}
                  className="group relative inline-flex items-center space-x-2 px-7 py-3.5 text-xs sm:text-sm font-semibold tracking-widest uppercase bg-white/10 hover:bg-white/20 active:bg-white/30 text-white backdrop-blur-sm border border-white/25 rounded-sm transition-all hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-white overflow-hidden"
                >
                  <span className="relative z-10">Enquire Now</span>
                  <ArrowUpRight className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </button>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Ambience Luxury Art Showcase */}
          <div className="lg:col-span-4">
            <Reveal direction="right" distance={50} delay={300}>
              <div className="bg-black/95 backdrop-blur-md border border-charcoal-800 p-5 sm:p-6 rounded-sm space-y-3.5 hover:border-gold/60 transition-all duration-300 shadow-2xl group hover:-translate-y-1">
                {/* Top Badge */}
                <div>
                  <span className="inline-flex items-center space-x-2 px-3 py-1 border border-gold/70 bg-black rounded-xs">
                    <Sparkles className="w-3.5 h-3.5 text-gold" />
                    <span className="text-[10px] sm:text-[11px] font-mono tracking-widest uppercase text-gold font-medium">
                      AMBIENCE
                    </span>
                  </span>
                </div>

                {/* Chandelier Image Seamless Black Blend */}
                <div className="relative w-full h-44 sm:h-52 my-1 overflow-hidden bg-black flex items-center justify-center">
                  <Image
                    src="/images/opus-gallery-art.webp"
                    alt="The Opulence of Profile Spaces"
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-contain object-center group-hover:scale-105 transition-transform duration-500"
                    priority
                  />
                </div>

                {/* Editorial Typography */}
                <div className="space-y-1.5 pt-2 border-t border-charcoal-800/80">
                  <h3 className="font-serif text-lg sm:text-xl text-ivory-50 font-normal leading-snug">
                    The Opulence of Profile Spaces
                  </h3>
                  <p className="text-xs text-ivory-300/80 font-light leading-relaxed">
                    &apos;Art is more than a symbol of luxury; it&apos;s an expression of rarity, creativity, and quality. Our unique masterpieces &amp; destinations are legacies for the future.&apos;
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Bottom Editorial Accent Strip */}
        <Reveal direction="up" distance={20} delay={600}>
          <div className="mt-8 sm:mt-10 pt-5 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-ivory-300/80 gap-3">
            <div className="flex items-center space-x-3">
              <span className="text-gold font-mono">01</span>
              <span>Commercial Destination</span>
              <span className="text-white/30">•</span>
              <span>JM Road</span>
              <span className="text-white/30">•</span>
              <span>Shivajinagar</span>
            </div>

            <div className="flex items-center space-x-2 text-ivory-400">
              <span>Scroll to discover project specifications</span>
              <ArrowDown className="w-3.5 h-3.5 text-gold animate-bounce" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
