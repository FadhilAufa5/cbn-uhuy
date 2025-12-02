"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { PixelatedCanvas } from './ui/pixelated-canvas';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const skillsRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const content = contentRef.current;
    const skills = skillsRef.current;

    if (!section || !image || !content || !skills) return;

    gsap.set([image, content, skills], { opacity: 0, y: 30, willChange: 'opacity, transform' });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    });

    tl.to(image, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', clearProps: 'willChange' })
      .to(content, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', clearProps: 'willChange' }, '-=0.4')
      .to(skills, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', clearProps: 'willChange' }, '-=0.4');

    const skillItems = skills.querySelectorAll('.skill-item');
    skillItems.forEach((item, index) => {
      gsap.fromTo(
        item,
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          delay: index * 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const skills = [
    { name: 'React.js' },
    { name: 'TypeScript'},
    { name: 'JavaScript' },
    { name: 'HTML & CSS' },
    { name: 'Tailwind CSS' },
    { name: 'Laravel' }
  ];

  return (
    <section
      ref={sectionRef}
      className="min-h-[60vh] md:min-h-screen bg-white dark:bg-black py-8 md:py-12 lg:py-20 px-6 md:px-12 lg:px-20"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
    

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 lg:gap-20 items-start mb-8 md:mb-16 lg:mb-24">
          {/* Image Section */}
          <div ref={imageRef} className="relative px-4 md:px-0">
            <div className="relative w-full max-w-md mx-auto group">
              <div className="absolute inset-0 bg-black dark:bg-white transform translate-x-4 translate-y-4 transition-transform duration-500 group-hover:translate-x-6 group-hover:translate-y-6"></div>
              
              <div className="relative w-full border-4 border-black dark:border-white overflow-hidden bg-black dark:bg-black transition-all duration-500 group-hover:shadow-2xl">
                <PixelatedCanvas
                  src="/sapabae.png"
                  width={500}
                  height={600}
                  cellSize={6}
                  dotScale={0.6}
                  shape="circle"
                  backgroundColor="#000000"
                  grayscale={false}
                  interactive={true}
                  distortionStrength={15}
                  distortionRadius={150}
                  distortionMode="swirl"
                  followSpeed={0.2}
                  tintColor="#5227FF"
                  tintStrength={0.2}
                  objectFit="cover"
                  jitterStrength={6}
                  jitterSpeed={4}
                  fadeOnLeave={true}
                  fadeSpeed={0.15}
                  dropoutStrength={0.3}
                  maxFps={30}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div ref={contentRef} className="space-y-6 md:space-y-8 lg:pt-8 px-4 md:px-0">
            <div className="space-y-3 sm:space-y-4 md:space-y-6 border-b-2 border-black dark:border-white pb-4 sm:pb-6 md:pb-8">
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[4rem] font-semibold text-black dark:text-white uppercase tracking-[-1px] sm:tracking-[-2px] leading-none">
                Fadhil Aufa Rafiqi Seto
              </h3>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-black dark:text-white font-medium uppercase tracking-tight">
                Web Developer
              </p>
              
            </div>

            <div className="space-y-4 sm:space-y-5 md:space-y-6 text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
              <p>
                Halo! Gue Fadhil Aufa, seorang web developer yang passionate dalam membangun 
                aplikasi modern dan high-performance dengan user experience yang intuitif. 
                Gue senang bekerja dengan teknologi terkini seperti Artificial Intelligence, 
                Machine Learning, dan Web development, menggabungkan kreativitas dengan 
                presisi untuk menghasilkan solusi yang berdampak.
              </p>
              <p>
                Dengan pengalaman lebih dari 2 tahun dan lebih dari 20 project yang sudah selesai, 
                gue berkomitmen untuk membantu user dan bisnis berkembang di era digital melalui 
                produk digital yang fungsional, estetik, dan scalable.
              </p>
              <p className="pt-3 sm:pt-4 border-t border-gray-300 dark:border-gray-700">
                <span className="font-semibold text-black dark:text-white uppercase tracking-tight text-sm sm:text-base">
                "Code is poetry, UI is art - together they create magic."</span>
              </p>
            </div>

          </div>
        </div>

        {/* Skills Section */}
        <div ref={skillsRef} className="space-y-6 sm:space-y-8 md:space-y-12 px-4 md:px-0">
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[5rem] font-semibold text-black dark:text-white uppercase tracking-[-1px] sm:tracking-[-2px] leading-none text-center">
            Skill Aku
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="skill-item relative bg-white dark:bg-black border-2 sm:border-3 md:border-4 border-black dark:border-white p-3 sm:p-4 md:p-6 lg:p-8 group transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 cursor-pointer overflow-hidden"
              >
                {/* Animated Background */}
                <div className="absolute inset-0 bg-black dark:bg-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-3 sm:mb-4 md:mb-6">
                    <h4 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold text-black dark:text-white uppercase tracking-tight group-hover:text-white group-hover:dark:text-black transition-colors duration-500">
                      {skill.name}
                    </h4>
                    <span className="text-[10px] sm:text-xs md:text-sm font-bold text-gray-400 dark:text-gray-600 group-hover:text-gray-300 group-hover:dark:text-gray-700 transition-colors duration-500">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                </div>

                {/* Decorative Corner */}
                <div className="absolute top-0 right-0 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 border-t-2 border-r-2 sm:border-t-3 sm:border-r-3 md:border-t-4 md:border-r-4 border-black dark:border-white opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-0 left-0 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 border-b-2 border-l-2 sm:border-b-3 sm:border-l-3 md:border-b-4 md:border-l-4 border-black dark:border-white opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
