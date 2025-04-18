"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useCart } from "@/components/cart/cart-provider"
import { getFeaturedProducts } from "@/lib/products"
import { useToast } from "@/hooks/use-toast"

const FeaturedProducts = () => {
  const [products, setProducts] = useState(getFeaturedProducts())
  const { addToCart } = useCart()
  const { toast } = useToast()

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

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      {products.map((product) => (
        <motion.div key={product.id} variants={item}>
          <Card className="overflow-hidden product-card border border-zinc-800 bg-black hover:border-gold-DEFAULT/50 transition-all duration-300">
            <div className="relative h-64 bg-zinc-900 group">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 z-10"></div>
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <CardContent className="p-6">
              <div className="flex flex-col space-y-2">
                <h3 className="font-bold text-xl text-white">{product.name}</h3>
                <p className="text-sm text-white/60 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-lg font-semibold text-gold-light">${product.price.toLocaleString()}</span>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleAddToCart(product.id)}
                      className="border-gold-DEFAULT/50 text-gold-light hover:bg-gold-DEFAULT/10 hover:text-gold-light"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="text-xs text-white/60">Weight: {product.weight}</div>
                  <div className="text-xs text-white/60">Purity: {product.purity}</div>
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
        </motion.div>
      ))}
    </motion.div>
  )
}

export default FeaturedProducts
