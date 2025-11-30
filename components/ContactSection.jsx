"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonsRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    const heading = headingRef.current;
    const description = descriptionRef.current;
    const buttons = buttonsRef.current;

    if (!section || !container || !heading || !description || !buttons) return;

    // Set initial states
    gsap.set(container, { 
      scale: 0.8, 
      opacity: 0,
      borderWidth: 0
    });

    gsap.set([heading, description, buttons], { 
      opacity: 0, 
      y: 50 
    });

    // Create timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 70%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    });

    // Animate container first
    tl.to(container, {
      scale: 1,
      opacity: 1,
      borderWidth: 16,
      duration: 0.8,
      ease: 'power4.out'
    })
    // Then animate content
    .to(heading, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power4.out'
    }, '-=0.4')
    .to(description, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power4.out'
    }, '-=0.5')
    .to(buttons, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power4.out'
    }, '-=0.4');

    // Animate individual button items
    const buttonItems = buttons.querySelectorAll('a');
    gsap.set(buttonItems, { scale: 0, opacity: 0 });
    
    gsap.to(buttonItems, {
      scale: 1,
      opacity: 1,
      duration: 0.5,
      stagger: 0.1,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: buttons,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === section || trigger.trigger === buttons) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center bg-white dark:bg-black px-4 sm:px-6 md:px-12 py-12 md:py-0"
    >
      <div
        ref={containerRef}
        className="text-center max-w-5xl mx-auto border-2 sm:border-4 border-black dark:border-white p-6 sm:p-8 md:p-12 lg:p-20"
      >
        <h2
          ref={headingRef}
          className="text-3xl sm:text-5xl md:text-[6rem] lg:text-[8rem] font-semibold text-black dark:text-white uppercase tracking-[-1px] sm:tracking-[-2px] leading-none mb-4 sm:mb-6 md:mb-8"
        >
          Let's Connect!
        </h2>
        <p
          ref={descriptionRef}
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 dark:text-gray-300 font-medium mb-8 sm:mb-10 md:mb-12 leading-relaxed"
        >
          Interested in working together? Feel free to reach out through social media or drop me an email.
        </p>
        <div
          ref={buttonsRef}
          className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center"
        >
          <a
            href="mailto:contact@cretivox.com"
            className="px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 bg-black dark:bg-white text-white dark:text-black text-base sm:text-lg font-semibold uppercase tracking-tight hover:scale-105 transition-transform duration-300"
          >
            Email Me
          </a>
          <a
            href="#about"
            className="px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 bg-white dark:bg-black text-black dark:text-white border-2 border-black dark:border-white text-base sm:text-lg font-semibold uppercase tracking-tight hover:scale-105 transition-transform duration-300"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
