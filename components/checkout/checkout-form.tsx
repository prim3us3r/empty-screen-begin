"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { ChevronRight, CreditCard, Lock, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { useCart } from "@/components/cart/cart-provider"

const CheckoutForm = () => {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { cartItems, subtotal, clearCart } = useCart()
  const { toast } = useToast()

  const shipping = subtotal > 1000 ? 0 : 25
  const tax = subtotal * 0.07
  const total = subtotal + shipping + tax

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Show success message
    toast({
      title: "Order placed successfully",
      description: "Thank you for your purchase. You will receive a confirmation email shortly.",
    })

    // Clear cart and redirect
    clearCart()
    setIsSubmitting(false)
    window.location.href = "/order-confirmation"
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center mb-6">
            <div
              className={`flex items-center justify-center h-8 w-8 rounded-full ${step >= 1 ? "bg-gold-DEFAULT text-black" : "bg-muted text-muted-foreground"} mr-2`}
            >
              1
            </div>
            <h2 className="text-xl font-bold">Shipping Information</h2>
          </div>

          {step === 1 ? (
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="John" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Doe" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="john@example.com" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" placeholder="+1 (555) 123-4567" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Street Address</Label>
                <Input id="address" placeholder="123 Main St" required />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="New York" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input id="state" placeholder="NY" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip">ZIP Code</Label>
                  <Input id="zip" placeholder="10001" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input id="country" placeholder="United States" required />
              </div>

              <Button
                type="button"
                className="w-full bg-gold-DEFAULT hover:bg-gold-dark text-black"
                onClick={() => setStep(2)}
              >
                Continue to Payment
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          ) : (
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium">John Doe</p>
                <p className="text-sm text-muted-foreground">123 Main St, New York, NY 10001</p>
                <p className="text-sm text-muted-foreground">United States</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => setStep(1)}>
                Edit
              </Button>
            </div>
          )}
        </div>

        {step >= 2 && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center mb-6">
              <div
                className={`flex items-center justify-center h-8 w-8 rounded-full ${step >= 2 ? "bg-gold-DEFAULT text-black" : "bg-muted text-muted-foreground"} mr-2`}
              >
                2
              </div>
              <h2 className="text-xl font-bold">Payment Method</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <RadioGroup defaultValue="card" className="space-y-4">
                <div className="flex items-center space-x-3 border rounded-lg p-4">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="flex items-center cursor-pointer">
                    <CreditCard className="h-5 w-5 mr-2" />
                    Credit / Debit Card
                  </Label>
                </div>
                <div className="flex items-center space-x-3 border rounded-lg p-4">
                  <RadioGroupItem value="paypal" id="paypal" />
                  <Label htmlFor="paypal" className="cursor-pointer">
                    PayPal
                  </Label>
                </div>
                <div className="flex items-center space-x-3 border rounded-lg p-4">
                  <RadioGroupItem value="bank" id="bank" />
                  <Label htmlFor="bank" className="cursor-pointer">
                    Bank Transfer
                  </Label>
                </div>
              </RadioGroup>

              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input id="cardNumber" placeholder="1234 5678 9012 3456" required />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input id="expiry" placeholder="MM/YY" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input id="cvc" placeholder="123" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="nameOnCard">Name on Card</Label>
                <Input id="nameOnCard" placeholder="John Doe" required />
              </div>

              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Lock className="h-4 w-4" />
                <span>Your payment information is secure and encrypted</span>
              </div>

              <Button
                type="submit"
                className="w-full bg-gold-DEFAULT hover:bg-gold-dark text-black"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : "Place Order"}
              </Button>
            </form>
          </div>
        )}
      </div>

      <div className="lg:col-span-1">
        <div className="bg-white rounded-lg shadow-sm p-6 sticky top-20">
          <h3 className="text-lg font-bold mb-4">Order Summary</h3>

          <div className="space-y-4 mb-6">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center space-x-4">
                <div className="relative h-16 w-16 overflow-hidden rounded bg-secondary/50">
                  <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-contain p-2" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium truncate">{item.name}</h4>
                  <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">${(item.price * item.quantity).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>

          <Separator className="my-4" />

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>${subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span>{shipping === 0 ? "Free" : `$${shipping.toLocaleString()}`}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <div className="mt-6 flex items-center justify-center space-x-2 text-sm text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-gold-DEFAULT" />
            <span>Secure checkout</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutForm
