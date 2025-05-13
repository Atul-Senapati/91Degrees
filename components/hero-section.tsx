"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function HeroSection() {
  return (
    <div className="relative lg:h-[calc(100vh-64px)] md:h-[70vh] sm:h-[60vh] h-[50vh] max-h-[calc(100vh-64px)] bg-gradient-to-tl from-pink-400 to-pink-200 dark:bg-gradient-to-tl dark:from-pink-800 dark:to-pink-900/20 px-4 sm:px-8 md:px-16 pt-8 md:pt-16 overflow-hidden">
      
      {/* Text Content with Animation */}
      <motion.div
        className="relative z-10 max-w-xl"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.h1
          variants={fadeUp}
          className="text-4xl md:text-5xl font-bold leading-tight mb-4 md:mb-6 text-pink-900 dark:text-pink-100"
        >
          Enfold the Cycle <br />
          <span className="text-purple-800 dark:text-purple-300">
            with Confidence and Care
          </span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="text-base md:text-lg text-gray-700 dark:text-gray-200 mb-2 md:mb-4"
        >
          Embrace each cycle with our pads that offer unmatched confidence and
          comfort.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row gap-2 w-fit"
        >
          <Button
            asChild
            className="transition-all duration-300 hover:bg-pink-600 dark:hover:bg-pink-300"
          >
            <Link href="#products">
              Shop Now <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            variant="outline"
            asChild
            className="md:block hidden transition-all duration-300 hover:bg-pink-100 dark:hover:bg-pink-200/30"
          >
            <Link href="#features">Learn More</Link>
          </Button>
        </motion.div>
      </motion.div>

      {/* Background Image */}
      <div className="absolute bottom-0 animate-fade-in md:-right-32 sm:-right-32 -right-16 z-0 md:w-[calc(170vw+102px)] sm:w-[calc(100vw+200px)] w-[90vw]">
        <Image
          src="/girlshero.png"
          alt="Models using product"
          width={800}
          height={800}
          className="w-full h-auto object-contain scale-x-[-1] drop-shadow-xl"
          priority
        />
      </div>
    </div>
  );
}
