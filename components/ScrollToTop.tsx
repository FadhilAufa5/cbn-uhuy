"use client";

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollToTop = () => {
  const buttonRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    // Initially hide
    gsap.set(button, { opacity: 0, scale: 0, pointerEvents: 'none' });

    // Show/hide based on scroll position
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const shouldShow = scrolled > window.innerHeight;

      if (shouldShow && !isVisible) {
        setIsVisible(true);
        gsap.to(button, {
          opacity: 1,
          scale: 1,
          pointerEvents: 'auto',
          duration: 0.3,
          ease: 'back.out(1.7)'
        });
      } else if (!shouldShow && isVisible) {
        setIsVisible(false);
        gsap.to(button, {
          opacity: 0,
          scale: 0,
          pointerEvents: 'none',
          duration: 0.3,
          ease: 'power2.in'
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isVisible]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      ref={buttonRef}
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 bg-black dark:bg-white text-white dark:text-black p-3 sm:p-4 border-4 border-black dark:border-white shadow-2xl hover:scale-110 transition-transform duration-300 group radius"
      aria-label="Scroll to top"
    >
      <svg
        className="w-5 h-5 sm:w-6 sm:h-6 group-hover:-translate-y-1 transition-transform duration-300"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={3}
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </button>
  );
};

export default ScrollToTop;
