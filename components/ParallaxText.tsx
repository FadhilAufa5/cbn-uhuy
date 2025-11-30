"use client";

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ParallaxTextProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  direction?: 'up' | 'down';
}

const ParallaxText: React.FC<ParallaxTextProps> = ({ 
  children, 
  className = '', 
  speed = 0.5,
  direction = 'up'
}) => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = textRef.current;
    if (!element) return;

    const yMovement = direction === 'up' ? -100 : 100;

    gsap.fromTo(
      element,
      {
        y: yMovement * speed,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: element,
          start: 'top 90%',
          end: 'top 20%',
          scrub: 1,
          toggleActions: 'play none none reverse'
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === element) trigger.kill();
      });
    };
  }, [speed, direction]);

  return (
    <div ref={textRef} className={className}>
      {children}
    </div>
  );
};

export default ParallaxText;
