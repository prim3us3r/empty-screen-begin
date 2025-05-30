import { getServerClient } from "../supabase"

export interface GoldPrice {
  id: string
  price_usd: number
  price_myr_per_gram: number
  timestamp: string
  source: string
}

// Constants for gold price conversion
const TROY_OUNCE_TO_GRAM = 31.1035 // 1 troy ounce = 31.1035 grams
const USD_TO_MYR = 4.65 // Example exchange rate, should be updated regularly

// Base gold price in USD per troy ounce
const BASE_GOLD_PRICE_USD = 2350 // Starting price

// Format price in Malaysian Ringgit
export function formatMYR(price: number): string {
  return new Intl.NumberFormat("en-MY", {
    style: "currency",
    currency: "MYR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price)
}

// Format price in US Dollars
export function formatUSD(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price)
}

// Convert USD per troy ounce to MYR per gram
export function convertUsdPerOzToMyrPerGram(usdPerOz: number): number {
  return (usdPerOz * USD_TO_MYR) / TROY_OUNCE_TO_GRAM
}

// Get the latest gold price
export async function getLatestGoldPrice(): Promise<GoldPrice | null> {
  const supabase = getServerClient()

  const { data, error } = await supabase
    .from("gold_prices")
    .select("*")
    .order("timestamp", { ascending: false })
    .limit(1)
    .single()

  if (error) {
    console.error("Error fetching latest gold price:", error)

    // Return a fallback price if database query fails
    return {
      id: "fallback",
      price_usd: 2350.5,
      price_myr_per_gram: convertUsdPerOzToMyrPerGram(2350.5),
      timestamp: new Date().toISOString(),
      source: "fallback",
    }
  }

  return data as GoldPrice
}

// Get historical gold prices (last 30 days)
export async function getHistoricalGoldPrices(days = 30): Promise<GoldPrice[]> {
  const supabase = getServerClient()

  const { data, error } = await supabase
    .from("gold_prices")
    .select("*")
    .order("timestamp", { ascending: false })
    .limit(days)

  if (error) {
    console.error("Error fetching historical gold prices:", error)
    return []
  }

  return data as GoldPrice[]
}

// Insert a new gold price record
export async function insertGoldPrice(priceUsd: number): Promise<GoldPrice | null> {
  const supabase = getServerClient()

  const priceMyrPerGram = convertUsdPerOzToMyrPerGram(priceUsd)

  const { data, error } = await supabase
    .from("gold_prices")
    .insert([
      {
        price_usd: priceUsd,
        price_myr_per_gram: priceMyrPerGram,
        source: "system",
      },
    ])
    .select()
    .single()

  if (error) {
    console.error("Error inserting gold price:", error)
    return null
  }

  return data as GoldPrice
}

// Function to simulate gold price fluctuations
export function simulateGoldPrice(): {
  priceUsd: number
  priceMyrPerGram: number
  change: number
  isUp: boolean
} {
  // Generate a random fluctuation between -20 and +20 USD
  const fluctuation = Math.random() * 40 - 20

  // Calculate new price with fluctuation
  const priceUsd = BASE_GOLD_PRICE_USD + fluctuation

  // Convert USD per troy ounce to MYR per gram
  const priceMyrPerGram = (priceUsd * USD_TO_MYR) / TROY_OUNCE_TO_GRAM

  // Determine if price went up or down
  const isUp = fluctuation >= 0

  // Calculate percentage change (for display purposes)
  const change = Math.abs((fluctuation / BASE_GOLD_PRICE_USD) * 100)

  return {
    priceUsd: Number.parseFloat(priceUsd.toFixed(2)),
    priceMyrPerGram: Number.parseFloat(priceMyrPerGram.toFixed(2)),
    change: Number.parseFloat(change.toFixed(2)),
    isUp,
  }
}

// Function to format gold price with currency symbol
export function formatGoldPrice(price: number, currency: "USD" | "MYR" = "MYR"): string {
  return currency === "USD" ? `$${price.toFixed(2)}` : `RM${price.toFixed(2)}`
}

// Format date for Malaysia timezone
export function formatMalaysiaDate(date: Date | string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Kuala_Lumpur",
  }

  return new Intl.DateTimeFormat("en-MY", options).format(typeof date === "string" ? new Date(date) : date)
}

// Function to get current date and time in Malaysia format
export function getMalaysiaDateTime(): string {
  const now = new Date()
  return now.toLocaleString("en-MY", {
    timeZone: "Asia/Kuala_Lumpur",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })
}

// Simulate gold price fluctuation (for client-side updates)
export function simulateGoldPriceChange(currentPrice: number): {
  newPrice: number
  percentChange: number
  isUp: boolean
} {
  // Random fluctuation between -0.5% and +0.5%
  const fluctuationPercent = (Math.random() - 0.5) * 1
  const fluctuationAmount = currentPrice * (fluctuationPercent / 100)
  const newPrice = currentPrice + fluctuationAmount

  return {
    newPrice: Number.parseFloat(newPrice.toFixed(2)),
    percentChange: Number.parseFloat(Math.abs(fluctuationPercent).toFixed(2)),
    isUp: fluctuationAmount >= 0,
  }
}
