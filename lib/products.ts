export type Product = {
  id: string
  name: string
  description: string
  price: number
  weight: string
  purity: string
  image: string
  featured: boolean
  inStock: boolean
  category: string
  dimensions?: string
  serialNumber?: string
  certificate?: boolean
}

export const products: Product[] = [
  {
    id: "gold-bar-100g",
    name: "100g Gold Bar",
    description:
      "Premium 100g gold bar with 999.9 purity, presented in a secure protective case with certificate of authenticity.",
    price: 6500,
    weight: "100g",
    purity: "999.9",
    image: "/images/gold-bar-100g.png",
    featured: true,
    inStock: true,
    category: "gold-bars",
    dimensions: "45mm x 27mm x 5mm",
    serialNumber: "GB100GM",
    certificate: true,
  },
  {
    id: "gold-bar-50g",
    name: "50g Gold Bar",
    description:
      "Exquisite 50g gold bar with 999.9 purity, elegantly designed and presented in a protective case with certificate.",
    price: 3300,
    weight: "50g",
    purity: "999.9",
    image: "/images/gold-bar-50g.png",
    featured: true,
    inStock: true,
    category: "gold-bars",
    dimensions: "31mm x 18mm x 3mm",
    serialNumber: "GB50GM",
    certificate: true,
  },
  {
    id: "gold-bar-10g",
    name: "10g Gold Bar",
    description:
      "Beautiful 10g gold bar with 999.9 purity, perfect for new investors or as a gift, includes certificate of authenticity.",
    price: 680,
    weight: "10g",
    purity: "999.9",
    image: "/images/gold-bar-certificates.png",
    featured: false,
    inStock: true,
    category: "gold-bars",
    dimensions: "23mm x 14mm x 1.5mm",
    serialNumber: "GB10GM",
    certificate: true,
  },
  {
    id: "gold-bar-5g",
    name: "5g Gold Bar",
    description:
      "Elegant 5g gold bar with 999.9 purity, an accessible entry point for gold investment, includes certificate.",
    price: 350,
    weight: "5g",
    purity: "999.9",
    image: "/images/gold-bar-5g.png",
    featured: true,
    inStock: true,
    category: "gold-bars",
    dimensions: "15mm x 9mm x 1mm",
    serialNumber: "GB5GM",
    certificate: true,
  },
  {
    id: "gold-bar-1g",
    name: "1g Gold Bar",
    description:
      "Stunning 1g gold bar with 999.9 purity, perfect as a gift or starter investment, includes certificate of authenticity.",
    price: 75,
    weight: "1g",
    purity: "999.9",
    image: "/images/gold-bar-1g.png",
    featured: false,
    inStock: true,
    category: "gold-bars",
    dimensions: "8mm x 5mm x 0.5mm",
    serialNumber: "GB1GM",
    certificate: true,
  },
  {
    id: "gold-dinar-quarter",
    name: "1/4 Dinar Gold Coin",
    description: "Exquisite 1/4 Dinar gold coin with intricate design, perfect for collectors and investors alike.",
    price: 450,
    weight: "2.13g",
    purity: "999.9",
    image: "/images/gold-certificate.png",
    featured: false,
    inStock: true,
    category: "gold-coins",
    serialNumber: "GC25DN",
    certificate: true,
  },
]

export const getProductById = (id: string): Product | undefined => {
  return products.find((product) => product.id === id)
}

export const getFeaturedProducts = (): Product[] => {
  return products.filter((product) => product.featured)
}

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter((product) => product.category === category)
}
