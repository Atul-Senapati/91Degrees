'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Headerhome from '@/components/header-home';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-pink-50 dark:bg-pink-900/20">
        <Headerhome/>
    <div className="max-w-3xl mx-auto px-4 py-10 text-muted-foreground">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">About Us</h1>

      <p className="mb-4">
        <strong>Echra Innovations Private Limited</strong> is a purpose-driven company focused on developing sustainable
        solutions that bridge innovation with impact. Our flagship brand, <strong>91 Degrees</strong>, is transforming
        feminine hygiene through plant-based sanitary pads that prioritize women’s health and the planet.
      </p>

      <p className="mb-4">
        Founded by a team of researchers, entrepreneurs, and sustainability advocates, Echra Innovations is built on
        the belief that progress should be both inclusive and environmentally responsible. With a deep commitment to
        science, affordability, and ethical manufacturing, we strive to create products that serve people without
        compromising the future.
      </p>

      <p className="mb-4">
        At <strong>91 Degrees</strong>, we are redefining menstrual care—offering ultra-thin, rash-free, and
        plastic-free sanitary pads that combine comfort, safety, and sustainability. Our goal is to empower a
        generation of conscious consumers with solutions that are as thoughtful as they are effective.
      </p>

      <p className="mb-6">
        From rural origins to national recognition, we are driven by a singular mission: to make sustainable living
        accessible, impactful, and everyday.
      </p>

      <Link href="https://wa.me/918926361010" target="_blank">
        <Button className="bg-green-600 hover:bg-green-700 text-white">
           Message Echra Innovations on WhatsApp
        </Button>
      </Link>
    </div>
    </div>
  );
};

export default AboutPage;
