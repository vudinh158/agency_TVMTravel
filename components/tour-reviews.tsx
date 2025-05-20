"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star } from "lucide-react"

// This would normally come from an API
const mockReviews = [
  {
    id: 1,
    tourId: "1",
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 5,
    date: "2023-04-15",
    comment:
      "This tour was absolutely amazing! Our guide was knowledgeable and friendly. The itinerary was perfect and gave us enough time to explore each location. Highly recommend!",
  },
  {
    id: 2,
    tourId: "1",
    name: "Michael Chen",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 4,
    date: "2023-03-22",
    comment:
      "Great experience overall. The tour was well-organized and our guide was excellent. The only reason I'm giving 4 stars instead of 5 is because I wish we had a bit more free time at the Louvre.",
  },
  {
    id: 3,
    tourId: "1",
    name: "Emma Rodriguez",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 5,
    date: "2023-02-10",
    comment:
      "Exceeded my expectations! The hotel was comfortable, the food was delicious, and our guide made the history of Paris come alive. Will definitely book with this company again.",
  },
]

type TourReviewsProps = {
  tourId: string
}

export default function TourReviews({ tourId }: TourReviewsProps) {
  const [reviews, setReviews] = useState<any[]>([])
  const [newReview, setNewReview] = useState("")
  const [rating, setRating] = useState("5")
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    // Filter reviews for this specific tour
    const filteredReviews = mockReviews.filter((review) => review.tourId === tourId)
    setReviews(filteredReviews)
  }, [tourId])

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()

    if (!newReview.trim()) return

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      const newReviewObj = {
        id: reviews.length + 1,
        tourId,
        name: "You",
        avatar: "/placeholder.svg?height=100&width=100",
        rating: Number.parseInt(rating),
        date: new Date().toISOString().split("T")[0],
        comment: newReview,
      }

      setReviews([newReviewObj, ...reviews])
      setNewReview("")
      setRating("5")
      setIsSubmitting(false)
    }, 1000)
  }

  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0)
    return (sum / reviews.length).toFixed(1)
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-xl font-semibold">Customer Reviews</h3>
        <div className="flex items-center">
          <span className="mr-2 text-lg font-medium">{calculateAverageRating()}</span>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(Number.parseFloat(calculateAverageRating()))
                    ? "fill-primary text-primary"
                    : "text-muted-foreground"
                }`}
              />
            ))}
          </div>
          <span className="ml-2 text-sm text-muted-foreground">({reviews.length} reviews)</span>
        </div>
      </div>

      {/* Write a review */}
      <div className="mb-8 rounded-lg border bg-muted/50 p-4">
        <h4 className="mb-4 font-semibold">Write a Review</h4>
        <form onSubmit={handleSubmitReview} className="space-y-4">
          <div>
            <label htmlFor="rating" className="mb-2 block text-sm font-medium">
              Rating
            </label>
            <Select value={rating} onValueChange={setRating}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5 Stars - Excellent</SelectItem>
                <SelectItem value="4">4 Stars - Very Good</SelectItem>
                <SelectItem value="3">3 Stars - Good</SelectItem>
                <SelectItem value="2">2 Stars - Fair</SelectItem>
                <SelectItem value="1">1 Star - Poor</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="review" className="mb-2 block text-sm font-medium">
              Your Review
            </label>
            <Textarea
              id="review"
              placeholder="Share your experience..."
              rows={4}
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
            />
          </div>
          <Button type="submit" disabled={isSubmitting || !newReview.trim()}>
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </Button>
        </form>
      </div>

      {/* Reviews list */}
      <div className="space-y-6">
        {reviews.length === 0 ? (
          <p className="text-center text-muted-foreground">No reviews yet. Be the first to review!</p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="rounded-lg border bg-card p-4 shadow-sm">
              <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center">
                  <div className="relative mr-3 h-10 w-10 overflow-hidden rounded-full">
                    <Image src={review.avatar || "/placeholder.svg"} alt={review.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h5 className="font-semibold">{review.name}</h5>
                    <p className="text-xs text-muted-foreground">{review.date}</p>
                  </div>
                </div>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < review.rating ? "fill-primary text-primary" : "text-muted-foreground"}`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-muted-foreground">{review.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
