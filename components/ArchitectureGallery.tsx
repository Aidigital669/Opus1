"use client";

import React, { useState } from "react";
import Image from "next/image";
import { GALLERY_ITEMS } from "@/data/project";
import LightboxModal from "./LightboxModal";
import Reveal from "./Reveal";
import { Maximize2, Sparkles, Filter } from "lucide-react";

export default function ArchitectureGallery() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "Elevation", "Floor Plans"];

  const filteredItems =
    activeCategory === "All"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) =>
          activeCategory === "Elevation"
            ? item.category.toLowerCase().includes("elevation") ||
              item.category.toLowerCase().includes("exterior") ||
              item.category.toLowerCase().includes("architecture") ||
              item.category.toLowerCase().includes("details")
            : item.category.toLowerCase().includes("floor plan") ||
              item.category.toLowerCase().includes("plate") ||
              item.category.toLowerCase().includes("planning")
        );

  const lightboxMediaList = filteredItems.map((item) => ({
    src: item.src,
    title: item.title,
    category: item.category,
    caption: item.caption,
  }));

  return (
    <section
      id="gallery"
      className="py-20 sm:py-28 bg-charcoal-950 text-white relative overflow-hidden"
      aria-label="Architecture & Project Gallery"
    >
      {/* Decorative ambient subtle glow */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header: Left-to-Right Reveal */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            <Reveal direction="left" distance={40} delay={50}>
              <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-gold font-semibold mb-3">
                <span className="w-8 h-px bg-gold" />
                <span>Visual Portfolio</span>
              </div>
            </Reveal>

            <Reveal direction="left" distance={50} delay={150}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-ivory-50 tracking-tight">
                Architectural Elevation <br />
                <span className="italic text-gold-300">&amp; Design Details.</span>
              </h2>
            </Reveal>

            <Reveal direction="left" distance={40} delay={250}>
              <p className="mt-4 text-sm sm:text-base text-ivory-300 font-light leading-relaxed">
                Curated visual documentation extracted directly from The Opus 1
                architectural brochure — showcasing the contemporary glass facade,
                stone-framed envelope, and master spatial arrangement.
              </p>
            </Reveal>
          </div>

          {/* Interactive Category Filter Pills */}
          <Reveal direction="right" distance={40} delay={200}>
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider rounded-xs transition-all ${
                    activeCategory === cat
                      ? "bg-gold text-charcoal-950 font-bold shadow-md"
                      : "bg-charcoal-900 text-ivory-300 hover:text-white hover:bg-charcoal-800 border border-charcoal-800"
                  }`}
                >
                  {cat === "All" ? `All Media (${GALLERY_ITEMS.length})` : cat}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Asymmetrical Editorial Grid with Dynamic Directional Reveals */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item, idx) => {
            const isWide = false;
            // Alternate left-to-right and right-to-left for dynamic rhythm
            const animDirection = idx % 2 === 0 ? "left" : "right";

            return (
              <Reveal
                key={item.id}
                direction={animDirection}
                distance={45}
                delay={100 + (idx % 3) * 120}
                className={isWide ? "md:col-span-2" : "col-span-1"}
              >
                <div
                  onClick={() => setSelectedIdx(idx)}
                  className="group relative rounded-sm overflow-hidden bg-charcoal-900 border border-charcoal-800 hover:border-gold/80 transition-all duration-400 cursor-pointer shadow-lg hover:shadow-2xl card-hover-gold"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setSelectedIdx(idx);
                    }
                  }}
                  aria-label={`Open photo lightbox: ${item.title}`}
                >
                  {/* Expanding Gold Accent Line: Grows from Left to Right on hover */}
                  <div className="h-0.5 w-full bg-gradient-to-r from-gold via-gold-300 to-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-20 absolute top-0 left-0" />

                  <div
                    className={`relative w-full ${
                      isWide ? "aspect-[16/9] sm:aspect-[21/9]" : "aspect-[4/5]"
                    } overflow-hidden`}
                  >
                    <Image
                      src={item.src}
                      alt={item.title}
                      fill
                      sizes={
                        isWide
                          ? "(max-width: 1024px) 100vw, 66vw"
                          : "(max-width: 768px) 100vw, 33vw"
                      }
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/90 via-charcoal-950/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                    {/* Top Category Badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 bg-black/70 backdrop-blur-md text-gold border border-gold/40 rounded-xs flex items-center space-x-1.5 shadow-sm">
                        <Sparkles className="w-3 h-3" />
                        <span>{item.category}</span>
                      </span>
                    </div>

                    {/* Top Right Enlarge Icon */}
                    <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="p-2 bg-black/80 text-white rounded-sm border border-gold/50 shadow-md">
                        <Maximize2 className="w-4 h-4 text-gold" />
                      </div>
                    </div>

                    {/* Bottom Text Content */}
                    <div className="absolute bottom-4 left-4 right-4 z-10 space-y-1">
                      <h3 className="font-serif text-lg sm:text-xl text-ivory-50 group-hover:text-gold transition-colors duration-300 font-medium">
                        {item.title}
                      </h3>
                      <p className="text-xs text-ivory-300 font-light line-clamp-2 leading-relaxed">
                        {item.caption}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Editorial Footnote */}
        <Reveal direction="up" distance={20} delay={350}>
          <div className="mt-12 pt-6 border-t border-charcoal-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-charcoal-500 gap-3">
            <span>
              Authentic Architectural Visuals • Sourced directly from The Opus 1
              Developer Documentation
            </span>
            <span className="font-mono text-gold/80">
              {filteredItems.length} Certified Assets
            </span>
          </div>
        </Reveal>
      </div>

      {/* Lightbox Modal */}
      <LightboxModal
        isOpen={selectedIdx !== null}
        onClose={() => setSelectedIdx(null)}
        media={selectedIdx !== null ? lightboxMediaList[selectedIdx] : null}
      />
    </section>
  );
}
