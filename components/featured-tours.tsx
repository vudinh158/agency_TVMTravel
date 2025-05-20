"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Clock, Users } from "lucide-react"

// This would normally come from an API
const mockTours = [
  {
    id: 1,
    name: "Paris City Tour",
    destination: "Paris, France",
    image: "/placeholder.svg?height=300&width=400",
    duration: "3 days",
    groupSize: "10 people",
    price: 599,
    rating: 4.8,
    reviewCount: 124,
    featured: true,
  },
  {
    id: 2,
    name: "Tokyo Adventure",
    destination: "Tokyo, Japan",
    image: "/placeholder.svg?height=300&width=400",
    duration: "5 days",
    groupSize: "8 people",
    price: 899,
    rating: 4.9,
    reviewCount: 89,
    featured: true,
  },
  {
    id: 3,
    name: "New York Explorer",
    destination: "New York, USA",
    image: "/placeholder.svg?height=300&width=400",
    duration: "4 days",
    groupSize: "12 people",
    price: 699,
    rating: 4.7,
    reviewCount: 156,
    featured: true,
  },
  {
    id: 4,
    name: "Bali Paradise",
    destination: "Bali, Indonesia",
    image: "/placeholder.svg?height=300&width=400",
    duration: "7 days",
    groupSize: "10 people",
    price: 1099,
    rating: 4.9,
    reviewCount: 203,
    featured: true,
  },
]

export default function FeaturedTours() {
  const [tours, setTours] = useState(mockTours)

  // In a real app, you would fetch tours from an API
  useEffect(() => {
    // Simulating API call
    // const fetchTours = async () => {
    //   const response = await fetch('/api/tours?featured=true')
    //   const data = await response.json()
    //   setTours(data)
    // }
    // fetchTours()
  }, [])

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {tours.map((tour) => (
        <Link href={`/tours/${tour.id}`} key={tour.id}>
          <Card className="h-full overflow-hidden transition-all hover:shadow-md">
            <div className="relative h-48 w-full">
              <Image src={tour.image || "/placeholder.svg"} alt={tour.name} fill className="object-cover" />
              <Badge className="absolute right-2 top-2 bg-primary">Featured</Badge>
            </div>
            <CardContent className="p-4">
              <h3 className="mb-2 text-xl font-semibold">{tour.name}</h3>
              <div className="mb-2 flex items-center text-muted-foreground">
                <MapPin className="mr-1 h-4 w-4" />
                <span className="text-sm">{tour.destination}</span>
              </div>
              <div className="mb-4 flex flex-wrap gap-3 text-sm">
                <div className="flex items-center">
                  <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                  <span>{tour.duration}</span>
                </div>
                <div className="flex items-center">
                  <Users className="mr-1 h-4 w-4 text-muted-foreground" />
                  <span>{tour.groupSize}</span>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex items-center">
                  <Star className="mr-1 h-4 w-4 fill-primary text-primary" />
                  <span className="font-medium">{tour.rating}</span>
                </div>
                <span className="ml-1 text-sm text-muted-foreground">({tour.reviewCount} reviews)</span>
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between border-t bg-muted/50 p-4">
              <div>
                <span className="text-xl font-bold">${tour.price}</span>
                <span className="text-sm text-muted-foreground"> / person</span>
              </div>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  )
}
