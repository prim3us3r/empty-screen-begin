import type { Metadata } from "next"
import { Truck, Shield, Clock, MapPin, Package, AlertTriangle, Mail, Phone } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Shipping Policy | GoldJewelsMy",
  description: "Learn about our shipping and return policies for gold products.",
}

export default function ShippingPage() {
  return (
    <div className="bg-zinc-900 min-h-screen">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-16">
            <div className="inline-block mb-4 bg-gold-DEFAULT/20 px-4 py-1 rounded-full">
              <span className="text-gold-light text-sm font-medium tracking-wider uppercase">Delivery Information</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Shipping & Return Policy</h1>
            <div className="w-20 h-1 bg-gold-DEFAULT mb-6"></div>
            <p className="text-zinc-400 max-w-2xl text-lg">
              Secure delivery for your precious gold investments across Malaysia.
            </p>
          </div>

          {/* Shipping Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-black/30 p-6 rounded-xl border border-zinc-800 hover:border-gold-DEFAULT/50 transition-all duration-300 text-center">
              <div className="bg-gold-DEFAULT/20 p-3 rounded-full mx-auto mb-4 w-16 h-16 flex items-center justify-center">
                <Shield className="h-8 w-8 text-gold-light" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-white">Insured Delivery</h3>
              <p className="text-zinc-400">All shipments are fully insured</p>
            </div>

            <div className="bg-black/30 p-6 rounded-xl border border-zinc-800 hover:border-gold-DEFAULT/50 transition-all duration-300 text-center">
              <div className="bg-gold-DEFAULT/20 p-3 rounded-full mx-auto mb-4 w-16 h-16 flex items-center justify-center">
                <Clock className="h-8 w-8 text-gold-light" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-white">3-5 Working Days</h3>
              <p className="text-zinc-400">Expected delivery timeframe</p>
            </div>

            <div className="bg-black/30 p-6 rounded-xl border border-zinc-800 hover:border-gold-DEFAULT/50 transition-all duration-300 text-center">
              <div className="bg-gold-DEFAULT/20 p-3 rounded-full mx-auto mb-4 w-16 h-16 flex items-center justify-center">
                <Package className="h-8 w-8 text-gold-light" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-white">Tracking Included</h3>
              <p className="text-zinc-400">Track your order every step</p>
            </div>

            <div className="bg-black/30 p-6 rounded-xl border border-zinc-800 hover:border-gold-DEFAULT/50 transition-all duration-300 text-center">
              <div className="bg-gold-DEFAULT/20 p-3 rounded-full mx-auto mb-4 w-16 h-16 flex items-center justify-center">
                <MapPin className="h-8 w-8 text-gold-light" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-white">Nationwide</h3>
              <p className="text-zinc-400">Delivery across Malaysia</p>
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-12">
            {/* Shipping Information */}
            <section>
              <div className="flex items-center mb-6">
                <div className="bg-gold-DEFAULT/20 p-2 rounded-full mr-3">
                  <Truck className="h-5 w-5 text-gold-light" />
                </div>
                <h2 className="text-2xl font-bold text-gold-light">Shipping Information</h2>
              </div>

              <div className="bg-gradient-to-r from-black to-zinc-900 rounded-xl p-8 border border-gold-DEFAULT/20 mb-8">
                <div className="space-y-4 text-lg">
                  <p className="text-white">
                    <strong>
                      All deliveries are made using insured courier services specialized for gold products.
                    </strong>
                  </p>
                  <p className="text-white">
                    <strong>Expected delivery timeframe is 3–5 working days.</strong>
                  </p>
                  <p className="text-white">
                    <strong>Customers will receive a tracking number once the order has been shipped.</strong>
                  </p>
                </div>
              </div>

              <div className="space-y-8">
                <div className="bg-black/30 rounded-xl p-6 border border-zinc-800">
                  <h3 className="text-xl font-semibold mb-4 text-white">Shipping Process</h3>
                  <ol className="space-y-4">
                    <li className="flex">
                      <div className="bg-gold-DEFAULT/30 text-gold-light w-8 h-8 rounded-full flex items-center justify-center font-bold mr-4 shrink-0">
                        1
                      </div>
                      <div className="pt-1">
                        <p className="text-zinc-300">Order confirmation and payment verification</p>
                      </div>
                    </li>
                    <li className="flex">
                      <div className="bg-gold-DEFAULT/30 text-gold-light w-8 h-8 rounded-full flex items-center justify-center font-bold mr-4 shrink-0">
                        2
                      </div>
                      <div className="pt-1">
                        <p className="text-zinc-300">Product preparation and secure packaging</p>
                      </div>
                    </li>
                    <li className="flex">
                      <div className="bg-gold-DEFAULT/30 text-gold-light w-8 h-8 rounded-full flex items-center justify-center font-bold mr-4 shrink-0">
                        3
                      </div>
                      <div className="pt-1">
                        <p className="text-zinc-300">Handover to specialized courier service</p>
                      </div>
                    </li>
                    <li className="flex">
                      <div className="bg-gold-DEFAULT/30 text-gold-light w-8 h-8 rounded-full flex items-center justify-center font-bold mr-4 shrink-0">
                        4
                      </div>
                      <div className="pt-1">
                        <p className="text-zinc-300">Tracking number sent via email/SMS</p>
                      </div>
                    </li>
                    <li className="flex">
                      <div className="bg-gold-DEFAULT/30 text-gold-light w-8 h-8 rounded-full flex items-center justify-center font-bold mr-4 shrink-0">
                        5
                      </div>
                      <div className="pt-1">
                        <p className="text-zinc-300">Insured delivery to your address</p>
                      </div>
                    </li>
                  </ol>
                </div>

                <div className="bg-black/30 rounded-xl p-6 border border-zinc-800">
                  <h3 className="text-xl font-semibold mb-4 text-white">Delivery Areas</h3>
                  <p className="text-zinc-300 leading-relaxed mb-6">
                    We deliver nationwide across Malaysia. Delivery times may vary depending on your location:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-zinc-800/50 p-4 rounded-lg">
                      <h4 className="font-medium text-gold-light mb-2">Peninsular Malaysia</h4>
                      <p className="text-zinc-300">2-3 working days</p>
                    </div>
                    <div className="bg-zinc-800/50 p-4 rounded-lg">
                      <h4 className="font-medium text-gold-light mb-2">East Malaysia</h4>
                      <p className="text-zinc-300">3-5 working days</p>
                    </div>
                    <div className="bg-zinc-800/50 p-4 rounded-lg">
                      <h4 className="font-medium text-gold-light mb-2">Remote areas</h4>
                      <p className="text-zinc-300">4-7 working days</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Return Policy */}
            <section>
              <div className="flex items-center mb-6">
                <div className="bg-gold-DEFAULT/20 p-2 rounded-full mr-3">
                  <AlertTriangle className="h-5 w-5 text-gold-light" />
                </div>
                <h2 className="text-2xl font-bold text-gold-light">Return Policy</h2>
              </div>

              <div className="bg-black/50 border border-amber-700/30 rounded-xl p-6 mb-8 backdrop-blur-sm">
                <p className="text-zinc-300 leading-relaxed">
                  Due to the nature of gold as a valuable commodity and its sensitivity to market fluctuations,{" "}
                  <span className="text-amber-400 font-medium">all sales are final and non-refundable</span> unless
                  there is a defect or error on our part.
                </p>
              </div>

              <div className="space-y-8">
                <div className="bg-black/30 rounded-xl p-6 border border-zinc-800">
                  <h3 className="text-xl font-semibold mb-4 text-white">Eligible Returns</h3>
                  <p className="text-zinc-300 leading-relaxed mb-4">
                    Returns are only accepted in the following circumstances:
                  </p>
                  <ul className="space-y-3 text-zinc-300">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-gold-DEFAULT rounded-full mr-3 mt-2"></div>
                      <span>Product defect or damage during shipping</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-gold-DEFAULT rounded-full mr-3 mt-2"></div>
                      <span>Incorrect item sent (our error)</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-gold-DEFAULT rounded-full mr-3 mt-2"></div>
                      <span>Product does not match specifications</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-gold-DEFAULT rounded-full mr-3 mt-2"></div>
                      <span>Missing certification or documentation</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-black/30 rounded-xl p-6 border border-zinc-800">
                  <h3 className="text-xl font-semibold mb-4 text-white">Return Conditions</h3>
                  <p className="text-zinc-300 leading-relaxed mb-4">
                    <strong>For eligible returns, items must be returned in their original, unused condition.</strong>
                  </p>
                  <ul className="space-y-3 text-zinc-300">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-gold-DEFAULT rounded-full mr-3 mt-2"></div>
                      <span>Contact us within 3 working days of receiving your order</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-gold-DEFAULT rounded-full mr-3 mt-2"></div>
                      <span>Items must be in original packaging with all certificates</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-gold-DEFAULT rounded-full mr-3 mt-2"></div>
                      <span>No signs of tampering or damage</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-gold-DEFAULT rounded-full mr-3 mt-2"></div>
                      <span>Return shipping must be insured and trackable</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Contact */}
            <section className="bg-black rounded-xl p-8 border border-zinc-800">
              <h2 className="text-2xl font-bold mb-6 text-gold-light">Contact Us for Shipping Issues</h2>
              <p className="text-zinc-300 mb-8">If you have any questions about shipping or need to report an issue:</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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

              <div className="bg-zinc-800/30 p-4 rounded-lg text-center">
                <p className="text-zinc-300">
                  <strong>Operating Hours:</strong> Monday – Friday, 9:00 AM – 6:00 PM
                </p>
                <p className="text-zinc-400 text-sm mt-2">Please have your order number ready when contacting us.</p>
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
                    <Link href="/terms">Terms & Conditions</Link>
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
