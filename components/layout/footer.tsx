import Link from "next/link"
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Clock, Building } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-playfair font-bold mb-4">
              <span className="text-gold-DEFAULT">GoldJewelsMy</span>
            </h3>
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <Building className="h-4 w-4 mr-2 text-gold-DEFAULT shrink-0" />
                <span className="text-white/90 font-medium">GJM Trading</span>
              </div>
              <p className="text-white/70 text-sm ml-6">(SSM-56834970-A)</p>
            </div>
            <p className="text-white/70 mb-6 max-w-xs">
              Providing premium gold bars and investment opportunities with unmatched quality and service.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="hover:text-gold-DEFAULT">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-gold-DEFAULT">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-gold-DEFAULT">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/products" className="text-white/70 hover:text-gold-DEFAULT transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-white/70 hover:text-gold-DEFAULT transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/70 hover:text-gold-DEFAULT transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="text-white/70 hover:text-gold-DEFAULT transition-colors">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-white/70 hover:text-gold-DEFAULT transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-gold-DEFAULT shrink-0 mt-0.5" />
                <span className="text-white/70">Sri Damansara, Kuala Lumpur 52200</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-gold-DEFAULT shrink-0" />
                <span className="text-white/70">+60172924529</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-gold-DEFAULT shrink-0" />
                <span className="text-white/70">sales@goldjewelsmy.com</span>
              </li>
              <li className="flex items-start">
                <Clock className="h-5 w-5 mr-2 text-gold-DEFAULT shrink-0 mt-0.5" />
                <span className="text-white/70">Monday – Friday, 9:00 AM – 6:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-4">Newsletter</h3>
            <p className="text-white/70 mb-4">Subscribe to receive updates on new products and special offers.</p>
            <div className="flex flex-col space-y-2">
              <Input
                type="email"
                placeholder="Your email address"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
              <Button className="bg-gold-DEFAULT hover:bg-gold-dark text-black">Subscribe</Button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/50 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} GJM Trading (SSM-56834970-A). All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="/privacy" className="text-white/50 text-sm hover:text-gold-DEFAULT transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-white/50 text-sm hover:text-gold-DEFAULT transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/refund-policy" className="text-white/50 text-sm hover:text-gold-DEFAULT transition-colors">
              Refund Policy
            </Link>
            <Link href="/shipping" className="text-white/50 text-sm hover:text-gold-DEFAULT transition-colors">
              Shipping Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
