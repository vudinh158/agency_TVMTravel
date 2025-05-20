import { NextResponse } from "next/server"
import { dbService } from "@/lib/db/db-service"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const customerId = searchParams.get("customerId")
    const tourId = searchParams.get("tourId")

    let bookings

    if (customerId) {
      bookings = await dbService.getBookingsByCustomerId(customerId)
    } else if (tourId) {
      bookings = await dbService.getBookingsByTourId(tourId)
    } else {
      // In a real app, you'd add authentication and authorization here
      // to ensure only admins can see all bookings
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
    }

    return NextResponse.json(bookings)
  } catch (error) {
    console.error("Error fetching bookings:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const bookingData = await request.json()

    // Validate required fields
    if (!bookingData.customerId || !bookingData.tourId || !bookingData.numberOfPeople) {
      return NextResponse.json({ error: "Required fields are missing" }, { status: 400 })
    }

    // Check if tour exists and has available seats
    const tour = await dbService.getTourById(bookingData.tourId)
    if (!tour) {
      return NextResponse.json({ error: "Tour not found" }, { status: 404 })
    }

    if (tour.availableSeats < bookingData.numberOfPeople) {
      return NextResponse.json({ error: "Not enough available seats" }, { status: 400 })
    }

    // Create booking
    const newBooking = await dbService.createBooking({
      ...bookingData,
      bookingDate: new Date().toISOString(),
      status: "pending",
      paymentStatus: "unpaid",
    })

    // Update tour available seats
    await dbService.updateTour(tour.id, {
      availableSeats: tour.availableSeats - bookingData.numberOfPeople,
    })

    return NextResponse.json(newBooking, { status: 201 })
  } catch (error) {
    console.error("Error creating booking:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
