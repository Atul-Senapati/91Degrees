"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { MobileNav } from "@/components/mobile-nav";
import { useCart } from "@/components/cart-provider";

export function BlogHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300">
      <div className="container flex h-16 items-center">
        <MobileNav />
        <div className="mr-4 flex">
          <Link
            href="/"
            className="mr-6 flex items-center space-x-2 transition-transform duration-300 hover:scale-105"
          >
            <span className="font-bold text-xl">91 Degrees</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/"
              className="transition-colors duration-300 hover:text-pink-500 dark:hover:text-pink-400"
            >
              Home
            </Link>
            <Link
              href="/#products"
              className="transition-colors duration-300 hover:text-pink-500 dark:hover:text-pink-400"
            >
              Products
            </Link>
            <Link
              href="/blog"
              className="transition-colors duration-300 text-pink-600 dark:text-pink-400"
            >
              Blog
            </Link>
            <Link
              href="/#faq"
              className="transition-colors duration-300 hover:text-pink-500 dark:hover:text-pink-400"
            >
              FAQ
            </Link>
          </nav>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <div className="hidden md:block">
            <ThemeToggle />
          </div>
          <CartButton />
        </div>
      </div>
    </header>
  );
}

function CartButton() {
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
