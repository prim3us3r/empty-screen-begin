"use client"

import { useEffect, useState } from "react"
import { ArrowDown, ArrowUp } from "lucide-react"
import { formatGoldPrice, getMalaysiaDateTime, simulateGoldPrice } from "@/lib/services/gold-price-service"

export default function GoldPriceTicker() {
  const [goldData, setGoldData] = useState({
    priceMyrPerGram: 350.75,
    priceUsd: 2350,
    change: 0.12,
    isUp: true,
    lastUpdated: getMalaysiaDateTime(),
  })

  useEffect(() => {
    // Initial price update
    updatePrice()

    // Update price every 15 seconds
    const interval = setInterval(updatePrice, 15000)
    return () => clearInterval(interval)
  }, [])

  function updatePrice() {
    const newData = simulateGoldPrice()
    setGoldData({
      ...newData,
      lastUpdated: getMalaysiaDateTime(),
    })
  }

  return (
    <div className="w-full bg-black border-b border-gold/30 py-1 px-4 text-white text-sm">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="font-medium text-gold-light">Live Gold Price:</span>
          <span className="font-bold text-white">{formatGoldPrice(goldData.priceMyrPerGram)} per gram</span>
          <span className={`flex items-center text-xs ${goldData.isUp ? "text-green-500" : "text-red-500"}`}>
            {goldData.isUp ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
            {goldData.change}%
          </span>
        </div>
        <div className="hidden md:flex items-center space-x-2">
          <span className="text-xs text-gold-light/70">USD: {formatGoldPrice(goldData.priceUsd, "USD")}/oz</span>
          <span className="text-xs text-gold-light/70">Last updated: {goldData.lastUpdated}</span>
        </div>
      </div>
    </div>
  )
}
