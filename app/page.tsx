import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import ProductFeature from "@/components/home/product-feature"
import TestimonialSlider from "@/components/home/testimonial-slider"
import FeaturedProducts from "@/components/home/featured-products"
import HeroStats from "@/components/home/hero-stats"

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section - Revamped */}
      <section className="relative min-h-[90vh] w-full flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/70 z-10"></div>
          <Image
            src="/images/gold-bar-100g.png"
            alt="Premium Gold Bars"
            fill
            className="object-cover opacity-40 mix-blend-overlay"
            priority
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold-light/20 via-transparent to-transparent opacity-70"></div>
        </div>

        <div className="container relative z-10 px-4 md:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col text-left">
            <div className="inline-block mb-4">
              <span className="bg-gold-DEFAULT/20 text-gold-light px-4 py-1 rounded-full text-sm font-medium tracking-wider">
                PREMIUM INVESTMENT
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Secure Your Future With <span className="text-gold-light">Pure Gold</span> Investment
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-xl mb-8 leading-relaxed">
              Discover GoldJewelsMy's exclusive collection of certified 999.9 gold bars, crafted with precision and
              elegance for discerning investors.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button
                asChild
                size="lg"
                className="bg-gold-DEFAULT hover:bg-gold-light text-black font-medium text-base px-8 py-6"
              >
                <Link href="/products">Explore Collection</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-gold-light/30 text-gold-light hover:bg-gold-DEFAULT/10 hover:text-gold-light font-medium text-base px-8 py-6"
              >
                <Link href="/about">Learn More</Link>
              </Button>
            </div>

            <HeroStats />
          </div>

          <div className="hidden lg:flex justify-center items-center relative">
            <div className="relative w-[400px] h-[400px]">
              <div className="absolute inset-0 rounded-full bg-gold-DEFAULT/20 blur-3xl"></div>
              <div className="relative z-10 w-full h-full flex items-center justify-center">
                <Image
                  src="/images/gold-bar-50g.png"
                  alt="Premium Gold Bar"
                  width={350}
                  height={350}
                  className="object-contain drop-shadow-2xl transform hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent"></div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-24 bg-black">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Featured Products</h2>
            <div className="w-20 h-1 bg-gold-DEFAULT mb-6"></div>
            <p className="text-white/70 max-w-2xl">
              Our most sought-after gold bars, each representing the pinnacle of quality and craftsmanship.
            </p>
          </div>
          <FeaturedProducts />
          <div className="flex justify-center mt-12">
            <Button
              asChild
              variant="outline"
              className="group border-gold-light/30 text-gold-light hover:bg-gold-DEFAULT/10 hover:text-gold-light"
            >
              <Link href="/products">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Product Features */}
      <section className="py-16 md:py-24 bg-zinc-900">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Why Choose Our Gold</h2>
            <div className="w-20 h-1 bg-gold-DEFAULT mb-6"></div>
            <p className="text-white/70 max-w-2xl">
              We offer only the finest gold products, backed by certification and our commitment to excellence.
            </p>
          </div>
          <ProductFeature />
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-black">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">What Our Clients Say</h2>
            <div className="w-20 h-1 bg-gold-DEFAULT mb-6"></div>
            <p className="text-white/70 max-w-2xl">
              Hear from our satisfied customers about their experience with our gold products.
            </p>
          </div>
          <TestimonialSlider />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-zinc-900 text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Invest?</h2>
              <p className="text-white/80 mb-6">
                Start your journey into gold investment today with GoldJewelsMy. Our experts are ready to guide you
                through the process.
              </p>
              <Button asChild size="lg" className="bg-gold-DEFAULT hover:bg-gold-light text-black">
                <Link href="/products">Shop Now</Link>
              </Button>
            </div>
            <div className="md:w-1/2 flex justify-center md:justify-end">
              <div className="relative w-64 h-64 md:w-80 md:h-80">
                <div className="absolute inset-0 rounded-full bg-gold-DEFAULT/20 blur-3xl"></div>
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                  <Image
                    src="/images/gold-bar-100g.png"
                    alt="Premium Gold Bar"
                    fill
                    className="object-contain drop-shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
