"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  Maximize2,
  X,
  ChevronDown,
  Film,
  Sparkles,
} from "lucide-react";

interface StickyVideoWidgetProps {
  onEnquireClick?: () => void;
}

export default function StickyVideoWidget({
  onEnquireClick,
}: StickyVideoWidgetProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const modalVideoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  // Synchronize playing state with video element
  useEffect(() => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.play().catch(() => {
        setIsPlaying(false);
      });
    } else {
      videoRef.current.pause();
    }
  }, [isPlaying]);

  // Synchronize muted state
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
    if (modalVideoRef.current) {
      modalVideoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // Handle play/pause toggle
  const togglePlay = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsPlaying((prev) => !prev);
  };

  // Handle sound toggle
  const toggleSound = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsMuted((prev) => !prev);
  };

  // Open expanded modal
  const handleOpenModal = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsModalOpen(true);
    setIsMuted(false);
  };

  // Close expanded modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  // Scroll to enquiry section
  const handleEnquireAction = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (isModalOpen) {
      setIsModalOpen(false);
    }
    if (onEnquireClick) {
      onEnquireClick();
    } else {
      const el = document.getElementById("enquire");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  if (isDismissed) {
    return null;
  }

  return (
    <>
      {/* ============================================================ */}
      {/* 1. STICKY RIGHT VIDEO WIDGET (Collapsed or Normal)           */}
      {/* ============================================================ */}
      <aside
        aria-label="Opus 1 Video Walkthrough Widget"
        className="fixed right-2.5 sm:right-5 bottom-20 lg:bottom-6 z-40 select-none animate-fade-in"
      >
        {isCollapsed ? (
          /* Mini Floating Pill when minimized */
          <button
            type="button"
            onClick={() => setIsCollapsed(false)}
            className="group relative flex items-center gap-2 px-3 py-2 bg-charcoal-950/95 hover:bg-charcoal-900 border border-gold/60 text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-gold"
            aria-label="Expand video walkthrough"
          >
            {/* Pulsing ring indicator */}
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gold" />
            </span>

            <Film className="w-3.5 h-3.5 text-gold group-hover:rotate-12 transition-transform" />
            <span className="text-[11px] font-semibold tracking-wider font-mono uppercase text-ivory-100">
              Video Tour
            </span>
          </button>
        ) : (
          /* Sleek Compact Sticky Video Card */
          <div className="relative group w-28 sm:w-32 md:w-36 aspect-[9/16] rounded-xl overflow-hidden bg-charcoal-950 border border-gold/40 shadow-[0_8px_30px_-5px_rgba(212,175,55,0.3)] transition-all duration-300 hover:border-gold hover:shadow-[0_12px_36px_-5px_rgba(212,175,55,0.45)]">
            {/* HTML5 Video Element */}
            <video
              ref={videoRef}
              src="/Opusvideo.mp4"
              playsInline
              autoPlay
              muted={isMuted}
              loop
              preload="metadata"
              onClick={() => togglePlay()}
              className="w-full h-full object-cover cursor-pointer"
            />

            {/* Top Vignette Gradient Overlay */}
            <div className="absolute top-0 inset-x-0 h-12 bg-gradient-to-b from-black/85 via-black/40 to-transparent pointer-events-none" />

            {/* Top Action Header */}
            <div className="absolute top-1.5 inset-x-1.5 flex items-center justify-between z-10">
              {/* Live Walkthrough Badge */}
              <div className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[8.5px] font-mono font-medium text-white">
                <span className="w-1 h-1 rounded-full bg-red-500 animate-pulse" />
                <span>Tour</span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-0.5">
                {/* Sound Toggle */}
                <button
                  type="button"
                  onClick={toggleSound}
                  className="p-1 rounded-full bg-black/60 hover:bg-black/90 text-white hover:text-gold transition-colors backdrop-blur-md"
                  aria-label={isMuted ? "Unmute video" : "Mute video"}
                  title={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? (
                    <VolumeX className="w-3 h-3" />
                  ) : (
                    <Volume2 className="w-3 h-3 text-gold" />
                  )}
                </button>

                {/* Maximize to Modal */}
                <button
                  type="button"
                  onClick={handleOpenModal}
                  className="p-1 rounded-full bg-black/60 hover:bg-black/90 text-white hover:text-gold transition-colors backdrop-blur-md"
                  aria-label="Expand video in theater mode"
                  title="Expand"
                >
                  <Maximize2 className="w-3 h-3" />
                </button>

                {/* Minimize to Pill */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsCollapsed(true);
                  }}
                  className="p-1 rounded-full bg-black/60 hover:bg-black/90 text-white hover:text-gold transition-colors backdrop-blur-md"
                  aria-label="Minimize video"
                  title="Minimize"
                >
                  <ChevronDown className="w-3 h-3" />
                </button>

                {/* Close / Dismiss */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsDismissed(true);
                  }}
                  className="p-1 rounded-full bg-black/60 hover:bg-black/90 text-white hover:text-red-400 transition-colors backdrop-blur-md"
                  aria-label="Close video widget"
                  title="Close"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Center Play/Pause Indicator (Shown when paused or hovered) */}
            <button
              type="button"
              onClick={() => togglePlay()}
              className={`absolute inset-0 m-auto w-8 h-8 rounded-full bg-black/50 backdrop-blur-md text-white border border-white/20 flex items-center justify-center transition-opacity duration-200 ${
                isPlaying ? "opacity-0 group-hover:opacity-85" : "opacity-95"
              }`}
              aria-label={isPlaying ? "Pause video" : "Play video"}
            >
              {isPlaying ? (
                <Pause className="w-3.5 h-3.5 text-white" />
              ) : (
                <Play className="w-3.5 h-3.5 text-gold ml-0.5" />
              )}
            </button>

            {/* Bottom Vignette & Information Overlay */}
            <div className="absolute bottom-0 inset-x-0 p-2 bg-gradient-to-t from-black/95 via-black/80 to-transparent flex flex-col gap-1 z-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold text-white tracking-wide truncate leading-tight">
                    The Opus 1
                  </p>
                  <p className="text-[8px] text-ivory-300/80 font-mono">
                    JM Road, Pune
                  </p>
                </div>
                {/* Audio Status pill */}
                {isMuted && (
                  <button
                    type="button"
                    onClick={toggleSound}
                    className="text-[8px] font-mono px-1 py-0.5 bg-gold/20 hover:bg-gold/30 text-gold rounded border border-gold/30 transition-colors"
                  >
                    Sound
                  </button>
                )}
              </div>

              {/* Quick Action Button */}
              <button
                type="button"
                onClick={handleEnquireAction}
                className="w-full py-1 px-1.5 bg-gradient-to-r from-gold via-gold-light to-gold text-charcoal-950 text-[9px] font-bold tracking-wider uppercase rounded shadow-sm transition-all duration-200 hover:brightness-110 active:scale-95 flex items-center justify-center gap-1"
              >
                <Sparkles className="w-2.5 h-2.5 shrink-0" />
                <span className="truncate">Visit</span>
              </button>
            </div>
          </div>
        )}
      </aside>

      {/* ============================================================ */}
      {/* 2. THEATER MODE EXPANDED MODAL                                */}
      {/* ============================================================ */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Opus 1 Video Walkthrough Theater"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-950/85 backdrop-blur-md animate-fade-in"
          onClick={handleCloseModal}
        >
          <div
            className="relative w-full max-w-[340px] sm:max-w-[390px] max-h-[88vh] aspect-[9/16] rounded-2xl overflow-hidden bg-charcoal-950 border border-gold/50 shadow-[0_25px_60px_-15px_rgba(212,175,55,0.4)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Video Element */}
            <video
              ref={modalVideoRef}
              src="/Opusvideo.mp4"
              playsInline
              autoPlay
              controls
              muted={isMuted}
              loop
              className="w-full h-full object-cover bg-black"
            />

            {/* Modal Top Close Bar */}
            <div className="absolute top-3 right-3 z-20 flex items-center gap-2">
              <button
                type="button"
                onClick={toggleSound}
                className="p-2 rounded-full bg-black/70 hover:bg-black/90 text-white hover:text-gold transition-colors backdrop-blur-md border border-white/10"
                aria-label={isMuted ? "Unmute sound" : "Mute sound"}
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4 text-gold" />
                )}
              </button>
              <button
                type="button"
                onClick={handleCloseModal}
                className="p-2 rounded-full bg-black/70 hover:bg-black/90 text-white hover:text-red-400 transition-colors backdrop-blur-md border border-white/10"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
