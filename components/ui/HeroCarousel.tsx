'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import styles from './HeroCarousel.module.css';

interface HeroSlide {
  id: number;
  /** Replace gradient with `backgroundImage: url(...)` when real photos are available */
  background: string;
  alt: string;
}

const heroSlides: HeroSlide[] = [
  {
    id: 1,
    background:
      "url('/images/hero/hero-1.jpg') center/contain no-repeat",
    alt: 'Models in bold patterned fashion — The Essentials collection',
  },
  {
    id: 2,
    background:
      "url('/images/hero/hero-2.jpg') center/contain no-repeat",
    alt: 'Close-up of premium Italian fabric texture — New Season',
  },
  {
    id: 3,
    background:
      'linear-gradient(145deg, #1c1c1c 0%, #2d2420 30%, #3d2e1e 55%, #1c1c1c 100%)',
    alt: 'Editorial shot — structured silhouettes at golden hour',
  },
  {
    id: 4,
    background:
      'linear-gradient(130deg, #0c0c0c 0%, #1a1a2a 35%, #222236 60%, #0c0c0c 100%)',
    alt: 'Backstage fitting — precise tailoring detail',
  },
  {
    id: 5,
    background:
      'linear-gradient(155deg, #1e1e1e 0%, #2a2824 30%, #342e24 50%, #1e1e1e 100%)',
    alt: 'The Edit collection — curated wardrobe essentials',
  },
];

const SLIDE_DURATION = 6000;

export function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const goToSlide = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % heroSlides.length);
  }, []);

  // Auto-advance timer
  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(nextSlide, SLIDE_DURATION);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, nextSlide, activeIndex]);

  // Restart progress bar animation on slide change
  useEffect(() => {
    const el = progressRef.current;
    if (!el) return;
    el.style.animation = 'none';
    // Force reflow
    void el.offsetHeight;
    el.style.animation = '';
  }, [activeIndex]);

  return (
    <div
      className={styles.carousel}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-label="Hero image carousel"
      aria-roledescription="carousel"
    >
      {/* Slides */}
      {heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`${styles.slide} ${index === activeIndex ? styles.slideActive : ''}`}
          role="group"
          aria-roledescription="slide"
          aria-label={`Slide ${index + 1} of ${heroSlides.length}: ${slide.alt}`}
          aria-hidden={index !== activeIndex}
        >
          <div
            className={styles.slideImage}
            style={{ background: slide.background }}
          />
        </div>
      ))}

      {/* Contrast overlays */}
      <div className={styles.overlayGradient} aria-hidden="true" />
      <div className={styles.overlayVignette} aria-hidden="true" />

      {/* Slide indicators */}
      <div className={styles.indicators} role="tablist" aria-label="Slide controls">
        {heroSlides.map((slide, index) => (
          <button
            key={slide.id}
            className={`${styles.indicator} ${index === activeIndex ? styles.indicatorActive : ''}`}
            onClick={() => goToSlide(index)}
            role="tab"
            aria-selected={index === activeIndex}
            aria-label={`Go to slide ${index + 1}`}
          >
            <span className={styles.indicatorBar}>
              {index === activeIndex && (
                <span
                  ref={index === activeIndex ? progressRef : undefined}
                  className={styles.indicatorProgress}
                  style={{
                    animationDuration: `${SLIDE_DURATION}ms`,
                    animationPlayState: isPaused ? 'paused' : 'running',
                  }}
                />
              )}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
