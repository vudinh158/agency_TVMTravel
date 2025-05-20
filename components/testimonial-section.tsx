"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

// This would normally come from an API
const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=100&width=100",
    location: "New York, USA",
    rating: 5,
    text: "The Paris tour was absolutely amazing! Our guide was knowledgeable and friendly. The itinerary was perfect and gave us enough time to explore each location. Highly recommend!",
  },
  {
    id: 2,
    name: "Michael Chen",
    avatar: "/placeholder.svg?height=100&width=100",
    location: "Toronto, Canada",
    rating: 5,
    text: "We had an incredible experience with the Tokyo Adventure tour. Everything was well-organized, from the hotel accommodations to the daily activities. Will definitely book with them again!",
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    avatar: "/placeholder.svg?height=100&width=100",
    location: "London, UK",
    rating: 4,
    text: "The Bali Paradise tour exceeded our expectations. The beaches were stunning and our guide took us to some hidden gems that weren't crowded with tourists. A truly memorable experience.",
  },
]

export default function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1))
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1))
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <div className="relative mx-auto max-w-3xl">
      <Card>
        <CardContent className="p-6 md:p-8">
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-4 h-20 w-20 overflow-hidden rounded-full">
              <Image
                src={currentTestimonial.avatar || "/placeholder.svg"}
                alt={currentTestimonial.name}
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold">{currentTestimonial.name}</h3>
            <p className="mb-2 text-sm text-muted-foreground">{currentTestimonial.location}</p>
            <div className="mb-4 flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < currentTestimonial.rating ? "fill-primary text-primary" : "text-muted-foreground"
                  }`}
                />
              ))}
            </div>
            <p className="text-muted-foreground">"{currentTestimonial.text}"</p>
          </div>
        </CardContent>
      </Card>

      <div className="absolute -left-4 top-1/2 -translate-y-1/2 md:-left-6">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full bg-background md:h-10 md:w-10"
          onClick={prevTestimonial}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous testimonial</span>
        </Button>
      </div>

      <div className="absolute -right-4 top-1/2 -translate-y-1/2 md:-right-6">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full bg-background md:h-10 md:w-10"
          onClick={nextTestimonial}
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next testimonial</span>
        </Button>
      </div>
    </div>
  )
}
