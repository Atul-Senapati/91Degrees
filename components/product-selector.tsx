"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Minus, Plus, ShoppingCart, AlertCircle, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { useCart } from "@/components/cart-provider"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import CarouselPlugin from "./product-carosuel"

const standardProducts = [
   {
    id: "regular",
    name: "Light Flow (Regular)",
    description: "Perfect for light flow days",
    originalPrice: 139,
    price: 109,
    image: "/slide5.png?height=200&width=200",
    features: ["6 hours protection", "Ultra-thin design", "Soft cotton cover"],
    inStock: false,
  },
  {
    id: "xl",
    name: "Medium Flow (XL)",
    description: "Ideal for medium flow days with extra coverage",
    originalPrice: 149,
    price: 119,
    image: "/slide5.png?height=200&width=200",
    features: ["Length : 280 mm", "Regular to heavy flow  ", "Side guards with wider wings"],
    inStock: true,
  },
 
  {
    id: "xxl",
    name: "Heavy Flow (XXL)",
    description: "Maximum protection for heavy flow days",
    originalPrice: 179,
    price: 149,
    image: "/slide5.png?height=200&width=200",
    features: ["Length : 320 mm", "Heavy to extra-heavy flow, overnight use", " Extended back with ultra-wide wings "],
    inStock: true,
  },
]

const customBoxOptions = [
   {
    id: "regular",
    name: "Light Flow (Regular)",
    price: 11,
    image: "/satche.png?height=100&width=100",
    inStock: false,
  },
  {
    id: "xl",
    name: "Medium Flow (XL)",
    price: 12,
    image: "/satche.png?height=100&width=100",
  },
 
  {
    id: "xxl",
    name: "Heavy Flow (XXL)",
    price: 15,
    image: "/satche.png?height=100&width=100",
  },
]

export default function ProductSelector() {
  const [selectedProduct, setSelectedProduct] = useState(standardProducts[1])
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState("XL")
  const { addItem } = useCart()

  // Custom box state
  const [customBox, setCustomBox] = useState({
    regular: 0,
    xl: 0,
    xxl: 0,
  })
  const [customBoxTotal, setCustomBoxTotal] = useState(0)
  const [customBoxPrice, setCustomBoxPrice] = useState(0)

  // Calculate total pads in custom box and total price
  useEffect(() => {
    const total = customBox.xl + customBox.regular + customBox.xxl
    setCustomBoxTotal(total)

    const price = (
      customBox.xl * customBoxOptions[1].price +
      customBox.regular * customBoxOptions[0].price +
      customBox.xxl * customBoxOptions[2].price
    ).toFixed(2)
    setCustomBoxPrice(Number.parseFloat(price))
  }, [customBox])

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  const updateCustomBox = (type, action) => {
    setCustomBox((prev) => {
      const newValue = action === "increase" ? prev[type] + 1 : Math.max(0, prev[type] - 1)

      // Check if we're not exceeding 10 pads total when increasing
      if (action === "increase") {
        const newTotal = customBoxTotal + 1
        if (newTotal > 10) return prev
      }

      return {
        ...prev,
        [type]: newValue,
      }
    })
  }

  const addStandardToCart = () => {
    addItem({
      id: selectedProduct.id,
      name: `${selectedProduct.name} Box`,
      price: selectedProduct.price,
      originalPrice: selectedProduct.originalPrice,
      size: selectedSize,
      quantity: quantity,
      image: selectedProduct.image,
      isCustom: false,
      details: "10 pads + 10 disposal bags",
    })

    toast({
      title: "Added to cart",
      description: `${quantity} box(es) of ${selectedProduct.name} added to your cart.`,
    })
  }

  const addCustomToCart = () => {
    if (customBoxTotal === 0) {
      toast({
        title: "Cannot add empty box",
        description: "Please select at least one pad for your custom box.",
        variant: "destructive",
      })
      return
    }

    if (customBoxTotal < 10) {
      toast({
        title: "Box not full",
        description: "Your custom box has only " + customBoxTotal + " of 10 pads. Are you sure you want to continue?",
        action: (
          <Button
            onClick={() => {
              completeCustomBoxOrder()
              document.querySelector("[data-toast-close]")?.click()
            }}
            variant="outline"
            size="sm"
          >
            Yes, continue
          </Button>
        ),
      })
      return
    }

    completeCustomBoxOrder()
  }

  const completeCustomBoxOrder = () => {
    const details =
      [
        customBox.xl > 0 ? `${customBox.xl} XL` : "",
        customBox.regular > 0 ? `${customBox.regular} Regular` : "",
        customBox.xxl > 0 ? `${customBox.xxl} XXL` : "",
      ]
        .filter(Boolean)
        .join(", ") + " + 10 disposal bags"

    addItem({
      id: "custom-box",
      name: "Custom Pad Box",
      price: customBoxPrice,
      originalPrice: customBoxPrice * 1.25, // 25% markup for original price
      size: "Custom",
      quantity: quantity,
      image: "/satche.png?height=200&width=200",
      isCustom: true,
      details: details,
    })

    toast({
      title: "Custom box added to cart",
      description: `${quantity} custom box(es) with ${customBoxTotal} pads added to your cart.`,
    })
  }

  return (
    <Tabs defaultValue="standard" className="w-full">
      <TabsList className="grid w-full grid-cols-2 transition-all duration-300">
        <TabsTrigger
          value="standard"
          className="text-sm transition-all duration-300 data-[state=active]:bg-pink-200 dark:data-[state=active]:bg-pink-900/50"
        >
          Standard Sizes
        </TabsTrigger>
        <TabsTrigger
          value="custom"
          className="text-sm transition-all duration-300 data-[state=active]:bg-pink-200 dark:data-[state=active]:bg-pink-900/50"
        >
          Create Your Own Box
        </TabsTrigger>
      </TabsList>

      {/* Standard Sizes Tab */}
      <TabsContent value="standard" className="mt-6">
        <Card className="transition-all duration-300 hover:shadow-lg">
          <CardHeader>
            <CardTitle>Standard Size Boxes</CardTitle>
            <CardDescription>Each box contains 10 pads + 10 disposal bags</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="flex justify-center">
                {/* <div className="transition-transform duration-500 hover:scale-105">
                  <Image
                    src={selectedProduct.image || "/placeholder.svg"}
                    alt={selectedProduct.name}
                    width={200}
                    height={200}
                    className="rounded-lg object-cover shadow-md"
                  />
                </div> */}
              <CarouselPlugin/>
              </div>
              <div className="space-y-4">
                <div className="font-bold text-pink-900 dark:text-pink-400 text-3xl tracking-wide">91 Degrees FLEXIFLOW</div>
                <div className="space-y-2">
                  <Label htmlFor="size" className="text-base font-medium">
                    Select Size
                  </Label>
                  <RadioGroup
                    id="size"
                    value={selectedSize}
                    onValueChange={(value) => {
                      setSelectedSize(value)
                      const product = standardProducts.find(
                        (p) =>
                          (value === "Regular" && p.id === "regular") ||
                          (value === "XL" && p.id === "xl") ||
                          
                          (value === "XXL" && p.id === "xxl"),
                      )
                      if (product) setSelectedProduct(product)
                    }}
                    className="grid grid-cols-3 gap-2"
                  >
                     <div className="relative">
                      <div
                        className={`flex flex-col items-center border rounded-md p-3 ${selectedSize === "Regular" ? "border-pink-500 bg-pink-50 dark:bg-pink-900/20" : "border-gray-200"} opacity-60`}
                      >
                        <RadioGroupItem value="Regular" id="size-regular" className="sr-only" disabled />
                        <Label htmlFor="size-regular" className="cursor-not-allowed text-center">
                          <span className="block font-medium mb-1">Regular</span>
                          <span className="text-xs text-muted-foreground">Light Flow</span>
                        </Label>
                        <span className="absolute -top-2 -right-2 bg-red-500 dark:bg-red-700 text-white text-xs px-2 py-0.5 rounded-full">
                          Out of stock
                        </span>
                      </div>
                    </div>
                    <div className="relative">
                      <Label
                       htmlFor="size-xl"
                        className={`flex flex-col items-center border rounded-md p-3 cursor-pointer ${selectedSize === "XL" ? "border-pink-500 bg-pink-50 dark:bg-pink-900/20" : "border-gray-200"}`}
                      >
                        <RadioGroupItem value="XL" id="size-xl" className="sr-only" />
                        <Label htmlFor="size-xl" className="cursor-pointer text-center">
                          <span className="block font-medium mb-1">XL</span>
                          <span className="text-xs text-muted-foreground">Medium Flow</span>
                        </Label>
                      </Label>
                    </div>

                   

                    <div className="relative">
                      <Label
                        htmlFor="size-xxl"
                        className={`flex flex-col items-center border rounded-md p-3 cursor-pointer ${selectedSize === "XXL" ? "border-pink-500 bg-pink-50 dark:bg-pink-900/20" : "border-gray-200"}`}
                      >
                        <RadioGroupItem value="XXL" id="size-xxl" className="sr-only" />
                        <Label htmlFor="size-xxl" className="cursor-pointer text-center">
                          <span className="block font-medium mb-1">XXL</span>
                          <span className="text-xs text-muted-foreground">Heavy Flow</span>
                        </Label>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="flex items-baseline gap-2">
                  <div className="text-2xl font-bold">₹{selectedProduct.price.toFixed(2)}</div>
                  <div className="text-sm text-muted-foreground line-through">
                    ₹{selectedProduct.originalPrice.toFixed(2)}
                  </div>
                  <div className="text-sm text-green-600 dark:text-green-400">
                    Save ₹{(selectedProduct.originalPrice - selectedProduct.price).toFixed(2)}
                  </div>
                </div>

                <Alert className="bg-pink-50 dark:bg-pink-900/20 border-pink-200 dark:border-pink-800">
                  <Package className="h-4 w-4 text-pink-600 dark:text-pink-400" />
                  <AlertTitle>Box Contents</AlertTitle>
                  <AlertDescription>Each box contains 10 pads + 10 disposal bags</AlertDescription>
                </Alert>

                <ul className="space-y-2">
                  {selectedProduct.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-pink-600 dark:text-pink-400" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {selectedProduct.inStock ? (
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={decreaseQuantity}
                        disabled={quantity <= 1}
                        className="transition-all duration-300 hover:bg-pink-100 dark:hover:bg-pink-900/30"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center">{quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={increaseQuantity}
                        className="transition-all duration-300 hover:bg-pink-100 dark:hover:bg-pink-900/30"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button
                      onClick={addStandardToCart}
                      className="w-full sm:w-auto flex-1 transition-all duration-300 hover:bg-pink-600 dark:hover:bg-pink-700"
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to Cart
                    </Button>
                  </div>
                ) : (
                  <Button disabled className="w-full sm:w-auto">
                    <AlertCircle className="mr-2 h-4 w-4" />
                    Out of Stock
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t pt-6">
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              Free shipping on orders over ₹499.
            </p>
          </CardFooter>
        </Card>
      </TabsContent>

      {/* Custom Box Tab */}
      <TabsContent value="custom" className="mt-6">
        <Card className="transition-all duration-300 hover:shadow-lg">
          <CardHeader>
            <CardTitle>Create Your Own Box</CardTitle>
            <CardDescription>Mix and match up to 10 pads + get 10 disposal bags</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Your Custom Box</h3>
                  <p className="text-sm text-muted-foreground">Select up to 10 pads</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">₹{customBoxPrice.toFixed(2)}</div>
                  <div className="text-sm text-muted-foreground">{customBoxTotal}/10 pads selected</div>
                </div>
              </div>

              <Progress value={customBoxTotal * 10} className="h-2" />

              <div className="grid gap-4">
                {customBoxOptions.map((option) => (
                  <div
                    key={option.id}
                    className={`border rounded-lg p-4 ${option.id === "regular" ? "opacity-60" : ""}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 relative rounded overflow-hidden flex-shrink-0">
                        <Image
                          src={option.image || "/placeholder.svg"}
                          alt={option.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-medium">{option.name}</h4>
                        <p className="text-sm text-muted-foreground">₹{option.price.toFixed(2)} per pad</p>
                        {option.id === "regular" && (
                          <span className="inline-block bg-red-500 text-white text-xs px-2 py-0.5 rounded-full mt-1">
                            Out of stock
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateCustomBox(option.id, "decrease")}
                          disabled={customBox[option.id] <= 0 || option.id === "regular"}
                          className="h-8 w-8 transition-all duration-300 hover:bg-pink-100 dark:hover:bg-pink-900/30"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center">{customBox[option.id]}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateCustomBox(option.id, "increase")}
                          disabled={customBoxTotal >= 10 || option.id === "regular"}
                          className="h-8 w-8 transition-all duration-300 hover:bg-pink-100 dark:hover:bg-pink-900/30"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Alert className="bg-pink-50 dark:bg-pink-900/20 border-pink-200 dark:border-pink-800">
                <Package className="h-4 w-4 text-pink-600 dark:text-pink-400" />
                <AlertTitle>Box Contents</AlertTitle>
                <AlertDescription>
                  Your custom box includes your selected pads (up to 10) + 10 disposal bags
                </AlertDescription>
              </Alert>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                    className="transition-all duration-300 hover:bg-pink-100 dark:hover:bg-pink-900/30"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={increaseQuantity}
                    className="transition-all duration-300 hover:bg-pink-100 dark:hover:bg-pink-900/30"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <Button
                  onClick={addCustomToCart}
                  disabled={customBoxTotal === 0}
                  className="w-full sm:w-auto flex-1 transition-all duration-300 hover:bg-pink-600 dark:hover:bg-pink-700"
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add Custom Box to Cart
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t pt-6">
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              Free shipping on orders over ₹499.
            </p>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

function Package(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m7.5 4.27 9 5.15" />
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  )
}
