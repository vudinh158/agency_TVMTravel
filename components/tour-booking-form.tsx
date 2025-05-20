"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"

type TourBookingFormProps = {
  tour: any
}

export default function TourBookingForm({ tour }: TourBookingFormProps) {
  const router = useRouter()
  const [date, setDate] = useState<Date | undefined>(new Date(tour.startDate))
  const [guests, setGuests] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const totalPrice = tour.price * guests

  const handleGuestsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value)
    if (value > 0 && value <= tour.availableSeats) {
      setGuests(value)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      router.push(`/booking/confirm?tourId=${tour.id}&date=${date?.toISOString()}&guests=${guests}`)
    }, 1000)
  }

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <span className="text-2xl font-bold">${tour.price}</span>
          <span className="text-muted-foreground"> / person</span>
        </div>
        <div className="flex items-center">
          <span className="mr-1 text-lg font-medium">{tour.rating}</span>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(tour.rating) ? "fill-primary text-primary" : "fill-muted text-muted"
                }`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            ))}
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="date">Select Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                disabled={(date) => date < new Date(tour.startDate) || date > new Date(tour.endDate)}
              />
            </PopoverContent>
          </Popover>
          <p className="text-xs text-muted-foreground">
            Available from {format(new Date(tour.startDate), "PPP")} to {format(new Date(tour.endDate), "PPP")}
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="guests">Number of Guests</Label>
          <Input
            id="guests"
            type="number"
            min={1}
            max={tour.availableSeats}
            value={guests}
            onChange={handleGuestsChange}
          />
          <p className="text-xs text-muted-foreground">{tour.availableSeats} seats available</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between border-t pt-4">
            <span>Price per person</span>
            <span>${tour.price}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Number of guests</span>
            <span>x {guests}</span>
          </div>
          <div className="flex items-center justify-between border-t pt-4">
            <span className="text-lg font-semibold">Total</span>
            <span className="text-lg font-semibold">${totalPrice}</span>
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Processing..." : "Book Now"}
        </Button>
      </form>

      <p className="mt-4 text-center text-xs text-muted-foreground">
        No payment required now. You'll pay when you arrive.
      </p>
    </div>
  )
}
