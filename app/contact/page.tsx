import type { Metadata } from "next"
import ContactForm from "@/components/contact/contact-form"
import { Mail, MapPin, Phone } from "lucide-react"

export const metadata: Metadata = {
  title: "Contact Us | Aurum Gold Bars",
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="bg-secondary/50 p-8 rounded-lg flex flex-col items-center text-center">
          <div className="bg-gold-DEFAULT/10 p-4 rounded-full mb-4">
            <Phone className="h-6 w-6 text-gold-DEFAULT" />
          </div>
          <h3 className="text-xl font-bold mb-2">Phone</h3>
          <p className="text-muted-foreground mb-4">Speak directly with our customer service team</p>
          <a href="tel:+60176323580" className="text-gold-DEFAULT hover:underline">
            +60176323580
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
          <p className="text-muted-foreground mb-4">Our flagship store and corporate headquarters</p>
          <address className="not-italic text-gold-DEFAULT">
            PT 77 Bandar Baru Kubang Kerian
            <br />
            16150 Kota Bharu
          </address>
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
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127483.9570812449!2d102.1686133!3d6.1339511!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31b6af9b33a5b2c1%3A0xb34f62338d3c39a4!2sKota%20Bharu%2C%20Kelantan%2C%20Malaysia!5e0!3m2!1sen!2s!4v1650000000000!5m2!1sen!2s"
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
