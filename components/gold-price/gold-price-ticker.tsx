"use client"

import { useState, useEffect } from "react"
import { ArrowUp, ArrowDown, Clock } from "lucide-react"
import { formatMYR, formatUSD, simulateGoldPriceChange, formatMalaysiaDate } from "@/lib/services/gold-price-service"

const GoldPriceTicker = () => {
  const [goldPriceRM, setGoldPriceRM] = useState(350.75)
  const [goldPriceUSD, setGoldPriceUSD] = useState(2350.5)
  const [percentChange, setPercentChange] = useState(0.25)
  const [isUp, setIsUp] = useState(true)
  const [lastUpdated, setLastUpdated] = useState(new Date())

  useEffect(() => {
    // Initial fetch
    fetchGoldPrice()

    // Update every 15 seconds
    const interval = setInterval(() => {
      updateGoldPrice()
    }, 15000)

    return () => clearInterval(interval)
  }, [])

  const fetchGoldPrice = async () => {
    try {
      // In a real app, this would fetch from your API
      // For now, we'll use the simulated data
      updateGoldPrice()
    } catch (error) {
      console.error("Error fetching gold price:", error)
    }
  }

  const updateGoldPrice = () => {
    // Simulate price changes
    const {
      newPrice: newPriceRM,
      percentChange: newPercentChange,
      isUp: newIsUp,
    } = simulateGoldPriceChange(goldPriceRM)

    // Update USD price with similar trend
    const usdChange = goldPriceUSD * (newPercentChange / 100) * (newIsUp ? 1 : -1)
    const newPriceUSD = goldPriceUSD + usdChange

    setGoldPriceRM(newPriceRM)
    setGoldPriceUSD(Number.parseFloat(newPriceUSD.toFixed(2)))
    setPercentChange(newPercentChange)
    setIsUp(newIsUp)
    setLastUpdated(new Date())
  }

  return (
    <div className="w-full bg-black border-b border-gold-DEFAULT/30 py-2 px-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="font-bold text-gold-DEFAULT">Gold Price:</span>
          <span className="font-bold">{formatMYR(goldPriceRM)}/g</span>
          <span className={`flex items-center text-xs ${isUp ? "text-green-500" : "text-red-500"}`}>
            {isUp ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
            {percentChange}%
          </span>
        </div>

        <div className="hidden md:flex items-center space-x-4 text-sm text-white/70">
          <div className="flex items-center">
            <span className="mr-2">{formatUSD(goldPriceUSD)}/oz</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            <span>Updated: {formatMalaysiaDate(lastUpdated)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GoldPriceTicker
