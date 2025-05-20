import { NextResponse } from "next/server"
import { dbService } from "@/lib/db/db-service"

export async function GET() {
  try {
    const destinations = await dbService.getDestinations()
    return NextResponse.json(destinations)
  } catch (error) {
    console.error("Error fetching destinations:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const destinationData = await request.json()

    // Validate required fields
    if (!destinationData.name || !destinationData.country) {
      return NextResponse.json({ error: "Required fields are missing" }, { status: 400 })
    }

    const newDestination = await dbService.createDestination(destinationData)

    return NextResponse.json(newDestination, { status: 201 })
  } catch (error) {
    console.error("Error creating destination:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
