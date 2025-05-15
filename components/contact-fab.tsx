import React from "react";
import { Mail } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

/**
 * Floating Contact Button (FAB) with WhatsApp message options
 * Fixed to bottom-right, responsive, using Tailwind for styling
 */
export default function ContactFab() {
  const whatsappNumber = "918926361010"; // include country code
   const options = [
    {
      label: "Customer Support",
      message: "👋 Hi 91° team! I'm having trouble updating my address - could you help me sort it out?",
    },
    {
      label: "Product Inquiries",
      message: "📦 Hello! I'd love more info on your ultra-thin pads - what's the absorbency level and materials used?",
    },
    {
      label: "Order Issues & Tracking",
      message: "🚚 Hey there - my order , Can you share the latest tracking details?",
    },
  ];

  const handleSelect = (message:any) => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
 <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="p-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-18 lg:h-18 rounded-full shadow-lg transition-transform duration-200 hover:scale-105 bg-gray-700 hover:bg-gray-800/90 dark:bg-pink-600/90 dark:hover:bg-pink-700"
            aria-label="Contact Options"
            title="Contact Options"
          >
            <Mail className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="w-56 sm:w-64 bg-gray-200 dark:bg-pink-100 text-gray-900 dark:text-gray-900 shadow-md rounded-lg p-2 border border-gray-200 dark:border-pink-200"
        >
          {options.map(({ label, message }) => (
            <DropdownMenuItem
              key={label}
              className="px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-pink-100 cursor-pointer text-gray-800 dark:text-gray-800"
              onSelect={() => handleSelect(message)}
            >
              {label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
