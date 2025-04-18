import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Montserrat } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { CartProvider } from "@/components/cart/cart-provider"
import GoldPriceTicker from "@/components/gold-price/gold-price-ticker"
import FixedGoldPriceTicker from "@/components/gold-price/fixed-gold-price-ticker"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap", // Optimize font loading
})

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap", // Optimize font loading
})

export const metadata: Metadata = {
  title: "GoldJewelsMy | Premium Gold Bars",
  description:
    "Discover our exclusive collection of premium gold bars. Invest in luxury with our high-quality, certified gold products.",
  keywords: "gold bars, investment gold, premium gold, buy gold, gold investment, Malaysia gold",
  openGraph: {
    title: "GoldJewelsMy | Premium Gold Bars",
    description:
      "Discover our exclusive collection of premium gold bars. Invest in luxury with our high-quality, certified gold products.",
    url: "https://goldjewelsmy.vercel.app",
    siteName: "GoldJewelsMy",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "GoldJewelsMy Gold Bars",
      },
    ],
    locale: "en_MY",
    type: "website",
  },
  viewport: "width=device-width, initial-scale=1, maximum-scale=5", // Improved mobile viewport settings
  themeColor: "#b8860b", // Gold theme color for browser UI
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className={`${playfair.variable} ${montserrat.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <CartProvider>
            <div className="flex min-h-screen flex-col">
              <GoldPriceTicker />
              <Navbar />
              <FixedGoldPriceTicker />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <Toaster />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
