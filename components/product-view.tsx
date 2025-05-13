"use client";

import { useState } from "react";
import Image from "next/image";

const productImages = [
  "/hero.jfif",
  "/combos.jfif",
  "/combos.jfif",
  "/combos.jfif",
  "/combos.jfif",
  "/combos.jfif",
 
];

export default function ProductGallery() {
  const [activeImage, setActiveImage] = useState(productImages[0]);

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Main Preview */}
      <div className="w-full ">
        <Image
          src={activeImage}
          alt="Product preview"
          width={400}
          height={200}
          className="rounded-xl object-cover shadow-xl"
        />
      </div>

      {/* Thumbnail Carousel */}
      <div className="flex space-x-4 overflow-x-auto w-full  p-2">
        {productImages.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveImage(img)}
            className={`flex-shrink-0 rounded-md overflow-hidden border-2 transition-all duration-300 ${
              activeImage === img ? "border-pink-500" : "border-transparent"
            }`}
          >
            <Image
              src={img}
              alt={`Thumbnail ${idx + 1}`}
              width={50}
              height={50}
              className="object-cover hover:opacity-80"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
