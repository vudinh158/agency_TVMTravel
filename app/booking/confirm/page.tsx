"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { MapPin, Clock } from "lucide-react"
import { format } from "date-fns"

// This would normally come from an API
const mockTours = [
  {
    id: "1",
    name: "Paris City Tour",
    destination: "Paris, France",
    image: "/placeholder.svg?height=300&width=400",
    duration: "3 days",
    price: 599,
  },
]

export default function BookingConfirmPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const tourId = searchParams.get("tourId")
  const dateParam = searchParams.get("date")
  const guestsParam = searchParams.get("guests")

  const [tour, setTour] = useState<any>(null)
  const [date, setDate] = useState<Date | null>(null)
  const [guests, setGuests] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    specialRequests: "",
    agreeToTerms: false,
  })

  useEffect(() => {
    if (!tourId || !dateParam || !guestsParam) {
      router.push("/tours")
      return
    }

    // Find the tour
    const foundTour = mockTours.find((t) => t.id === tourId)
    if (!foundTour) {
      router.push("/tours")
      return
    }

    setTour(foundTour)
    setDate(new Date(dateParam))
    setGuests(Number.parseInt(guestsParam))
  }, [tourId, dateParam, guestsParam, router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData({
      ...formData,
      agreeToTerms: checked,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.agreeToTerms) {
      alert("Please agree to the terms and conditions")
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      router.push(`/booking/success?bookingId=${Date.now()}`)
    }, 1500)
  }

  if (!tour || !date) {
    return <div className="container py-12 text-center">Loading...</div>
  }

  const totalPrice = tour.price * guests

  return (
    <main className="container px-4 py-12">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Confirm Your Booking</h1>
        <p className="text-muted-foreground">Please review your booking details and provide your information</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
        <div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-semibold">Personal Information</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" name="address" value={formData.address} onChange={handleInputChange} />
                </div>
              </div>
            </div>

            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-semibold">Special Requests</h2>
              <div className="space-y-2">
                <Label htmlFor="specialRequests">Special Requests (optional)</Label>
                <Input
                  id="specialRequests"
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleInputChange}
                />
                <p className="text-xs text-muted-foreground">
                  Please let us know if you have any special requirements or requests.
                </p>
              </div>
            </div>

            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-semibold">Terms and Conditions</h2>
              <div className="space-y-4">
                <div className="rounded-lg bg-muted p-4 text-sm">
                  <p className="mb-2">By booking this tour, you agree to the following terms:</p>
                  <ul className="list-inside list-disc space-y-1">
                    <li>Cancellations made 7+ days before the tour receive a full refund.</li>
                    <li>Cancellations made 3-6 days before the tour receive a 50% refund.</li>
                    <li>Cancellations made less than 3 days before the tour are non-refundable.</li>
                    <li>The tour operator reserves the right to modify the itinerary if necessary.</li>
                  </ul>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={handleCheckboxChange}
                    required
                  />
                  <Label htmlFor="agreeToTerms">I agree to the terms and conditions *</Label>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <Button type="button" variant="outline" asChild>
                <Link href={`/tours/${tourId}`}>Back to Tour</Link>
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Processing..." : "Complete Booking"}
              </Button>
            </div>
          </form>
        </div>

        <div className="lg:sticky lg:top-20">
          <Card>
            <div className="relative h-48 w-full">
              <Image src={tour.image || "/placeholder.svg"} alt={tour.name} fill className="object-cover" />
            </div>
            <CardContent className="p-4">
              <h3 className="mb-2 text-xl font-semibold">{tour.name}</h3>
              <div className="mb-2 flex items-center text-muted-foreground">
                <MapPin className="mr-1 h-4 w-4" />
                <span className="text-sm">{tour.destination}</span>
              </div>
              <div className="mb-4 flex items-center text-sm">
                <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                <span>{tour.duration}</span>
              </div>

              <div className="mb-4 space-y-2 rounded-lg bg-muted p-3">
                <div className="flex items-center justify-between">
                  <span>Date:</span>
                  <span className="font-medium">{format(date, "PPP")}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Guests:</span>
                  <span className="font-medium">{guests}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t p-4">
              <div className="w-full space-y-2">
                <div className="flex items-center justify-between">
                  <span>Price per person</span>
                  <span>${tour.price}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Number of guests</span>
                  <span>x {guests}</span>
                </div>
                <div className="flex items-center justify-between border-t pt-2">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-lg font-semibold">${totalPrice}</span>
                </div>
              </div>
            </CardFooter>
          </Card>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            No payment required now. You'll pay when you arrive.
          </p>
        </div>
      </div>
    </main>
  )
}
