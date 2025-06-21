"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { X, Minus, Plus, ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { CartItem, useCart } from "@/components/cart-provider"
import { Badge } from "./ui/badge"

const validCoupons = ["SAVE10", "DISCOUNT10", "WELLCOME10"]
const bogoCouppons= ["BOGO91","ROJA91"]

export function Cart() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, totalItems, subtotal, savings ,appliedCoupon,setAppliedCoupon, bogoCoupon, setbogoCoupon} = useCart()

  const [coupon, setCoupon] = useState("")
  // const [appliedCoupon, setAppliedCoupon] = useState("")
  const [discount, setDiscount] = useState(0)
  const [error, setError] = useState("")

  // Close cart on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false)
        // setDiscount(0)
        // setAppliedCoupon("")
        // setError("")
        
      }
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [setIsOpen])

  const handleApplyCoupon = () => {
  const upperCoupon = coupon.toUpperCase()

  const isBogo = bogoCouppons.includes(upperCoupon)
  const isValid = validCoupons.includes(upperCoupon)

  // if (isBogo) {
  //   setbogoCoupon(upperCoupon)
  //   setAppliedCoupon(upperCoupon)
  //   setDiscount(0)
  //   setError("")
  //   return
  // }
  if (isBogo) {
    // Ensure each item's quantity is a multiple of 2
    const allItemsValidForBogo = items.every((item) => item.quantity % 2 === 0);

    if (allItemsValidForBogo && items.length > 0 ) {
      setbogoCoupon(upperCoupon);
      setAppliedCoupon(upperCoupon);
      setDiscount(0); // Adjust discount logic if needed
      setError("");
    } else {
      setError("BOGO coupon requires each item quantity to be a multiple of 2.");
      setbogoCoupon("");
      setAppliedCoupon("");
      setDiscount(0);
    }
    return;
  }

  if (isValid) {
    setDiscount(subtotal * 0.1)
    setAppliedCoupon(upperCoupon)
    setbogoCoupon("") // Clear BOGO if applying normal coupon
    setError("")
    return
  }

  // If neither valid
  setDiscount(0)
  setAppliedCoupon("")
  setbogoCoupon("")
  setError("Invalid coupon code")
}


  const total = subtotal - discount

   
  const handleUpdateQuantity = (id: string, size: string, quantity: number) => {
    // 1. Update the quantity
    updateQuantity(id, size, quantity);
  
    // 2. If BOGO is active, validate the cart after update
    if (bogoCoupon) {
      const updatedItems = items.map((item) =>
        item.id === id && item.size === size ? { ...item, quantity } : item
      );
  
      const isValid = updatedItems.length > 0 && updatedItems.every((item) => item.quantity % 2 === 0);
      
      if (!isValid) {
        setbogoCoupon("");
        setAppliedCoupon("");
        setDiscount(0);
        setError("BOGO coupon removed: Item quantity to be a multiple of 2.");
      }
    }
  };
  

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="flex w-full flex-col sm:max-w-lg">
        <SheetHeader className="px-1">
          <SheetTitle className="flex items-center">
            <ShoppingBag className="mr-2 h-5 w-5" />
            Your Cart ({totalItems})
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center space-y-4">
            <ShoppingBag className="h-12 w-12 text-muted-foreground" strokeWidth={1} />
            <div className="text-center">
              <h3 className="text-lg font-medium">Your cart is empty</h3>
              <p className="text-sm text-muted-foreground">Add items to your cart to see them here</p>
            </div>
            <Button onClick={() => setIsOpen(false)} className="mt-4 hover:bg-pink-600 dark:hover:bg-pink-700">
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 pr-4">
              <div className="space-y-4 py-4">
                {items.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex items-start gap-3">
                    <div className="h-16 w-16 overflow-hidden rounded-md border">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={64}
                        height={64}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col gap-1">
                      <div className="flex justify-between">
                        <span className="line-clamp-1 font-medium">{item.name}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => removeItem(item.id, item.size)}
                        >
                          <X className="h-3 w-3" />
                          <span className="sr-only">Remove</span>
                        </Button>
                      </div>
                      <div className="flex gap-2  items-center text-sm text-muted-foreground">
                        {item.isCustom ? (
                          <Badge variant="outline" className="bg-pink-50 dark:bg-pink-900/20 text-xs">
                            Custom Box
                          </Badge>
                        ) : (
                          <span>Size: {item.size}</span>
                        )}
                        {/* {item.price < item.originalPrice && item.quantity > 1 && (
                          <Badge variant="outline" className="bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-xs">
                            BOGO Applied
                          </Badge>
                        )} */}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => handleUpdateQuantity(item.id, item.size, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                            <span className="sr-only">Decrease quantity</span>
                          </Button>
                          <span className="w-5 text-center text-sm">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => handleUpdateQuantity(item.id, item.size, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                            <span className="sr-only">Increase quantity</span>
                          </Button>
                        </div>
                        <div className="flex items-baseline gap-1">
                          <span className="text-sm font-medium">₹{(item.price * item.quantity).toFixed(2)}</span>
                          {item.originalPrice > item.price && (
                            <span className="text-xs text-muted-foreground line-through">
                              ₹{(item.originalPrice * item.quantity).toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="space-y-4 pt-4">
              <Separator />

              {/* Coupon Code Section */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Apply Coupon</label>
                <div className="flex items-center gap-2">
                  <Input
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="Enter coupon code"
                    className="flex-1"
                  />
                  <Button onClick={handleApplyCoupon} className="hover:bg-pink-600 dark:hover:bg-pink-700">
                    Apply
                  </Button>
                </div>
                {error && <p className="text-sm text-red-500">{error}</p>}
                {appliedCoupon && (
                  <p className="text-sm text-green-600 dark:text-green-400">
                    Coupon "{appliedCoupon}" applied! 
                  </p>
                )}
              </div>

              {/* Price Summary */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                {savings > 0 && (
                  <div className="flex justify-between text-sm text-green-600 dark:text-green-400">
                    <span>Savings</span>
                    <span>-₹{savings.toFixed(2)}</span>
                  </div>
                )}
                {discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600 dark:text-green-400">
                    <span>Coupon Discount</span>
                    <span>-₹{discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <Separator />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>
              <Button asChild className="w-full hover:bg-pink-600 dark:hover:bg-pink-700">
                <Link href="/checkout" onClick={()=>setIsOpen(false)}>Proceed to Checkout</Link>
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
