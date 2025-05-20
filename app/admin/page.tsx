import type { Metadata } from "next"
import AdminDashboard from "@/components/admin/admin-dashboard"

export const metadata: Metadata = {
  title: "Admin Dashboard - Travel Tours",
  description: "Admin dashboard for managing tours, bookings, and customers",
}

export default function AdminPage() {
  return (
    <main className="container px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Admin Dashboard</h1>
      <AdminDashboard />
    </main>
  )
}
