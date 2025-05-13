"use client"
import React from "react";
import { motion } from "framer-motion";

const floatTransition = {
  y: {
    duration: 4,
    repeat: Infinity,
    repeatType: "reverse",
    ease: "easeInOut",
  },
  x: {
    duration: 6,
    repeat: Infinity,
    repeatType: "reverse",
    ease: "easeInOut",
  },
};

const Bubble = ({ text, delay, top, left }) => {
  return (
    <motion.div
      initial={{ y: 0, x: 0 }}
      animate={{ y: -30, x: 20 }}
      transition={{
        y: { ...floatTransition.y, delay },
        x: { ...floatTransition.x, delay },
      }}
      className={`absolute rounded-full bg-white bg-opacity-30 backdrop-blur-md shadow-lg text-center text-sm text-gray-700 p-2 w-16 h-16 flex items-center justify-center`}
      style={{ top, left }}
    >
      {text}
    </motion.div>
  );
};

export default Bubble;
