"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight, Minus, Plus, ShieldCheck, ShoppingCart, Truck, Info, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart/cart-provider"
import { useToast } from "@/hooks/use-toast"
import type { Product } from "@/lib/services/product-service"
import RelatedProducts from "./related-products"
import { formatMYR } from "@/lib/services/gold-price-service"
import { cn } from "@/lib/utils"

interface ProductDetailProps {
  product: Product
}

const ProductDetail = ({ product }: ProductDetailProps) => {
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState("details")
  const { addToCart } = useCart()
  const { toast } = useToast()

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      priceRM: product.price,
      image: product.image_url,
      quantity,
    })

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="flex items-center text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-gold-DEFAULT">
          Home
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <Link href="/products" className="hover:text-gold-DEFAULT">
          Products
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="text-foreground">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-12">
        {/* Product Image */}
        <div className="bg-black rounded-2xl p-8 flex items-center justify-center">
          <div className="relative w-full h-[300px] md:h-[400px]">
            <Image
              src={product.image_url || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <h1 className="text-2xl md:text-3xl font-bold mb-3">{product.name}</h1>
          <p className="text-xl md:text-2xl font-semibold mb-4 text-gold-DEFAULT">{formatMYR(product.price)}</p>

          <div className="space-y-4 mb-6">
            <p className="text-muted-foreground">{product.description}</p>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-zinc-900 p-3 rounded-lg">
                <span className="text-sm text-muted-foreground">Weight</span>
                <p className="font-medium">{product.weight}g</p>
              </div>
              <div className="bg-zinc-900 p-3 rounded-lg">
                <span className="text-sm text-muted-foreground">Purity</span>
                <p className="font-medium">{product.purity}</p>
              </div>
              {product.dimensions && (
                <div className="bg-zinc-900 p-3 rounded-lg">
                  <span className="text-sm text-muted-foreground">Dimensions</span>
                  <p className="font-medium">{product.dimensions}</p>
                </div>
              )}
              {product.serial_number && (
                <div className="bg-zinc-900 p-3 rounded-lg">
                  <span className="text-sm text-muted-foreground">Serial Number</span>
                  <p className="font-medium">{product.serial_number}</p>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center border border-zinc-700 rounded-full">
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-full"
                onClick={decreaseQuantity}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
                <span className="sr-only">Decrease quantity</span>
              </Button>
              <span className="w-10 text-center">{quantity}</span>
              <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full" onClick={increaseQuantity}>
                <Plus className="h-4 w-4" />
                <span className="sr-only">Increase quantity</span>
              </Button>
            </div>
            <Button
              className="flex-1 bg-gold-DEFAULT hover:bg-gold-dark text-black rounded-full"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Add to Cart
            </Button>
          </div>

          <div className="space-y-3 border-t border-zinc-800 pt-6">
            <div className="flex items-center">
              <ShieldCheck className="h-5 w-5 text-gold-DEFAULT mr-2" />
              <span className="text-sm">Secure payment & authenticity guaranteed</span>
            </div>
            <div className="flex items-center">
              <Truck className="h-5 w-5 text-gold-DEFAULT mr-2" />
              <span className="text-sm">Free shipping on orders over RM4,650</span>
            </div>
            {product.has_certificate && (
              <div className="flex items-center">
                <Check className="h-5 w-5 text-gold-DEFAULT mr-2" />
                <span className="text-sm">Includes certificate of authenticity</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Product Details Tabs - Vertical Layout */}
      <div className="bg-black rounded-2xl overflow-hidden mb-16">
        <div className="flex flex-col md:flex-row">
          {/* Tab Navigation - Vertical */}
          <div className="md:w-64 border-b md:border-b-0 md:border-r border-zinc-800">
            <div className="flex md:flex-col overflow-x-auto md:overflow-visible scrollbar-hide">
              <button
                onClick={() => setActiveTab("details")}
                className={cn(
                  "px-6 py-4 text-left font-medium transition-colors w-full",
                  activeTab === "details"
                    ? "bg-zinc-900 text-gold-DEFAULT border-b-2 md:border-b-0 md:border-l-2 border-gold-DEFAULT"
                    : "text-muted-foreground hover:text-white hover:bg-zinc-900/50",
                )}
              >
                Details
              </button>
              <button
                onClick={() => setActiveTab("specifications")}
                className={cn(
                  "px-6 py-4 text-left font-medium transition-colors whitespace-nowrap w-full",
                  activeTab === "specifications"
                    ? "bg-zinc-900 text-gold-DEFAULT border-b-2 md:border-b-0 md:border-l-2 border-gold-DEFAULT"
                    : "text-muted-foreground hover:text-white hover:bg-zinc-900/50",
                )}
              >
                Specifications
              </button>
              <button
                onClick={() => setActiveTab("shipping")}
                className={cn(
                  "px-6 py-4 text-left font-medium transition-colors whitespace-nowrap w-full",
                  activeTab === "shipping"
                    ? "bg-zinc-900 text-gold-DEFAULT border-b-2 md:border-b-0 md:border-l-2 border-gold-DEFAULT"
                    : "text-muted-foreground hover:text-white hover:bg-zinc-900/50",
                )}
              >
                Shipping & Returns
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6 md:p-8 flex-1">
            {activeTab === "details" && (
              <div className="prose prose-invert max-w-none">
                <h3 className="text-xl font-bold mb-4">Product Details</h3>
                <p>
                  Our {product.name} is crafted with precision and care, meeting the highest standards of quality in the
                  industry. Each gold bar is minted using advanced technology to ensure perfect weight and purity.
                </p>
                <p>
                  The bar features the GoldJewelsMy logo and displays its weight and purity prominently. Each bar comes
                  with a unique serial number for authentication and tracking purposes.
                </p>
                <p>
                  Whether you're a seasoned investor or just starting your gold collection, this {product.weight}g gold
                  bar offers an excellent balance of value and prestige.
                </p>
              </div>
            )}

            {activeTab === "specifications" && (
              <div className="prose prose-invert max-w-none">
                <h3 className="text-xl font-bold mb-4">Technical Specifications</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Info className="h-4 w-4 text-gold-DEFAULT mr-2 mt-1" />
                    <div>
                      <span className="font-medium">Weight:</span> {product.weight}g
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Info className="h-4 w-4 text-gold-DEFAULT mr-2 mt-1" />
                    <div>
                      <span className="font-medium">Purity:</span> {product.purity} fine gold
                    </div>
                  </li>
                  {product.dimensions && (
                    <li className="flex items-start">
                      <Info className="h-4 w-4 text-gold-DEFAULT mr-2 mt-1" />
                      <div>
                        <span className="font-medium">Dimensions:</span> {product.dimensions}
                      </div>
                    </li>
                  )}
                  <li className="flex items-start">
                    <Info className="h-4 w-4 text-gold-DEFAULT mr-2 mt-1" />
                    <div>
                      <span className="font-medium">Manufacturer:</span> GoldJewelsMy
                    </div>
                  </li>
                  {product.serial_number && (
                    <li className="flex items-start">
                      <Info className="h-4 w-4 text-gold-DEFAULT mr-2 mt-1" />
                      <div>
                        <span className="font-medium">Serial Number Format:</span> Unique alphanumeric identifier
                      </div>
                    </li>
                  )}
                  <li className="flex items-start">
                    <Info className="h-4 w-4 text-gold-DEFAULT mr-2 mt-1" />
                    <div>
                      <span className="font-medium">Packaging:</span> Comes in a protective assay card with certificate
                      of authenticity
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Info className="h-4 w-4 text-gold-DEFAULT mr-2 mt-1" />
                    <div>
                      <span className="font-medium">Certification:</span> Each bar is certified for weight and purity
                    </div>
                  </li>
                </ul>
              </div>
            )}

            {activeTab === "shipping" && (
              <div className="prose prose-invert max-w-none">
                <h3 className="text-xl font-bold mb-4">Shipping & Returns</h3>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-medium mb-2 text-gold-DEFAULT">Shipping</h4>
                    <p>
                      All orders are shipped via insured courier service. Orders over RM4,650 qualify for free shipping.
                      Standard shipping takes 2-5 business days, depending on your location.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-medium mb-2 text-gold-DEFAULT">Insurance</h4>
                    <p>
                      All shipments are fully insured against loss or damage during transit at no additional cost to
                      you.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-medium mb-2 text-gold-DEFAULT">Returns</h4>
                    <p>
                      Due to the nature of precious metals and for security reasons, we have a strict return policy.
                      Returns are only accepted if the product is in its original, unopened packaging and must be
                      initiated within 3 days of delivery.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-medium mb-2 text-gold-DEFAULT">Verification</h4>
                    <p>
                      We recommend that you inspect your package upon delivery in the presence of the courier. Any
                      visible damage should be noted before accepting the package.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8">You May Also Like</h2>
        <RelatedProducts currentProductId={product.id} />
      </div>
    </div>
  )
}

export default ProductDetail
