"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollIndicator = () => {
  const indicatorRef = useRef(null);

  useEffect(() => {
    const indicator = indicatorRef.current;
    if (!indicator) return;

    // Infinite bounce animation
    gsap.to(indicator, {
      y: 10,
      duration: 0.8,
      ease: 'power1.inOut',
      repeat: -1,
      yoyo: true
    });

    // Hide when scrolling past hero section
    ScrollTrigger.create({
      trigger: indicator,
      start: 'top top',
      end: 'bottom top',
      onLeave: () => {
        gsap.to(indicator, {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      },
      onEnterBack: () => {
        gsap.to(indicator, {
          opacity: 1,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === indicator) trigger.kill();
      });
    };
  }, []);

  return (
    <div
      ref={indicatorRef}
      className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-20"
      onClick={() => {
        window.scrollTo({
          top: window.innerHeight,
          behavior: 'smooth'
        });
      }}
    >
      <span className="text-sm sm:text-base md:text-lg font-medium text-black dark:text-white uppercase tracking-wider">
        Scroll Down
      </span>
      <svg
        className="w-6 h-6 sm:w-8 sm:h-8 text-black dark:text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 14l-7 7m0 0l-7-7m7 7V3"
        />
      </svg>
    </div>
  );
};

export default ScrollIndicator;
