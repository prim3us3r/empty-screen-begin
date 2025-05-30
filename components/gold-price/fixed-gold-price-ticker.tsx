"use client"

import { useState, useEffect } from "react"
import { ArrowUp, ArrowDown } from "lucide-react"
import { formatMYR, simulateGoldPriceChange } from "@/lib/services/gold-price-service"

const FixedGoldPriceTicker = () => {
  const [goldPriceRM, setGoldPriceRM] = useState(350.75)
  const [percentChange, setPercentChange] = useState(0.25)
  const [isUp, setIsUp] = useState(true)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Initial fetch
    updateGoldPrice()

    // Update every 15 seconds
    const priceInterval = setInterval(() => {
      updateGoldPrice()
    }, 15000)

    // Handle scroll events to show/hide the fixed ticker
    const handleScroll = () => {
      // Show the fixed ticker when scrolled past the main ticker (approx 100px)
      setVisible(window.scrollY > 100)
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      clearInterval(priceInterval)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const updateGoldPrice = () => {
    // Simulate price changes
    const { newPrice, percentChange: newPercentChange, isUp: newIsUp } = simulateGoldPriceChange(goldPriceRM)

    setGoldPriceRM(newPrice)
    setPercentChange(newPercentChange)
    setIsUp(newIsUp)
  }

  if (!visible) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-gold-DEFAULT/30 py-1.5 px-4 text-white animate-slideDown">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-bold text-gold-DEFAULT">Gold:</span>
          <span className="text-sm font-bold">{formatMYR(goldPriceRM)}/g</span>
          <span className={`flex items-center text-xs ${isUp ? "text-green-500" : "text-red-500"}`}>
            {isUp ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
            {percentChange}%
          </span>
        </div>
      </div>
    </div>
  )
}

export default FixedGoldPriceTicker
