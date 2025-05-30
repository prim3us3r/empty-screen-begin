import { type NextRequest, NextResponse } from "next/server"
import { getServerClient } from "@/lib/supabase"
import { completeCart } from "@/lib/medusa"

export async function POST(request: NextRequest) {
  try {
    // Verify webhook signature (in a real app)
    // const signature = request.headers.get('x-chip-signature')
    // if (!verifySignature(signature, await request.text())) {
    //   return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    // }

    const body = await request.json()
    const { event, data } = body

    if (event !== "payment.paid") {
      // We only care about successful payments
      return NextResponse.json({ received: true })
    }

    const { id: paymentId, reference, status } = data

    if (status !== "paid") {
      return NextResponse.json({ received: true })
    }

    // Extract order ID from reference (e.g., "order_123456")
    const orderId = reference.replace("order_", "")

    // Update order status in database
    const supabase = getServerClient()
    await supabase
      .from("orders")
      .update({
        payment_status: "paid",
        status: "processing",
        updated_at: new Date().toISOString(),
      })
      .eq("id", orderId)

    // If using Medusa, complete the cart
    if (data.metadata?.cart_id) {
      await completeCart(data.metadata.cart_id)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
