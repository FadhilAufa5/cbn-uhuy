"use client";

import React from "react";
import SplitText from "../components/SplitText";
import { HeroParallax } from "../components/ui/hero-parallax";
import { StaggeredMenu } from "../components/StaggeredMenu";
import AboutSection from "../components/AboutSection";
import FlowingMenu from "../components/FlowingMenu";
import CustomTweetCard from "../components/CustomTweetCard";
import Footer from "../components/Footer";
import ScrollIndicator from "../components/ScrollIndicator";
import ScrollToTop from "../components/ScrollToTop";



export function HeroParallaxDemo() {
  return <HeroParallax products={products} />;
}
export const products = [
  {
    title: "Netflix Clone",
    link: "#",
    thumbnail: "/netflixuhuy.png",
  },
  {
    title: "Budayaku Website",
    link: "#",
    thumbnail: "/budayaku.png",
  },
  {
    title: "KDMP x KFA Project",
    link: "#",
    thumbnail: "/kdmpxkfa.png",
  },
  {
    title: "Coffee Shop Landing",
    link: "#",
    thumbnail: "/kopiuhuy.png",
  },
  {
    title: "FindMeet App",
    link: "#",
    thumbnail: "/findmeet.jpg",
  },
  {
    title: "Valid Project",
    link: "#",
    thumbnail: "/valid.png",
  },
  {
    title: "Xyzie Portfolio",
    link: "#",
    thumbnail: "/xyzie.jpg",
  },
 {
    title: "Valid",
    link: "#",
    thumbnail: "/valid.png",
  },
   {
    title: "FindMeet Social",
    link: "#",
    thumbnail: "/findmeet.jpg",
  },
  {
    title: "Netflix UI Redesign",
    link: "#",
    thumbnail: "/netflixuhuy.png",
  },
  {
    title: "FindMeet Social",
    link: "#",
    thumbnail: "/findmeet.jpg",
  },
  {
    title: "Digital Platform",
    link: "#",
    thumbnail: "/kdmpxkfa.png",
  },
  {
    title: "Validuhuy",
    link: "#",
    thumbnail: "/valid.png",
  },
  {
    title: "Creative Portfolio",
    link: "#",
    thumbnail: "/xyzie.jpg",
  },
 {
    title: "Valid Dashboard",
    link: "#",
    thumbnail: "/valid.png",
  },
];

export default function Home() {
  const menuItems = [
    { label: "Home", link: "#home", ariaLabel: "Navigate to home section" },
    { label: "About", link: "#about", ariaLabel: "Navigate to about section" },
    { label: "Projects", link: "#projects", ariaLabel: "Navigate to projects section" },
  
  ];

  const socialLinks = [
    { label: "Instagram", link: "https://www.instagram.com/detooseto/" },
    { label: "GitHub", link: "https://github.com/FadhilAufa5" },
    { label: "LinkedIn", link: "https://www.linkedin.com/in/fadhillaufars5" },
    { label: "Portfolio", link: "https://fadhillaufars.vercel.app/" }
  ];

  const flowingMenuItems = [
    { link: "#about", text: "jadi gini.." },
    { link: "#projects", text: "gue buat portfolio" },
    { link: "#projects", text: "bingung sebenarnya.." },
    { link: "#contact", text: "tapi.. okelahh" }
  ];

  return (
    
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <StaggeredMenu 
        items={menuItems}
        socialItems={socialLinks}
        displaySocials={true}
        displayItemNumbering={true}
        isFixed={true}
        position="right"
        colors={['#1a1a1a', '#2d2d2d', '#404040']}
        accentColor="#5227FF"
        menuButtonColor="#000"
        openMenuButtonColor="#000"
        changeMenuColorOnOpen={true}
        closeOnClickAway={true}
        logoUrl="/Logo Cretivox - Black.png"
      />
      <div id="home" className="relative flex min-h-screen items-center justify-center px-4 sm:px-6 md:px-8 py-16 sm:py-20">
        <div className="relative z-10 w-full max-w-7xl mx-auto">
          <SplitText
            text="Hello, CRETIVOX!"
            className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-[150px] font-semibold text-center text-black dark:text-white leading-tight"
            delay={100}
            duration={0.5}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
            onLetterAnimationComplete={() => {}}
          />
        </div>
        <ScrollIndicator />
      </div>

      <section className="min-h-screen h-auto md:h-screen w-full relative">
        <FlowingMenu items={flowingMenuItems} />
      </section>

      <div id="about">
        <AboutSection />
      </div>

      <div id="projects">
        <HeroParallaxDemo />
      </div>

      <CustomTweetCard />

      <Footer />
    
     

      <ScrollToTop />
    </div>
  );
}
