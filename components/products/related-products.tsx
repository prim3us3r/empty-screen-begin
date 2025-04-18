"use client"

import Link from "next/link"
import Image from "next/image"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useCart } from "@/components/cart/cart-provider"
import { useToast } from "@/hooks/use-toast"
import { products } from "@/lib/products"

interface RelatedProductsProps {
  currentProductId: string
}

const RelatedProducts = ({ currentProductId }: RelatedProductsProps) => {
  const { addToCart } = useCart()
  const { toast } = useToast()

  // Get related products (excluding current product)
  const currentProduct = products.find((p) => p.id === currentProductId)
  const relatedProducts = products
    .filter((p) => p.id !== currentProductId && p.category === currentProduct?.category)
    .slice(0, 3)

  const handleAddToCart = (productId: string) => {
    const product = products.find((p) => p.id === productId)
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      })

      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
      })
    }
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {relatedProducts.map((product) => (
        <Card key={product.id} className="overflow-hidden product-card border-0 shadow-md">
          <div className="relative h-48 bg-secondary/50">
            <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-contain p-4" />
          </div>
          <CardContent className="p-6">
            <div className="flex flex-col space-y-2">
              <h3 className="font-bold text-lg">{product.name}</h3>
              <div className="flex items-center justify-between mt-2">
                <span className="font-semibold">${product.price.toLocaleString()}</span>
                <Button size="sm" variant="outline" onClick={() => handleAddToCart(product.id)}>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add
                </Button>
              </div>
              <Link
                href={`/products/${product.id}`}
                className="text-sm text-gold-DEFAULT hover:underline mt-2 inline-block"
              >
                View Details
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default RelatedProducts
