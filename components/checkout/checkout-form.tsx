"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ChevronRight, Lock, ShieldCheck, Check, Info, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { useCart } from "@/components/cart/cart-provider"
import { formatMYR } from "@/lib/services/gold-price-service"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import PaymentLogos from "@/components/checkout/payment-logos"

// Malaysian states
const malaysianStates = [
  "Johor",
  "Kedah",
  "Kelantan",
  "Melaka",
  "Negeri Sembilan",
  "Pahang",
  "Perak",
  "Perlis",
  "Pulau Pinang",
  "Sabah",
  "Sarawak",
  "Selangor",
  "Terengganu",
  "Kuala Lumpur",
  "Labuan",
  "Putrajaya",
]

const CheckoutForm = () => {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("fpx")
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postcode: "",
  })
  const [billingInfo, setBillingInfo] = useState({
    sameAsShipping: true,
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    postcode: "",
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  const { cartItems, subtotal, formattedSubtotal, clearCart } = useCart()
  const { toast } = useToast()

  // Calculate shipping, tax, and total
  const shipping = subtotal > 4650 ? 0 : 25
  const tax = subtotal * 0.06 // 6% SST in Malaysia
  const total = subtotal + shipping + tax

  const validateShippingInfo = () => {
    const errors: Record<string, string> = {}

    if (!shippingInfo.firstName.trim()) errors.firstName = "First name is required"
    if (!shippingInfo.lastName.trim()) errors.lastName = "Last name is required"
    if (!shippingInfo.email.trim()) errors.email = "Email is required"
    if (!/^\S+@\S+\.\S+$/.test(shippingInfo.email)) errors.email = "Valid email is required"
    if (!shippingInfo.phone.trim()) errors.phone = "Phone number is required"
    if (!shippingInfo.address.trim()) errors.address = "Address is required"
    if (!shippingInfo.city.trim()) errors.city = "City is required"
    if (!shippingInfo.state) errors.state = "State is required"
    if (!shippingInfo.postcode.trim()) errors.postcode = "Postcode is required"
    if (!/^\d{5}$/.test(shippingInfo.postcode)) errors.postcode = "Valid 5-digit postcode is required"

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const validatePaymentInfo = () => {
    const errors: Record<string, string> = {}

    if (!agreedToTerms) errors.terms = "You must agree to the terms and conditions"

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateShippingInfo()) {
      setStep(2)
      window.scrollTo(0, 0)
    }
  }

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (validatePaymentInfo()) {
      setIsSubmitting(true)

      try {
        // Create order in database
        const orderResponse = await fetch("/api/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            customer: {
              firstName: shippingInfo.firstName,
              lastName: shippingInfo.lastName,
              email: shippingInfo.email,
              phone: shippingInfo.phone,
            },
            shipping: {
              address: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postcode: shippingInfo.postcode,
              country: "Malaysia",
            },
            billing: billingInfo.sameAsShipping
              ? {
                  address: shippingInfo.address,
                  city: shippingInfo.city,
                  state: shippingInfo.state,
                  postcode: shippingInfo.postcode,
                  country: "Malaysia",
                }
              : {
                  address: billingInfo.address,
                  city: billingInfo.city,
                  state: billingInfo.state,
                  postcode: billingInfo.postcode,
                  country: "Malaysia",
                },
            items: cartItems.map((item) => ({
              productId: item.id,
              quantity: item.quantity,
              price: item.priceRM,
              total: item.priceRM * item.quantity,
            })),
            subtotal,
            shipping,
            tax,
            total,
            paymentMethod,
          }),
        })

        if (!orderResponse.ok) {
          throw new Error("Failed to create order")
        }

        const orderData = await orderResponse.json()
        const orderId = orderData.id

        // Create payment with Chip-in
        const paymentResponse = await fetch("/api/payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderId,
            amount: total,
            customerEmail: shippingInfo.email,
            customerName: `${shippingInfo.firstName} ${shippingInfo.lastName}`,
            productName: "Gold Products Purchase",
          }),
        })

        if (!paymentResponse.ok) {
          throw new Error("Failed to create payment")
        }

        const paymentData = await paymentResponse.json()

        // Clear cart
        clearCart()

        // Redirect to payment page
        window.location.href = paymentData.paymentUrl
      } catch (error) {
        console.error("Checkout error:", error)
        toast({
          title: "Error",
          description: "There was a problem processing your order. Please try again.",
          variant: "destructive",
        })
        setIsSubmitting(false)
      }
    }
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<any>>,
    field: string,
  ) => {
    setter((prev: any) => ({ ...prev, [field]: e.target.value }))

    // Clear error when user types
    if (formErrors[field]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const handleBillingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sameAsShipping = e.target.checked
    setBillingInfo((prev) => ({
      ...prev,
      sameAsShipping,
      firstName: sameAsShipping ? shippingInfo.firstName : prev.firstName,
      lastName: sameAsShipping ? shippingInfo.lastName : prev.lastName,
      address: sameAsShipping ? shippingInfo.address : prev.address,
      city: sameAsShipping ? shippingInfo.city : prev.city,
      state: sameAsShipping ? shippingInfo.state : prev.state,
      postcode: sameAsShipping ? shippingInfo.postcode : prev.postcode,
    }))
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left side - Checkout Form */}
      <div className="lg:col-span-2">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex items-center">
            <div
              className={`flex items-center justify-center h-8 w-8 rounded-full ${
                step >= 1 ? "bg-gold-DEFAULT text-black" : "bg-muted text-muted-foreground"
              } mr-2`}
            >
              {step > 1 ? <Check className="h-4 w-4" /> : "1"}
            </div>
            <span className={`text-sm font-medium ${step >= 1 ? "text-foreground" : "text-muted-foreground"}`}>
              Shipping
            </span>
            <div className={`h-px flex-1 mx-4 ${step > 1 ? "bg-gold-DEFAULT" : "bg-muted"}`}></div>
            <div
              className={`flex items-center justify-center h-8 w-8 rounded-full ${
                step >= 2 ? "bg-gold-DEFAULT text-black" : "bg-muted text-muted-foreground"
              } mr-2`}
            >
              2
            </div>
            <span className={`text-sm font-medium ${step >= 2 ? "text-foreground" : "text-muted-foreground"}`}>
              Payment
            </span>
          </div>
        </div>

        {/* Step 1: Shipping Information */}
        {step === 1 && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 mb-6">
            <div className="flex items-center mb-6">
              <h2 className="text-xl font-bold">Shipping Information</h2>
            </div>

            <form onSubmit={handleShippingSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={shippingInfo.firstName}
                    onChange={(e) => handleInputChange(e, setShippingInfo, "firstName")}
                    className={`rounded-lg ${formErrors.firstName ? "border-red-500" : ""}`}
                  />
                  {formErrors.firstName && <p className="text-red-500 text-xs mt-1">{formErrors.firstName}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={shippingInfo.lastName}
                    onChange={(e) => handleInputChange(e, setShippingInfo, "lastName")}
                    className={`rounded-lg ${formErrors.lastName ? "border-red-500" : ""}`}
                  />
                  {formErrors.lastName && <p className="text-red-500 text-xs mt-1">{formErrors.lastName}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={shippingInfo.email}
                  onChange={(e) => handleInputChange(e, setShippingInfo, "email")}
                  className={`rounded-lg ${formErrors.email ? "border-red-500" : ""}`}
                />
                {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="phone">Phone Number</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Required for delivery updates</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Input
                  id="phone"
                  value={shippingInfo.phone}
                  onChange={(e) => handleInputChange(e, setShippingInfo, "phone")}
                  className={`rounded-lg ${formErrors.phone ? "border-red-500" : ""}`}
                  placeholder="e.g. 0123456789"
                />
                {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Street Address</Label>
                <Input
                  id="address"
                  value={shippingInfo.address}
                  onChange={(e) => handleInputChange(e, setShippingInfo, "address")}
                  className={`rounded-lg ${formErrors.address ? "border-red-500" : ""}`}
                />
                {formErrors.address && <p className="text-red-500 text-xs mt-1">{formErrors.address}</p>}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={shippingInfo.city}
                    onChange={(e) => handleInputChange(e, setShippingInfo, "city")}
                    className={`rounded-lg ${formErrors.city ? "border-red-500" : ""}`}
                  />
                  {formErrors.city && <p className="text-red-500 text-xs mt-1">{formErrors.city}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Select
                    value={shippingInfo.state}
                    onValueChange={(value) => {
                      setShippingInfo((prev) => ({ ...prev, state: value }))
                      if (formErrors.state) {
                        setFormErrors((prev) => {
                          const newErrors = { ...prev }
                          delete newErrors.state
                          return newErrors
                        })
                      }
                    }}
                  >
                    <SelectTrigger className={`rounded-lg ${formErrors.state ? "border-red-500" : ""}`}>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      {malaysianStates.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {formErrors.state && <p className="text-red-500 text-xs mt-1">{formErrors.state}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postcode">Postcode</Label>
                  <Input
                    id="postcode"
                    value={shippingInfo.postcode}
                    onChange={(e) => handleInputChange(e, setShippingInfo, "postcode")}
                    className={`rounded-lg ${formErrors.postcode ? "border-red-500" : ""}`}
                    maxLength={5}
                  />
                  {formErrors.postcode && <p className="text-red-500 text-xs mt-1">{formErrors.postcode}</p>}
                </div>
              </div>

              <div className="pt-4">
                <Button type="submit" className="w-full bg-gold-DEFAULT hover:bg-gold-dark text-black rounded-full">
                  Continue to Payment
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Step 2: Payment Method */}
        {step === 2 && (
          <>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Shipping Address</h2>
                <Button variant="outline" size="sm" onClick={() => setStep(1)} className="rounded-full">
                  Edit
                </Button>
              </div>

              <div className="text-sm">
                <p className="font-medium">
                  {shippingInfo.firstName} {shippingInfo.lastName}
                </p>
                <p className="text-muted-foreground">{shippingInfo.address}</p>
                <p className="text-muted-foreground">
                  {shippingInfo.city}, {shippingInfo.state}, {shippingInfo.postcode}
                </p>
                <p className="text-muted-foreground mt-1">{shippingInfo.phone}</p>
                <p className="text-muted-foreground">{shippingInfo.email}</p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
              <div className="flex items-center mb-6">
                <h2 className="text-xl font-bold">Payment Method</h2>
              </div>

              <form onSubmit={handlePaymentSubmit} className="space-y-6">
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                  <div
                    className={`flex items-center space-x-3 border rounded-lg p-4 cursor-pointer transition-colors ${
                      paymentMethod === "fpx" ? "border-gold-DEFAULT bg-gold-DEFAULT/5" : "border-gray-200"
                    }`}
                    onClick={() => setPaymentMethod("fpx")}
                  >
                    <RadioGroupItem value="fpx" id="fpx" className="text-gold-DEFAULT" />
                    <div className="flex items-center flex-1">
                      <div className="h-8 w-12 relative mr-3">
                        <Image src="/images/payment/fpx.png" alt="FPX" fill className="object-contain" />
                      </div>
                      <div className="flex-1">
                        <label htmlFor="fpx" className="font-medium cursor-pointer">
                          FPX Online Banking
                        </label>
                        <p className="text-xs text-muted-foreground">Pay directly from your bank account</p>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`flex items-center space-x-3 border rounded-lg p-4 cursor-pointer transition-colors ${
                      paymentMethod === "card" ? "border-gold-DEFAULT bg-gold-DEFAULT/5" : "border-gray-200"
                    }`}
                    onClick={() => setPaymentMethod("card")}
                  >
                    <RadioGroupItem value="card" id="card" className="text-gold-DEFAULT" />
                    <div className="flex items-center flex-1">
                      <div className="h-8 w-12 relative mr-3">
                        <Image src="/images/payment/visa.png" alt="Credit Card" fill className="object-contain" />
                      </div>
                      <div className="flex-1">
                        <label htmlFor="card" className="font-medium cursor-pointer">
                          Credit / Debit Card
                        </label>
                        <p className="text-xs text-muted-foreground">Visa, Mastercard, AMEX</p>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`flex items-center space-x-3 border rounded-lg p-4 cursor-pointer transition-colors ${
                      paymentMethod === "tng" ? "border-gold-DEFAULT bg-gold-DEFAULT/5" : "border-gray-200"
                    }`}
                    onClick={() => setPaymentMethod("tng")}
                  >
                    <RadioGroupItem value="tng" id="tng" className="text-gold-DEFAULT" />
                    <div className="flex items-center flex-1">
                      <div className="h-8 w-12 relative mr-3">
                        <Image src="/images/payment/tng.png" alt="Touch 'n Go" fill className="object-contain" />
                      </div>
                      <div className="flex-1">
                        <label htmlFor="tng" className="font-medium cursor-pointer">
                          Touch 'n Go eWallet
                        </label>
                        <p className="text-xs text-muted-foreground">Pay with your TNG eWallet</p>
                      </div>
                    </div>
                  </div>
                </RadioGroup>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="billing">
                    <AccordionTrigger className="text-sm font-medium">Billing Address</AccordionTrigger>
                    <AccordionContent>
                      <div className="pt-4 pb-2">
                        <div className="flex items-center space-x-2 mb-4">
                          <Checkbox
                            id="sameAsShipping"
                            checked={billingInfo.sameAsShipping}
                            onCheckedChange={(checked) => {
                              handleBillingChange({
                                target: { checked: checked as boolean },
                              } as React.ChangeEvent<HTMLInputElement>)
                            }}
                          />
                          <label
                            htmlFor="sameAsShipping"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Same as shipping address
                          </label>
                        </div>

                        {!billingInfo.sameAsShipping && (
                          <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="billingFirstName">First Name</Label>
                                <Input
                                  id="billingFirstName"
                                  value={billingInfo.firstName}
                                  onChange={(e) => handleInputChange(e, setBillingInfo, "firstName")}
                                  className="rounded-lg"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="billingLastName">Last Name</Label>
                                <Input
                                  id="billingLastName"
                                  value={billingInfo.lastName}
                                  onChange={(e) => handleInputChange(e, setBillingInfo, "lastName")}
                                  className="rounded-lg"
                                />
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="billingAddress">Street Address</Label>
                              <Input
                                id="billingAddress"
                                value={billingInfo.address}
                                onChange={(e) => handleInputChange(e, setBillingInfo, "address")}
                                className="rounded-lg"
                              />
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="billingCity">City</Label>
                                <Input
                                  id="billingCity"
                                  value={billingInfo.city}
                                  onChange={(e) => handleInputChange(e, setBillingInfo, "city")}
                                  className="rounded-lg"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="billingState">State</Label>
                                <Select
                                  value={billingInfo.state}
                                  onValueChange={(value) => setBillingInfo((prev) => ({ ...prev, state: value }))}
                                >
                                  <SelectTrigger className="rounded-lg">
                                    <SelectValue placeholder="Select state" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {malaysianStates.map((state) => (
                                      <SelectItem key={state} value={state}>
                                        {state}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="billingPostcode">Postcode</Label>
                                <Input
                                  id="billingPostcode"
                                  value={billingInfo.postcode}
                                  onChange={(e) => handleInputChange(e, setBillingInfo, "postcode")}
                                  className="rounded-lg"
                                  maxLength={5}
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={agreedToTerms}
                    onCheckedChange={(checked) => {
                      setAgreedToTerms(checked as boolean)
                      if (formErrors.terms) {
                        setFormErrors((prev) => {
                          const newErrors = { ...prev }
                          delete newErrors.terms
                          return newErrors
                        })
                      }
                    }}
                    className={formErrors.terms ? "border-red-500" : ""}
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I agree to the{" "}
                    <a href="/terms" className="text-gold-DEFAULT hover:underline">
                      terms and conditions
                    </a>{" "}
                    and{" "}
                    <a href="/privacy" className="text-gold-DEFAULT hover:underline">
                      privacy policy
                    </a>
                  </label>
                </div>
                {formErrors.terms && <p className="text-red-500 text-xs mt-1">{formErrors.terms}</p>}

                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Lock className="h-4 w-4" />
                  <span>Your payment information is secure and encrypted</span>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gold-DEFAULT hover:bg-gold-dark text-black rounded-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Place Order"
                  )}
                </Button>
              </form>
            </div>
          </>
        )}
      </div>

      {/* Right side - Order Summary */}
      <div className="lg:col-span-1">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 sticky top-20">
          <h3 className="text-lg font-bold mb-4">Order Summary</h3>

          <div className="space-y-4 mb-6">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center space-x-4">
                <div className="relative h-16 w-16 overflow-hidden rounded-lg bg-secondary/50">
                  <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-contain p-2" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium truncate">{item.name}</h4>
                  <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{formatMYR(item.priceRM * item.quantity)}</p>
                </div>
              </div>
            ))}
          </div>

          <Separator className="my-4" />

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{formattedSubtotal}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span>{shipping === 0 ? "Free" : formatMYR(shipping)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tax (6% SST)</span>
              <span>{formatMYR(tax)}</span>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>{formatMYR(total)}</span>
          </div>

          {/* Free shipping threshold message */}
          {subtotal < 4650 && (
            <div className="mt-4 p-3 bg-gold-DEFAULT/10 rounded-lg text-sm">
              <p>
                Add <strong>{formatMYR(4650 - subtotal)}</strong> more to qualify for <strong>FREE shipping</strong>
              </p>
            </div>
          )}

          <div className="mt-6 flex items-center justify-center space-x-2 text-sm text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-gold-DEFAULT" />
            <span>Secure checkout</span>
          </div>

          {/* Trust badges */}
          <PaymentLogos />
        </div>
      </div>
    </div>
  )
}

export default CheckoutForm
