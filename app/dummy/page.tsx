import Butterfly from "@/components/butterfly";
import { Particles } from "@/components/particle";
import PlantButton from "@/components/plant-based";
import { SpinningText } from "@/components/spinning-text";
import { Button } from "@/components/ui/button";
import { ChevronRight, HeartHandshake, ShieldCheck, Sprout, TreePine } from "lucide-react";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import HoverCard from "@/components/hover-qr";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import WhatsAppInviteCard from "@/components/hover-qr";
import { useTheme } from "next-themes";
import { Leaf, Droplet, Rabbit, Recycle } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  { label: "Cruelty-Free", icon: Rabbit },
  { label: "Soil-Safe", icon: Leaf },
  { label: "Naturally-Soft", icon: Droplet },
  { label: "Plastic-Free", icon: Recycle },
  { label: "Compostable", icon: Sprout },
   { label: "ISO Certified ", icon: ShieldCheck },
];

const floatVariants = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const page = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  return (
    <div className="flex min-h-screen  justify-center items-center w-full  transition-colors duration-300">
      <div className=" container px-4 md:px-6 grid min-h-[80vh] min-w-[80vw] gap-5   grid-cols-4 grid-rows-4 ">
        <div className="col-span-2 row-span-1 bg-gradient-to-r  from-[#fcfcfc] via-[#fcfcfc] to-pink-300  dark:from-gray-800 dark:via-gray-800 dark:to-pink-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl">
          <div className="flex items-center gap-6 overflow-hidden">
            <Image
              src="/girlCutout.png"
              alt="Product Image"
              width={150}
              height={150}
              className="object-cover scale-x-[-1] min-h-full "
            />

            <p className="italic text-lg text-pink-900 dark:text-pink-100 mt-6">
              "There is no limit to what we, as women, can accomplish." –
              Michelle Obama
            </p>
          </div>
        </div>
        <div className="overflow-hidden col-span-2 row-span-1 bg-gradient-to-br from-pink-300 to-pink-400 dark:from-pink-800 dark:to-pink-700 rounded-lg shadow-md flex items-center justify-evenly transition-all duration-300 hover:scale-105 hover:shadow-xl">
          <SpinningText
            reverse
            className="text-xl z-0 opacity-35"
            duration={20}
            radius={10}
          >
          Use more • Care deeper • Share better • Live freer
          </SpinningText>
          <h3 className="text-3xl font-semibold text-pink-900 dark:text-pink-200 z-10 tracking-wide">
            Why Pick Us?
          </h3>
          <ul className=" text-black dark:text-white space-y-2">
            <li>✓ Eco-friendly materials</li>
            <li>✓ Hypoallergenic design</li>
            <li>✓ Leak-proof technology</li>
          </ul>
        </div>

        <div className="col-span-1 row-span-4 bg-gradient-to-bl bg-gray-200  dark:from-gray-900 dark:via-gray-800 dark:to-pink-700 rounded-lg shadow-md flex items-center justify-center transition-all duration-300 hover:scale-100">
          <div
            className="h-full  z-10 relative flex flex-col justify-between"
            id="outer-div"
          >
            {" "}
            <div className="text-transparent">rrr</div>
            <div className="text-black dark:text-white self-end rotate-90  ">
              <Butterfly
                butterflysize={"43px"}
                colors={isDark ? "#ddd6fe" : "#4c1d95"}
              />{" "}
            </div>
            <div className="text-black self-start rotate-12 mb-12 scale-x-[-1]">
              <Butterfly
                butterflysize={"39px"}
                colors={isDark ? "#ddd6fe" : "#4c1d95"}
              />
            </div>
            <div className="text-black ml-8 rotate-6 mb-8 ">
              <Butterfly
                butterflysize={"45px"}
                colors={isDark ? "#ddd6fe" : "#4c1d95"}
              />
            </div>
             <div className="text-black ml-12 rotate-6 mb-8 scale-x-[-1]">
              <Butterfly
                butterflysize={"35px"}
                colors={isDark ? "#ddd6fe" : "#4c1d95"}
              />
            </div>
            <div className="text-black mx-auto rotate-45  ">
              <Butterfly
                butterflysize={"33px"}
                colors={isDark ? "#ddd6fe" : "#4c1d95"}
              />
            </div>
            <div className="text-black self-end rotate-45 mb-16 scale-x-[-1]">
              <Butterfly
                butterflysize={"40px"}
                colors={isDark ? "#ddd6fe" : "#4c1d95"}
              />
            </div>
            <div className="absolute inset-0 z-0 flex flex-col items-center justify-center">
            {/* <div className=" text-xl text-center words-break whitespace-pre-line font-bold text-pink-800 dark:text-pink-200 max-w-[80%] leading-snug ">Our Promise to the Planet</div> */}

              <div className="flex flex-col gap-4 text-sm text-pink-900 dark:text-pink-200">
                {features.map((feature, idx) => {
                  const Icon = feature.icon;
                  return (
                    <motion.div
                      key={feature.label}
                      className="flex items-center gap-2 px-4 py-1.5 bg-white/80 dark:bg-pink-900/30 rounded-full shadow backdrop-blur-sm"
                      variants={floatVariants}
                      animate="animate"
                      style={{ animationDelay: `${idx * 0.3}s` }}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{feature.label}</span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
            <PlantButton />{" "}
          </div>
        </div>

        <div
          className="col-span-2 p-4 row-span-2 bg-gradient-to-tr from-gray-200 via-gray-100 to-pink-400 dark:from-gray-700 dark:via-gray-900 dark:to-pink-800 rounded-lg shadow-md flex items-center justify-center  bg-left transition-all duration-300 hover:scale-105 hover:shadow-xl "
          //   style={{
          //     backgroundImage: "url('/combos.jfif')",
          //     backgroundSize: "cover",
          //     backgroundPosition: "",
          //     backgroundRepeat: "no-repeat"
          //   }}
        >
          <div className="flex justify-between items-center  overflow-hidden">
            <Image
              src="/padbcr.png"
              alt="Product Image"
              width={290}
              height={290}
              className="rounded-md object-cover scale-x-[-1] drop-shadow-xl"
            />
            <div className="text-3xl flex flex-col items-center justify-between text-center text-gray-700 dark:text-gray-200  font-semibold tracking-widest">
              <p>FLEXIFLOW</p>
              <p className=" text-base font-normal tracking-normal text-muted-foreground text-pink-700 dark:text-pink-100 mt-1">Embrace comfort and sustainability with ultra-soft pads designed for confident protection.</p>
              <Image
                src="/crfreebcr.png"
                alt="Product Image"
                width={200}
                height={0}
                className="object-cover drop-shadow-xl"
              />
            </div>
          </div>
        </div>

        <div
          className="col-span-1 row-span-2 bg-pink-400 rounded-lg shadow-md  transition-all duration-300 hover:scale-105 hover:shadow-xl"
          style={{
            backgroundImage: "url('/pad3.jfif')",
            backgroundSize: "cover",
            backgroundPosition: "top",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* <p className='text-lg font-semibold ml-4 mt-2'>Edamame</p> */}
        </div>
        <div
          className="p-4 col-span-1 row-span-2 bg-gradient-to-bl from-gray-200 via-pink-100 to-pink-300 dark:from-gray-900 dark:via-gray-800 dark:to-pink-700 rounded-lg shadow-md flex flex-col items-start justify-center transition-all duration-300 hover:scale-105 hover:shadow-xl overflow-hidden"
          //   style={{
          //     backgroundImage: "url('/pad3.jfif')",
          //     backgroundSize: "cover",
          //     backgroundPosition: "top",
          //     backgroundRepeat: "no-repeat"
          //   }}
        >
          <h3 className="text-xl font-semibold text-pink-900  dark:text-pink-200 ">
            Need Help?
          </h3>
          <p className="text-pink-700 dark:text-pink-100  mt-1">
            Our support team is here 24/7 to answer your questions.
          </p>
          <Button
            asChild
            className="transition-all duration-300 hover:bg-pink-600 dark:hover:bg-pink-300 mt-2"
          >
            <Link href="">
              Contact Us
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div
          className="col-span-2 row-span-2 bg-gray-200 dark:bg-gray-800 rounded-lg shadow-md flex items-center justify-center bg-left  transition-all duration-300 hover:scale-105 hover:shadow-xl"
          style={{
            backgroundImage: "url('/multi-pads.png')",
            backgroundSize: "cover",
            backgroundPosition: "top",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* <p>Tomato</p> */}
          <WhatsAppInviteCard />
        </div>
      </div>
    </div>
  );
};

export default page;
