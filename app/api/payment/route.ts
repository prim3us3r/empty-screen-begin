import { type NextRequest, NextResponse } from "next/server"
import { createChipPayment } from "@/lib/payment/chip-in"
import { getServerClient } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { orderId, amount, customerEmail, customerName, productName } = body

    if (!orderId || !amount || !customerEmail || !customerName || !productName) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create payment with Chip-in
    const payment = await createChipPayment({
      amount: amount * 100, // Convert to cents
      currency: "MYR",
      reference: `order_${orderId}`,
      customer: {
        email: customerEmail,
        full_name: customerName,
      },
      product: {
        name: productName,
        description: `Payment for order #${orderId}`,
      },
      redirect: {
        success_url: `${request.nextUrl.origin}/order-confirmation?order_id=${orderId}`,
        failure_url: `${request.nextUrl.origin}/checkout?error=payment_failed&order_id=${orderId}`,
      },
    })

    if (!payment.success) {
      return NextResponse.json({ error: payment.error || "Payment creation failed" }, { status: 500 })
    }

    // Update order status in database
    const supabase = getServerClient()
    await supabase.from("orders").update({ payment_status: "pending", payment_id: payment.data.id }).eq("id", orderId)

    return NextResponse.json({
      success: true,
      paymentUrl: payment.paymentUrl,
      paymentId: payment.data.id,
    })
  } catch (error) {
    console.error("Payment API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
