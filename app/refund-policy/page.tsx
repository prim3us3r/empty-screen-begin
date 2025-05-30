import type { Metadata } from "next"
import { AlertTriangle, Clock, Mail, Phone, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Refund Policy | GoldJewelsMy",
  description: "Learn about our refund policy for gold products and investment items.",
}

export default function RefundPolicyPage() {
  return (
    <div className="bg-zinc-900 min-h-screen">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-16">
            <div className="inline-block mb-4 bg-gold-DEFAULT/20 px-4 py-1 rounded-full">
              <span className="text-gold-light text-sm font-medium tracking-wider uppercase">Policy Information</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Refund Policy</h1>
            <div className="w-20 h-1 bg-gold-DEFAULT mb-6"></div>
            <p className="text-zinc-400 max-w-2xl text-lg">
              Understanding our refund policy for premium gold products and investment items.
            </p>
          </div>

          {/* Important Notice */}
          <div className="bg-black/50 border border-amber-700/30 rounded-xl p-6 mb-12 backdrop-blur-sm">
            <div className="flex items-start">
              <div className="bg-amber-500/20 p-2 rounded-full mr-4 mt-1">
                <AlertTriangle className="h-6 w-6 text-amber-500" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-amber-400 mb-2">Important Notice</h2>
                <p className="text-zinc-300 leading-relaxed">
                  Due to the nature of gold as a valuable commodity and its sensitivity to market price fluctuations,{" "}
                  <span className="text-amber-400 font-medium">all sales are final and non-refundable</span> unless
                  there is a defect or mistake on our part.
                </p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-12">
            {/* General Policy */}
            <section>
              <h2 className="text-2xl font-bold mb-6 text-gold-light">Our Refund Policy</h2>
              <p className="text-zinc-300 leading-relaxed mb-6">
                At GoldJewelsMy, customer satisfaction is our priority. However, due to the unique nature of gold as a
                precious metal and valuable investment commodity, we maintain a strict policy regarding refunds and
                returns.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-black/30 rounded-xl p-6 border border-zinc-800 hover:border-gold-DEFAULT/50 transition-all duration-300">
                  <h3 className="text-xl font-semibold mb-4 text-white">Final Sales</h3>
                  <p className="text-zinc-400 mb-4">
                    All gold products sold through GoldJewelsMy are considered final sales due to:
                  </p>
                  <ul className="space-y-2 text-zinc-300">
                    <li className="flex items-start">
                      <ArrowRight className="h-4 w-4 text-gold-DEFAULT mr-2 mt-1 shrink-0" />
                      <span>Gold prices fluctuate constantly based on market conditions</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="h-4 w-4 text-gold-DEFAULT mr-2 mt-1 shrink-0" />
                      <span>Gold is a precious commodity with inherent value</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="h-4 w-4 text-gold-DEFAULT mr-2 mt-1 shrink-0" />
                      <span>Products are carefully inspected before shipment</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="h-4 w-4 text-gold-DEFAULT mr-2 mt-1 shrink-0" />
                      <span>Each item comes with proper certification and documentation</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-black/30 rounded-xl p-6 border border-zinc-800 hover:border-gold-DEFAULT/50 transition-all duration-300">
                  <h3 className="text-xl font-semibold mb-4 text-white">Exceptions to the Policy</h3>
                  <p className="text-zinc-400 mb-4">
                    We will consider refunds or exchanges only in these circumstances:
                  </p>
                  <ul className="space-y-2 text-zinc-300">
                    <li className="flex items-start">
                      <ArrowRight className="h-4 w-4 text-gold-DEFAULT mr-2 mt-1 shrink-0" />
                      <span>Manufacturing defects in the gold product</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="h-4 w-4 text-gold-DEFAULT mr-2 mt-1 shrink-0" />
                      <span>Shipping damage that affects the product's integrity</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="h-4 w-4 text-gold-DEFAULT mr-2 mt-1 shrink-0" />
                      <span>Incorrect item sent due to our error</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="h-4 w-4 text-gold-DEFAULT mr-2 mt-1 shrink-0" />
                      <span>Significant discrepancy in product specifications</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Time Limit */}
            <section className="bg-gradient-to-r from-black to-zinc-900 rounded-xl p-8 border border-gold-DEFAULT/20">
              <div className="flex items-center mb-6">
                <div className="bg-gold-DEFAULT/20 p-3 rounded-full mr-4">
                  <Clock className="h-6 w-6 text-gold-light" />
                </div>
                <h3 className="text-2xl font-bold text-white">Time Limit for Claims</h3>
              </div>
              <p className="text-zinc-300 text-lg leading-relaxed">
                If you encounter any issues with your order, you must contact us within{" "}
                <span className="text-gold-light font-semibold">3 working days</span> of receiving your order. Claims
                made after this period will not be considered.
              </p>
            </section>

            {/* Process */}
            <section>
              <h2 className="text-2xl font-bold mb-6 text-gold-light">Refund Process</h2>

              <div className="space-y-8">
                <div className="bg-black/30 rounded-xl p-6 border border-zinc-800">
                  <h3 className="text-xl font-semibold mb-4 text-white">How to Report an Issue</h3>
                  <p className="text-zinc-400 mb-4">
                    If you believe your order qualifies for a refund under our policy, please contact us immediately
                    with:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-zinc-800/50 p-4 rounded-lg">
                      <p className="text-zinc-300">Your order number</p>
                    </div>
                    <div className="bg-zinc-800/50 p-4 rounded-lg">
                      <p className="text-zinc-300">Clear photos of the product and any defects</p>
                    </div>
                    <div className="bg-zinc-800/50 p-4 rounded-lg">
                      <p className="text-zinc-300">Detailed description of the issue</p>
                    </div>
                    <div className="bg-zinc-800/50 p-4 rounded-lg">
                      <p className="text-zinc-300">Original packaging and documentation</p>
                    </div>
                  </div>
                </div>

                <div className="bg-black/30 rounded-xl p-6 border border-zinc-800">
                  <h3 className="text-xl font-semibold mb-4 text-white">Refund Timeline</h3>
                  <p className="text-zinc-300 leading-relaxed">
                    If your claim is approved, refunds will be processed back to the original payment method within 7-14
                    business days. The customer is responsible for return shipping costs unless the return is due to our
                    error.
                  </p>
                </div>
              </div>
            </section>

            {/* Contact */}
            <section className="bg-black rounded-xl p-8 border border-zinc-800">
              <h2 className="text-2xl font-bold mb-6 text-gold-light">Contact Us</h2>
              <p className="text-zinc-300 mb-8">
                If you have any questions about our refund policy or need to report an issue, please contact us:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center">
                  <div className="bg-gold-DEFAULT/10 p-3 rounded-full mr-4">
                    <Phone className="h-5 w-5 text-gold-light" />
                  </div>
                  <div>
                    <p className="text-zinc-400 text-sm">Phone</p>
                    <a href="tel:+60172924529" className="text-white hover:text-gold-light transition-colors">
                      +60172924529
                    </a>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="bg-gold-DEFAULT/10 p-3 rounded-full mr-4">
                    <Mail className="h-5 w-5 text-gold-light" />
                  </div>
                  <div>
                    <p className="text-zinc-400 text-sm">Email</p>
                    <a
                      href="mailto:sales@goldjewelsmy.com"
                      className="text-white hover:text-gold-light transition-colors"
                    >
                      sales@goldjewelsmy.com
                    </a>
                  </div>
                </div>
              </div>

              <Separator className="my-8 bg-zinc-800" />

              <div className="text-center">
                <p className="text-zinc-400 mb-6">Need more information about our policies?</p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button
                    asChild
                    variant="outline"
                    className="border-gold-DEFAULT/50 text-gold-light hover:bg-gold-DEFAULT/10"
                  >
                    <Link href="/privacy">Privacy Policy</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="border-gold-DEFAULT/50 text-gold-light hover:bg-gold-DEFAULT/10"
                  >
                    <Link href="/terms">Terms & Conditions</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="border-gold-DEFAULT/50 text-gold-light hover:bg-gold-DEFAULT/10"
                  >
                    <Link href="/shipping">Shipping Policy</Link>
                  </Button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
