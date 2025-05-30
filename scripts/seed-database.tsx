"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { createClient } from "@supabase/supabase-js"
import { Loader2 } from "lucide-react"

export default function SeedDatabase() {
  const [isSeeding, setIsSeeding] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [step, setStep] = useState<string | null>(null)
  const [logs, setLogs] = useState<string[]>([])

  // Create a Supabase client directly with environment variables
  const createSupabaseClient = () => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error("Supabase URL and Anon Key are required. Please check your environment variables.")
    }

    return createClient(supabaseUrl, supabaseAnonKey)
  }

  const addLog = (message: string) => {
    setLogs((prev) => [...prev, message])
  }

  const setupDatabase = async () => {
    setStep("Setting up database tables...")
    addLog("Setting up database tables...")

    try {
      const response = await fetch("/api/database/setup", {
        method: "POST",
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to set up database tables")
      }

      addLog("Database tables set up successfully")
      return "Database tables set up successfully"
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error setting up database"
      addLog(`Error: ${errorMessage}`)
      throw error
    }
  }

  const seedCategories = async () => {
    setStep("Seeding categories...")
    addLog("Seeding categories...")

    try {
      const supabase = createSupabaseClient()

      // Check if categories already exist
      const { data: existingCategories, error: checkError } = await supabase.from("categories").select("*")

      if (checkError) {
        throw new Error(`Error checking categories: ${checkError.message}`)
      }

      if (existingCategories && existingCategories.length > 0) {
        addLog(`Found ${existingCategories.length} existing categories, skipping insertion`)
        return "Categories already exist, skipping"
      }

      const categories = [
        {
          name: "Gold Bars",
          slug: "gold-bars",
          description: "Premium gold bars for investment and collection",
          image_url: "/images/gold-bar-100g.png",
        },
        {
          name: "Gold Coins",
          slug: "gold-coins",
          description: "Collectible gold coins from around the world",
          image_url: "/images/gold-certificate.png",
        },
      ]

      const { error } = await supabase.from("categories").insert(categories)

      if (error) throw new Error(`Error seeding categories: ${error.message}`)

      addLog("Categories seeded successfully")
      return "Categories seeded successfully"
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error seeding categories"
      addLog(`Error: ${errorMessage}`)
      throw error
    }
  }

  const seedProducts = async () => {
    setStep("Seeding products...")
    addLog("Seeding products...")

    try {
      const supabase = createSupabaseClient()

      // Check if products already exist
      const { data: existingProducts, error: checkError } = await supabase.from("products").select("*")

      if (checkError) {
        throw new Error(`Error checking products: ${checkError.message}`)
      }

      if (existingProducts && existingProducts.length > 0) {
        addLog(`Found ${existingProducts.length} existing products, skipping insertion`)
        return "Products already exist, skipping"
      }

      // Get category IDs
      const { data: categories, error: catError } = await supabase.from("categories").select("id, slug")

      if (catError) throw new Error(`Error fetching categories: ${catError.message}`)
      if (!categories || categories.length === 0) throw new Error("No categories found. Please seed categories first.")

      const goldBarsCategory = categories.find((c) => c.slug === "gold-bars")?.id
      const goldCoinsCategory = categories.find((c) => c.slug === "gold-coins")?.id

      if (!goldBarsCategory) throw new Error("Gold bars category not found")
      if (!goldCoinsCategory) throw new Error("Gold coins category not found")

      addLog(`Found categories: Gold Bars (${goldBarsCategory}), Gold Coins (${goldCoinsCategory})`)

      const products = [
        {
          name: "1g Gold Bar",
          slug: "1g-gold-bar",
          description: "Premium 1 gram gold bar, 999.9 fine gold. Perfect for small investments and gifts.",
          price: 350.75,
          price_usd: 75.5,
          weight: 1,
          purity: "999.9 Fine Gold",
          dimensions: "8.5mm x 15.5mm x 0.4mm",
          image_url: "/images/gold-bar-1g.png",
          thumbnail_url: "/images/gold-bar-1g.png",
          category_id: goldBarsCategory,
          featured: false,
          in_stock: true,
          has_certificate: true,
          serial_number: "GB1001",
        },
        {
          name: "5g Gold Bar",
          slug: "5g-gold-bar",
          description: "Premium 5 gram gold bar, 999.9 fine gold. A popular choice for investors.",
          price: 1753.75,
          price_usd: 377.5,
          weight: 5,
          purity: "999.9 Fine Gold",
          dimensions: "14mm x 23mm x 0.9mm",
          image_url: "/images/gold-bar-5g.png",
          thumbnail_url: "/images/gold-bar-5g.png",
          category_id: goldBarsCategory,
          featured: true,
          in_stock: true,
          has_certificate: true,
          serial_number: "GB5001",
        },
        {
          name: "50g Gold Bar",
          slug: "50g-gold-bar",
          description: "Premium 50 gram gold bar, 999.9 fine gold. Substantial investment piece.",
          price: 17537.5,
          price_usd: 3775.0,
          weight: 50,
          purity: "999.9 Fine Gold",
          dimensions: "31mm x 55mm x 1.8mm",
          image_url: "/images/gold-bar-50g.png",
          thumbnail_url: "/images/gold-bar-50g.png",
          category_id: goldBarsCategory,
          featured: true,
          in_stock: true,
          has_certificate: true,
          serial_number: "GB50001",
        },
        {
          name: "100g Gold Bar",
          slug: "100g-gold-bar",
          description: "Premium 100 gram gold bar, 999.9 fine gold. Serious investment for wealth preservation.",
          price: 35075.0,
          price_usd: 7550.0,
          weight: 100,
          purity: "999.9 Fine Gold",
          dimensions: "40mm x 70mm x 2.5mm",
          image_url: "/images/gold-bar-100g.png",
          thumbnail_url: "/images/gold-bar-100g.png",
          category_id: goldBarsCategory,
          featured: true,
          in_stock: true,
          has_certificate: true,
          serial_number: "GB100001",
        },
        {
          name: "Premium Gold Bar with Certificate",
          slug: "premium-gold-bar-with-certificate",
          description: "Exclusive premium gold bar with certificate of authenticity and luxury packaging.",
          price: 46650.0,
          price_usd: 10000.0,
          weight: 100,
          purity: "999.9 Fine Gold",
          dimensions: "40mm x 70mm x 3mm",
          image_url: "/images/gold-bar-certificates.png",
          thumbnail_url: "/images/gold-bar-certificates.png",
          category_id: goldBarsCategory,
          featured: true,
          in_stock: true,
          has_certificate: true,
          serial_number: "GBPREM001",
        },
        {
          name: "1/4 Dinar Gold Coin",
          slug: "quarter-dinar-gold-coin",
          description:
            "Exquisite 1/4 Dinar gold coin with intricate design, perfect for collectors and investors alike.",
          price: 2100.0,
          price_usd: 450.0,
          weight: 2.13,
          purity: "999.9 Fine Gold",
          dimensions: "20mm diameter x 1.5mm thickness",
          image_url: "/images/gold-certificate.png",
          thumbnail_url: "/images/gold-certificate.png",
          category_id: goldCoinsCategory,
          featured: true,
          in_stock: true,
          has_certificate: true,
          serial_number: "GC25DN",
        },
      ]

      addLog(`Inserting ${products.length} products`)
      const { error } = await supabase.from("products").insert(products)

      if (error) throw new Error(`Error seeding products: ${error.message}`)

      addLog("Products seeded successfully")
      return "Products seeded successfully"
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error seeding products"
      addLog(`Error: ${errorMessage}`)
      throw error
    }
  }

  const seedProductImages = async () => {
    setStep("Seeding product images...")
    addLog("Seeding product images...")

    try {
      const supabase = createSupabaseClient()

      // Check if product images already exist
      const { data: existingImages, error: checkError } = await supabase.from("product_images").select("*")

      if (checkError) {
        throw new Error(`Error checking product images: ${checkError.message}`)
      }

      if (existingImages && existingImages.length > 0) {
        addLog(`Found ${existingImages.length} existing product images, skipping insertion`)
        return "Product images already exist, skipping"
      }

      // Get product IDs
      const { data: products, error: prodError } = await supabase.from("products").select("id, slug")

      if (prodError) throw new Error(`Error fetching products: ${prodError.message}`)
      if (!products || products.length === 0) throw new Error("No products found. Please seed products first.")

      const premiumBarId = products.find((p) => p.slug === "premium-gold-bar-with-certificate")?.id
      const goldCoinId = products.find((p) => p.slug === "quarter-dinar-gold-coin")?.id

      if (!premiumBarId) throw new Error("Premium gold bar not found")
      if (!goldCoinId) throw new Error("Gold coin not found")

      addLog(`Found products: Premium Bar (${premiumBarId}), Gold Coin (${goldCoinId})`)

      const productImages = [
        {
          product_id: premiumBarId,
          image_url: "/images/gold-bar-certificates.png",
          alt_text: "Premium Gold Bar Front View",
          display_order: 1,
        },
        {
          product_id: premiumBarId,
          image_url: "/images/gold-certificate.png",
          alt_text: "Premium Gold Bar with Certificate",
          display_order: 2,
        },
        {
          product_id: goldCoinId,
          image_url: "/images/gold-certificate.png",
          alt_text: "Gold Coin Front",
          display_order: 1,
        },
      ]

      addLog(`Inserting ${productImages.length} product images`)
      const { error } = await supabase.from("product_images").insert(productImages)

      if (error) throw new Error(`Error seeding product images: ${error.message}`)

      addLog("Product images seeded successfully")
      return "Product images seeded successfully"
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error seeding product images"
      addLog(`Error: ${errorMessage}`)
      throw error
    }
  }

  const seedGoldPrices = async () => {
    setStep("Seeding gold prices...")
    addLog("Seeding gold prices...")

    try {
      const supabase = createSupabaseClient()

      // Check if gold prices already exist
      const { data: existingPrices, error: checkError } = await supabase.from("gold_prices").select("*")

      if (checkError) {
        throw new Error(`Error checking gold prices: ${checkError.message}`)
      }

      if (existingPrices && existingPrices.length > 0) {
        addLog(`Found ${existingPrices.length} existing gold prices, skipping insertion`)
        return "Gold prices already exist, skipping"
      }

      // Create 30 days of historical gold prices
      const goldPrices = []
      const basePrice = 2350.5 // USD per oz
      const basePriceRM = 350.75 // MYR per gram

      const now = new Date()

      for (let i = 30; i >= 0; i--) {
        const date = new Date(now)
        date.setDate(date.getDate() - i)

        // Random fluctuation between -2% and +2%
        const fluctuation = Math.random() * 4 - 2
        const priceUsd = basePrice * (1 + fluctuation / 100)
        const priceRm = basePriceRM * (1 + fluctuation / 100)

        goldPrices.push({
          price_usd: Number.parseFloat(priceUsd.toFixed(2)),
          price_myr_per_gram: Number.parseFloat(priceRm.toFixed(2)),
          timestamp: date.toISOString(),
          source: "seed",
        })
      }

      addLog(`Inserting ${goldPrices.length} gold price records`)
      const { error } = await supabase.from("gold_prices").insert(goldPrices)

      if (error) throw new Error(`Error seeding gold prices: ${error.message}`)

      addLog("Gold prices seeded successfully")
      return "Gold prices seeded successfully"
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error seeding gold prices"
      addLog(`Error: ${errorMessage}`)
      throw error
    }
  }

  const handleSeed = async () => {
    setIsSeeding(true)
    setResult(null)
    setError(null)
    setStep(null)
    setLogs([])

    try {
      // First, check if we can connect to Supabase
      try {
        addLog("Testing Supabase connection...")
        const supabase = createSupabaseClient()
        const { error } = await supabase.from("categories").select("count")
        if (error) {
          addLog(`Connection test error: ${error.message}`)
        } else {
          addLog("Supabase connection successful")
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : String(err)
        addLog(`Connection error: ${errorMessage}`)
        throw new Error(`Cannot connect to Supabase: ${errorMessage}`)
      }

      // Set up database tables
      await setupDatabase()

      // Seed the database
      await seedCategories()
      await seedProducts()
      await seedProductImages()
      await seedGoldPrices()

      setResult("Database seeded successfully! Your e-commerce website is now fully functional.")
      addLog("✅ All seeding operations completed successfully!")
    } catch (err) {
      console.error("Seeding error:", err)
      const errorMessage = err instanceof Error ? err.message : "Unknown error occurred"
      setError(errorMessage)
      addLog(`❌ Seeding failed: ${errorMessage}`)
    } finally {
      setIsSeeding(false)
      setStep(null)
    }
  }

  return (
    <div className="space-y-4">
      <div className="p-4 bg-zinc-900 rounded-lg mb-4">
        <h3 className="font-medium mb-2">Environment Variables Status:</h3>
        <ul className="space-y-1 text-sm">
          <li>
            NEXT_PUBLIC_SUPABASE_URL:{" "}
            {process.env.NEXT_PUBLIC_SUPABASE_URL ? (
              <span className="text-green-500">✓ Available</span>
            ) : (
              <span className="text-red-500">✗ Missing</span>
            )}
          </li>
          <li>
            NEXT_PUBLIC_SUPABASE_ANON_KEY:{" "}
            {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? (
              <span className="text-green-500">✓ Available</span>
            ) : (
              <span className="text-red-500">✗ Missing</span>
            )}
          </li>
        </ul>
      </div>

      <Button onClick={handleSeed} disabled={isSeeding} className="bg-gold-DEFAULT hover:bg-gold-dark text-black">
        {isSeeding ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {step || "Seeding Database..."}
          </>
        ) : (
          "Seed Database"
        )}
      </Button>

      {logs.length > 0 && (
        <div className="mt-4 p-4 bg-black border border-zinc-800 rounded-md text-sm font-mono h-64 overflow-y-auto">
          {logs.map((log, index) => (
            <div
              key={index}
              className={log.includes("Error") ? "text-red-400" : log.includes("✅") ? "text-green-400" : "text-white"}
            >
              {log}
            </div>
          ))}
        </div>
      )}

      {result && <div className="p-4 bg-green-900/20 border border-green-600 text-green-500 rounded-md">{result}</div>}

      {error && <div className="p-4 bg-red-900/20 border border-red-600 text-red-500 rounded-md">{error}</div>}
    </div>
  )
}
