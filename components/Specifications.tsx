"use client";

import React from "react";
import { SPECIFICATIONS } from "@/data/project";
import Reveal from "./Reveal";
import {
  Grid,
  Layers,
  Bath,
  DoorClosed,
  Minimize,
  Zap,
  Check,
} from "lucide-react";

export default function Specifications() {
  const getSpecIcon = (name: string) => {
    switch (name) {
      case "Grid":
        return Grid;
      case "Layers":
        return Layers;
      case "Bath":
        return Bath;
      case "DoorClosed":
        return DoorClosed;
      case "Minimize":
        return Minimize;
      case "Zap":
        return Zap;
      default:
        return Check;
    }
  };

  return (
    <section
      id="specifications"
      className="py-20 sm:py-28 bg-charcoal-900 text-white relative border-y border-charcoal-800"
      aria-label="Technical Specifications"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header: Left-to-Right Reveal */}
        <div className="max-w-3xl mb-16">
          <Reveal direction="left" distance={40} delay={50}>
            <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-gold font-semibold mb-3">
              <span className="w-8 h-px bg-gold" />
              <span>Materiality &amp; Engineering</span>
            </div>
          </Reveal>

          <Reveal direction="left" distance={50} delay={150}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-ivory-50 tracking-tight">
              Comprehensive <br />
              <span className="italic text-gold-300">Project Specifications.</span>
            </h2>
          </Reveal>

          <Reveal direction="left" distance={40} delay={250}>
            <p className="mt-4 text-sm sm:text-base text-ivory-300 font-light leading-relaxed">
              Detailed material standards and finishes as cataloged in the official
              developer documentation, engineered for commercial resilience and
              executive distinction.
            </p>
          </Reveal>
        </div>

        {/* Two-Column Specification Grid: Left-to-Right & Right-to-Left Reveal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {SPECIFICATIONS.map((spec, idx) => {
            const Icon = getSpecIcon(spec.iconName);
            // Left column (even idx) slides from left; Right column (odd idx) slides from right
            const direction = idx % 2 === 0 ? "left" : "right";

            return (
              <Reveal
                key={spec.category}
                direction={direction}
                distance={45}
                delay={100 + idx * 80}
              >
                <div className="p-6 sm:p-8 bg-charcoal-950/70 border border-charcoal-800 rounded-sm hover:border-gold/60 transition-all duration-300 space-y-4 shadow-lg hover:shadow-2xl card-hover-gold group relative overflow-hidden">
                  {/* Expanding Top Gold Line: Left to Right on hover */}
                  <div className="h-0.5 w-full bg-gradient-to-r from-gold via-gold-300 to-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left absolute top-0 left-0" />
                  <div className="flex items-center justify-between border-b border-charcoal-800 pb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2.5 bg-charcoal-800 group-hover:bg-gold text-gold group-hover:text-charcoal-950 rounded-sm border border-charcoal-700 transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="font-serif text-xl sm:text-2xl text-ivory-100 font-medium group-hover:text-gold transition-colors">
                        {spec.category}
                      </h3>
                    </div>
                    <span className="text-xs font-mono text-gold/70">
                      CAT 0{idx + 1}
                    </span>
                  </div>

                  <ul className="space-y-3 pt-2">
                    {spec.items.map((item, itemIdx) => (
                      <li
                        key={itemIdx}
                        className="flex items-start space-x-3 text-xs sm:text-sm text-ivory-300 font-light leading-relaxed"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 mt-2 group-hover:scale-125 transition-transform" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
