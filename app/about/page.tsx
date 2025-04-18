import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Shield, Award, Scale, Users } from "lucide-react"

export const metadata: Metadata = {
  title: "About Us | Aurum Gold Bars",
  description:
    "Learn about our company's mission, values, and commitment to providing the highest quality gold products.",
}

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[50vh] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-0"></div>
        <div className="absolute inset-0 z-0">
          <Image src="/images/gold-bar-50g.png" alt="About Aurum Gold" fill className="object-cover opacity-80" />
        </div>
        <div className="container relative z-10 px-4 md:px-6 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            About <span className="text-gold">GoldJewelsMy</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl">
            Dedicated to excellence in gold investment products since 2010
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <div className="w-20 h-1 bg-gold-DEFAULT mb-6"></div>
              <div className="space-y-4">
                <p>
                  Founded with a passion for precious metals and a vision to make gold investment accessible to everyone
                  in Malaysia, GoldJewelsMy has grown into a trusted name in the gold industry.
                </p>
                <p>
                  Our journey started when our founder, a long-time gold enthusiast and investor, recognized the need
                  for a more transparent and customer-focused approach to gold trading. With decades of experience in
                  precious metals, we set out to create a company that would prioritize quality, authenticity, and
                  customer education.
                </p>
                <p>
                  Today, GoldJewelsMy stands as a testament to that vision, offering a curated selection of premium gold
                  products backed by certification and our unwavering commitment to excellence.
                </p>
              </div>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image src="/images/gold-bar-certificates.png" alt="Our Story" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <div className="w-20 h-1 bg-gold-DEFAULT mb-6"></div>
            <p className="text-muted-foreground max-w-2xl">The principles that guide everything we do at Aurum</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <Shield className="h-12 w-12 text-gold-DEFAULT mb-4" />
              <h3 className="text-xl font-bold mb-2">Integrity</h3>
              <p className="text-muted-foreground">
                We operate with complete transparency and honesty in all our dealings, ensuring our customers can trust
                every aspect of their experience with us.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <Award className="h-12 w-12 text-gold-DEFAULT mb-4" />
              <h3 className="text-xl font-bold mb-2">Excellence</h3>
              <p className="text-muted-foreground">
                We are committed to providing only the highest quality gold products, meeting international standards
                and exceeding customer expectations.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <Scale className="h-12 w-12 text-gold-DEFAULT mb-4" />
              <h3 className="text-xl font-bold mb-2">Reliability</h3>
              <p className="text-muted-foreground">
                Our customers can depend on us for consistent quality, accurate information, and timely service,
                building long-term relationships based on trust.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <Users className="h-12 w-12 text-gold-DEFAULT mb-4" />
              <h3 className="text-xl font-bold mb-2">Education</h3>
              <p className="text-muted-foreground">
                We believe in empowering our customers with knowledge, providing resources and guidance to help them
                make informed investment decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Commitment */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 relative h-[400px] rounded-lg overflow-hidden">
              <Image src="/images/gold-bar-1g.png" alt="Our Commitment" fill className="object-cover" />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl font-bold mb-6">Our Commitment</h2>
              <div className="w-20 h-1 bg-gold-DEFAULT mb-6"></div>
              <div className="space-y-4">
                <p>
                  At Aurum, we are committed to providing our customers with an exceptional experience from start to
                  finish. This means offering products of uncompromising quality, backed by certification and our
                  guarantee of authenticity.
                </p>
                <p>
                  We understand that investing in gold is a significant decision, which is why we prioritize customer
                  education and support. Our team of experts is always available to provide guidance, answer questions,
                  and help you make informed choices about your investment.
                </p>
                <p>
                  We also recognize our responsibility to operate ethically and sustainably. We work only with suppliers
                  who share our values and adhere to responsible sourcing practices, ensuring that our gold products
                  meet not only quality standards but ethical ones as well.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-black text-white">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Gold Investment Journey?</h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            Explore our premium collection of gold bars and coins, or contact our team for personalized guidance.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="bg-gold-DEFAULT hover:bg-gold-dark text-black">
              <Link href="/products">Explore Products</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
