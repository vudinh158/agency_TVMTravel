import { NextResponse } from "next/server"
import { dbService } from "@/lib/db/db-service"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const tourId = searchParams.get("tourId")
    const customerId = searchParams.get("customerId")

    let reviews

    if (tourId) {
      reviews = await dbService.getReviewsByTourId(tourId)
    } else if (customerId) {
      reviews = await dbService.getReviewsByCustomerId(customerId)
    } else {
      // In a real app, you'd add authentication and authorization here
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
    }

    return NextResponse.json(reviews)
  } catch (error) {
    console.error("Error fetching reviews:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const reviewData = await request.json()

    // Validate required fields
    if (!reviewData.customerId || !reviewData.tourId || !reviewData.rating || !reviewData.comment) {
      return NextResponse.json({ error: "Required fields are missing" }, { status: 400 })
    }

    // Create review
    const newReview = await dbService.createReview({
      ...reviewData,
      reviewDate: new Date().toISOString(),
      status: "pending", // Reviews need admin approval
    })

    return NextResponse.json(newReview, { status: 201 })
  } catch (error) {
    console.error("Error creating review:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
