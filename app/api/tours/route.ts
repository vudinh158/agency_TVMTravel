import { NextResponse } from "next/server"
import { dbService } from "@/lib/db/db-service"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const destination = searchParams.get("destination")
    const minPrice = searchParams.get("minPrice")
    const maxPrice = searchParams.get("maxPrice")
    const featured = searchParams.get("featured")

    const filters: any = {}

    if (destination) {
      // This is a simplified filter - in a real app you'd use more sophisticated search
      filters.destination = destination
    }

    const tours = await dbService.getTours(filters)

    // Apply additional filters that can't be directly passed to the database
    let filteredTours = tours

    if (minPrice && maxPrice) {
      filteredTours = filteredTours.filter((tour) => tour.price >= Number(minPrice) && tour.price <= Number(maxPrice))
    }

    if (featured === "true") {
      // Assuming tours have a 'featured' property
      filteredTours = filteredTours.filter((tour) => tour.status === "active")
    }

    return NextResponse.json(filteredTours)
  } catch (error) {
    console.error("Error fetching tours:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const tourData = await request.json()

    // Validate required fields
    if (!tourData.name || !tourData.destination || !tourData.price) {
      return NextResponse.json({ error: "Required fields are missing" }, { status: 400 })
    }

    const newTour = await dbService.createTour(tourData)

    return NextResponse.json(newTour, { status: 201 })
  } catch (error) {
    console.error("Error creating tour:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
