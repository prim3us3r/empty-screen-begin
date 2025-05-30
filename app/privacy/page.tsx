import type { Metadata } from "next"
import { Shield, Lock, FileText, Users, Mail, Phone } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Privacy Policy | GoldJewelsMy",
  description: "Learn about how GoldJewelsMy protects and handles your personal information.",
}

export default function PrivacyPage() {
  return (
    <div className="bg-zinc-900 min-h-screen">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-16">
            <div className="inline-block mb-4 bg-gold-DEFAULT/20 px-4 py-1 rounded-full">
              <span className="text-gold-light text-sm font-medium tracking-wider uppercase">Policy Information</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Privacy Policy</h1>
            <div className="w-20 h-1 bg-gold-DEFAULT mb-6"></div>
            <p className="text-zinc-400 max-w-2xl text-lg">
              How we protect and handle your personal information at GoldJewelsMy.
            </p>
            <p className="text-zinc-500 mt-2">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          {/* Key Privacy Statement */}
          <div className="bg-black/50 border border-gold-DEFAULT/30 rounded-xl p-6 mb-12 backdrop-blur-sm">
            <div className="flex items-start">
              <div className="bg-gold-DEFAULT/20 p-2 rounded-full mr-4 mt-1">
                <Shield className="h-6 w-6 text-gold-light" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white mb-2">Your Privacy Matters</h2>
                <p className="text-zinc-300 leading-relaxed">
                  Your privacy is important to us. All personal information collected on GoldJewelsMy is used solely for
                  order processing and communication purposes. We do not share or sell your information to any third
                  parties without your consent.
                </p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-12">
            {/* Information Collection */}
            <section>
              <div className="flex items-center mb-6">
                <div className="bg-gold-DEFAULT/20 p-2 rounded-full mr-3">
                  <FileText className="h-5 w-5 text-gold-light" />
                </div>
                <h2 className="text-2xl font-bold text-gold-light">Information We Collect</h2>
              </div>

              <div className="bg-black/30 rounded-xl p-6 border border-zinc-800">
                <p className="text-zinc-300 mb-4">
                  We collect information you provide directly to us, such as when you:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="bg-zinc-800/50 p-4 rounded-lg flex items-center">
                    <div className="w-2 h-2 bg-gold-DEFAULT rounded-full mr-3"></div>
                    <p className="text-zinc-300">Create an account or make a purchase</p>
                  </div>
                  <div className="bg-zinc-800/50 p-4 rounded-lg flex items-center">
                    <div className="w-2 h-2 bg-gold-DEFAULT rounded-full mr-3"></div>
                    <p className="text-zinc-300">Contact us for customer support</p>
                  </div>
                  <div className="bg-zinc-800/50 p-4 rounded-lg flex items-center">
                    <div className="w-2 h-2 bg-gold-DEFAULT rounded-full mr-3"></div>
                    <p className="text-zinc-300">Subscribe to our newsletter</p>
                  </div>
                  <div className="bg-zinc-800/50 p-4 rounded-lg flex items-center">
                    <div className="w-2 h-2 bg-gold-DEFAULT rounded-full mr-3"></div>
                    <p className="text-zinc-300">Participate in surveys or promotions</p>
                  </div>
                </div>
                <p className="text-zinc-400">
                  This may include your name, email address, phone number, shipping address, and payment information.
                </p>
              </div>
            </section>

            {/* Information Usage */}
            <section>
              <div className="flex items-center mb-6">
                <div className="bg-gold-DEFAULT/20 p-2 rounded-full mr-3">
                  <Users className="h-5 w-5 text-gold-light" />
                </div>
                <h2 className="text-2xl font-bold text-gold-light">How We Use Your Information</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-black/30 rounded-xl p-6 border border-zinc-800 hover:border-gold-DEFAULT/50 transition-all duration-300">
                  <h3 className="text-xl font-semibold mb-4 text-white">Order Processing</h3>
                  <ul className="space-y-3 text-zinc-300">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-gold-DEFAULT rounded-full mr-3 mt-2"></div>
                      <span>Process and fulfill your orders</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-gold-DEFAULT rounded-full mr-3 mt-2"></div>
                      <span>Communicate with you about your orders and account</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-gold-DEFAULT rounded-full mr-3 mt-2"></div>
                      <span>Provide customer support</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-black/30 rounded-xl p-6 border border-zinc-800 hover:border-gold-DEFAULT/50 transition-all duration-300">
                  <h3 className="text-xl font-semibold mb-4 text-white">Business Operations</h3>
                  <ul className="space-y-3 text-zinc-300">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-gold-DEFAULT rounded-full mr-3 mt-2"></div>
                      <span>Send you promotional communications (with your consent)</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-gold-DEFAULT rounded-full mr-3 mt-2"></div>
                      <span>Improve our products and services</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-gold-DEFAULT rounded-full mr-3 mt-2"></div>
                      <span>Comply with legal obligations</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Information Sharing */}
            <section className="bg-gradient-to-r from-black to-zinc-900 rounded-xl p-8 border border-zinc-800">
              <div className="flex items-center mb-6">
                <div className="bg-gold-DEFAULT/20 p-3 rounded-full mr-4">
                  <Lock className="h-6 w-6 text-gold-light" />
                </div>
                <h2 className="text-2xl font-bold text-white">Information Sharing & Security</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gold-light">Information Sharing</h3>
                  <p className="text-zinc-300 leading-relaxed mb-4">
                    We do not sell, trade, or otherwise transfer your personal information to third parties without your
                    consent, except in the following circumstances:
                  </p>
                  <ul className="space-y-2 text-zinc-400 pl-6">
                    <li className="list-disc">
                      To trusted service providers who assist us in operating our website and conducting business
                    </li>
                    <li className="list-disc">When required by law or to protect our rights</li>
                    <li className="list-disc">In connection with a business transfer or merger</li>
                  </ul>
                </div>

                <Separator className="bg-zinc-700" />

                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gold-light">Data Security</h3>
                  <p className="text-zinc-300 leading-relaxed">
                    We implement appropriate security measures to protect your personal information against unauthorized
                    access, alteration, disclosure, or destruction. However, no method of transmission over the internet
                    is 100% secure.
                  </p>
                </div>
              </div>
            </section>

            {/* Contact */}
            <section className="bg-black rounded-xl p-8 border border-zinc-800">
              <h2 className="text-2xl font-bold mb-6 text-gold-light">Contact Us</h2>
              <p className="text-zinc-300 mb-8">
                If you have any questions about this Privacy Policy, please contact us:
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
                    <Link href="/refund-policy">Refund Policy</Link>
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
