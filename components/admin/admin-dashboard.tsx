"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AdminTours from "@/components/admin/admin-tours"
import AdminBookings from "@/components/admin/admin-bookings"
import AdminCustomers from "@/components/admin/admin-customers"
import AdminReviews from "@/components/admin/admin-reviews"
import AdminStats from "@/components/admin/admin-stats"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="mb-8 grid w-full grid-cols-2 md:grid-cols-5">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="tours">Tours</TabsTrigger>
        <TabsTrigger value="bookings">Bookings</TabsTrigger>
        <TabsTrigger value="customers">Customers</TabsTrigger>
        <TabsTrigger value="reviews">Reviews</TabsTrigger>
      </TabsList>

      <TabsContent value="overview">
        <AdminStats />
      </TabsContent>

      <TabsContent value="tours">
        <AdminTours />
      </TabsContent>

      <TabsContent value="bookings">
        <AdminBookings />
      </TabsContent>

      <TabsContent value="customers">
        <AdminCustomers />
      </TabsContent>

      <TabsContent value="reviews">
        <AdminReviews />
      </TabsContent>
    </Tabs>
  )
}
