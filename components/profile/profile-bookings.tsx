"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Calendar, Users, ExternalLink } from "lucide-react"
import { format } from "date-fns"
import { useToast } from "@/hooks/use-toast"

// Mock bookings data
const mockBookings = [
  {
    id: "B12345",
    tourId: "1",
    tourName: "Paris City Tour",
    destination: "Paris, France",
    image: "/placeholder.svg?height=300&width=400",
    startDate: "2023-07-15",
    endDate: "2023-07-18",
    guests: 2,
    totalPrice: 1198,
    status: "upcoming",
    bookingDate: "2023-05-20",
  },
  {
    id: "B12346",
    tourId: "4",
    tourName: "Bali Paradise",
    destination: "Bali, Indonesia",
    image: "/placeholder.svg?height=300&width=400",
    startDate: "2023-06-10",
    endDate: "2023-06-17",
    guests: 2,
    totalPrice: 2198,
    status: "completed",
    bookingDate: "2023-04-05",
    hasReviewed: false,
  },
  {
    id: "B12347",
    tourId: "2",
    tourName: "Tokyo Adventure",
    destination: "Tokyo, Japan",
    image: "/placeholder.svg?height=300&width=400",
    startDate: "2023-05-05",
    endDate: "2023-05-10",
    guests: 1,
    totalPrice: 899,
    status: "completed",
    bookingDate: "2023-03-15",
    hasReviewed: true,
  },
  {
    id: "B12348",
    tourId: "3",
    tourName: "New York Explorer",
    destination: "New York, USA",
    image: "/placeholder.svg?height=300&width=400",
    startDate: "2023-08-20",
    endDate: "2023-08-24",
    guests: 3,
    totalPrice: 2097,
    status: "upcoming",
    bookingDate: "2023-06-01",
  },
  {
    id: "B12349",
    tourId: "5",
    tourName: "Rome Historical Tour",
    destination: "Rome, Italy",
    image: "/placeholder.svg?height=300&width=400",
    startDate: "2023-04-10",
    endDate: "2023-04-14",
    guests: 2,
    totalPrice: 1498,
    status: "cancelled",
    bookingDate: "2023-02-15",
    cancellationDate: "2023-03-01",
    refundAmount: 1348,
  },
]

export default function ProfileBookings() {
  const { toast } = useToast()
  const [bookings, setBookings] = useState(mockBookings)
  const [activeTab, setActiveTab] = useState("all")

  const filteredBookings = bookings.filter((booking) => {
    if (activeTab === "all") return true
    return booking.status === activeTab
  })

  const handleCancelBooking = (bookingId: string) => {
    if (confirm("Are you sure you want to cancel this booking? Cancellation fees may apply.")) {
      // Simulate API call
      setTimeout(() => {
        setBookings(
          bookings.map((booking) =>
            booking.id === bookingId
              ? {
                  ...booking,
                  status: "cancelled",
                  cancellationDate: new Date().toISOString().split("T")[0],
                  refundAmount: Math.floor(booking.totalPrice * 0.9),
                }
              : booking,
          ),
        )
        toast({
          title: "Booking cancelled",
          description: "Your booking has been cancelled successfully.",
        })
      }, 500)
    }
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Bookings</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>
      </Tabs>

      {filteredBookings.length === 0 ? (
        <div className="rounded-lg border p-8 text-center">
          <h3 className="mb-2 text-lg font-semibold">No bookings found</h3>
          <p className="mb-4 text-muted-foreground">You don't have any {activeTab} bookings.</p>
          <Button asChild>
            <Link href="/tours">Browse Tours</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <Card key={booking.id} className="overflow-hidden">
              <div className="grid md:grid-cols-[250px_1fr]">
                <div className="relative h-48 md:h-full">
                  <Image
                    src={booking.image || "/placeholder.svg"}
                    alt={booking.tourName}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="mb-4 flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="text-xl font-semibold">{booking.tourName}</h3>
                      <div className="mb-2 flex items-center text-muted-foreground">
                        <MapPin className="mr-1 h-4 w-4" />
                        <span>{booking.destination}</span>
                      </div>
                    </div>
                    <Badge
                      variant={
                        booking.status === "upcoming"
                          ? "default"
                          : booking.status === "completed"
                            ? "outline"
                            : "destructive"
                      }
                    >
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </Badge>
                  </div>

                  <div className="mb-4 grid gap-2 sm:grid-cols-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Booking ID</p>
                      <p className="font-medium">{booking.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Booking Date</p>
                      <p className="font-medium">{format(new Date(booking.bookingDate), "MMM d, yyyy")}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Price</p>
                      <p className="font-medium">${booking.totalPrice}</p>
                    </div>
                  </div>

                  <div className="mb-6 grid gap-2 sm:grid-cols-3">
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm">
                          {format(new Date(booking.startDate), "MMM d")} -{" "}
                          {format(new Date(booking.endDate), "MMM d, yyyy")}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                      <p className="text-sm">{booking.guests} guests</p>
                    </div>
                  </div>

                  {booking.status === "cancelled" && (
                    <div className="mb-4 rounded-md bg-muted p-3 text-sm">
                      <p>
                        Cancelled on {format(new Date(booking.cancellationDate!), "MMM d, yyyy")}. Refund amount: $
                        {booking.refundAmount}
                      </p>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/tours/${booking.tourId}`}>
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View Tour
                      </Link>
                    </Button>

                    {booking.status === "upcoming" && (
                      <Button variant="destructive" size="sm" onClick={() => handleCancelBooking(booking.id)}>
                        Cancel Booking
                      </Button>
                    )}

                    {booking.status === "completed" && !booking.hasReviewed && (
                      <Button size="sm" asChild>
                        <Link href={`/tours/${booking.tourId}?review=true`}>Write a Review</Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
