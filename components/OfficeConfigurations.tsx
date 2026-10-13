"use client";

import React, { useState } from "react";
import Image from "next/image";
import { OFFICE_UNITS, OfficeUnit, PROJECT_DETAILS } from "@/data/project";
import LightboxModal, { LightboxMedia } from "./LightboxModal";
import Reveal from "./Reveal";
import {
  Eye,
  ArrowUpRight,
  Maximize2,
  Check,
  Layers,
  Sparkles,
  SlidersHorizontal,
} from "lucide-react";

interface OfficeConfigurationsProps {
  onSelectOfficeForEnquiry: (officeName: string) => void;
}

export default function OfficeConfigurations({
  onSelectOfficeForEnquiry,
}: OfficeConfigurationsProps) {
  const [selectedLightbox, setSelectedLightbox] = useState<LightboxMedia | null>(
    null
  );
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const handleOpenUnitPlan = (unit: OfficeUnit) => {
    setSelectedLightbox({
      src: unit.image,
      title: `${unit.title} — Floor Plan Artwork (${unit.saleableArea})`,
      category: "Individual Unit Plan",
      caption: `Brochure-stated Saleable Area: ${unit.saleableArea} | RERA Area: ${unit.reraArea} | Usable Area: ${unit.usableArea}.`,
    });
  };

  const handleOpenMasterPlan = () => {
    setSelectedLightbox({
      src: PROJECT_DETAILS.floorPlanMaster,
      title: "The Opus 1 — Typical Commercial Floor Plate Plan",
      category: "Overall Floor Plan",
      caption:
        "Master architectural layout displaying all four office spaces (01, 02, 03, 04), dual lift core, common passage, and road orientation. Verified brochure schematic.",
    });
  };

  const handleEnquireUnit = (unitTitle: string) => {
    onSelectOfficeForEnquiry(unitTitle);
    const formEl = document.getElementById("enquire");
    if (formEl) {
      formEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Filter office units based on active tab
  const displayedUnits =
    selectedFilter === "all"
      ? OFFICE_UNITS
      : OFFICE_UNITS.filter((u) => u.title === selectedFilter);

  return (
    <section
      id="offices"
      className="py-20 sm:py-28 bg-ivory-100/60 text-charcoal relative border-y border-ivory-200 overflow-hidden"
      aria-label="Commercial Office Configurations"
    >
      {/* Decorative ambient subtle glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading: Left-to-Right Reveal */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            <Reveal direction="left" distance={40} delay={50}>
              <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-gold-dark font-semibold mb-3">
                <span className="w-8 h-px bg-gold-dark" />
                <span>Spatial Configurations</span>
              </div>
            </Reveal>

            <Reveal direction="left" distance={55} delay={150}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-charcoal-950 font-normal tracking-tight">
                Four Exclusive Office Spaces <br />
                <span className="italic text-charcoal-900">per Floor Plate.</span>
              </h2>
            </Reveal>

            <Reveal direction="left" distance={40} delay={250}>
              <p className="mt-4 text-base text-charcoal-600 font-light leading-relaxed">
                Carefully engineered commercial spaces designed for maximum spatial
                utility, natural illumination, and executive convenience in
                Shivajinagar.
              </p>
            </Reveal>
          </div>

          <Reveal direction="right" distance={45} delay={200}>
            <button
              type="button"
              onClick={handleOpenMasterPlan}
              className="group relative inline-flex items-center space-x-2.5 px-6 py-3.5 text-xs font-semibold tracking-wider uppercase bg-white border border-charcoal-300 hover:border-gold hover:text-gold-dark text-charcoal-800 rounded-sm shadow-sm hover:shadow-md transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-gold overflow-hidden"
            >
              <Layers className="w-4 h-4 text-gold-dark group-hover:rotate-12 transition-transform duration-300" />
              <span>View Overall Floor Plate</span>
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-gold/15 to-transparent" />
            </button>
          </Reveal>
        </div>

        {/* Master Plan Featured Banner: Left-to-Right & Right-to-Left Reveal */}
        <div className="mb-14 p-6 sm:p-10 bg-charcoal-950 text-white rounded-sm border border-charcoal-800 relative overflow-hidden shadow-2xl">
          {/* Subtle gold ambient glow in top right */}
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content Column: Slides in from Left */}
            <div className="lg:col-span-7 space-y-5">
              <Reveal direction="left" distance={50} delay={100}>
                <div className="inline-flex items-center space-x-2 text-[11px] font-mono tracking-widest uppercase text-gold">
                  <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                  <span>Floor Plate Architecture</span>
                </div>
              </Reveal>

              <Reveal direction="left" distance={60} delay={180}>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-normal text-ivory-50 leading-tight">
                  Low-Density Commercial Layout
                </h3>
              </Reveal>

              <Reveal direction="left" distance={40} delay={260}>
                <p className="text-xs sm:text-sm text-ivory-300 font-light leading-relaxed max-w-xl">
                  Featuring just 4 private offices per floor,{" "}
                  <strong className="text-white font-medium mr-1.5">The Opus 1</strong>
                  guarantees privacy, reduced lobby congestion, and efficient core access. Every
                  office benefits from an attached private washroom and direct lift
                  connectivity.
                </p>
              </Reveal>

              {/* Verified Checklist Badges */}
              <Reveal direction="left" distance={35} delay={340}>
                <div className="flex flex-wrap gap-4 pt-2 text-xs text-ivory-200">
                  <span className="flex items-center space-x-2 bg-charcoal-900/90 border border-charcoal-800 px-3 py-1.5 rounded-xs hover:border-gold/50 transition-colors">
                    <Check className="w-4 h-4 text-gold shrink-0" />
                    <span>Dual Passenger Elevators</span>
                  </span>
                  <span className="flex items-center space-x-2 bg-charcoal-900/90 border border-charcoal-800 px-3 py-1.5 rounded-xs hover:border-gold/50 transition-colors">
                    <Check className="w-4 h-4 text-gold shrink-0" />
                    <span>12M Frontage Road Access</span>
                  </span>
                  <span className="flex items-center space-x-2 bg-charcoal-900/90 border border-charcoal-800 px-3 py-1.5 rounded-xs hover:border-gold/50 transition-colors">
                    <Check className="w-4 h-4 text-gold shrink-0" />
                    <span>Individual Ensuite Washrooms</span>
                  </span>
                </div>
              </Reveal>
            </div>

            {/* Right Blueprint Preview Column: Slides in from Right */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <Reveal direction="right" distance={60} delay={200} className="w-full max-w-sm">
                <div
                  onClick={handleOpenMasterPlan}
                  className="group relative block w-full aspect-[4/5] bg-white rounded-sm overflow-hidden p-3 border border-charcoal-700 hover:border-gold transition-all duration-300 shadow-xl hover:shadow-[0_0_30px_rgba(229,169,18,0.2)] cursor-pointer"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleOpenMasterPlan();
                    }
                  }}
                  aria-label="Enlarge overall floor plan schematic"
                >
                  {/* Floating Live Badge with Radar Ping */}
                  <div className="absolute top-4 left-4 z-20 flex items-center space-x-2 bg-charcoal-950/85 backdrop-blur-md px-2.5 py-1 rounded-xs border border-gold/40">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-radar absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-gold" />
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-ivory-100">
                      Master Blueprint
                    </span>
                  </div>

                  <div className="relative w-full h-full">
                    <Image
                      src={PROJECT_DETAILS.floorPlanMaster}
                      alt="The Opus 1 Master Floor Plan Schematic"
                      fill
                      className="object-contain p-2 group-hover:scale-105 transition-transform duration-500 ease-out"
                      sizes="340px"
                    />
                    <div className="absolute inset-0 bg-charcoal-950/15 group-hover:bg-charcoal-950/0 transition-colors flex items-center justify-center">
                      <span className="px-3.5 py-2 bg-black/85 text-white text-[11px] font-mono uppercase tracking-wider rounded-sm flex items-center space-x-1.5 opacity-90 group-hover:opacity-100 transition-all group-hover:scale-105 shadow-md">
                        <Maximize2 className="w-3.5 h-3.5 text-gold" />
                        <span>Enlarge Plan</span>
                      </span>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>

        {/* Modern Interactive Office Space Filter & Tab Switcher */}
        <Reveal direction="left" distance={30} delay={100}>
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-ivory-300/80 pb-4">
            <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-charcoal-600 font-semibold">
              <SlidersHorizontal className="w-3.5 h-3.5 text-gold-dark" />
              <span>Filter By Office Space:</span>
            </div>

            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={() => setSelectedFilter("all")}
                className={`px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider rounded-xs transition-all ${
                  selectedFilter === "all"
                    ? "bg-charcoal-950 text-gold shadow-sm font-semibold"
                    : "bg-white text-charcoal-700 hover:text-charcoal-950 hover:bg-ivory-200 border border-ivory-300"
                }`}
              >
                All 4 Office Spaces
              </button>
              {OFFICE_UNITS.map((u) => (
                <button
                  key={u.id}
                  type="button"
                  onClick={() => setSelectedFilter(u.title)}
                  className={`px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider rounded-xs transition-all ${
                    selectedFilter === u.title
                      ? "bg-charcoal-950 text-gold shadow-sm font-semibold"
                      : "bg-white text-charcoal-700 hover:text-charcoal-950 hover:bg-ivory-200 border border-ivory-300"
                  }`}
                >
                  {u.title} ({u.saleableArea})
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* 4 Office Units Cards Grid: Staggered Left-to-Right Cascading Entrance */}
        <div
          className={`grid gap-6 sm:gap-8 ${
            displayedUnits.length === 1
              ? "grid-cols-1 max-w-lg mx-auto"
              : "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
          }`}
        >
          {displayedUnits.map((unit, idx) => (
            <Reveal
              key={unit.id}
              direction="left"
              distance={40 + idx * 15}
              delay={80 + idx * 120}
              className="flex"
            >
              <div className="bg-white rounded-sm border border-ivory-300 hover:border-gold/80 transition-all duration-400 shadow-sm hover:shadow-xl flex flex-col justify-between overflow-hidden group card-hover-gold w-full relative">
                {/* Expanding Gold Accent Line across top: Grows from Left to Right on hover */}
                <div className="h-0.5 w-full bg-gradient-to-r from-gold via-gold-300 to-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                {/* Unit Card Header */}
                <div className="p-6 border-b border-ivory-200 bg-white">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono tracking-widest uppercase text-gold-dark font-bold px-2 py-0.5 bg-gold/10 border border-gold/30 rounded-xs">
                      Unit {unit.number}
                    </span>
                    <span className="text-[11px] font-mono font-medium px-2.5 py-0.5 bg-ivory-200 text-charcoal-800 border border-ivory-300 rounded-xs">
                      {unit.number === "03" ? "Prime Floor Plate" : "Commercial"}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-[26px] font-serif font-medium text-charcoal-950 tracking-tight group-hover:text-gold-dark transition-colors duration-300">
                    {unit.title}
                  </h3>

                  <div className="mt-4 pt-4 border-t border-ivory-100">
                    <span className="text-[11px] uppercase font-mono tracking-widest text-charcoal-500 font-semibold block">
                      Brochure-Stated Saleable
                    </span>
                    <div className="text-2xl sm:text-[28px] font-serif font-bold text-gold-dark group-hover:scale-[1.02] origin-left transition-transform duration-300 mt-0.5">
                      {unit.saleableArea}
                    </div>
                  </div>

                  {/* Sub Area Statement Grid */}
                  <div className="grid grid-cols-2 gap-3 mt-3.5 pt-3.5 border-t border-ivory-100">
                    <div>
                      <span className="block text-[10.5px] uppercase font-mono tracking-wider text-charcoal-500 font-semibold mb-0.5">
                        RERA Area
                      </span>
                      <span className="text-sm font-mono font-semibold text-charcoal-900">
                        {unit.reraArea}
                      </span>
                    </div>
                    <div>
                      <span className="block text-[10.5px] uppercase font-mono tracking-wider text-charcoal-500 font-semibold mb-0.5">
                        Usable Area
                      </span>
                      <span className="text-sm font-mono font-semibold text-charcoal-900">
                        {unit.usableArea}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Floor Plan Thumbnail with Zoom Trigger & Hover Lens Effect */}
                <div className="p-6 bg-ivory-50 flex flex-col items-center justify-center border-b border-ivory-200 relative overflow-hidden">
                  <div
                    onClick={() => handleOpenUnitPlan(unit)}
                    className="relative w-full aspect-[4/5] cursor-pointer overflow-hidden rounded-sm bg-white p-2 border border-ivory-200 group-hover:border-gold/60 transition-colors shadow-xs"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        handleOpenUnitPlan(unit);
                      }
                    }}
                    aria-label={`View full plan for ${unit.title}`}
                  >
                    <Image
                      src={unit.image}
                      alt={`${unit.title} floor plan drawing`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-contain p-2 group-hover:scale-105 transition-transform duration-500 ease-out"
                    />

                    {/* Hover Overlay with View Plan Badge */}
                    <div className="absolute inset-0 bg-charcoal-950/0 group-hover:bg-charcoal-950/25 transition-all duration-300 flex items-center justify-center">
                      <span className="opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 px-3.5 py-1.5 bg-black/85 text-white text-[11px] font-mono tracking-wider uppercase rounded-sm flex items-center space-x-1.5 shadow-lg">
                        <Eye className="w-3.5 h-3.5 text-gold" />
                        <span>View Plan</span>
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleOpenUnitPlan(unit)}
                    className="mt-3 text-xs font-mono text-gold-dark hover:text-charcoal-950 flex items-center space-x-1.5 transition-colors group/btn"
                  >
                    <Maximize2 className="w-3.5 h-3.5 group-hover/btn:scale-110 transition-transform" />
                    <span>Enlarge Technical Plan</span>
                  </button>
                </div>

                {/* Architectural Features */}
                <div className="p-6 space-y-3.5 flex-1">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-charcoal-500 font-semibold block">
                    Configuration Highlights
                  </span>
                  <ul className="space-y-2.5 text-[13px] sm:text-sm text-charcoal-800 font-medium leading-relaxed">
                    {unit.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start space-x-2.5">
                        <span className="text-gold-dark mt-1 text-[11px] shrink-0">●</span>
                        <span className="leading-snug">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Button: Enquire with Left-to-Right Light Sweep Effect */}
                <div className="p-6 pt-0 space-y-2">
                  <button
                    type="button"
                    onClick={() => handleEnquireUnit(unit.title)}
                    className="group/action relative w-full flex items-center justify-center space-x-2 py-3 px-4 bg-charcoal-950 hover:bg-gold hover:text-charcoal-950 text-white text-xs font-semibold tracking-wider uppercase rounded-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold active:scale-98 shadow-sm hover:shadow-md overflow-hidden"
                  >
                    <span className="relative z-10">Enquire About {unit.title}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 relative z-10 transition-transform duration-300 group-hover/action:translate-x-0.5 group-hover/action:-translate-y-0.5" />
                    {/* Left-to-right shimmer sweep on hover */}
                    <span className="absolute inset-0 -translate-x-full group-hover/action:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* If Filter is Active, button to reset */}
        {selectedFilter !== "all" && (
          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={() => setSelectedFilter("all")}
              className="inline-flex items-center space-x-2 px-5 py-2.5 text-xs font-mono uppercase tracking-wider bg-white border border-charcoal-300 hover:border-gold text-charcoal-800 rounded-sm shadow-xs transition-colors"
            >
              <span>Show All 4 Office Spaces</span>
            </button>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <LightboxModal
        isOpen={Boolean(selectedLightbox)}
        onClose={() => setSelectedLightbox(null)}
        media={selectedLightbox}
      />
    </section>
  );
}
