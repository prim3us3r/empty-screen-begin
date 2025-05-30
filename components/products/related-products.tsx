"use client"

import Link from "next/link"
import Image from "next/image"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useCart } from "@/components/cart/cart-provider"
import { useToast } from "@/hooks/use-toast"
import { getRelatedProducts } from "@/lib/services/product-service"
import { formatMYR } from "@/lib/services/gold-price-service"
import { useEffect, useState } from "react"
import type { Product } from "@/lib/services/product-service"

interface RelatedProductsProps {
  currentProductId: string
}

const RelatedProducts = ({ currentProductId }: RelatedProductsProps) => {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { addToCart } = useCart()
  const { toast } = useToast()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // In a real implementation, you would fetch the category ID from the current product
        // For now, we'll use a placeholder category ID
        const relatedProducts = await getRelatedProducts(currentProductId, "category-placeholder")
        setProducts(relatedProducts)
      } catch (error) {
        console.error("Error fetching related products:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [currentProductId])

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      priceRM: product.price,
      image: product.image_url,
      quantity: 1,
    })

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="overflow-hidden product-card border-0 shadow-md bg-zinc-900 animate-pulse">
            <div className="h-48 bg-zinc-800"></div>
            <CardContent className="p-6">
              <div className="h-6 bg-zinc-800 rounded mb-2"></div>
              <div className="h-4 bg-zinc-800 rounded w-1/2 mb-4"></div>
              <div className="h-10 bg-zinc-800 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  // Fallback to sample products if no related products are found
  const sampleProducts = [
    {
      id: "sample-1",
      name: "5g Gold Bar",
      description: "Premium 5g gold bar with 999.9 purity",
      price: 1753.75,
      weight: 5,
      purity: "999.9",
      image_url: "/images/gold-bar-5g.png",
      featured: true,
      in_stock: true,
      category_id: "gold-bars",
      dimensions: "15mm x 9mm x 1mm",
      serial_number: "GB5GM",
      has_certificate: true,
      thumbnail_url: null,
      price_usd: 0,
      created_at: "",
      updated_at: "",
    },
    {
      id: "sample-2",
      name: "1g Gold Bar",
      description: "Premium 1g gold bar with 999.9 purity",
      price: 350.75,
      weight: 1,
      purity: "999.9",
      image_url: "/images/gold-bar-1g.png",
      featured: false,
      in_stock: true,
      category_id: "gold-bars",
      dimensions: "8mm x 5mm x 0.5mm",
      serial_number: "GB1GM",
      has_certificate: true,
      thumbnail_url: null,
      price_usd: 0,
      created_at: "",
      updated_at: "",
    },
    {
      id: "sample-3",
      name: "50g Gold Bar",
      description: "Premium 50g gold bar with 999.9 purity",
      price: 17537.5,
      weight: 50,
      purity: "999.9",
      image_url: "/images/gold-bar-50g.png",
      featured: true,
      in_stock: true,
      category_id: "gold-bars",
      dimensions: "31mm x 18mm x 3mm",
      serial_number: "GB50GM",
      has_certificate: true,
      thumbnail_url: null,
      price_usd: 0,
      created_at: "",
      updated_at: "",
    },
    {
      id: "sample-4",
      name: "100g Gold Bar",
      description: "Premium 100g gold bar with 999.9 purity",
      price: 35075.0,
      weight: 100,
      purity: "999.9",
      image_url: "/images/gold-bar-100g.png",
      featured: true,
      in_stock: true,
      category_id: "gold-bars",
      dimensions: "45mm x 27mm x 5mm",
      serial_number: "GB100GM",
      has_certificate: true,
      thumbnail_url: null,
      price_usd: 0,
      created_at: "",
      updated_at: "",
    },
  ]

  const displayProducts = products.length > 0 ? products : sampleProducts

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {displayProducts.map((product) => (
        <Card
          key={product.id}
          className="overflow-hidden product-card border-0 shadow-md bg-zinc-900 hover:border-gold-DEFAULT/50 transition-all duration-300"
        >
          <div className="relative h-48 bg-black group">
            <Image
              src={product.image_url || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <CardContent className="p-6">
            <div className="flex flex-col space-y-2">
              <h3 className="font-bold text-lg">{product.name}</h3>
              <div className="flex items-center justify-between mt-2">
                <span className="font-semibold text-gold-DEFAULT">{formatMYR(product.price)}</span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleAddToCart(product)}
                  className="rounded-full border-gold-DEFAULT/50 text-gold-light hover:bg-gold-DEFAULT/10"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add
                </Button>
              </div>
              <Link
                href={`/products/${product.id}`}
                className="text-sm text-gold-DEFAULT hover:text-gold-light hover:underline mt-2 inline-block"
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
