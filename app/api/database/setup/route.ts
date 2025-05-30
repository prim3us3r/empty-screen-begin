import { NextResponse } from "next/server"
import { getServerClient } from "@/lib/supabase"

export async function POST() {
  try {
    const supabase = getServerClient()

    // Helper function to check if a table exists
    async function tableExists(tableName: string): Promise<boolean> {
      try {
        const { error } = await supabase.from(tableName).select("*", { count: "exact", head: true })
        return !error
      } catch (error) {
        return false
      }
    }

    // Helper function to create a table if it doesn't exist
    async function createTableIfNotExists(tableName: string, createTableSQL: string) {
      const exists = await tableExists(tableName)
      if (!exists) {
        await supabase.query(createTableSQL)
        return `Created table: ${tableName}`
      }
      return `Table already exists: ${tableName}`
    }

    // Create categories table
    await createTableIfNotExists(
      "categories",
      `
      CREATE TABLE categories (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL UNIQUE,
        description TEXT,
        image_url VARCHAR(255),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `,
    )

    // Create products table
    await createTableIfNotExists(
      "products",
      `
      CREATE TABLE products (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL UNIQUE,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL,
        price_usd DECIMAL(10, 2) NOT NULL,
        weight DECIMAL(10, 2) NOT NULL,
        purity VARCHAR(50) NOT NULL,
        dimensions VARCHAR(100),
        image_url VARCHAR(255) NOT NULL,
        thumbnail_url VARCHAR(255),
        category_id UUID NOT NULL,
        featured BOOLEAN DEFAULT false,
        in_stock BOOLEAN DEFAULT true,
        has_certificate BOOLEAN DEFAULT false,
        serial_number VARCHAR(100),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `,
    )

    // Create product_images table
    await createTableIfNotExists(
      "product_images",
      `
      CREATE TABLE product_images (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        product_id UUID NOT NULL,
        image_url VARCHAR(255) NOT NULL,
        alt_text VARCHAR(255),
        display_order INTEGER DEFAULT 0,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `,
    )

    // Create gold_prices table
    await createTableIfNotExists(
      "gold_prices",
      `
      CREATE TABLE gold_prices (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        price_usd DECIMAL(10, 2) NOT NULL,
        price_myr_per_gram DECIMAL(10, 2) NOT NULL,
        timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        source VARCHAR(50) DEFAULT 'system'
      )
    `,
    )

    // Create users table
    await createTableIfNotExists(
      "users",
      `
      CREATE TABLE users (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        email VARCHAR(255) NOT NULL UNIQUE,
        first_name VARCHAR(100),
        last_name VARCHAR(100),
        phone VARCHAR(50),
        auth_id VARCHAR(255),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `,
    )

    // Create addresses table
    await createTableIfNotExists(
      "addresses",
      `
      CREATE TABLE addresses (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        user_id UUID NOT NULL,
        address_line1 VARCHAR(255) NOT NULL,
        address_line2 VARCHAR(255),
        city VARCHAR(100) NOT NULL,
        state VARCHAR(100) NOT NULL,
        postal_code VARCHAR(20) NOT NULL,
        country VARCHAR(100) NOT NULL,
        is_default BOOLEAN DEFAULT false,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `,
    )

    // Create orders table
    await createTableIfNotExists(
      "orders",
      `
      CREATE TABLE orders (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        user_id UUID NOT NULL,
        order_number VARCHAR(50) NOT NULL UNIQUE,
        status VARCHAR(50) NOT NULL DEFAULT 'pending',
        subtotal DECIMAL(10, 2) NOT NULL,
        shipping_fee DECIMAL(10, 2) NOT NULL DEFAULT 0,
        tax DECIMAL(10, 2) NOT NULL DEFAULT 0,
        total DECIMAL(10, 2) NOT NULL,
        shipping_address_id UUID NOT NULL,
        billing_address_id UUID NOT NULL,
        payment_method VARCHAR(50),
        payment_id VARCHAR(255),
        payment_status VARCHAR(50) DEFAULT 'pending',
        notes TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `,
    )

    // Create order_items table
    await createTableIfNotExists(
      "order_items",
      `
      CREATE TABLE order_items (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        order_id UUID NOT NULL,
        product_id UUID NOT NULL,
        quantity INTEGER NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        total DECIMAL(10, 2) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `,
    )

    // Make sure uuid-ossp extension is available
    await supabase.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`)

    return NextResponse.json({ success: true, message: "Database tables created successfully" })
  } catch (error) {
    console.error("Error creating database tables:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to create database tables",
      },
      { status: 500 },
    )
  }
}
