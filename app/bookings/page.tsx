import type { Metadata } from "next"
import ProfileBookings from "@/components/profile/profile-bookings"

export const metadata: Metadata = {
  title: "My Bookings - Travel Tours",
  description: "View and manage your tour bookings",
}

export default function BookingsPage() {
  return (
    <main className="container px-4 py-12">
      <h1 className="mb-6 text-3xl font-bold">My Bookings</h1>
      <ProfileBookings />
    </main>
  )
}
