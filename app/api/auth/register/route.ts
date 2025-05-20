import { NextResponse } from "next/server"
import { dbService } from "@/lib/db/db-service"

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, password, dateOfBirth, address, phone } = await request.json()

    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json({ error: "Required fields are missing" }, { status: 400 })
    }

    // Check if user already exists
    const existingCustomer = await dbService.getCustomerByEmail(email)
    if (existingCustomer) {
      return NextResponse.json({ error: "Email already in use" }, { status: 409 })
    }

    // Create new customer
    const newCustomer = await dbService.createCustomer({
      firstName,
      lastName,
      email,
      password, // In a real app, you would hash this password
      dateOfBirth: dateOfBirth || "",
      address: address || "",
      phone: phone || "",
    })

    return NextResponse.json({
      success: true,
      user: {
        id: newCustomer.id,
        firstName: newCustomer.firstName,
        lastName: newCustomer.lastName,
        email: newCustomer.email,
      },
    })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
