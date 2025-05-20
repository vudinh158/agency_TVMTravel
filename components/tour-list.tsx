"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, MapPin, Clock, Users } from "lucide-react"

// This would normally come from an API
const mockTours = [
  {
    id: 1,
    name: "Paris City Tour",
    destination: "Paris, France",
    region: "Europe",
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
    region: "Asia",
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
    region: "North America",
    image: "/placeholder.svg?height=300&width=400",
    duration: "4 days",
    groupSize: "12 people",
    price: 699,
    rating: 4.7,
    reviewCount: 156,
    featured: false,
  },
  {
    id: 4,
    name: "Bali Paradise",
    destination: "Bali, Indonesia",
    region: "Asia",
    image: "/placeholder.svg?height=300&width=400",
    duration: "7 days",
    groupSize: "10 people",
    price: 1099,
    rating: 4.9,
    reviewCount: 203,
    featured: true,
  },
  {
    id: 5,
    name: "Rome Historical Tour",
    destination: "Rome, Italy",
    region: "Europe",
    image: "/placeholder.svg?height=300&width=400",
    duration: "4 days",
    groupSize: "15 people",
    price: 749,
    rating: 4.6,
    reviewCount: 178,
    featured: false,
  },
  {
    id: 6,
    name: "Sydney Highlights",
    destination: "Sydney, Australia",
    region: "Australia",
    image: "/placeholder.svg?height=300&width=400",
    duration: "5 days",
    groupSize: "12 people",
    price: 1299,
    rating: 4.8,
    reviewCount: 92,
    featured: false,
  },
  {
    id: 7,
    name: "Cairo Pyramids Explorer",
    destination: "Cairo, Egypt",
    region: "Africa",
    image: "/placeholder.svg?height=300&width=400",
    duration: "6 days",
    groupSize: "10 people",
    price: 899,
    rating: 4.7,
    reviewCount: 145,
    featured: false,
  },
  {
    id: 8,
    name: "Rio Carnival Experience",
    destination: "Rio de Janeiro, Brazil",
    region: "South America",
    image: "/placeholder.svg?height=300&width=400",
    duration: "8 days",
    groupSize: "20 people",
    price: 1499,
    rating: 4.9,
    reviewCount: 87,
    featured: false,
  },
]

export default function TourList() {
  const searchParams = useSearchParams()
  const [tours, setTours] = useState(mockTours)
  const [sortBy, setSortBy] = useState("recommended")
  const [filteredTours, setFilteredTours] = useState(tours)

  // Apply filters based on search params
  useEffect(() => {
    let filtered = [...tours]

    const minPrice = searchParams.get("minPrice")
    const maxPrice = searchParams.get("maxPrice")
    const duration = searchParams.get("duration")
    const destinations = searchParams.get("destinations")
    const destination = searchParams.get("destination")

    if (minPrice && maxPrice) {
      filtered = filtered.filter(
        (tour) => tour.price >= Number.parseInt(minPrice) && tour.price <= Number.parseInt(maxPrice),
      )
    }

    if (duration) {
      const durationFilters = duration.split(",")
      filtered = filtered.filter((tour) => {
        const days = Number.parseInt(tour.duration.split(" ")[0])

        return durationFilters.some((filter) => {
          if (filter === "1-3 days") return days >= 1 && days <= 3
          if (filter === "4-6 days") return days >= 4 && days <= 6
          if (filter === "7-9 days") return days >= 7 && days <= 9
          if (filter === "10+ days") return days >= 10
          return false
        })
      })
    }

    if (destinations) {
      const regionFilters = destinations.split(",")
      filtered = filtered.filter((tour) => regionFilters.includes(tour.region))
    }

    if (destination) {
      filtered = filtered.filter((tour) => tour.destination.toLowerCase().includes(destination.toLowerCase()))
    }

    // Apply sorting
    if (sortBy === "price-low") {
      filtered.sort((a, b) => a.price - b.price)
    } else if (sortBy === "price-high") {
      filtered.sort((a, b) => b.price - a.price)
    } else if (sortBy === "rating") {
      filtered.sort((a, b) => b.rating - a.rating)
    }

    setFilteredTours(filtered)
  }, [searchParams, sortBy]) // Remove 'tours' from dependencies

  const handleSortChange = (value: string) => {
    setSortBy(value)
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <p className="text-muted-foreground">Showing {filteredTours.length} tours</p>
        <div className="flex items-center gap-2">
          <span className="text-sm">Sort by:</span>
          <Select value={sortBy} onValueChange={handleSortChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recommended">Recommended</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredTours.length === 0 ? (
        <div className="rounded-lg border p-8 text-center">
          <h3 className="mb-2 text-lg font-semibold">No tours found</h3>
          <p className="mb-4 text-muted-foreground">
            Try adjusting your filters to find tours that match your preferences.
          </p>
          <Button variant="outline" asChild>
            <Link href="/tours">Reset Filters</Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTours.map((tour) => (
            <Link href={`/tours/${tour.id}`} key={tour.id}>
              <Card className="h-full overflow-hidden transition-all hover:shadow-md">
                <div className="relative h-48 w-full">
                  <Image src={tour.image || "/placeholder.svg"} alt={tour.name} fill className="object-cover" />
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
                  <Button size="sm">View Details</Button>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
