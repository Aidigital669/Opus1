"use client";

import React, { useEffect, useRef, useState } from "react";

interface RevealProps {
  children: React.ReactNode;
  direction?: "left" | "right" | "up" | "down" | "zoom" | "fade";
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  threshold?: number;
  once?: boolean;
  blur?: boolean;
  rootMargin?: string;
}

export default function Reveal({
  children,
  direction = "left",
  delay = 0,
  duration = 750,
  distance = 45,
  className = "",
  threshold = 0.05,
  once = true,
  blur = false,
  rootMargin = "0px 0px -20px 0px",
}: RevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = domRef.current;
    if (!currentRef) return;

    // Check if element is already within viewport on mount
    const rect = currentRef.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setIsVisible(true);
      if (once) return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (once && domRef.current) {
              observer.unobserve(domRef.current);
            }
          } else if (!once) {
            setIsVisible(false);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(currentRef);

    return () => {
      observer.unobserve(currentRef);
    };
  }, [threshold, once, rootMargin]);


  // Initial transform offset based on chosen direction
  const getInitialTransform = () => {
    switch (direction) {
      case "left":
        // Left to right: starts shifted to the left (-X)
        return `translateX(-${distance}px)`;
      case "right":
        // Right to left: starts shifted to the right (+X)
        return `translateX(${distance}px)`;
      case "up":
        return `translateY(${distance}px)`;
      case "down":
        return `translateY(-${distance}px)`;
      case "zoom":
        return "scale(0.92)";
      case "fade":
      default:
        return "none";
    }
  };

  const style: React.CSSProperties = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translate(0, 0) scale(1)" : getInitialTransform(),
    filter: blur ? (isVisible ? "blur(0px)" : "blur(8px)") : undefined,
    transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms${
      blur
        ? `, filter ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`
        : ""
    }`,
    willChange: "opacity, transform",
  };

  return (
    <div ref={domRef} style={style} className={className}>
      {children}
    </div>
  );
}
