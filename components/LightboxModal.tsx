"use client";

import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";

export interface LightboxMedia {
  src: string;
  title: string;
  category?: string;
  caption?: string;
  aspectRatio?: string;
}

interface LightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  media: LightboxMedia | null;
  items?: LightboxMedia[];
  currentIndex?: number;
  onIndexChange?: (newIndex: number) => void;
}

export default function LightboxModal({
  isOpen,
  onClose,
  media,
  items,
  currentIndex = 0,
  onIndexChange,
}: LightboxModalProps) {
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  // Reset zoom on item change
  useEffect(() => {
    setZoomLevel(1);
  }, [currentIndex, media]);

  // Handle keyboard events
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowRight" && items && onIndexChange) {
        onIndexChange((currentIndex + 1) % items.length);
      } else if (e.key === "ArrowLeft" && items && onIndexChange) {
        onIndexChange((currentIndex - 1 + items.length) % items.length);
      }
    },
    [isOpen, items, currentIndex, onClose, onIndexChange]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen || !media) return null;

  const currentItem = items && items[currentIndex] ? items[currentIndex] : media;
  const hasMultiple = Boolean(items && items.length > 1);

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.5, 1));
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label={currentItem.title}
    >
      {/* Top Action Bar */}
      <div className="absolute top-0 inset-x-0 z-20 flex items-center justify-between p-4 sm:p-6 bg-gradient-to-b from-black/80 to-transparent">
        <div className="space-y-0.5 max-w-xl pr-4">
          <span className="text-[10px] font-mono uppercase tracking-widest text-gold block">
            {currentItem.category || "Architectural Document"}
          </span>
          <h3 className="text-base sm:text-lg font-serif font-medium text-white truncate">
            {currentItem.title}
          </h3>
        </div>

        {/* Zoom & Close Controls */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="hidden sm:flex items-center space-x-1 bg-charcoal-900/90 border border-charcoal-700 rounded-sm px-2 py-1 text-xs text-ivory-200">
            <button
              type="button"
              onClick={handleZoomOut}
              disabled={zoomLevel <= 1}
              className="p-1 hover:text-gold disabled:opacity-30"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="font-mono text-[11px] px-1">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              type="button"
              onClick={handleZoomIn}
              disabled={zoomLevel >= 3}
              className="p-1 hover:text-gold disabled:opacity-30"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            {zoomLevel > 1 && (
              <button
                type="button"
                onClick={handleResetZoom}
                className="p-1 hover:text-gold ml-1 text-gold"
                title="Reset Zoom"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2.5 bg-charcoal-800 hover:bg-gold hover:text-charcoal-950 text-white rounded-sm transition-all focus:outline-none focus:ring-2 focus:ring-gold"
            aria-label="Close Lightbox"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Image Container */}
      <div className="relative w-full h-full flex items-center justify-center p-4 sm:p-12 overflow-auto">
        <div
          className="relative max-w-5xl max-h-[75vh] w-full h-full flex items-center justify-center transition-transform duration-200 select-none"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          <Image
            src={currentItem.src}
            alt={currentItem.title}
            fill
            className="object-contain"
            sizes="(max-width: 1280px) 100vw, 1200px"
            quality={95}
            priority
          />
        </div>
      </div>

      {/* Left / Right Carousel Controls */}
      {hasMultiple && (
        <>
          <button
            type="button"
            onClick={() =>
              onIndexChange &&
              onIndexChange(
                (currentIndex - 1 + (items?.length || 1)) %
                  (items?.length || 1)
              )
            }
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/60 hover:bg-gold hover:text-charcoal-950 text-white rounded-sm backdrop-blur-sm transition-all z-20 focus:outline-none focus:ring-2 focus:ring-gold"
            aria-label="Previous Image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            type="button"
            onClick={() =>
              onIndexChange &&
              onIndexChange((currentIndex + 1) % (items?.length || 1))
            }
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/60 hover:bg-gold hover:text-charcoal-950 text-white rounded-sm backdrop-blur-sm transition-all z-20 focus:outline-none focus:ring-2 focus:ring-gold"
            aria-label="Next Image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Bottom Caption & Counter */}
      <div className="absolute bottom-0 inset-x-0 z-20 p-4 sm:p-6 bg-gradient-to-t from-black/90 via-black/60 to-transparent flex flex-col sm:flex-row items-center justify-between text-xs text-ivory-300 gap-2">
        <p className="max-w-2xl text-center sm:text-left text-ivory-300 font-light text-xs sm:text-sm">
          {currentItem.caption ||
            "Authentic brochure artwork from The Opus 1 commercial project documentation."}
        </p>
        {hasMultiple && items && (
          <div className="font-mono text-xs text-gold">
            {currentIndex + 1} / {items.length}
          </div>
        )}
      </div>
    </div>
  );
}
