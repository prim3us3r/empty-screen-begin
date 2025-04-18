"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight, Minus, Plus, ShieldCheck, ShoppingCart, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCart } from "@/components/cart/cart-provider"
import { useToast } from "@/hooks/use-toast"
import type { Product } from "@/lib/products"
import RelatedProducts from "./related-products"

interface ProductDetailProps {
  product: Product
}

const ProductDetail = ({ product }: ProductDetailProps) => {
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()
  const { toast } = useToast()

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
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
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center text-sm text-muted-foreground mb-8">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        {/* Product Image */}
        <div className="bg-secondary/30 rounded-lg p-8 flex items-center justify-center">
          <div className="relative w-full h-[400px]">
            <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-contain" />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.name}</h1>
          <p className="text-2xl font-semibold mb-6">${product.price.toLocaleString()}</p>

          <div className="space-y-4 mb-8">
            <p className="text-muted-foreground">{product.description}</p>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-secondary/50 p-4 rounded-lg">
                <span className="text-sm text-muted-foreground">Weight</span>
                <p className="font-medium">{product.weight}</p>
              </div>
              <div className="bg-secondary/50 p-4 rounded-lg">
                <span className="text-sm text-muted-foreground">Purity</span>
                <p className="font-medium">{product.purity}</p>
              </div>
              {product.dimensions && (
                <div className="bg-secondary/50 p-4 rounded-lg">
                  <span className="text-sm text-muted-foreground">Dimensions</span>
                  <p className="font-medium">{product.dimensions}</p>
                </div>
              )}
              {product.serialNumber && (
                <div className="bg-secondary/50 p-4 rounded-lg">
                  <span className="text-sm text-muted-foreground">Serial Number</span>
                  <p className="font-medium">{product.serialNumber}</p>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4 mb-8">
            <div className="flex items-center border rounded-md">
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-none"
                onClick={decreaseQuantity}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
                <span className="sr-only">Decrease quantity</span>
              </Button>
              <span className="w-12 text-center">{quantity}</span>
              <Button variant="ghost" size="icon" className="h-10 w-10 rounded-none" onClick={increaseQuantity}>
                <Plus className="h-4 w-4" />
                <span className="sr-only">Increase quantity</span>
              </Button>
            </div>
            <Button className="flex-1 bg-gold-DEFAULT hover:bg-gold-dark text-black" onClick={handleAddToCart}>
              <ShoppingCart className="h-5 w-5 mr-2" />
              Add to Cart
            </Button>
          </div>

          <div className="space-y-4 border-t pt-6">
            <div className="flex items-center">
              <ShieldCheck className="h-5 w-5 text-gold-DEFAULT mr-2" />
              <span className="text-sm">Secure payment & authenticity guaranteed</span>
            </div>
            <div className="flex items-center">
              <Truck className="h-5 w-5 text-gold-DEFAULT mr-2" />
              <span className="text-sm">Free shipping on orders over $1000</span>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="details" className="mb-16">
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="specifications">Specifications</TabsTrigger>
          <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
        </TabsList>
        <TabsContent value="details" className="pt-6">
          <div className="prose max-w-none">
            <h3 className="text-xl font-bold mb-4">Product Details</h3>
            <p>
              Our {product.name} is crafted with precision and care, meeting the highest standards of quality in the
              industry. Each gold bar is minted using advanced technology to ensure perfect weight and purity.
            </p>
            <p>
              The bar features the MAA Precious Metals logo and displays its weight and purity prominently. Each bar
              comes with a unique serial number for authentication and tracking purposes.
            </p>
            <p>
              Whether you're a seasoned investor or just starting your gold collection, this {product.weight} gold bar
              offers an excellent balance of value and prestige.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="specifications" className="pt-6">
          <div className="prose max-w-none">
            <h3 className="text-xl font-bold mb-4">Technical Specifications</h3>
            <ul className="space-y-2">
              <li>
                <strong>Weight:</strong> {product.weight}
              </li>
              <li>
                <strong>Purity:</strong> {product.purity} fine gold
              </li>
              {product.dimensions && (
                <li>
                  <strong>Dimensions:</strong> {product.dimensions}
                </li>
              )}
              <li>
                <strong>Manufacturer:</strong> GoldJewelsMy
              </li>
              {product.serialNumber && (
                <li>
                  <strong>Serial Number Format:</strong> Unique alphanumeric identifier
                </li>
              )}
              <li>
                <strong>Packaging:</strong> Comes in a protective assay card with certificate of authenticity
              </li>
              <li>
                <strong>Certification:</strong> Each bar is certified for weight and purity
              </li>
            </ul>
          </div>
        </TabsContent>
        <TabsContent value="shipping" className="pt-6">
          <div className="prose max-w-none">
            <h3 className="text-xl font-bold mb-4">Shipping & Returns</h3>
            <p>
              <strong>Shipping:</strong> All orders are shipped via insured courier service. Orders over $1000 qualify
              for free shipping. Standard shipping takes 2-5 business days, depending on your location.
            </p>
            <p>
              <strong>Insurance:</strong> All shipments are fully insured against loss or damage during transit at no
              additional cost to you.
            </p>
            <p>
              <strong>Returns:</strong> Due to the nature of precious metals and for security reasons, we have a strict
              return policy. Returns are only accepted if the product is in its original, unopened packaging and must be
              initiated within 3 days of delivery.
            </p>
            <p>
              <strong>Verification:</strong> We recommend that you inspect your package upon delivery in the presence of
              the courier. Any visible damage should be noted before accepting the package.
            </p>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8">You May Also Like</h2>
        <RelatedProducts currentProductId={product.id} />
      </div>
    </div>
  )
}

export default ProductDetail
