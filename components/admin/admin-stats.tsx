"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Calendar, DollarSign, TrendingUp, ChevronUp } from "lucide-react"
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

// Mock data for charts
const revenueData = [
  { month: "Jan", revenue: 12500 },
  { month: "Feb", revenue: 18200 },
  { month: "Mar", revenue: 22800 },
  { month: "Apr", revenue: 19500 },
  { month: "May", revenue: 24600 },
  { month: "Jun", revenue: 29800 },
  { month: "Jul", revenue: 35200 },
  { month: "Aug", revenue: 32100 },
  { month: "Sep", revenue: 28400 },
  { month: "Oct", revenue: 25700 },
  { month: "Nov", revenue: 31900 },
  { month: "Dec", revenue: 38500 },
]

const bookingsData = [
  { month: "Jan", bookings: 45 },
  { month: "Feb", bookings: 62 },
  { month: "Mar", bookings: 78 },
  { month: "Apr", bookings: 71 },
  { month: "May", bookings: 85 },
  { month: "Jun", bookings: 103 },
  { month: "Jul", bookings: 121 },
  { month: "Aug", bookings: 114 },
  { month: "Sep", bookings: 96 },
  { month: "Oct", bookings: 88 },
  { month: "Nov", bookings: 109 },
  { month: "Dec", bookings: 132 },
]

const popularToursData = [
  { name: "Paris City Tour", bookings: 245 },
  { name: "Tokyo Adventure", bookings: 187 },
  { name: "New York Explorer", bookings: 156 },
  { name: "Bali Paradise", bookings: 203 },
  { name: "Rome Historical Tour", bookings: 178 },
]

export default function AdminStats() {
  const [dateRange, setDateRange] = useState("year")

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$299,800</div>
            <p className="text-xs text-muted-foreground">+20.1% from last year</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,204</div>
            <p className="text-xs text-muted-foreground">+12.5% from last year</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">892</div>
            <p className="text-xs text-muted-foreground">+18.2% from last year</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24.8%</div>
            <p className="text-xs text-muted-foreground">+5.2% from last year</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Revenue Overview</CardTitle>
              <Tabs defaultValue="year" value={dateRange} onValueChange={setDateRange}>
                <TabsList>
                  <TabsTrigger value="month">Month</TabsTrigger>
                  <TabsTrigger value="quarter">Quarter</TabsTrigger>
                  <TabsTrigger value="year">Year</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Bookings Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={bookingsData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="bookings" fill="#8884d8" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Most Popular Tours</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {popularToursData.map((tour, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    {index + 1}
                  </div>
                  <div>{tour.name}</div>
                </div>
                <div className="flex items-center">
                  <div className="mr-2 font-medium">{tour.bookings} bookings</div>
                  <div className="flex items-center text-green-500">
                    <ChevronUp className="h-4 w-4" />
                    <span className="text-xs">12%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
