"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Star, MapPin, Calendar, Edit, Trash } from "lucide-react"
import { format } from "date-fns"
import { useToast } from "@/hooks/use-toast"

// Mock reviews data
const mockReviews = [
  {
    id: "R12345",
    tourId: "2",
    tourName: "Tokyo Adventure",
    destination: "Tokyo, Japan",
    image: "/placeholder.svg?height=300&width=400",
    rating: 5,
    comment:
      "This tour was absolutely amazing! Our guide was knowledgeable and friendly. The itinerary was perfect and gave us enough time to explore each location. Highly recommend!",
    date: "2023-05-15",
  },
  {
    id: "R12346",
    tourId: "3",
    tourName: "New York Explorer",
    destination: "New York, USA",
    image: "/placeholder.svg?height=300&width=400",
    rating: 4,
    comment:
      "Great experience overall. The tour was well-organized and our guide was excellent. The only reason I'm giving 4 stars instead of 5 is because I wish we had a bit more free time to explore on our own.",
    date: "2023-03-22",
  },
]

export default function ProfileReviews() {
  const { toast } = useToast()
  const [reviews, setReviews] = useState(mockReviews)
  const [isEditing, setIsEditing] = useState<string | null>(null)
  const [editedReview, setEditedReview] = useState({
    rating: 5,
    comment: "",
  })

  const handleEditReview = (review: any) => {
    setIsEditing(review.id)
    setEditedReview({
      rating: review.rating,
      comment: review.comment,
    })
  }

  const handleCancelEdit = () => {
    setIsEditing(null)
  }

  const handleSaveEdit = (reviewId: string) => {
    // Simulate API call
    setTimeout(() => {
      setReviews(
        reviews.map((review) =>
          review.id === reviewId
            ? {
                ...review,
                rating: editedReview.rating,
                comment: editedReview.comment,
              }
            : review,
        ),
      )
      setIsEditing(null)
      toast({
        title: "Review updated",
        description: "Your review has been updated successfully.",
      })
    }, 500)
  }

  const handleDeleteReview = (reviewId: string) => {
    if (confirm("Are you sure you want to delete this review?")) {
      // Simulate API call
      setTimeout(() => {
        setReviews(reviews.filter((review) => review.id !== reviewId))
        toast({
          title: "Review deleted",
          description: "Your review has been deleted successfully.",
        })
      }, 500)
    }
  }

  const handleRatingChange = (newRating: number) => {
    setEditedReview({
      ...editedReview,
      rating: newRating,
    })
  }

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedReview({
      ...editedReview,
      comment: e.target.value,
    })
  }

  return (
    <div className="space-y-6">
      {reviews.length === 0 ? (
        <div className="rounded-lg border p-8 text-center">
          <h3 className="mb-2 text-lg font-semibold">No reviews yet</h3>
          <p className="mb-4 text-muted-foreground">You haven't written any reviews yet.</p>
          <Button asChild>
            <Link href="/tours">Browse Tours</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <Card key={review.id} className="overflow-hidden">
              <div className="grid md:grid-cols-[200px_1fr]">
                <div className="relative h-40 md:h-full">
                  <Image src={review.image || "/placeholder.svg"} alt={review.tourName} fill className="object-cover" />
                </div>
                <CardContent className="p-6">
                  <div className="mb-4 flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="text-xl font-semibold">{review.tourName}</h3>
                      <div className="mb-2 flex items-center text-muted-foreground">
                        <MapPin className="mr-1 h-4 w-4" />
                        <span>{review.destination}</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {isEditing === review.id ? (
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => handleRatingChange(star)}
                              className="focus:outline-none"
                            >
                              <Star
                                className={`h-5 w-5 ${
                                  star <= editedReview.rating ? "fill-primary text-primary" : "text-muted-foreground"
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-5 w-5 ${
                                star <= review.rating ? "fill-primary text-primary" : "text-muted-foreground"
                              }`}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Reviewed on {format(new Date(review.date), "MMM d, yyyy")}
                      </p>
                    </div>
                  </div>

                  {isEditing === review.id ? (
                    <div className="mb-4">
                      <textarea
                        className="w-full rounded-md border p-2"
                        rows={4}
                        value={editedReview.comment}
                        onChange={handleCommentChange}
                      />
                    </div>
                  ) : (
                    <p className="mb-4 text-muted-foreground">{review.comment}</p>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {isEditing === review.id ? (
                      <>
                        <Button size="sm" onClick={() => handleSaveEdit(review.id)}>
                          Save Changes
                        </Button>
                        <Button variant="outline" size="sm" onClick={handleCancelEdit}>
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button variant="outline" size="sm" onClick={() => handleEditReview(review)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Review
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDeleteReview(review.id)}>
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/tours/${review.tourId}`}>View Tour</Link>
                        </Button>
                      </>
                    )}
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
