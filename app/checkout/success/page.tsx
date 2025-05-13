import Link from "next/link"
import { CheckCircle, ChevronRight, ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"
import AnimatedSection from "@/components/animated-section"

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="container max-w-md py-12">
        <AnimatedSection>
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-3">
                <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
              </div>
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">Order Confirmed!</h1>
              <p className="text-muted-foreground">
                Thank you for your purchase. We've sent a confirmation email with your order details.
              </p>
            </div>

            <div className="bg-muted/50 rounded-lg p-4 text-left">
              <p className="text-sm font-medium">Order #CF28756</p>
              <p className="text-xs text-muted-foreground mt-1">May 4, 2025</p>
            </div>

            <div className="flex flex-col gap-4 pt-4">
              <Button asChild className="transition-all duration-300 hover:bg-pink-600 dark:hover:bg-pink-700">
                <Link href="/">
                  Continue Shopping
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              {/* <Button variant="outline" asChild className="transition-all duration-300">
                <Link href="/orders" className="flex items-center">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  View My Orders
                </Link>
              </Button> */}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}
