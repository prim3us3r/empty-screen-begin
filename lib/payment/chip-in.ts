import axios from "axios"

const CHIP_API_URL = "https://api.chip-in.asia/api/payment/create"
const CHIP_SECRET_KEY = process.env.CHIP_SECRET_KEY || ""

interface ChipPaymentParams {
  amount: number
  currency: string
  reference: string
  customer: {
    email: string
    full_name: string
    phone_number?: string
  }
  product: {
    name: string
    description?: string
  }
  redirect: {
    success_url: string
    failure_url: string
  }
}

export async function createChipPayment(params: ChipPaymentParams) {
  try {
    const response = await axios.post(CHIP_API_URL, params, {
      headers: {
        Authorization: `Bearer ${CHIP_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    })

    return {
      success: true,
      data: response.data,
      paymentUrl: response.data.checkout_url,
    }
  } catch (error) {
    console.error("Error creating Chip payment:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    }
  }
}

export async function verifyChipPayment(paymentId: string) {
  try {
    const response = await axios.get(`https://api.chip-in.asia/api/payments/${paymentId}`, {
      headers: {
        Authorization: `Bearer ${CHIP_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    })

    return {
      success: true,
      data: response.data,
      status: response.data.status,
    }
  } catch (error) {
    console.error("Error verifying Chip payment:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    }
  }
}
