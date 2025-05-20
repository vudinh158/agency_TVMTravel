import { NextResponse } from "next/server"
import { dbService } from "@/lib/db/db-service"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const tourId = params.id
    const tour = await dbService.getTourById(tourId)

    if (!tour) {
      return NextResponse.json({ error: "Tour not found" }, { status: 404 })
    }

    return NextResponse.json(tour)
  } catch (error) {
    console.error(`Error fetching tour ${params.id}:`, error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const tourId = params.id
    const tourData = await request.json()

    const updatedTour = await dbService.updateTour(tourId, tourData)

    if (!updatedTour) {
      return NextResponse.json({ error: "Tour not found" }, { status: 404 })
    }

    return NextResponse.json(updatedTour)
  } catch (error) {
    console.error(`Error updating tour ${params.id}:`, error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const tourId = params.id
    const deleted = await dbService.deleteTour(tourId)

    if (!deleted) {
      return NextResponse.json({ error: "Tour not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(`Error deleting tour ${params.id}:`, error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
