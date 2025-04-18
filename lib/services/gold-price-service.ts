// Conversion constants
const TROY_OUNCE_TO_GRAM = 31.1035 // 1 troy ounce = 31.1035 grams
const USD_TO_MYR = 4.65 // Example exchange rate (this would be dynamic in a real app)

// Base gold price in USD per troy ounce
const BASE_GOLD_PRICE_USD = 2350 // Starting price

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
