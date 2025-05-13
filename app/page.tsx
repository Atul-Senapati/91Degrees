"use client";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingCart,
  Check,
  ChevronRight,
  X,
  Facebook,
  Instagram,
} from "lucide-react";
import { CheckCircle, Feather, Wind } from "lucide-react";
import {
  FaInstagram,
  FaFacebookF,
  FaXTwitter,
  FaWhatsapp,
} from "react-icons/fa6";

import { Button } from "@/components/ui/button";
import ProductSelector from "@/components/product-selector";
import Testimonials from "@/components/testimonials";
import FAQ from "@/components/faq";
import { ThemeToggle } from "@/components/theme-toggle";
import AnimatedSection from "@/components/animated-section";
import { MobileNav } from "@/components/mobile-nav";
import { useState } from "react";
import { useCart } from "@/components/cart-provider";
import PadLabels from "@/components/pad-labels";
import Happynumbers from "@/components/happy-numbers";
import Page from "./dummy/page";
import Footer from "@/components/footer";
import Headerhome from "@/components/header-home";
import HeroSection from "@/components/hero-section";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen transition-colors duration-300">
 
<Headerhome/>
      {/* <div
        className="min-h-screen  flex items-center justify-center bg-cover bg-center relative"
        style={{ backgroundImage: "url('/imagee.jpg')" }}
      >

        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50"></div>
        
        <AnimatedSection>
          <div className="relative z-10 text-center text-white px-4">
            <h1 className="text-5xl md:text-7xl font-bold tracking-wide mb-4">
              Enfold the Cycle with{" "}
              <span className="block md:inline">Confidence</span>
            </h1>
            <p className="text-lg md:text-xl mb-6">
              Embrace each cycle with our pads that offer unmatched confidence
              and comfort.
            </p>
            <button className="bg-transparent border-2 border-white text-white px-6 py-2 rounded-full hover:bg-white hover:text-black transition duration-300">
              <Link href="#products">Shop Now</Link>
            </button>
          </div>
        </AnimatedSection>
       
      </div> */}

      <div className="relative lg:h-[calc(100vh-64px)] md:h-[70vh] sm:h-[60vh] h-[50vh] max-h-h-[calc(100vh-64px)] bg-gradient-to-tl from-pink-400 to-pink-200 dark:bg-gradient-to-tl dark:from-pink-800  dark:to-pink-900/20 px-4 sm:px-8 md:px-16 pt-8 md:pt-16 overflow-hidden">
        {/* Text Content */}

        <div className="relative z-10 max-w-xl">
          <AnimatedSection>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4 md:6  text-pink-900 dark:text-pink-100">
            Enfold the Cycle <br />
            <span className="text-purple-800 dark:text-purple-300">
              with Confidence and Care
            </span>
          </h1>
          <p className="text-base md:text-lg text-gray-700 dark:text-gray-200 mb-2 md:mb-4 ">
            Embrace each cycle with our pads that offer unmatched confidence and
            comfort.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 w-fit">
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
          </div>
          </AnimatedSection>
        </div>

        {/* Background Image */}

        <div className="absolute bottom-0 animate-fade-in  md:-right-32 sm:-right-32  -right-16 z-0   md:w-[calc(170vw + 102px)] sm:w-[calc(100vw + 200px)]  w-[90vw] ">
          <Image
            src="/girlshero.png"
            alt="Models using product"
            width={800}
            height={800}
            className="w-full h-auto object-contain scale-x-[-1] drop-shadow-xl  "
            priority
          />
        </div>
      </div>

      <main className="flex-1">
        {/* Hero Section */}
      {/* <HeroSection/> */}

        {/* Features Section */}
        <section
          id="features"
          className="lg:block   w-full hidden py-8 md:py-16 lg:py-24 bg-pink-50 dark:bg-pink-950/30 transition-colors duration-300"
        >
          <div className="container px-4 md:px-6">
            <AnimatedSection className="flex flex-col items-center justify-center space-y-5 text-center">
              <div className="space-y-3">
                <div className="inline-block rounded-full bg-pink-100 dark:bg-pink-900/50 px-4 py-1 text-sm font-medium tracking-wide text-pink-700 dark:text-pink-300 transition-colors duration-300">
                  Features
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Why Choose 91 degrees?
                </h2>
                <p className="text-sm sm:text-base md:text-lg max-w-[900px]   text-gray-500 dark:text-gray-400 mx-auto">
                  Designed for your comfort, health, and confidence.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <Page />
            </AnimatedSection>
          </div>
        </section>

        {/* Products Section */}
        <section
          id="products"
          className="w-full py-8 md:py-16 lg:py-24 bg-pink-50 dark:bg-pink-950/30 transition-colors duration-300"
        >
          <div className="container px-4 md:px-6">
            <AnimatedSection className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter">
                  Our Products
                </h2>
                <p className="text-sm sm:text-base md:text-lg max-w-[900px] text-gray-500 dark:text-gray-400">
                  Choose the right protection for your needs.
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={200} className="mx-auto py-8 md:py-12">
              <ProductSelector />
            </AnimatedSection>
          </div>
        </section>

        <Happynumbers />

        {/* Testimonials Section */}
        <section
          id="testimonials"
          className="w-full py-8 md:py-16 lg:py-24 transition-colors duration-300 bg-cover bg-center"
          style={{
            backgroundImage: "url('/combos.jfif')",
          }}
        >
          <div className="container px-4 md:px-6 ">
            <AnimatedSection className="flex flex-col items-center justify-center space-y-4 text-center py-2 border-white/20 bg-white/30 dark:bg-pink-950/20 backdrop-blur-md rounded-2xl">
              <div className="space-y-2 ">
                <h2 className="text-2xl dark:text-black sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter">
                  What Our Customers Say
                </h2>
                <p className="text-sm sm:text-base md:text-lg max-w-[900px] text-gray-800 dark:text-gray-800">
                  Don't just take our word for it. Here's what our customers
                  have to say.
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={200} className="mx-auto py-8 md:py-12">
              <Testimonials />
            </AnimatedSection>
          </div>
        </section>
        {/* FAQ Section */}
        <section
          id="faq"
          className="w-full py-8 md:py-16 lg:py-24 bg-pink-50 dark:bg-pink-950/30 transition-colors duration-300"
        >
          <div className="container px-4 md:px-6">
            <AnimatedSection className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter">
                  Frequently Asked Questions
                </h2>
                <p className="text-sm sm:text-base md:text-lg max-w-[900px] text-gray-500 dark:text-gray-400">
                  Find answers to common questions about our products.
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection
              delay={200}
              className="mx-auto max-w-3xl py-8 md:py-12"
            >
              <FAQ />
            </AnimatedSection>
          </div>
        </section>
      </main>

      {/* <PadLabels /> */}

     
      
              <Footer />
           
    </div>
  );
}

function CartButton() {
  "use client";

  const { setIsOpen, totalItems } = useCart();

  return (
    <Button
      variant="outline"
      size="icon"
      className="relative transition-transform duration-300 hover:scale-110"
      onClick={() => setIsOpen(true)}
    >
      <ShoppingCart className="h-4 w-4" />
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-pink-500 text-[10px] font-medium text-white">
          {totalItems}
        </span>
      )}
      <span className="sr-only">Open cart</span>
    </Button>
  );
}
