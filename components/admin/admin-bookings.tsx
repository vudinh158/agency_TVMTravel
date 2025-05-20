"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MoreHorizontal, Search, Eye, CheckCircle, XCircle } from "lucide-react"
import { format } from "date-fns"
import { useToast } from "@/hooks/use-toast"

// Mock data for bookings
const mockBookings = [
  {
    id: "B12345",
    customerName: "John Doe",
    customerEmail: "john.doe@example.com",
    tourName: "Paris City Tour",
    bookingDate: "2023-05-20",
    startDate: "2023-07-15",
    endDate: "2023-07-18",
    guests: 2,
    totalPrice: 1198,
    status: "pending",
  },
  {
    id: "B12346",
    customerName: "Jane Smith",
    customerEmail: "jane.smith@example.com",
    tourName: "Bali Paradise",
    bookingDate: "2023-04-05",
    startDate: "2023-06-10",
    endDate: "2023-06-17",
    guests: 2,
    totalPrice: 2198,
    status: "confirmed",
  },
  {
    id: "B12347",
    customerName: "Michael Johnson",
    customerEmail: "michael.j@example.com",
    tourName: "Tokyo Adventure",
    bookingDate: "2023-03-15",
    startDate: "2023-05-05",
    endDate: "2023-05-10",
    guests: 1,
    totalPrice: 899,
    status: "completed",
  },
  {
    id: "B12348",
    customerName: "Emily Wilson",
    customerEmail: "emily.w@example.com",
    tourName: "New York Explorer",
    bookingDate: "2023-06-01",
    startDate: "2023-08-20",
    endDate: "2023-08-24",
    guests: 3,
    totalPrice: 2097,
    status: "confirmed",
  },
  {
    id: "B12349",
    customerName: "Robert Brown",
    customerEmail: "robert.b@example.com",
    tourName: "Rome Historical Tour",
    bookingDate: "2023-02-15",
    startDate: "2023-04-10",
    endDate: "2023-04-14",
    guests: 2,
    totalPrice: 1498,
    status: "cancelled",
  },
  {
    id: "B12350",
    customerName: "Sarah Davis",
    customerEmail: "sarah.d@example.com",
    tourName: "Sydney Highlights",
    bookingDate: "2023-06-05",
    startDate: "2023-09-15",
    endDate: "2023-09-20",
    guests: 2,
    totalPrice: 2598,
    status: "pending",
  },
]

export default function AdminBookings() {
  const { toast } = useToast()
  const [bookings, setBookings] = useState(mockBookings)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.customerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.tourName.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || booking.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleConfirmBooking = (bookingId: string) => {
    setBookings(
      bookings.map((booking) =>
        booking.id === bookingId
          ? {
              ...booking,
              status: "confirmed",
            }
          : booking,
      ),
    )
    toast({
      title: "Booking confirmed",
      description: `Booking ${bookingId} has been confirmed.`,
    })
  }

  const handleCancelBooking = (bookingId: string) => {
    if (confirm("Are you sure you want to cancel this booking?")) {
      setBookings(
        bookings.map((booking) =>
          booking.id === bookingId
            ? {
                ...booking,
                status: "cancelled",
              }
            : booking,
        ),
      )
      toast({
        title: "Booking cancelled",
        description: `Booking ${bookingId} has been cancelled.`,
      })
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col justify-between gap-4 sm:flex-row">
        <div className="flex flex-1 gap-4">
          <div className="relative max-w-sm flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search bookings..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button>Export Bookings</Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Booking ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Tour</TableHead>
              <TableHead>Dates</TableHead>
              <TableHead>Guests</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBookings.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  No bookings found.
                </TableCell>
              </TableRow>
            ) : (
              filteredBookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell className="font-medium">{booking.id}</TableCell>
                  <TableCell>
                    <div>
                      <div>{booking.customerName}</div>
                      <div className="text-sm text-muted-foreground">{booking.customerEmail}</div>
                    </div>
                  </TableCell>
                  <TableCell>{booking.tourName}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {format(new Date(booking.startDate), "MMM d")} -{" "}
                      {format(new Date(booking.endDate), "MMM d, yyyy")}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Booked: {format(new Date(booking.bookingDate), "MMM d, yyyy")}
                    </div>
                  </TableCell>
                  <TableCell>{booking.guests}</TableCell>
                  <TableCell>${booking.totalPrice}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        booking.status === "confirmed"
                          ? "default"
                          : booking.status === "completed"
                            ? "outline"
                            : booking.status === "pending"
                              ? "secondary"
                              : "destructive"
                      }
                    >
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        {booking.status === "pending" && (
                          <DropdownMenuItem onClick={() => handleConfirmBooking(booking.id)}>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Confirm Booking
                          </DropdownMenuItem>
                        )}
                        {(booking.status === "pending" || booking.status === "confirmed") && (
                          <DropdownMenuItem onClick={() => handleCancelBooking(booking.id)}>
                            <XCircle className="mr-2 h-4 w-4" />
                            Cancel Booking
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
