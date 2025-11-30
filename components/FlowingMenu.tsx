'use client';

import React from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

interface FlowingMenuItem {
  link: string;
  text: string;
}

interface FlowingMenuProps {
  items?: FlowingMenuItem[];
}

/**
 * FlowingMenu with custom cursor logo
 * - Logo follows mouse on hover
 * - Smooth GSAP animations
 * - ScrollTrigger entrance animations
 * - Elegant transitions
 */
function FlowingMenu({ items = [] }: FlowingMenuProps) {
  const cursorRef = React.useRef<HTMLDivElement>(null);
  const menuRef = React.useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = React.useState(false);

  React.useEffect(() => {
    const cursor = cursorRef.current;
    const menu = menuRef.current;
    if (!cursor || !menu) return;

    // ScrollTrigger animation for menu entrance
    const menuItems = menu.querySelectorAll('.flowing-menu-item');
    
    gsap.set(menuItems, { 
      opacity: 0, 
      y: 100,
      scale: 0.9
    });

    gsap.to(menuItems, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: 'power4.out',
      stagger: 0.15,
      scrollTrigger: {
        trigger: menu,
        start: 'top 80%',
        end: 'top 20%',
        toggleActions: 'play none none reverse'
      }
    });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = menu.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      gsap.to(cursor, {
        x: x,
        y: y,
        duration: 0.6,
        ease: 'power3.out'
      });
    };

    const handleMouseEnter = () => {
      setIsHovering(true);
      gsap.to(cursor, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: 'power3.out'
      });
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      gsap.to(cursor, {
        opacity: 0,
        scale: 0.5,
        duration: 0.4,
        ease: 'power3.in'
      });
    };

    menu.addEventListener('mousemove', handleMouseMove);
    menu.addEventListener('mouseenter', handleMouseEnter);
    menu.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === menu) trigger.kill();
      });
      menu.removeEventListener('mousemove', handleMouseMove);
      menu.removeEventListener('mouseenter', handleMouseEnter);
      menu.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div 
      ref={menuRef}
      className="w-full h-full bg-white dark:bg-black relative overflow-hidden"
      style={{ cursor: isHovering ? 'none' : 'default' }}
    >
      {/* Custom Cursor Logo */}
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-50 hidden sm:block"
        style={{
          opacity: 0,
          transform: 'translate(-50%, -50%) scale(0.5)',
          willChange: 'transform, opacity'
        }}
      >
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24">
          <Image
            src="/Logo Cretivox - Black.png"
            alt="Cretivox Logo"
            fill
            sizes="(max-width: 640px) 64px, (max-width: 768px) 80px, 96px"
            className="object-contain mix-blend-difference"
            priority
          />
        </div>
      </div>

      <nav className="flex flex-col h-full">
        {items.map((item, idx) => (
          <MenuItem key={idx} {...item} index={idx} />
        ))}
      </nav>
    </div>
  );
}

function MenuItem({ link, text, index }: FlowingMenuItem & { index: number }) {
  const textRef = React.useRef<HTMLSpanElement>(null);
  const underlineRef = React.useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    gsap.to(textRef.current, {
      scale: 1.08,
      duration: 0.35,
      ease: "power2.out"
    });

    gsap.to(underlineRef.current, {
      scaleX: 1,
      duration: 0.45,
      ease: "power3.out"
    });
  };

  const handleMouseLeave = () => {
    gsap.to(textRef.current, {
      scale: 1,
      duration: 0.35,
      ease: "power2.out"
    });

    gsap.to(underlineRef.current, {
      scaleX: 0,
      duration: 0.45,
      ease: "power3.in"
    });
  };

  return (
    <div 
      className="flowing-menu-item flex-1 relative border-t border-black dark:border-white first:border-t-0"
    >
      <a
        href={link}
        className="flex items-center justify-center h-full w-full relative group py-6 sm:py-8 md:py-0"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Text */}
        <span
          ref={textRef}
          className="text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-[6rem] font-semibold text-black dark:text-white uppercase tracking-[-1px] sm:tracking-[-2px] leading-tight px-3 sm:px-4 md:px-6 text-center"
        >
          {text}
        </span>

        {/* Underline */}
        <div
          ref={underlineRef}
          className="absolute bottom-2 sm:bottom-3 md:bottom-4 lg:bottom-8 left-1/2 h-0.5 sm:h-1 w-24 sm:w-32 md:w-48 lg:w-64 bg-black dark:bg-white origin-center"
          style={{
            transform: "translateX(-50%) scaleX(0)",
            transformOrigin: "center"
          }}
        />

        {/* Number */}
        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 lg:top-8 lg:right-8">
          <span className="text-xs sm:text-sm md:text-base font-medium text-gray-500 dark:text-gray-400">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
      </a>
    </div>
  );
}


export default FlowingMenu;
