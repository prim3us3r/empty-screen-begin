"use server"

import { getLatestGoldPrice, getHistoricalGoldPrices, insertGoldPrice } from "@/lib/services/gold-price-service"

export async function fetchLatestGoldPrice() {
  return getLatestGoldPrice()
}

export async function fetchHistoricalGoldPrices(days = 30) {
  return getHistoricalGoldPrices(days)
}

export async function addGoldPrice(priceUsd: number) {
  return insertGoldPrice(priceUsd)
}
