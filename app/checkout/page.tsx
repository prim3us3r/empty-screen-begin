import type { Metadata } from "next"
import CheckoutForm from "@/components/checkout/checkout-form"

export const metadata: Metadata = {
  title: "Checkout | Aurum Gold Bars",
  description: "Complete your purchase of premium gold bars and coins securely.",
}

export default function CheckoutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col items-center text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Checkout</h1>
        <div className="w-20 h-1 bg-gold-DEFAULT mb-6"></div>
        <p className="text-muted-foreground max-w-2xl">
          Complete your order securely with our streamlined checkout process.
        </p>
      </div>

      <CheckoutForm />
    </div>
  )
}
