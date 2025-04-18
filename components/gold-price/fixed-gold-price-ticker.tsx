"use client"

import { useEffect, useState } from "react"
import { ArrowDown, ArrowUp } from "lucide-react"
import { formatGoldPrice, simulateGoldPrice } from "@/lib/services/gold-price-service"

export default function FixedGoldPriceTicker() {
  const [goldData, setGoldData] = useState({
    priceMyrPerGram: 350.75,
    change: 0.12,
    isUp: true,
  })

  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Share data with the main ticker
    const updatePrice = () => {
      const newData = simulateGoldPrice()
      setGoldData({
        priceMyrPerGram: newData.priceMyrPerGram,
        change: newData.change,
        isUp: newData.isUp,
      })
    }

    // Update price every 15 seconds
    updatePrice()
    const interval = setInterval(updatePrice, 15000)

    // Show the fixed ticker after scrolling down
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      clearInterval(interval)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-black/90 backdrop-blur-sm border-b border-gold/30 py-1 px-4 text-white text-sm shadow-md animate-slideDown">
      <div className="container mx-auto flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <span className="font-medium text-gold-light">Gold:</span>
          <span className="font-bold text-white">{formatGoldPrice(goldData.priceMyrPerGram)}/g</span>
          <span className={`flex items-center text-xs ${goldData.isUp ? "text-green-500" : "text-red-500"}`}>
            {goldData.isUp ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
            {goldData.change}%
          </span>
        </div>
      </div>
    </div>
  )
}
