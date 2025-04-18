import { Shield, Award, BadgeIcon as Certificate, Scale } from "lucide-react"

const features = [
  {
    icon: <Certificate className="h-10 w-10 text-gold-light" />,
    title: "Certified Authenticity",
    description:
      "Every gold bar comes with a certificate of authenticity, ensuring the quality and purity of your investment.",
  },
  {
    icon: <Shield className="h-10 w-10 text-gold-light" />,
    title: "Secure Packaging",
    description:
      "Our gold bars are securely packaged in tamper-evident cases to protect your investment during storage and transport.",
  },
  {
    icon: <Scale className="h-10 w-10 text-gold-light" />,
    title: "Precise Weight",
    description: "Each gold bar is precisely weighed and measured to ensure you receive exactly what you pay for.",
  },
  {
    icon: <Award className="h-10 w-10 text-gold-light" />,
    title: "Premium Quality",
    description:
      "We offer only the highest quality gold with 999.9 purity, meeting international standards for precious metals.",
  },
]

const ProductFeature = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {features.map((feature, index) => (
        <div
          key={index}
          className="flex flex-col items-center text-center p-6 bg-black rounded-lg border border-zinc-800 hover:border-gold-DEFAULT/50 transition-all duration-300"
        >
          <div className="mb-4 bg-gold-DEFAULT/10 p-4 rounded-full">{feature.icon}</div>
          <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
          <p className="text-white/70">{feature.description}</p>
        </div>
      ))}
    </div>
  )
}

export default ProductFeature
