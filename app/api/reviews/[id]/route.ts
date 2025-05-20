import { NextResponse } from "next/server"
import { dbService } from "@/lib/db/db-service"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const reviewId = params.id
    const review = await dbService.getReviewById(reviewId)

    if (!review) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 })
    }

    return NextResponse.json(review)
  } catch (error) {
    console.error(`Error fetching review ${params.id}:`, error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const reviewId = params.id
    const reviewData = await request.json()

    const updatedReview = await dbService.updateReview(reviewId, reviewData)

    if (!updatedReview) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 })
    }

    return NextResponse.json(updatedReview)
  } catch (error) {
    console.error(`Error updating review ${params.id}:`, error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const reviewId = params.id
    const deleted = await dbService.deleteReview(reviewId)

    if (!deleted) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(`Error deleting review ${params.id}:`, error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
