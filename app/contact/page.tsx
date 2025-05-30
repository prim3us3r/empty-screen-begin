import type { Metadata } from "next"
import ContactForm from "@/components/contact/contact-form"
import { Mail, MapPin, Phone, Clock, Building } from "lucide-react"

export const metadata: Metadata = {
  title: "Contact Us | GoldJewelsMy",
  description:
    "Get in touch with our team for inquiries about our gold products, investment advice, or customer support.",
}

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="flex flex-col items-center text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h1>
        <div className="w-20 h-1 bg-gold-DEFAULT mb-6"></div>
        <p className="text-muted-foreground max-w-2xl">
          Have questions about our products or need investment advice? Our team is here to help.
        </p>
      </div>

      {/* Company Information Banner */}
      <div className="bg-gold-DEFAULT/10 p-6 rounded-lg mb-12 text-center">
        <div className="flex items-center justify-center mb-2">
          <Building className="h-6 w-6 text-gold-DEFAULT mr-2" />
          <h2 className="text-xl font-bold">GJM Trading</h2>
        </div>
        <p className="text-muted-foreground">(SSM-56834970-A)</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
        <div className="bg-secondary/50 p-8 rounded-lg flex flex-col items-center text-center">
          <div className="bg-gold-DEFAULT/10 p-4 rounded-full mb-4">
            <Phone className="h-6 w-6 text-gold-DEFAULT" />
          </div>
          <h3 className="text-xl font-bold mb-2">Phone</h3>
          <p className="text-muted-foreground mb-4">Speak directly with our customer service team</p>
          <a href="tel:+60172924529" className="text-gold-DEFAULT hover:underline">
            +60172924529
          </a>
        </div>

        <div className="bg-secondary/50 p-8 rounded-lg flex flex-col items-center text-center">
          <div className="bg-gold-DEFAULT/10 p-4 rounded-full mb-4">
            <Mail className="h-6 w-6 text-gold-DEFAULT" />
          </div>
          <h3 className="text-xl font-bold mb-2">Email</h3>
          <p className="text-muted-foreground mb-4">Send us an email and we'll respond within 24 hours</p>
          <a href="mailto:sales@goldjewelsmy.com" className="text-gold-DEFAULT hover:underline">
            sales@goldjewelsmy.com
          </a>
        </div>

        <div className="bg-secondary/50 p-8 rounded-lg flex flex-col items-center text-center">
          <div className="bg-gold-DEFAULT/10 p-4 rounded-full mb-4">
            <MapPin className="h-6 w-6 text-gold-DEFAULT" />
          </div>
          <h3 className="text-xl font-bold mb-2">Visit Us</h3>
          <p className="text-muted-foreground mb-4">Our business location</p>
          <address className="not-italic text-gold-DEFAULT">
            Sri Damansara
            <br />
            Kuala Lumpur 52200
          </address>
        </div>

        <div className="bg-secondary/50 p-8 rounded-lg flex flex-col items-center text-center">
          <div className="bg-gold-DEFAULT/10 p-4 rounded-full mb-4">
            <Clock className="h-6 w-6 text-gold-DEFAULT" />
          </div>
          <h3 className="text-xl font-bold mb-2">Business Hours</h3>
          <p className="text-muted-foreground mb-4">Our operating hours for customer service</p>
          <p className="text-gold-DEFAULT">
            Monday – Friday
            <br />
            9:00 AM – 6:00 PM
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
          <ContactForm />
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">Our Location</h2>
          <div className="h-[400px] bg-secondary rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3983.6234567890123!2d101.6234567!3d3.1234567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc4234567890ab%3A0x1234567890abcdef!2sSri%20Damansara%2C%20Kuala%20Lumpur!5e0!3m2!1sen!2smy!4v1650000000000!5m2!1sen!2smy"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  )
}
