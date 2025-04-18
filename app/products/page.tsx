import type { Metadata } from "next"
import ProductCatalog from "@/components/products/product-catalog"

export const metadata: Metadata = {
  title: "Products | Aurum Gold Bars",
  description:
    "Browse our collection of premium gold bars and coins. Find the perfect investment piece with our high-quality, certified gold products.",
}

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col items-center text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Our Collection</h1>
        <div className="w-20 h-1 bg-gold-DEFAULT mb-6"></div>
        <p className="text-muted-foreground max-w-2xl">
          Discover our premium selection of gold bars and coins, each crafted with precision and elegance.
        </p>
      </div>

      <ProductCatalog />
    </div>
  )
}
