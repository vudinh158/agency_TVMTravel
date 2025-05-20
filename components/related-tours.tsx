"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, MapPin, Clock } from "lucide-react"

// This would normally come from an API
const mockTours = [
  {
    id: "1",
    name: "Paris City Tour",
    destination: "Paris, France",
    region: "Europe",
    image: "/placeholder.svg?height=300&width=400",
    duration: "3 days",
    price: 599,
    rating: 4.8,
  },
  {
    id: "2",
    name: "Tokyo Adventure",
    destination: "Tokyo, Japan",
    region: "Asia",
    image: "/placeholder.svg?height=300&width=400",
    duration: "5 days",
    price: 899,
    rating: 4.9,
  },
  {
    id: "3",
    name: "New York Explorer",
    destination: "New York, USA",
    region: "North America",
    image: "/placeholder.svg?height=300&width=400",
    duration: "4 days",
    price: 699,
    rating: 4.7,
  },
  {
    id: "4",
    name: "Bali Paradise",
    destination: "Bali, Indonesia",
    region: "Asia",
    image: "/placeholder.svg?height=300&width=400",
    duration: "7 days",
    price: 1099,
    rating: 4.9,
  },
]

type RelatedToursProps = {
  currentTourId: string
}

export default function RelatedTours({ currentTourId }: RelatedToursProps) {
  const [relatedTours, setRelatedTours] = useState<any[]>([])

  useEffect(() => {
    // Filter out the current tour and get up to 3 related tours
    // In a real app, you would fetch related tours based on region, price range, etc.
    const filtered = mockTours.filter((tour) => tour.id !== currentTourId).slice(0, 3)

    setRelatedTours(filtered)
  }, [currentTourId])

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {relatedTours.map((tour) => (
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
              <div className="mb-4 flex items-center text-sm">
                <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                <span>{tour.duration}</span>
              </div>
              <div className="flex items-center">
                <div className="flex items-center">
                  <Star className="mr-1 h-4 w-4 fill-primary text-primary" />
                  <span className="font-medium">{tour.rating}</span>
                </div>
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
  )
}
