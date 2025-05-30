import SeedDatabase from "@/scripts/seed-database"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function SeedPage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">Seed Database</h1>
      <div className="bg-black p-6 rounded-lg shadow-md border border-zinc-800">
        <p className="mb-6 text-muted-foreground">
          This page allows you to seed the database with initial data for testing purposes. The seeding process will:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2 text-muted-foreground">
          <li>Create all necessary database tables if they don't exist</li>
          <li>Add product categories (Gold Bars, Gold Coins)</li>
          <li>Add sample products with details and images</li>
          <li>Generate 30 days of historical gold price data</li>
        </ul>

        <p className="mb-6 text-muted-foreground">
          Click the button below to populate the database with all the necessary data to make your e-commerce website
          fully functional.
        </p>

        <SeedDatabase />

        <div className="mt-8 pt-6 border-t border-zinc-800">
          <h3 className="text-lg font-medium mb-4">After Seeding</h3>
          <p className="mb-4 text-muted-foreground">
            Once the database is seeded, you can explore these pages to see your fully functional e-commerce website:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button asChild variant="outline" className="justify-start">
              <Link href="/">
                <span className="text-gold-DEFAULT mr-2">→</span> Homepage
              </Link>
            </Button>
            <Button asChild variant="outline" className="justify-start">
              <Link href="/products">
                <span className="text-gold-DEFAULT mr-2">→</span> Product Catalog
              </Link>
            </Button>
            <Button asChild variant="outline" className="justify-start">
              <Link href="/checkout">
                <span className="text-gold-DEFAULT mr-2">→</span> Checkout Process
              </Link>
            </Button>
            <Button asChild variant="outline" className="justify-start">
              <Link href="/account">
                <span className="text-gold-DEFAULT mr-2">→</span> User Account
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
