"use server"

import {
  getProducts,
  getFeaturedProducts,
  getProductBySlug,
  getProductById,
  getProductImages,
  getRelatedProducts,
  getCategories,
} from "@/lib/services/product-service"

export async function fetchProducts() {
  return getProducts()
}

export async function fetchFeaturedProducts() {
  return getFeaturedProducts()
}

export async function fetchProductBySlug(slug: string) {
  return getProductBySlug(slug)
}

export async function fetchProductById(id: string) {
  return getProductById(id)
}

export async function fetchProductImages(productId: string) {
  return getProductImages(productId)
}

export async function fetchRelatedProducts(productId: string, categoryId: string) {
  return getRelatedProducts(productId, categoryId)
}

export async function fetchCategories() {
  return getCategories()
}
