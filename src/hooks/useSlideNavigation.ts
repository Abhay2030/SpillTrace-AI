"use client";

import { useState, useCallback, useEffect } from "react";
import { slides } from "@/data/slides";

export function useSlideNavigation() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const totalSlides = slides.length;

  const goToSlide = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      if (index < 0 || index >= totalSlides) return;

      setIsTransitioning(true);
      setDirection(index > currentSlide ? "forward" : "backward");
      setCurrentSlide(index);

      setTimeout(() => setIsTransitioning(false), 700);
    },
    [currentSlide, isTransitioning, totalSlides]
  );

  const nextSlide = useCallback(() => {
    if (currentSlide < totalSlides - 1) {
      goToSlide(currentSlide + 1);
    }
  }, [currentSlide, totalSlides, goToSlide]);

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) {
      goToSlide(currentSlide - 1);
    }
  }, [currentSlide, goToSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
        case " ":
        case "PageDown":
          e.preventDefault();
          nextSlide();
          break;
        case "ArrowLeft":
        case "ArrowUp":
        case "PageUp":
          e.preventDefault();
          prevSlide();
          break;
        case "Home":
          e.preventDefault();
          goToSlide(0);
          break;
        case "End":
          e.preventDefault();
          goToSlide(totalSlides - 1);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide, goToSlide, totalSlides]);

  return {
    currentSlide,
    direction,
    isTransitioning,
    totalSlides,
    nextSlide,
    prevSlide,
    goToSlide,
    progress: ((currentSlide + 1) / totalSlides) * 100,
  };
}
