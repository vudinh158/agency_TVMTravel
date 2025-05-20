import { NextResponse } from "next/server"
import { dbService } from "@/lib/db/db-service"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Check if user exists in customer database
    const customer = await dbService.getCustomerByEmail(email)
    if (customer && customer.password === password) {
      // In a real app, you would use proper password hashing and JWT tokens
      return NextResponse.json({
        success: true,
        user: {
          id: customer.id,
          firstName: customer.firstName,
          lastName: customer.lastName,
          email: customer.email,
          role: "customer",
        },
      })
    }

    // Check if user exists in admin database
    const admin = await dbService.getAdminByEmail(email)
    if (admin && admin.password === password) {
      return NextResponse.json({
        success: true,
        user: {
          id: admin.id,
          firstName: admin.firstName,
          lastName: admin.lastName,
          email: admin.email,
          role: admin.role,
        },
      })
    }

    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
