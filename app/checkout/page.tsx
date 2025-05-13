"use client"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
// import CheckoutForm from "@/components/checkout-form"
import AnimatedSection from "@/components/animated-section"
import CheckoutForm from "@/components/fill-user-details"
import Headerhome from "@/components/header-home"

export default function CheckoutPage() {

  return (
    <div className="min-h-screen bg-gradient-to-t from-pink-100 to-pink-50 dark:from-pink-950/30 dark:to-pink-900/30 ">
    <Headerhome />
      <div className="container py-8">
        <div className="mb-8">
          <Button variant="ghost" asChild className="group">
            <Link href="/" className="flex items-center text-sm">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Home
            </Link>
          </Button>
        </div>

        <AnimatedSection>
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Checkout</h1>
            <p className="text-muted-foreground mt-2">Complete your purchase by filling out the form below</p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={200}>
        <CheckoutForm />
        </AnimatedSection>
      </div>
    </div>
  )
}
