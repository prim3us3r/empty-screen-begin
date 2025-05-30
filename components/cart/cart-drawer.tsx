"use client"

import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, ShoppingCart, Trash2, X } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useCart } from "./cart-provider"
import { formatMYR } from "@/lib/services/gold-price-service"

interface CartDrawerProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

const CartDrawer = ({ isOpen, setIsOpen }: CartDrawerProps) => {
  const { cartItems, removeFromCart, updateQuantity, subtotal, formattedSubtotal } = useCart()

  // Listen for custom event to toggle cart
  useEffect(() => {
    const handleToggleCart = () => {
      setIsOpen(!isOpen)
    }

    document.addEventListener("toggle-cart", handleToggleCart)

    return () => {
      document.removeEventListener("toggle-cart", handleToggleCart)
    }
  }, [isOpen, setIsOpen])

  // Calculate shipping
  const shipping = subtotal > 4650 ? 0 : 25
  const tax = subtotal * 0.06 // 6% SST in Malaysia
  const total = subtotal + shipping + tax

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto bg-black border-l border-zinc-800">
        <SheetHeader className="flex flex-row items-center justify-between">
          <SheetTitle className="flex items-center text-white">
            <ShoppingCart className="mr-2 h-5 w-5 text-gold-DEFAULT" />
            Your Cart
          </SheetTitle>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </Button>
        </SheetHeader>

        <div className="mt-8">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <ShoppingCart className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-6">Your cart is empty</p>
              <Button
                asChild
                onClick={() => setIsOpen(false)}
                className="rounded-full bg-gold-DEFAULT hover:bg-gold-dark text-black"
              >
                <Link href="/products">Continue Shopping</Link>
              </Button>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <div className="relative h-16 w-16 overflow-hidden rounded-lg bg-zinc-900">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-contain p-2"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">{formatMYR(item.priceRM)}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-full"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-3 w-3" />
                        <span className="sr-only">Decrease quantity</span>
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-full"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                        <span className="sr-only">Increase quantity</span>
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive rounded-full"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  </div>
                ))}
              </div>

              <Separator className="my-6 bg-zinc-800" />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">{formattedSubtotal}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{shipping === 0 ? "Free" : formatMYR(shipping)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Tax (6% SST)</span>
                  <span>{formatMYR(tax)}</span>
                </div>
                <Separator className="my-2 bg-zinc-800" />
                <div className="flex items-center justify-between">
                  <span className="font-medium">Total</span>
                  <span className="font-bold text-gold-DEFAULT">{formatMYR(total)}</span>
                </div>
                <p className="text-sm text-muted-foreground">Shipping and taxes calculated at checkout</p>
                <div className="flex flex-col space-y-2">
                  <Button asChild className="bg-gold-DEFAULT hover:bg-gold-dark text-black rounded-full">
                    <Link href="/checkout" onClick={() => setIsOpen(false)}>
                      Checkout
                    </Link>
                  </Button>
                  <Button variant="outline" onClick={() => setIsOpen(false)} className="rounded-full">
                    Continue Shopping
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default CartDrawer
