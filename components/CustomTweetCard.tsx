"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

interface TweetData {
  username: string;
  handle: string;
  avatar: string;
  content: string[];
  hashtags: string[];
  likes: number;
  comments: number;
  shares: number;
}

const tweets: TweetData[] = [
  {
    username: "detooseto",
    handle: "@fadhillaufars",
    avatar: "/detomc.jpeg",
    content: [
      "Baru aja kelar bikin portfolio buat @Cretivox! 🚀✨",
      "coba lihat apa yang gue bikin 😅",
      "bismillah, uhuyy lesgooo! "
    ],
    hashtags: ["#cielegawa", "#Cretivox", "#DoaSemogaDiterima"],
    likes: 42,
    comments: 12,
    shares: 8
  },
 
  {
    username: "detosetoo",
    handle: "@fadhillaufars",
    avatar: "/detomc.jpeg",
    content: [
      "nyoba bikin web pake next.js dan gsap! ✨",
      "rada pusing eyy, tapii kita coba tipis-tipis duluu 😅",
      "pengen explore lagi pake gsap, liat web cretivox mahal banget.."
    ],
    hashtags: ["#cielegawa", "#GSAP", "#UIDesign"],
    likes: 51,
    comments: 15,
    shares: 11
  }
];

const CustomTweetCard = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current.filter(card => card !== null);

    if (!section || cards.length === 0) return;

    gsap.set(cards, { 
      scale: 0.9, 
      opacity: 0,
      y: 30
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    });

    cards.forEach((card, index) => {
      tl.to(card, {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power4.out'
      }, index * 0.2);

      // Add parallax scroll effect to each card
      gsap.to(card, {
        y: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: card,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-[50vh] md:min-h-screen bg-white dark:bg-black px-4 sm:px-6 md:px-12 py-8 md:py-12 lg:py-20"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-black dark:text-white uppercase tracking-[-1px] sm:tracking-[-2px] leading-none text-center mb-8 md:mb-12 lg:mb-16">
          apa kata dunia 😂
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8">
          {tweets.map((tweet, index) => (
            <div
              key={index}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="relative flex flex-col gap-4 overflow-hidden border-4 border-white dark:border-white bg-white dark:bg-black p-6 backdrop-blur-md shadow-2xl hover:shadow-3xl transition-shadow duration-300"
            >
              {/* Header */}
              <div className="flex flex-row justify-between items-start">
                <div className="flex items-center space-x-3">
                  <div className="relative w-12 h-12 shrink-0">
                    <Image
                      src={tweet.avatar}
                      alt={tweet.username}
                      fill
                      className="rounded-full border-1 border-black dark:border-white object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-base text-black dark:text-white">
                        {tweet.username}
                      </h3>
                      <svg
                        viewBox="0 0 24 24"
                        className="w-4 h-4 text-blue-500 fill-current"
                        aria-label="Verified"
                      >
                        <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z" />
                      </svg>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {tweet.handle}
                    </p>
                  </div>
                </div>
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  className="w-5 h-5 text-[#3BA9EE]"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g>
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path d="M22.162 5.656a8.384 8.384 0 0 1-2.402.658A4.196 4.196 0 0 0 21.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 0 0-7.126 3.814 11.874 11.874 0 0 1-8.62-4.37a4.168 4.168 0 0 0-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 0 1-1.894-.523v.052a4.185 4.185 0 0 0 3.355 4.101 4.21 4.21 0 0 1-1.89.072A4.185 4.185 0 0 0 7.97 16.65a8.394 8.394 0 0 1-6.191 1.732 11.83 11.83 0 0 0 6.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 0 0 2.087-2.165z"></path>
                  </g>
                </svg>
              </div>

              {/* Body */}
              <div className="leading-relaxed tracking-normal space-y-2 flex-1">
                {tweet.content.map((paragraph, pIndex) => (
                  <p key={pIndex} className="text-sm text-black dark:text-white font-medium">
                    {paragraph}
                  </p>
                ))}
                <p className="text-sm text-black dark:text-white font-medium pt-2">
                  {tweet.hashtags.map((tag, tIndex) => (
                    <span key={tIndex} className="text-[#3BA9EE] mr-2">{tag}</span>
                  ))}
                </p>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-6 pt-3 border-t-2 border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2 text-xs">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span className="font-semibold">{tweet.likes}</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span className="font-semibold">{tweet.comments}</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  <span className="font-semibold">{tweet.shares}</span>
                </div>
              </div>

              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-black dark:border-white opacity-20"></div>
              <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-black dark:border-white opacity-20"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomTweetCard;
