import { type NextRequest, NextResponse } from "next/server"
import { getServerClient } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { customer, shipping, billing, items, subtotal, shipping: shippingCost, tax, total, paymentMethod } = body

    // Validate required fields
    if (!customer || !shipping || !items || !items.length) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const supabase = getServerClient()

    // Generate order number
    const orderNumber = `GJM${Math.floor(10000 + Math.random() * 90000)}`

    // Create user if not exists
    let userId = null
    const { data: existingUser } = await supabase.from("users").select("id").eq("email", customer.email).single()

    if (existingUser) {
      userId = existingUser.id
    } else {
      const { data: newUser, error: userError } = await supabase
        .from("users")
        .insert({
          email: customer.email,
          first_name: customer.firstName,
          last_name: customer.lastName,
          phone: customer.phone,
        })
        .select("id")
        .single()

      if (userError) {
        console.error("Error creating user:", userError)
        return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
      }

      userId = newUser.id
    }

    // Create shipping address
    const { data: shippingAddress, error: shippingError } = await supabase
      .from("addresses")
      .insert({
        user_id: userId,
        address_line1: shipping.address,
        city: shipping.city,
        state: shipping.state,
        postal_code: shipping.postcode,
        country: shipping.country || "Malaysia",
        is_default: true,
      })
      .select("id")
      .single()

    if (shippingError) {
      console.error("Error creating shipping address:", shippingError)
      return NextResponse.json({ error: "Failed to create shipping address" }, { status: 500 })
    }

    // Create billing address if different
    let billingAddressId = shippingAddress.id
    if (billing && !billing.sameAsShipping) {
      const { data: billingAddress, error: billingError } = await supabase
        .from("addresses")
        .insert({
          user_id: userId,
          address_line1: billing.address,
          city: billing.city,
          state: billing.state,
          postal_code: billing.postcode,
          country: billing.country || "Malaysia",
          is_default: false,
        })
        .select("id")
        .single()

      if (billingError) {
        console.error("Error creating billing address:", billingError)
        return NextResponse.json({ error: "Failed to create billing address" }, { status: 500 })
      }

      billingAddressId = billingAddress.id
    }

    // Create order
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        user_id: userId,
        order_number: orderNumber,
        status: "pending",
        subtotal,
        shipping_fee: shippingCost,
        tax,
        total,
        shipping_address_id: shippingAddress.id,
        billing_address_id: billingAddressId,
        payment_method: paymentMethod,
        payment_status: "pending",
        notes: body.notes || null,
      })
      .select("id")
      .single()

    if (orderError) {
      console.error("Error creating order:", orderError)
      return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
    }

    // Create order items
    const orderItems = items.map((item) => ({
      order_id: order.id,
      product_id: item.productId,
      quantity: item.quantity,
      price: item.price,
      total: item.total,
    }))

    const { error: itemsError } = await supabase.from("order_items").insert(orderItems)

    if (itemsError) {
      console.error("Error creating order items:", itemsError)
      return NextResponse.json({ error: "Failed to create order items" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      id: order.id,
      orderNumber,
    })
  } catch (error) {
    console.error("Order API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const userId = url.searchParams.get("userId")
    const orderId = url.searchParams.get("orderId")

    const supabase = getServerClient()

    if (orderId) {
      // Get specific order
      const { data, error } = await supabase
        .from("orders")
        .select(`
          *,
          shipping_address:shipping_address_id(address_line1, city, state, postal_code, country),
          billing_address:billing_address_id(address_line1, city, state, postal_code, country),
          order_items(*, product:product_id(*))
        `)
        .eq("id", orderId)
        .single()

      if (error) {
        console.error("Error fetching order:", error)
        return NextResponse.json({ error: "Order not found" }, { status: 404 })
      }

      return NextResponse.json(data)
    } else if (userId) {
      // Get user orders
      const { data, error } = await supabase
        .from("orders")
        .select(`
          *,
          shipping_address:shipping_address_id(address_line1, city, state, postal_code, country),
          order_items(*, product:product_id(*))
        `)
        .eq("user_id", userId)
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Error fetching user orders:", error)
        return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 })
      }

      return NextResponse.json(data)
    } else {
      return NextResponse.json({ error: "Missing userId or orderId parameter" }, { status: 400 })
    }
  } catch (error) {
    console.error("Order API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
