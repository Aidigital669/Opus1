"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProjectIntro from "@/components/ProjectIntro";
import OfficeConfigurations from "@/components/OfficeConfigurations";
import ArchitectureGallery from "@/components/ArchitectureGallery";
import Amenities from "@/components/Amenities";
import Specifications from "@/components/Specifications";
import LocationConnectivity from "@/components/LocationConnectivity";
import EnquiryForm from "@/components/EnquiryForm";
import ContactFooter from "@/components/ContactFooter";
import FloatingMobileBar from "@/components/FloatingMobileBar";
import StickyWhatsApp from "@/components/StickyWhatsApp";

export default function Home() {
  const [selectedOffice, setSelectedOffice] = useState<string>("General Enquiry");

  const handleSelectOffice = (officeTitle: string) => {
    setSelectedOffice(officeTitle);
  };

  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden flex flex-col bg-ivory text-charcoal selection:bg-gold selection:text-charcoal-950">
      {/* Section A — Sticky Navigation */}
      <Navbar onEnquireClick={() => handleScrollToSection("enquire")} />

      {/* Main Page Landmark */}
      <main id="main-content" className="flex-1">
        {/* Section B — Cinematic Hero with Architectural Render */}
        <Hero
          onExploreClick={() => handleScrollToSection("offices")}
          onEnquireClick={() => handleScrollToSection("enquire")}
        />

        {/* Section C — Project Perspective & Introduction */}
        <ProjectIntro />

        {/* Section D — Office Configurations & Floor Plans */}
        <OfficeConfigurations
          onSelectOfficeForEnquiry={handleSelectOffice}
        />

        {/* Section E — Architecture & Exterior Gallery */}
        <ArchitectureGallery />

        {/* Section F — Verified Commercial Amenities */}
        <Amenities />

        {/* Section G — Material & Engineering Specifications */}
        <Specifications />

        {/* Section H — Strategic Location & Connectivity */}
        <LocationConnectivity />

        {/* Section I — Commercial Enquiry Form & Site Visit Booking */}
        <EnquiryForm
          selectedOffice={selectedOffice}
          onOfficeChangeHandled={() => setSelectedOffice("General Enquiry")}
        />
      </main>

      {/* Section J — Official Contact & Editorial Footer */}
      <ContactFooter />

      {/* Section K — Floating Mobile Action Controls */}
      <FloatingMobileBar
        onEnquireClick={() => handleScrollToSection("enquire")}
      />

      {/* Sticky Left WhatsApp Button */}
      <StickyWhatsApp />
    </div>
  );
}
