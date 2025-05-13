'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { useEffect, useState } from 'react';

interface NumberTickerProps {
  number: number;
  duration?: number; // in milliseconds
}

export default function NumberTicker({ number, duration = 1000 }: NumberTickerProps) {
  const [displayedNumber, setDisplayedNumber] = useState(number);

  useEffect(() => {
    const steps = 20;
    const stepTime = duration / steps;
    const difference = number - displayedNumber;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      setDisplayedNumber(prev => Math.round(prev + difference / steps));
      if (currentStep >= steps) {
        setDisplayedNumber(number);
        clearInterval(interval);
      }
    }, stepTime);

    return () => clearInterval(interval);
  }, [number, duration]);

  return (
    <Card className="w-32 text-center shadow-md">
      <CardContent className="text-3xl font-bold p-4">
        <AnimatePresence mode="wait">
          <motion.span
            key={displayedNumber}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {displayedNumber}
          </motion.span>
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
