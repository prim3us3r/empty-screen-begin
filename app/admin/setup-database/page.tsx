"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Loader2 } from "lucide-react"

export default function SetupDatabasePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSetupDatabase = async () => {
    setIsLoading(true)
    setResult(null)
    setError(null)

    try {
      // First create the functions
      const functionsResponse = await fetch("/api/database/setup", {
        method: "GET",
      })

      if (!functionsResponse.ok) {
        throw new Error("Failed to create database functions")
      }

      // Then create the tables
      const tablesResponse = await fetch("/api/database/setup", {
        method: "POST",
      })

      if (!tablesResponse.ok) {
        throw new Error("Failed to create database tables")
      }

      setResult("Database setup completed successfully! You can now proceed to seed the database.")
    } catch (err) {
      console.error("Database setup error:", err)
      setError(err instanceof Error ? err.message : "Unknown error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">Setup Database</h1>
      <div className="bg-black p-6 rounded-lg shadow-md border border-zinc-800">
        <p className="mb-6 text-muted-foreground">
          This page allows you to set up the database schema for your e-commerce website. Click the button below to
          create all necessary tables in your Supabase database.
        </p>

        <div className="space-y-4">
          <Button
            onClick={handleSetupDatabase}
            disabled={isLoading}
            className="bg-gold-DEFAULT hover:bg-gold-dark text-black"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Setting Up Database...
              </>
            ) : (
              "Setup Database"
            )}
          </Button>

          {result && (
            <div className="p-4 bg-green-900/20 border border-green-600 text-green-500 rounded-md">
              {result}
              <div className="mt-4">
                <Button asChild className="bg-gold-DEFAULT hover:bg-gold-dark text-black">
                  <Link href="/admin/seed">Proceed to Seed Database</Link>
                </Button>
              </div>
            </div>
          )}

          {error && <div className="p-4 bg-red-900/20 border border-red-600 text-red-500 rounded-md">{error}</div>}
        </div>
      </div>
    </div>
  )
}
