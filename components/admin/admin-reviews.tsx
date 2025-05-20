"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Search, Eye, CheckCircle, XCircle, Trash } from "lucide-react"
import { format } from "date-fns"
import { useToast } from "@/hooks/use-toast"

// Mock data for reviews
const mockReviews = [
  {
    id: "R12345",
    customerName: "John Doe",
    customerEmail: "john.doe@example.com",
    tourName: "Paris City Tour",
    rating: 5,
    comment:
      "This tour was absolutely amazing! Our guide was knowledgeable and friendly. The itinerary was perfect and gave us enough time to explore each location. Highly recommend!",
    date: "2023-05-15",
    status: "published",
  },
  {
    id: "R12346",
    customerName: "Jane Smith",
    customerEmail: "jane.smith@example.com",
    tourName: "Bali Paradise",
    rating: 4,
    comment:
      "Great experience overall. The tour was well-organized and our guide was excellent. The only reason I'm giving 4 stars instead of 5 is because I wish we had a bit more free time at some locations.",
    date: "2023-04-22",
    status: "published",
  },
  {
    id: "R12347",
    customerName: "Michael Johnson",
    customerEmail: "michael.j@example.com",
    tourName: "Tokyo Adventure",
    rating: 5,
    comment:
      "Exceeded my expectations! The hotel was comfortable, the food was delicious, and our guide made the history of Tokyo come alive. Will definitely book with this company again.",
    date: "2023-05-18",
    status: "pending",
  },
  {
    id: "R12348",
    customerName: "Emily Wilson",
    customerEmail: "emily.w@example.com",
    tourName: "New York Explorer",
    rating: 2,
    comment:
      "Disappointing experience. The tour was rushed, and we didn't get to spend enough time at the main attractions. The hotel was also not as advertised. Would not recommend.",
    date: "2023-06-05",
    status: "pending",
  },
  {
    id: "R12349",
    customerName: "Robert Brown",
    customerEmail: "robert.b@example.com",
    tourName: "Rome Historical Tour",
    rating: 1,
    comment:
      "Terrible experience. The guide was late, the bus was uncomfortable, and the itinerary was completely different from what was advertised. Waste of money.",
    date: "2023-05-30",
    status: "rejected",
  },
]

export default function AdminReviews() {
  const { toast } = useToast()
  const [reviews, setReviews] = useState(mockReviews)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.customerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.tourName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || review.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleApproveReview = (reviewId: string) => {
    setReviews(
      reviews.map((review) =>
        review.id === reviewId
          ? {
              ...review,
              status: "published",
            }
          : review,
      ),
    )
    toast({
      title: "Review approved",
      description: `Review ${reviewId} has been published.`,
    })
  }

  const handleRejectReview = (reviewId: string) => {
    setReviews(
      reviews.map((review) =>
        review.id === reviewId
          ? {
              ...review,
              status: "rejected",
            }
          : review,
      ),
    )
    toast({
      title: "Review rejected",
      description: `Review ${reviewId} has been rejected.`,
    })
  }

  const handleDeleteReview = (reviewId: string) => {
    if (confirm("Are you sure you want to delete this review? This action cannot be undone.")) {
      setReviews(reviews.filter((review) => review.id !== reviewId))
      toast({
        title: "Review deleted",
        description: `Review ${reviewId} has been deleted.`,
      })
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col justify-between gap-4 sm:flex-row">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search reviews..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant={statusFilter === "all" ? "default" : "outline"} onClick={() => setStatusFilter("all")}>
            All
          </Button>
          <Button
            variant={statusFilter === "pending" ? "default" : "outline"}
            onClick={() => setStatusFilter("pending")}
          >
            Pending
          </Button>
          <Button
            variant={statusFilter === "published" ? "default" : "outline"}
            onClick={() => setStatusFilter("published")}
          >
            Published
          </Button>
          <Button
            variant={statusFilter === "rejected" ? "default" : "outline"}
            onClick={() => setStatusFilter("rejected")}
          >
            Rejected
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Tour</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Review</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReviews.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No reviews found.
                </TableCell>
              </TableRow>
            ) : (
              filteredReviews.map((review) => (
                <TableRow key={review.id}>
                  <TableCell>
                    <div>
                      <div>{review.customerName}</div>
                      <div className="text-sm text-muted-foreground">{review.customerEmail}</div>
                    </div>
                  </TableCell>
                  <TableCell>{review.tourName}</TableCell>
                  <TableCell>{review.rating} / 5</TableCell>
                  <TableCell>
                    <div className="max-w-xs truncate">{review.comment}</div>
                  </TableCell>
                  <TableCell>{format(new Date(review.date), "MMM d, yyyy")}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        review.status === "published"
                          ? "default"
                          : review.status === "pending"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {review.status.charAt(0).toUpperCase() + review.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Full Review
                        </DropdownMenuItem>
                        {review.status === "pending" && (
                          <>
                            <DropdownMenuItem onClick={() => handleApproveReview(review.id)}>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Approve
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleRejectReview(review.id)}>
                              <XCircle className="mr-2 h-4 w-4" />
                              Reject
                            </DropdownMenuItem>
                          </>
                        )}
                        <DropdownMenuItem onClick={() => handleDeleteReview(review.id)}>
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
