import type { Metadata } from "next"
import { FileText, AlertTriangle, Scale, Shield } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Terms & Conditions | GoldJewelsMy",
  description: "Read our terms and conditions, including our refund policy and business terms.",
}

export default function TermsPage() {
  return (
    <div className="bg-zinc-900 min-h-screen">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-16">
            <div className="inline-block mb-4 bg-gold-DEFAULT/20 px-4 py-1 rounded-full">
              <span className="text-gold-light text-sm font-medium tracking-wider uppercase">Legal Information</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Terms & Conditions</h1>
            <div className="w-20 h-1 bg-gold-DEFAULT mb-6"></div>
            <p className="text-zinc-400 max-w-2xl text-lg">
              Please read these terms and conditions carefully before using our services.
            </p>
            <p className="text-zinc-500 mt-2">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          {/* Refund Policy Notice */}
          <div className="bg-black/50 border border-amber-700/30 rounded-xl p-6 mb-12 backdrop-blur-sm">
            <div className="flex items-start">
              <div className="bg-amber-500/20 p-2 rounded-full mr-4 mt-1">
                <AlertTriangle className="h-6 w-6 text-amber-500" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-amber-400 mb-2">Refund Policy</h2>
                <p className="text-zinc-300 leading-relaxed mb-4">
                  At GoldJewelsMy, customer satisfaction is our priority. Due to the nature of gold as a valuable item
                  and its sensitivity to market prices,{" "}
                  <span className="text-amber-400 font-medium">all sales are final and non-refundable</span>, unless
                  there is a defect or mistake on our part.
                </p>
                <p className="text-zinc-300 font-medium">
                  If you encounter any issues, please contact us within 3 working days of receiving your order.
                </p>
                <div className="mt-4">
                  <Button
                    asChild
                    size="sm"
                    className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 border border-amber-500/50"
                  >
                    <Link href="/refund-policy">View Full Refund Policy</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-12">
            {/* Acceptance */}
            <section>
              <div className="flex items-center mb-6">
                <div className="bg-gold-DEFAULT/20 p-2 rounded-full mr-3">
                  <FileText className="h-5 w-5 text-gold-light" />
                </div>
                <h2 className="text-2xl font-bold text-gold-light">Acceptance of Terms</h2>
              </div>

              <div className="bg-black/30 rounded-xl p-6 border border-zinc-800">
                <p className="text-zinc-300 leading-relaxed">
                  By accessing and using the GoldJewelsMy website, you accept and agree to be bound by the terms and
                  provision of this agreement. If you do not agree to abide by the above, please do not use this
                  service.
                </p>
              </div>
            </section>

            {/* Product Information */}
            <section>
              <div className="flex items-center mb-6">
                <div className="bg-gold-DEFAULT/20 p-2 rounded-full mr-3">
                  <Shield className="h-5 w-5 text-gold-light" />
                </div>
                <h2 className="text-2xl font-bold text-gold-light">Product Information</h2>
              </div>

              <div className="bg-black/30 rounded-xl p-6 border border-zinc-800">
                <p className="text-zinc-300 leading-relaxed mb-6">
                  We strive to provide accurate product information, including:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="bg-zinc-800/50 p-4 rounded-lg flex items-center">
                    <div className="w-2 h-2 bg-gold-DEFAULT rounded-full mr-3"></div>
                    <p className="text-zinc-300">Weight and purity specifications</p>
                  </div>
                  <div className="bg-zinc-800/50 p-4 rounded-lg flex items-center">
                    <div className="w-2 h-2 bg-gold-DEFAULT rounded-full mr-3"></div>
                    <p className="text-zinc-300">Current pricing based on market rates</p>
                  </div>
                  <div className="bg-zinc-800/50 p-4 rounded-lg flex items-center">
                    <div className="w-2 h-2 bg-gold-DEFAULT rounded-full mr-3"></div>
                    <p className="text-zinc-300">Product availability</p>
                  </div>
                  <div className="bg-zinc-800/50 p-4 rounded-lg flex items-center">
                    <div className="w-2 h-2 bg-gold-DEFAULT rounded-full mr-3"></div>
                    <p className="text-zinc-300">Certification details</p>
                  </div>
                </div>
                <p className="text-zinc-400">
                  Prices are subject to change based on current gold market rates. All products come with appropriate
                  certification and authenticity guarantees.
                </p>
              </div>
            </section>

            {/* Payment Terms */}
            <section className="bg-gradient-to-r from-black to-zinc-900 rounded-xl p-8 border border-zinc-800">
              <div className="flex items-center mb-6">
                <div className="bg-gold-DEFAULT/20 p-3 rounded-full mr-4">
                  <Scale className="h-6 w-6 text-gold-light" />
                </div>
                <h2 className="text-2xl font-bold text-white">Payment Terms</h2>
              </div>

              <p className="text-zinc-300 leading-relaxed mb-6">We accept various payment methods including:</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-black/50 p-4 rounded-lg text-center">
                  <p className="text-zinc-300">Bank transfers</p>
                </div>
                <div className="bg-black/50 p-4 rounded-lg text-center">
                  <p className="text-zinc-300">Credit/Debit cards</p>
                </div>
                <div className="bg-black/50 p-4 rounded-lg text-center">
                  <p className="text-zinc-300">Online banking</p>
                </div>
                <div className="bg-black/50 p-4 rounded-lg text-center">
                  <p className="text-zinc-300">E-wallet payments</p>
                </div>
              </div>

              <p className="text-zinc-300 leading-relaxed">
                Payment must be received in full before order processing and shipment.
              </p>
            </section>

            {/* Limitation of Liability */}
            <section>
              <div className="flex items-center mb-6">
                <div className="bg-gold-DEFAULT/20 p-2 rounded-full mr-3">
                  <Shield className="h-5 w-5 text-gold-light" />
                </div>
                <h2 className="text-2xl font-bold text-gold-light">Limitation of Liability</h2>
              </div>

              <div className="bg-black/30 rounded-xl p-6 border border-zinc-800">
                <p className="text-zinc-300 leading-relaxed">
                  GoldJewelsMy shall not be liable for any indirect, incidental, special, consequential, or punitive
                  damages, including without limitation, loss of profits, data, use, goodwill, or other intangible
                  losses.
                </p>
              </div>
            </section>

            {/* Contact */}
            <section className="bg-black rounded-xl p-8 border border-zinc-800">
              <h2 className="text-2xl font-bold mb-6 text-gold-light">Contact Information</h2>

              <div className="bg-zinc-900/50 p-6 rounded-lg mb-8">
                <p className="text-zinc-300 mb-4">
                  <span className="text-white font-medium">Business Name:</span> GJM Trading
                </p>
                <p className="text-zinc-300 mb-4">
                  <span className="text-white font-medium">Registration:</span> SSM-56834970-A
                </p>
                <p className="text-zinc-300 mb-4">
                  <span className="text-white font-medium">Address:</span> Sri Damansara, Kuala Lumpur 52200
                </p>
                <p className="text-zinc-300 mb-4">
                  <span className="text-white font-medium">Email:</span> sales@goldjewelsmy.com
                </p>
                <p className="text-zinc-300 mb-4">
                  <span className="text-white font-medium">Phone/WhatsApp:</span> +60172924529
                </p>
                <p className="text-zinc-300">
                  <span className="text-white font-medium">Operating Hours:</span> Monday – Friday, 9:00 AM – 6:00 PM
                </p>
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
                    <Link href="/refund-policy">Refund Policy</Link>
                  </Button>
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
