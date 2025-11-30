"use client";
import React from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "motion/react";



export const HeroParallax = ({
  products,
}: {
  products: {
    title: string;
    link: string;
    thumbnail: string;
  }[];
}) => {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
    springConfig
  );
  return (
    <div
      ref={ref}
      className="h-[300vh] py-40 overflow-hidden  antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className=""
      >
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-4 sm:space-x-8 md:space-x-12 lg:space-x-20 mb-12 sm:mb-16 md:mb-20">
          {firstRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row mb-12 sm:mb-16 md:mb-20 space-x-4 sm:space-x-8 md:space-x-12 lg:space-x-20">
          {secondRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-4 sm:space-x-8 md:space-x-12 lg:space-x-20">
          {thirdRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const Header = () => {
  const headerRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.3]);

  return (
    <motion.div 
      ref={headerRef}
      style={{ y, opacity }}
      className="max-w-7xl relative mx-auto py-12 sm:py-16 md:py-20 lg:py-40 px-4 sm:px-6 md:px-8 w-full left-0 top-0"
    >
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold dark:text-white leading-tight">
        Project Aku & <br />
        Disini mau cerita sedikit 🙏🏻
      </h1>
      <p className="max-w-2xl text-sm sm:text-base md:text-lg lg:text-xl mt-6 sm:mt-8 dark:text-neutral-200 leading-relaxed">
   gue bikin beberapa project di tempat magang gua kemaren, dan project gue pribadi.
   sebenarnya sih masih banyak yang gue explore, dan gue juga masih belajar banyak hal tentang development, desain, dan lain-lain. 
   gue tertarik banget sama dunia kreatif digital, dan gue juga tertarik sama dunia desain gue juga sempet bingung 
   tapi yaaaaaaa gua pengen share dulu apa yang udah gue bikin sampe sekarang 🙏🏻. 


      </p>
    </motion.div>
  );
};

export const ProductCard = ({
  product,
  translate,
}: {
  product: {
    title: string;
    link: string;
    thumbnail: string;
  };
  translate: MotionValue<number>;
}) => {
  return (
    <motion.div
      style={{ x: translate }}
      whileHover={{ y: -20 }}
      className="group/product relative shrink-0
                 w-[18rem] sm:w-[22rem] md:w-[26rem] lg:w-[30rem] h-auto 
                 p-2 sm:p-3 md:p-4 flex items-center justify-center 
                 bg-white dark:bg-zinc-900 rounded-lg sm:rounded-xl shadow-md border-2 border-white dark:border-white"
    >
      <a href={product.link} className="block relative w-full h-full">
        <div className="relative w-full h-[10rem] sm:h-[12rem] md:h-[14rem] lg:h-[15rem] flex items-center justify-center overflow-hidden rounded-md sm:rounded-lg">
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            className="object-contain transition-transform duration-500 
                       group-hover/product:scale-105"
            sizes="(max-width: 640px) 18rem, (max-width: 768px) 22rem, (max-width: 1024px) 26rem, 30rem"
          />
        </div>
      </a>

      <div className="absolute inset-0 bg-black opacity-0 group-hover/product:opacity-60 transition-opacity duration-300 rounded-lg sm:rounded-xl pointer-events-none"></div>

      <h2 className="absolute bottom-2 sm:bottom-3 md:bottom-4 left-2 sm:left-3 md:left-4 
                    text-white text-sm sm:text-base md:text-lg lg:text-xl font-semibold uppercase tracking-tight
                    opacity-0 group-hover/product:opacity-100 transition-opacity duration-300 z-10">
        {product.title}
      </h2>
    </motion.div>
  );
};

