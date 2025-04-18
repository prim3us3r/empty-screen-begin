import type { Metadata } from "next"
import Link from "next/link"
import { CheckCircle, Package } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Order Confirmation | Aurum Gold Bars",
  description: "Thank you for your purchase. Your order has been confirmed.",
}

export default function OrderConfirmationPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <div className="max-w-2xl mx-auto text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 dark:bg-green-900/20 p-4 rounded-full">
            <CheckCircle className="h-16 w-16 text-green-600 dark:text-green-500" />
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-4">Order Confirmed</h1>
        <p className="text-muted-foreground mb-8">
          Thank you for your purchase. Your order has been confirmed and is being processed.
        </p>

        <div className="bg-secondary/50 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-center mb-4">
            <Package className="h-6 w-6 text-gold-DEFAULT mr-2" />
            <h2 className="text-xl font-bold">Order #AUR12345</h2>
          </div>
          <p className="text-muted-foreground mb-4">
            A confirmation email has been sent to your email address with all the details of your order.
          </p>
          <div className="text-sm text-muted-foreground">
            <p>Order Date: April 17, 2025</p>
            <p>Estimated Delivery: April 24-26, 2025</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild className="bg-gold-DEFAULT hover:bg-gold-dark text-black">
            <Link href="/products">Continue Shopping</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/account/orders">View Order History</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
