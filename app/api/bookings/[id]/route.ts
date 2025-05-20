import { NextResponse } from "next/server"
import { dbService } from "@/lib/db/db-service"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const bookingId = params.id
    const booking = await dbService.getBookingById(bookingId)

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 })
    }

    return NextResponse.json(booking)
  } catch (error) {
    console.error(`Error fetching booking ${params.id}:`, error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const bookingId = params.id
    const bookingData = await request.json()

    const booking = await dbService.getBookingById(bookingId)
    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 })
    }

    // Handle cancellation logic
    if (bookingData.status === "cancelled" && booking.status !== "cancelled") {
      // Return seats to the tour's available seats
      const tour = await dbService.getTourById(booking.tourId)
      if (tour) {
        await dbService.updateTour(tour.id, {
          availableSeats: tour.availableSeats + booking.numberOfPeople,
        })
      }
    }

    const updatedBooking = await dbService.updateBooking(bookingId, bookingData)

    return NextResponse.json(updatedBooking)
  } catch (error) {
    console.error(`Error updating booking ${params.id}:`, error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
