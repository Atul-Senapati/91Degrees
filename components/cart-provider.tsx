"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type CartItem = {
  id: string
  name: string
  price: number
  originalPrice: number
  size: string
  quantity: number
  image: string
  isCustom?: boolean
  details?: string
}

type CartContextType = {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string, size: string) => void
  updateQuantity: (id: string, size: string, quantity: number) => void
  clearCart: () => void
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  totalItems: number
  subtotal: number
  savings: number
  appliedCoupon: string
  setAppliedCoupon: (coupon: string) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

// Price configuration for sizes
const priceConfig = {
  L: { mrp: 219, singlePrice: 130, bogoPrice: 219 },
  XL: { mrp: 269, singlePrice: 161, bogoPrice: 269 },
  XXL: { mrp: 299, singlePrice: 179, bogoPrice: 299 },
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [totalItems, setTotalItems] = useState(0)
  const [subtotal, setSubtotal] = useState(0)
  const [savings, setSavings] = useState(0)
  const [appliedCoupon, setAppliedCoupon] = useState("")

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart)
        setItems(parsedCart)
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error)
      }
    }
  }, [])

  // Function to calculate effective price based on quantity and size
  const calculateEffectivePrice = (item: CartItem): CartItem => {
    const config = priceConfig[item.size as keyof typeof priceConfig]
    if (!config) return { ...item, price: item.originalPrice } // Fallback if size is invalid

    const { mrp, singlePrice, bogoPrice } = config
    const pairs = Math.floor(item.quantity / 2)
    const singleItems = item.quantity % 2
    const totalCost = pairs * bogoPrice + singleItems * singlePrice
    const effectivePrice = totalCost / item.quantity // Price per unit

    return { ...item, price: Number(effectivePrice.toFixed(2)), originalPrice: mrp }
  }

  // Save cart to localStorage and calculate totals
  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem("cart", JSON.stringify(items))
    } else {
      localStorage.removeItem("cart")
    }

    // Calculate totals
    const total = items.reduce((sum, item) => sum + item.quantity, 0)
    setTotalItems(total)

    const cartSubtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    setSubtotal(Number(cartSubtotal.toFixed(2)))

    const cartSavings = items.reduce(
      (sum, item) => sum + (item.originalPrice - item.price) * item.quantity,
      0,
    )
    setSavings(Number(cartSavings.toFixed(2)))
  }, [items])

  const addItem = (newItem: CartItem) => {
    setItems((prevItems) => {
      // For custom boxes, we need to check both id and details
      if (newItem.isCustom) {
        const existingItemIndex = prevItems.findIndex(
          (item) => item.id === newItem.id && item.details === newItem.details,
        )

        if (existingItemIndex >= 0) {
          // Update quantity of existing custom box
          const updatedItems = [...prevItems]
          updatedItems[existingItemIndex].quantity += newItem.quantity
          // Recalculate price for BOGO
          return updatedItems.map(calculateEffectivePrice)
        } else {
          // Add new custom box with calculated price
          return [...prevItems, calculateEffectivePrice(newItem)]
        }
      } else {
        // Check if standard item with same id and size already exists
        const existingItemIndex = prevItems.findIndex(
          (item) => item.id === newItem.id && item.size === newItem.size,
        )

        if (existingItemIndex >= 0) {
          // Update quantity of existing item
          const updatedItems = [...prevItems]
          updatedItems[existingItemIndex].quantity += newItem.quantity
          // Recalculate price for BOGO
          return updatedItems.map(calculateEffectivePrice)
        } else {
          // Add new item with calculated price
          return [...prevItems, calculateEffectivePrice(newItem)]
        }
      }
    })

    // Open cart when adding items
    setIsOpen(true)
  }

  const removeItem = (id: string, size: string) => {
    setItems((prevItems) => prevItems.filter((item) => !(item.id === id && item.size === size)))
  }

  const updateQuantity = (id: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id, size)
      return
    }

    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id && item.size === size) {
          const updatedItem = { ...item, quantity }
          return calculateEffectivePrice(updatedItem)
        }
        return item
      }),
    )
  }

  const clearCart = () => {
    setItems([])
    localStorage.removeItem("cart")
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isOpen,
        setIsOpen,
        totalItems,
        subtotal,
        savings,
        appliedCoupon,
        setAppliedCoupon,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}