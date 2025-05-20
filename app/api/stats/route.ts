import { NextResponse } from "next/server"
import { dbService } from "@/lib/db/db-service"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const startDate = searchParams.get("startDate")
    const endDate = searchParams.get("endDate")
    const type = searchParams.get("type")

    if (!startDate || !endDate) {
      return NextResponse.json({ error: "Start date and end date are required" }, { status: 400 })
    }

    if (type === "bookings") {
      const stats = await dbService.getBookingStatistics(startDate, endDate)
      return NextResponse.json(stats)
    } else if (type === "popular-tours") {
      const limit = searchParams.get("limit") ? Number.parseInt(searchParams.get("limit")!) : 5
      const popularTours = await dbService.getPopularTours(limit)
      return NextResponse.json(popularTours)
    } else {
      return NextResponse.json({ error: "Invalid statistics type" }, { status: 400 })
    }
  } catch (error) {
    console.error("Error fetching statistics:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
