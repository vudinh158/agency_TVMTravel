"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export default function BookingSuccessPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const bookingId = searchParams.get("bookingId")

  const [countdown, setCountdown] = useState(10)

  useEffect(() => {
    if (!bookingId) {
      router.push("/tours")
      return
    }

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          router.push("/")
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [bookingId, router])

  if (!bookingId) {
    return null
  }

  return (
    <main className="container flex min-h-[70vh] flex-col items-center justify-center px-4 py-12 text-center">
      <div className="mx-auto max-w-md rounded-lg border bg-card p-8 shadow-sm">
        <div className="mb-6 flex justify-center">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        <h1 className="mb-2 text-3xl font-bold">Booking Confirmed!</h1>
        <p className="mb-6 text-muted-foreground">
          Your booking has been successfully confirmed. Your booking reference is:
        </p>
        <div className="mb-6 rounded-lg bg-muted p-3 text-center">
          <span className="text-xl font-bold">{bookingId}</span>
        </div>
        <p className="mb-8 text-muted-foreground">
          We've sent a confirmation email with all the details of your booking. Please check your inbox (and spam
          folder) for the email.
        </p>
        <div className="space-y-3">
          <Button asChild className="w-full">
            <Link href="/bookings">View My Bookings</Link>
          </Button>
          <Button variant="outline" asChild className="w-full">
            <Link href="/">Return to Home</Link>
          </Button>
        </div>
        <p className="mt-6 text-sm text-muted-foreground">Redirecting to home page in {countdown} seconds...</p>
      </div>
    </main>
  )
}
