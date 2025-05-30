"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, ShoppingBag, User, Menu } from "lucide-react"
import { useCart } from "@/components/cart/cart-provider"
import { useIsMobile } from "@/hooks/use-media-query"

const IosFooterMenu = () => {
  const pathname = usePathname()
  const { cartItems } = useCart()
  const isMobile = useIsMobile()

  if (!isMobile) return null

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-md border-t border-white/10 py-2 px-4 z-40">
      <div className="flex justify-around items-center">
        <Link
          href="/"
          className={`flex flex-col items-center p-2 ${pathname === "/" ? "text-gold-DEFAULT" : "text-white/70"}`}
        >
          <Home className="h-6 w-6" />
          <span className="text-xs mt-1">Home</span>
        </Link>

        <Link
          href="/products"
          className={`flex flex-col items-center p-2 ${pathname.startsWith("/products") ? "text-gold-DEFAULT" : "text-white/70"}`}
        >
          <ShoppingBag className="h-6 w-6" />
          <span className="text-xs mt-1">Shop</span>
        </Link>

        <button
          onClick={() => document.dispatchEvent(new CustomEvent("toggle-cart"))}
          className="flex flex-col items-center p-2 text-white/70 relative"
        >
          <ShoppingBag className="h-6 w-6" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-gold-DEFAULT text-black text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
          <span className="text-xs mt-1">Cart</span>
        </button>

        <Link
          href="/account"
          className={`flex flex-col items-center p-2 ${pathname.startsWith("/account") ? "text-gold-DEFAULT" : "text-white/70"}`}
        >
          <User className="h-6 w-6" />
          <span className="text-xs mt-1">Account</span>
        </Link>

        <button
          onClick={() => document.dispatchEvent(new CustomEvent("toggle-mobile-menu"))}
          className="flex flex-col items-center p-2 text-white/70"
        >
          <Menu className="h-6 w-6" />
          <span className="text-xs mt-1">Menu</span>
        </button>
      </div>
    </div>
  )
}

export default IosFooterMenu
