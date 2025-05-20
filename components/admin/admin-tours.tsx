"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Plus, MoreHorizontal, Search, Edit, Trash, Eye } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Mock data for tours
const mockTours = [
  {
    id: "1",
    name: "Paris City Tour",
    destination: "Paris, France",
    duration: "3 days",
    price: 599,
    availableSeats: 8,
    status: "active",
  },
  {
    id: "2",
    name: "Tokyo Adventure",
    destination: "Tokyo, Japan",
    duration: "5 days",
    price: 899,
    availableSeats: 12,
    status: "active",
  },
  {
    id: "3",
    name: "New York Explorer",
    destination: "New York, USA",
    duration: "4 days",
    price: 699,
    availableSeats: 5,
    status: "active",
  },
  {
    id: "4",
    name: "Bali Paradise",
    destination: "Bali, Indonesia",
    duration: "7 days",
    price: 1099,
    availableSeats: 15,
    status: "active",
  },
  {
    id: "5",
    name: "Rome Historical Tour",
    destination: "Rome, Italy",
    duration: "4 days",
    price: 749,
    availableSeats: 0,
    status: "sold-out",
  },
  {
    id: "6",
    name: "Winter Alps Adventure",
    destination: "Swiss Alps",
    duration: "6 days",
    price: 1299,
    availableSeats: 10,
    status: "upcoming",
  },
]

export default function AdminTours() {
  const { toast } = useToast()
  const [tours, setTours] = useState(mockTours)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredTours = tours.filter(
    (tour) =>
      tour.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tour.destination.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleDeleteTour = (id: string) => {
    if (confirm("Are you sure you want to delete this tour?")) {
      setTours(tours.filter((tour) => tour.id !== id))
      toast({
        title: "Tour deleted",
        description: `Tour ${id} has been deleted.`,
      })
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col justify-between gap-4 sm:flex-row">
        <div className="relative max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tours..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add New Tour
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tour Name</TableHead>
              <TableHead>Destination</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Available Seats</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTours.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No tours found.
                </TableCell>
              </TableRow>
            ) : (
              filteredTours.map((tour) => (
                <TableRow key={tour.id}>
                  <TableCell className="font-medium">{tour.name}</TableCell>
                  <TableCell>{tour.destination}</TableCell>
                  <TableCell>{tour.duration}</TableCell>
                  <TableCell>${tour.price}</TableCell>
                  <TableCell>{tour.availableSeats}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        tour.status === "active" ? "default" : tour.status === "sold-out" ? "destructive" : "outline"
                      }
                    >
                      {tour.status === "active" ? "Active" : tour.status === "sold-out" ? "Sold Out" : "Upcoming"}
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
                        <DropdownMenuItem asChild>
                          <Link href={`/tours/${tour.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteTour(tour.id)}>
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
