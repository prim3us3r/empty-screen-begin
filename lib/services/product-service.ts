import { getServerClient } from "../supabase"

export interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  price_usd: number
  weight: number
  purity: string
  dimensions: string | null
  image_url: string
  thumbnail_url: string | null
  category_id: string
  featured: boolean
  in_stock: boolean
  has_certificate: boolean
  serial_number: string | null
  created_at: string
  updated_at: string
}

export interface ProductImage {
  id: string
  product_id: string
  image_url: string
  alt_text: string | null
  display_order: number
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  image_url: string | null
}

export async function getProducts(): Promise<Product[]> {
  const supabase = getServerClient()

  const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching products:", error)
    return []
  }

  return data as Product[]
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const supabase = getServerClient()

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("featured", true)
    .order("created_at", { ascending: false })
    .limit(4)

  if (error) {
    console.error("Error fetching featured products:", error)
    return []
  }

  return data as Product[]
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = getServerClient()

  const { data, error } = await supabase.from("products").select("*").eq("slug", slug).single()

  if (error) {
    console.error(`Error fetching product with slug ${slug}:`, error)
    return null
  }

  return data as Product
}

export async function getProductById(id: string): Promise<Product | null> {
  const supabase = getServerClient()

  const { data, error } = await supabase.from("products").select("*").eq("id", id).single()

  if (error) {
    console.error(`Error fetching product with id ${id}:`, error)
    return null
  }

  return data as Product
}

export async function getProductsByCategory(categoryId: string): Promise<Product[]> {
  const supabase = getServerClient()

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("category_id", categoryId)
    .order("created_at", { ascending: false })

  if (error) {
    console.error(`Error fetching products for category ${categoryId}:`, error)
    return []
  }

  return data as Product[]
}

export async function getProductImages(productId: string): Promise<ProductImage[]> {
  const supabase = getServerClient()

  const { data, error } = await supabase
    .from("product_images")
    .select("*")
    .eq("product_id", productId)
    .order("display_order", { ascending: true })

  if (error) {
    console.error(`Error fetching images for product ${productId}:`, error)
    return []
  }

  return data as ProductImage[]
}

export async function getCategories(): Promise<Category[]> {
  const supabase = getServerClient()

  const { data, error } = await supabase.from("categories").select("*").order("name", { ascending: true })

  if (error) {
    console.error("Error fetching categories:", error)
    return []
  }

  return data as Category[]
}

export async function getRelatedProducts(productId: string, categoryId: string): Promise<Product[]> {
  const supabase = getServerClient()

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("category_id", categoryId)
    .neq("id", productId)
    .limit(4)

  if (error) {
    console.error(`Error fetching related products for product ${productId}:`, error)
    return []
  }

  return data as Product[]
}
