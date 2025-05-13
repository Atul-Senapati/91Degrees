import React from "react";
import { CountingNumber } from "./counting-numbers";
import {
  PackageCheck,
  Recycle,
  Users,
} from "lucide-react";

const Happynumbers = () => {
  return (
    <div className="flex z-[1] pb-16 md:pb-28 px-6  items-center justify-center flex-wrap gap-10 relative bg-pink-50 dark:bg-pink-950/30 transition-colors duration-300">
      
      {/* Pads Sold */}
      <div className="text-center max-w-[200px] flex flex-col items-center">
        <PackageCheck className="w-8 h-8 md:w-10 md:h-10 mb-4 text-gray-400" />
        <span className="text-4xl font-extrabold font-display md:text-6xl">
          <CountingNumber number={5124} inView />
        </span>
        <p className="mt-2 text-base font-semibold text-gray-400">
          Pads delivered with love and care  
        </p>
      </div>

      {/* Plastic Waste Prevented */}
      <div className="text-center max-w-[200px] flex flex-col items-center">
        <Recycle className="w-8 h-8 md:w-10 md:h-10 mb-4 text-gray-400" />
        <span className="text-4xl font-extrabold font-display md:text-6xl">
          <CountingNumber
            number={76.86}
            decimalPlaces={2}
            decimalSeparator="."
            inView
          />
        </span>
        <p className="mt-2 text-base font-semibold text-gray-400">
          Kilos of plastic waste prevented
        </p>
      </div>

      {/* Women Trusted */}
      <div className="text-center max-w-[200px] flex flex-col items-center">
        <Users className="w-8 h-8 md:w-10 md:h-10 mb-4 text-gray-400" />
        <span className="text-4xl font-extrabold font-display md:text-6xl">
          <CountingNumber number={212} inView />
        </span>
        <p className="mt-2 text-base font-semibold text-gray-400">
          Women trusted across country
        </p>
      </div>

    </div>
  );
};

export default Happynumbers;
