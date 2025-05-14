"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Loader2,
  MapPin,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { useCart } from "./cart-provider";

type FormData = {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string; // This is actually the state, rename if preferred
  postOffice: string;
  cardName: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
};

type FormErrors = {
  [K in keyof FormData]?: string;
};

export default function CheckoutForm() {
  const router = useRouter();
  const [step, setStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    postOffice: "",
    country: "",
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateStep = (currentStep: number): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;
    // return isValid; //remove it

    if (currentStep === 1) {
      if (!formData.name.trim()) {
        newErrors.name = "Name is required";
        isValid = false;
      }

      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
        isValid = false;
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Email is invalid";
        isValid = false;
      }

      if (!formData.phone.trim()) {
        newErrors.phone = "Phone number is required";
        isValid = false;
      } else if (!/^\d{10,15}$/.test(formData.phone.replace(/[^0-9]/g, ""))) {
        newErrors.phone = "Phone number is invalid";
        isValid = false;
      }
    }

    if (currentStep === 2) {
      if (!formData.address.trim()) {
        newErrors.address = "Address is required";
        isValid = false;
      }

      if (!formData.city.trim()) {
        newErrors.city = "City is required";
        isValid = false;
      }

      if (!formData.postalCode.trim()) {
        newErrors.postalCode = "Postal code is required";
        isValid = false;
      }

      if (!formData.country.trim()) {
        newErrors.country = "Country is required";
        isValid = false;
      }
    }

    if (currentStep === 3) {
      if (!formData.cardName.trim()) {
        newErrors.cardName = "Name on card is required";
        isValid = false;
      }

      if (!formData.cardNumber.trim()) {
        newErrors.cardNumber = "Card number is required";
        isValid = false;
      } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ""))) {
        newErrors.cardNumber = "Card number must be 16 digits";
        isValid = false;
      }

      if (!formData.expiry.trim()) {
        newErrors.expiry = "Expiry date is required";
        isValid = false;
      } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiry)) {
        newErrors.expiry = "Expiry date must be in MM/YY format";
        isValid = false;
      }

      if (!formData.cvv.trim()) {
        newErrors.cvv = "CVV is required";
        isValid = false;
      } else if (!/^\d{3,4}$/.test(formData.cvv)) {
        newErrors.cvv = "CVV must be 3 or 4 digits";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user types
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
    window.scrollTo(0, 0);
  };

  const { items, totalItems, subtotal, savings, appliedCoupon } = useCart();



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const {
      name,
      email,
      phone,
      address,
      city,
      postalCode,
      postOffice,
      country,
      cardName,
      cardNumber,
      expiry,
      cvv,
    } = formData;
    const cartItemsMessage = items
      .map((item, index) => {
        return `🛍️ *Item ${index + 1}:*
  - Name: ${item.name}
  - Quantity: ${item.quantity}
  - Price (each): ₹${item.price}
  - Details: ${item.details}`;
      })
      .join("\n\n");

    const hasCoupon = appliedCoupon?.trim() !== "";
    const finalSubtotal = hasCoupon
      ? (subtotal * 0.9).toFixed(2)
      : subtotal.toFixed(2);
    const discountNote = hasCoupon
      ? `🎟️ *Coupon Applied:* ${appliedCoupon}\n🔖 *Discounted Subtotal:* ₹${finalSubtotal}`
      : `💰 *Subtotal:* ₹${finalSubtotal}`;

    const message = `
👋 *Hello! I'm interested in your product.*

Here are my details for your reference:

👧 *Name:* ${name}  
📧 *Email:* ${email}  
📞 *Phone:* ${phone}  
🏠 *Address:* ${address}, ${city}, ${postOffice}, ${postalCode}, ${country}  

🛒 *Order Summary:*
${cartItemsMessage}

${discountNote}
💸 *You Saved:* ₹${savings}

🙏 Looking forward to hearing from you soon!
`;

    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = "8926361010";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");

    if (!validateStep(step)) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast({
        title: "Order placed successfully!",
        description:
          "Thank you for your purchase. You will receive a confirmation email shortly.",
      });

      // Redirect to success page
      router.push("/checkout/success");
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCardNumber(e.target.value);
    setFormData((prev) => ({ ...prev, cardNumber: formattedValue }));

    if (errors.cardNumber) {
      setErrors((prev) => ({ ...prev, cardNumber: undefined }));
    }
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = e.target;
    value = value.replace(/\D/g, "");

    if (value.length > 2) {
      value = value.slice(0, 2) + "/" + value.slice(2, 4);
    }

    setFormData((prev) => ({ ...prev, expiry: value }));

    if (errors.expiry) {
      setErrors((prev) => ({ ...prev, expiry: undefined }));
    }
  };

  const [postOffices, setPostOffices] = useState<any[]>([]);

  const handlePostalChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "postalCode" && /^[0-9]{6}$/.test(value)) {
      try {
        const res = await fetch(
          `https://api.postalpincode.in/pincode/${value}`
        );
        const data = await res.json();
        const offices = data[0]?.PostOffice || [];

        if (data[0]?.Status === "Success" && offices.length > 0) {
          setPostOffices(offices);
        } else {
          setPostOffices([]);
        }
      } catch (err) {
        console.error("Error fetching pincode data:", err);
        setPostOffices([]);
      }
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div
            className={`flex-1 text-center ${
              step >= 1 ? "text-pink-600 dark:text-pink-400" : ""
            }`}
          >
            <div className="relative">
              <div
                className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center border-2 ${
                  step >= 1
                    ? "border-pink-600 dark:border-pink-400 bg-pink-100 dark:bg-pink-900/50"
                    : "border-gray-300"
                }`}
              >
                <User
                  className={`h-4 w-4 ${
                    step >= 1
                      ? "text-pink-600 dark:text-pink-400"
                      : "text-gray-400"
                  }`}
                />
              </div>
              <p className="mt-1 text-xs font-medium">Personal</p>
            </div>
          </div>
          <div
            className={`w-full max-w-[100px] h-[2px] ${
              step >= 2 ? "bg-pink-600 dark:bg-pink-400" : "bg-gray-300"
            }`}
          />
          <div
            className={`flex-1 text-center ${
              step >= 2 ? "text-pink-600 dark:text-pink-400" : ""
            }`}
          >
            <div className="relative">
              <div
                className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center border-2 ${
                  step >= 2
                    ? "border-pink-600 dark:border-pink-400 bg-pink-100 dark:bg-pink-900/50"
                    : "border-gray-300"
                }`}
              >
                <MapPin
                  className={`h-4 w-4 ${
                    step >= 2
                      ? "text-pink-600 dark:text-pink-400"
                      : "text-gray-400"
                  }`}
                />
              </div>
              <p className="mt-1 text-xs font-medium">Shipping</p>
            </div>
          </div>
          <div
            className={`w-full max-w-[100px] h-[2px] ${
              step >= 3 ? "bg-pink-600 dark:bg-pink-400" : "bg-gray-300"
            }`}
          />
          <div
            className={`flex-1 text-center ${
              step >= 3 ? "text-pink-600 dark:text-pink-400" : ""
            }`}
          >
            <div className="relative">
              <div
                className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center border-2 ${
                  step >= 3
                    ? "border-pink-600 dark:border-pink-400 bg-pink-100 dark:bg-pink-900/50"
                    : "border-gray-300"
                }`}
              >
                <CreditCard
                  className={`h-4 w-4 ${
                    step >= 3
                      ? "text-pink-600 dark:text-pink-400"
                      : "text-gray-400"
                  }`}
                />
              </div>
              <p className="mt-1 text-xs font-medium">Order</p>
            </div>
          </div>
        </div>
      </div>

      <Card className="w-full transition-all duration-300">
        <CardHeader>
          <CardTitle>
            {step === 1 && "Personal Information"}
            {step === 2 && "Shipping Address"}
            {step === 3 && "Complete Order"}
          </CardTitle>
          <CardDescription>
            {step === 1 && "Please provide your contact information"}
            {step === 2 && "Enter your shipping address"}
            {step === 3 && "Redirect to complete your order"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    className={errors.name ? "border-red-500" : ""}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john.doe@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="(123) 456-7890"
                    value={formData.phone}
                    onChange={handleChange}
                    className={errors.phone ? "border-red-500" : ""}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                {/* Street */}
                <div className="space-y-2">
                  <Label htmlFor="address">Street Address</Label>
                  <Input
                    id="address"
                    name="address"
                    placeholder="123 Main St"
                    value={formData.address}
                    onChange={handleChange}
                    className={errors.address ? "border-red-500" : ""}
                  />
                  {errors.address && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.address}
                    </p>
                  )}
                </div>

                {/* Postal Code */}
                <div className="space-y-2">
                  <Label htmlFor="postalCode">Pincode</Label>
                  <Input
                    id="postalCode"
                    name="postalCode"
                    placeholder="110001"
                    value={formData.postalCode}
                    onChange={handlePostalChange}
                    maxLength={6}
                    className={errors.postalCode ? "border-red-500" : ""}
                  />
                  {errors.postalCode && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.postalCode}
                    </p>
                  )}
                </div>

                {/* Post Office dropdown */}
                {postOffices.length > 0 && (
                  <div className="space-y-2">
                    <Label>Post Office</Label>
                    <Select
                      onValueChange={(value) => {
                        const selected = postOffices.find(
                          (po) => po.Name === value
                        );
                        setFormData((prev) => ({
                          ...prev,
                          postOffice: value,
                          city: selected?.District || "",
                          country: selected?.State || "",
                        }));
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Post Office" />
                      </SelectTrigger>
                      <SelectContent>
                        {postOffices.map((po) => (
                          <SelectItem key={po.Name} value={po.Name}>
                            {po.Name} - {po.Taluk}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* City and State */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      readOnly
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">State</Label>
                    <Input
                      id="country"
                      name="country"
                      value={formData.country}
                      readOnly
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-5 text-center">
                <h2 className="text-2xl font-bold text-pink-600 dark:text-pink-200 tracking-wide">
                  Thank you, {formData.name || "Atul"} we got your details!
                </h2>
                <p className="text-muted-foreground">
                  Please click the button below to confirm and complete your
                  order via WhatsApp.
                </p>
                <p className="text-sm text-gray-500 italic text-left">
                  We'll be in touch shortly to finalize everything.
                </p>
              </div>
              // <div className="space-y-4">
              //   <div className="space-y-2">
              //     <Label htmlFor="cardName">Name on Card</Label>
              //     <Input
              //       id="cardName"
              //       name="cardName"
              //       placeholder="John Doe"
              //       value={formData.cardName}
              //       onChange={handleChange}
              //       className={errors.cardName ? "border-red-500" : ""}
              //     />
              //     {errors.cardName && <p className="text-red-500 text-xs mt-1">{errors.cardName}</p>}
              //   </div>

              //   <div className="space-y-2">
              //     <Label htmlFor="cardNumber">Card Number</Label>
              //     <Input
              //       id="cardNumber"
              //       name="cardNumber"
              //       placeholder="1234 5678 9012 3456"
              //       value={formData.cardNumber}
              //       onChange={handleCardNumberChange}
              //       maxLength={19}
              //       className={errors.cardNumber ? "border-red-500" : ""}
              //     />
              //     {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
              //   </div>

              //   <div className="grid grid-cols-2 gap-4">
              //     <div className="space-y-2">
              //       <Label htmlFor="expiry">Expiry Date</Label>
              //       <Input
              //         id="expiry"
              //         name="expiry"
              //         placeholder="MM/YY"
              //         value={formData.expiry}
              //         onChange={handleExpiryChange}
              //         maxLength={5}
              //         className={errors.expiry ? "border-red-500" : ""}
              //       />
              //       {errors.expiry && <p className="text-red-500 text-xs mt-1">{errors.expiry}</p>}
              //     </div>

              //     <div className="space-y-2">
              //       <Label htmlFor="cvv">CVV</Label>
              //       <Input
              //         id="cvv"
              //         name="cvv"
              //         placeholder="123"
              //         value={formData.cvv}
              //         onChange={handleChange}
              //         maxLength={4}
              //         className={errors.cvv ? "border-red-500" : ""}
              //       />
              //       {errors.cvv && <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>}
              //     </div>
              //   </div>
              // </div>
            )}
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Separator />
          <div className="flex justify-between w-full">
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              disabled={step === 1 || isSubmitting}
              className="transition-all duration-300 hover:bg-pink-100 dark:hover:bg-pink-900/30"
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back
            </Button>

            {step < 3 ? (
              <Button
                type="button"
                onClick={handleNext}
                disabled={isSubmitting}
                className="transition-all duration-300 hover:bg-pink-600 dark:hover:bg-pink-700"
              >
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                type="submit"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="transition-all duration-300 hover:bg-pink-600 dark:hover:bg-pink-700"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Buy Now"
                )}
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
