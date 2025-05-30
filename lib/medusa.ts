import axios from "axios"

const MEDUSA_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"

// Create a configured axios instance for Medusa
const medusaClient = axios.create({
  baseURL: MEDUSA_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Products
export async function getProducts() {
  try {
    const response = await medusaClient.get("/store/products")
    return response.data.products
  } catch (error) {
    console.error("Error fetching products from Medusa:", error)
    return []
  }
}

export async function getProduct(handle: string) {
  try {
    const response = await medusaClient.get(`/store/products/${handle}`)
    return response.data.product
  } catch (error) {
    console.error(`Error fetching product ${handle} from Medusa:`, error)
    return null
  }
}

// Cart
export async function createCart() {
  try {
    const response = await medusaClient.post("/store/carts")
    return response.data.cart
  } catch (error) {
    console.error("Error creating cart in Medusa:", error)
    return null
  }
}

export async function getCart(cartId: string) {
  try {
    const response = await medusaClient.get(`/store/carts/${cartId}`)
    return response.data.cart
  } catch (error) {
    console.error(`Error fetching cart ${cartId} from Medusa:`, error)
    return null
  }
}

export async function addToCart(cartId: string, variantId: string, quantity: number) {
  try {
    const response = await medusaClient.post(`/store/carts/${cartId}/line-items`, {
      variant_id: variantId,
      quantity,
    })
    return response.data.cart
  } catch (error) {
    console.error(`Error adding item to cart ${cartId} in Medusa:`, error)
    return null
  }
}

export async function updateCartItem(cartId: string, lineId: string, quantity: number) {
  try {
    const response = await medusaClient.post(`/store/carts/${cartId}/line-items/${lineId}`, {
      quantity,
    })
    return response.data.cart
  } catch (error) {
    console.error(`Error updating item in cart ${cartId} in Medusa:`, error)
    return null
  }
}

export async function removeFromCart(cartId: string, lineId: string) {
  try {
    const response = await medusaClient.delete(`/store/carts/${cartId}/line-items/${lineId}`)
    return response.data.cart
  } catch (error) {
    console.error(`Error removing item from cart ${cartId} in Medusa:`, error)
    return null
  }
}

// Checkout
export async function createPaymentSession(cartId: string) {
  try {
    const response = await medusaClient.post(`/store/carts/${cartId}/payment-sessions`)
    return response.data.cart
  } catch (error) {
    console.error(`Error creating payment session for cart ${cartId} in Medusa:`, error)
    return null
  }
}

export async function completeCart(cartId: string) {
  try {
    const response = await medusaClient.post(`/store/carts/${cartId}/complete`)
    return response.data
  } catch (error) {
    console.error(`Error completing cart ${cartId} in Medusa:`, error)
    return null
  }
}

// Orders
export async function getOrder(id: string) {
  try {
    const response = await medusaClient.get(`/store/orders/${id}`)
    return response.data.order
  } catch (error) {
    console.error(`Error fetching order ${id} from Medusa:`, error)
    return null
  }
}

export async function getCustomerOrders(email: string) {
  try {
    const response = await medusaClient.get(`/store/customers/me/orders`, {
      headers: {
        Cookie: `connect.sid=${email}`, // This is a simplification, actual auth would be more complex
      },
    })
    return response.data.orders
  } catch (error) {
    console.error(`Error fetching orders for customer ${email} from Medusa:`, error)
    return []
  }
}

// Categories
export async function getCategories() {
  try {
    const response = await medusaClient.get("/store/product-categories")
    return response.data.product_categories
  } catch (error) {
    console.error("Error fetching categories from Medusa:", error)
    return []
  }
}

export default medusaClient
