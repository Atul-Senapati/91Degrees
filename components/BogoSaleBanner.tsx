'use client';
import { motion } from 'framer-motion';

// Animation variants
const bannerVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.6, 
      ease: 'easeOut' 
    }
  },
};

const tagVariants = {
  hidden: { scale: 0.8, rotate: -10, opacity: 0 },
  visible: { 
    scale: 1, 
    rotate: -5, 
    opacity: 1, 
    transition: { 
      duration: 0.4, 
      delay: 0.3, 
      ease: 'easeOut' 
    }
  },
};

const promoVariants = {
  hover: { scale: 1.05, transition: { duration: 0.2 } },
  tap: { scale: 0.95, transition: { duration: 0.1 } },
};

export default function BogoSaleBanner() {
  return (
    <motion.div
      className="bg-gradient-to-r from-pink-500 to-violet-600 dark:from-pink-700 dark:to-violet-900 text-white w-full py-3 px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-xs sm:text-sm md:text-base"
      variants={bannerVariants}
      initial="hidden"
      animate="visible"
      role="banner"
      aria-label="Buy One Get One Half Price Promotion"
    >
      {/* Flash Sale Tag */}
      <motion.div 
        className="hidden lg:block text-[10px] sm:text-xs font-bold bg-white text-violet-600 dark:bg-gray-100 dark:text-violet-700 px-2 sm:px-3 py-1 sm:py-1.5 rounded-md shadow-sm uppercase tracking-wider"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0, transition: { delay: 0.4, duration: 0.3 } }}
      >
        Flash Sale
      </motion.div>

      {/* Main Message */}
      <div className="flex flex-wrap items-center justify-center text-center sm:text-left gap-1 sm:gap-2 md:gap-3">
        <span className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold tracking-wide">
          Buy One,
        </span>
        <motion.span
          className="bg-white text-violet-600 dark:bg-gray-100 dark:text-violet-700 px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-sm md:text-base lg:text-lg font-bold rounded-md shadow-sm"
          variants={tagVariants}
          style={{ transformOrigin: 'center' }}
          aria-label="Get One Half Price"
        >
          Get One 50% Off
        </motion.span>
      </div>

      {/* Promo Code Box */}
      <motion.div
        className="bg-white dark:bg-gray-100 text-violet-600 dark:text-violet-700 px-2 sm:px-3 py-1 sm:py-1.5 font-semibold rounded-md text-[10px] sm:text-xs md:text-sm shadow hover:bg-violet-50 dark:hover:bg-gray-200 cursor-pointer transition-colors"
        variants={promoVariants}
        whileHover="hover"
        whileTap="tap"
      >
        Use Code: <span className="font-bold text-violet-700 dark:text-violet-800">91BOGO</span>
      </motion.div>
    </motion.div>
  );
}
