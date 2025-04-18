import type { Metadata } from "next"
import Link from "next/link"
import { CreditCard, Package, Settings, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "My Account | Aurum Gold Bars",
  description: "Manage your account, view orders, and update your profile.",
}

export default function AccountPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col items-center text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">My Account</h1>
        <div className="w-20 h-1 bg-gold-DEFAULT mb-6"></div>
        <p className="text-muted-foreground max-w-2xl">
          Manage your account, track orders, and update your preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center">
              <User className="h-5 w-5 mr-2 text-gold-DEFAULT" />
              Profile
            </CardTitle>
            <CardDescription>Manage your personal information</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full">
              <Link href="/account/profile">View Profile</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center">
              <Package className="h-5 w-5 mr-2 text-gold-DEFAULT" />
              Orders
            </CardTitle>
            <CardDescription>Track and manage your orders</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full">
              <Link href="/account/orders">View Orders</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center">
              <CreditCard className="h-5 w-5 mr-2 text-gold-DEFAULT" />
              Payment Methods
            </CardTitle>
            <CardDescription>Manage your payment options</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full">
              <Link href="/account/payment">View Payment Methods</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center">
              <Settings className="h-5 w-5 mr-2 text-gold-DEFAULT" />
              Settings
            </CardTitle>
            <CardDescription>Update your account preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full">
              <Link href="/account/settings">View Settings</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
