import type React from "react";
import "@/app/globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { CartProvider } from "@/components/cart-provider";
import { Cart } from "@/components/cart";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "91 Degrees - Premium Plant Based Sanitary Pads",
  description:
    "Comfort and protection you can trust. Shop our range of premium sanitary pads.",
    icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <CartProvider>
            {children}
            <Cart />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
