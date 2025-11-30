"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    gsap.fromTo(
      footer,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: footer,
          start: 'top 90%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Parallax effect
    gsap.to(footer, {
      y: -20,
      ease: 'none',
      scrollTrigger: {
        trigger: footer,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === footer) trigger.kill();
      });
    };
  }, []);

  return (
    <footer ref={footerRef} className="bg-white dark:border-white py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <div className="flex flex-col items-center justify-center space-y-4">
          <p className="text-base sm:text-lg md:text-xl text-black dark:text-white font-medium text-center">
            Made with <span className="text-red-500 animate-pulse">❤️</span> by{' '}
            <a
              href="https://www.instagram.com/detooseto/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold tracking-tight hover:text-[#5227FF] transition-colors duration-300"
            >
              @detooseto
            </a>
          </p>
          <div className="flex items-center gap-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            <span>© 2025 Fadhil Aufa</span>
            <span>•</span>
            <span>All Rights Reserved</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
