"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <div className="flex items-center justify-between border-b pb-4">
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-xl"
            onClick={() => setOpen(false)}
          >
            91 degrees
          </Link>
          <ThemeToggle />
        </div>
        <nav className="flex flex-col gap-4 mt-8">
          <Link
            href="#features"
            className="text-lg font-medium transition-colors hover:text-pink-500 dark:hover:text-pink-400"
            onClick={() => setOpen(false)}
          >
            Features
          </Link>
          <Link
            href="#products"
            className="text-lg font-medium transition-colors hover:text-pink-500 dark:hover:text-pink-400"
            onClick={() => setOpen(false)}
          >
            Products
          </Link>
          <Link
            href="#testimonials"
            className="text-lg font-medium transition-colors hover:text-pink-500 dark:hover:text-pink-400"
            onClick={() => setOpen(false)}
          >
            Testimonials
          </Link>
          <Link
            href="#faq"
            className="text-lg font-medium transition-colors hover:text-pink-500 dark:hover:text-pink-400"
            onClick={() => setOpen(false)}
          >
            FAQ
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
