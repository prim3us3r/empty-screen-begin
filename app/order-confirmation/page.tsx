import type { Metadata } from "next"
import Link from "next/link"
import { CheckCircle, Package, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Order Confirmation | GoldJewelsMy",
  description: "Thank you for your purchase. Your order has been confirmed.",
}

export default function OrderConfirmationPage() {
  // Generate a random order number
  const orderNumber = `GJM${Math.floor(10000 + Math.random() * 90000)}`

  // Calculate estimated delivery date (5-7 business days from now)
  const today = new Date()
  const deliveryStart = new Date(today)
  deliveryStart.setDate(today.getDate() + 5)
  const deliveryEnd = new Date(today)
  deliveryEnd.setDate(today.getDate() + 7)

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-MY", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 dark:bg-green-900/20 p-4 rounded-full">
              <CheckCircle className="h-16 w-16 text-green-600 dark:text-green-500" />
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4">Thank You for Your Order!</h1>
          <p className="text-muted-foreground mb-8">Your order has been confirmed and is being processed.</p>

          <div className="bg-secondary/50 rounded-lg p-6 mb-8 text-left">
            <div className="flex items-center justify-center mb-4">
              <Package className="h-6 w-6 text-gold-DEFAULT mr-2" />
              <h2 className="text-xl font-bold">Order #{orderNumber}</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              A confirmation email has been sent to your email address with all the details of your order.
            </p>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>Order Date: {formatDate(today)}</p>
              <p>
                Estimated Delivery: {formatDate(deliveryStart)} - {formatDate(deliveryEnd)}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 border border-gold-DEFAULT/30 rounded-lg bg-gold-DEFAULT/5">
              <h3 className="font-medium mb-2">What happens next?</h3>
              <ol className="text-sm text-left space-y-2">
                <li className="flex items-start">
                  <span className="bg-gold-DEFAULT text-black rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                    1
                  </span>
                  <span>We'll verify your payment and prepare your order</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-gold-DEFAULT text-black rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                    2
                  </span>
                  <span>You'll receive a shipping confirmation email with tracking details</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-gold-DEFAULT text-black rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                    3
                  </span>
                  <span>Your premium gold products will be delivered securely to your address</span>
                </li>
              </ol>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild className="bg-gold-DEFAULT hover:bg-gold-dark text-black rounded-full">
                <Link href="/products">
                  Continue Shopping
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full">
                <Link href="/account/orders">View Order History</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
