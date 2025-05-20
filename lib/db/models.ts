// Database Models

// Customer Model
export interface Customer {
  id: string
  firstName: string
  lastName: string
  dateOfBirth: string
  address: string
  phone: string
  email: string
  password: string
  createdAt: string
  updatedAt: string
}

// Admin Model
export interface Admin {
  id: string
  firstName: string
  lastName: string
  dateOfBirth: string
  address: string
  phone: string
  email: string
  password: string
  role: string
  createdAt: string
  updatedAt: string
}

// Tour Model
export interface Tour {
  id: string
  name: string
  departurePoint: string
  destination: string
  itinerary: TourDay[]
  startDate: string
  endDate: string
  transportation: string
  price: number
  availableSeats: number
  includedServices: string[]
  description: string
  images: string[]
  status: "active" | "upcoming" | "sold-out" | "cancelled"
  createdAt: string
  updatedAt: string
}

// Tour Day (for itinerary)
export interface TourDay {
  day: number
  title: string
  description: string
  activities: string[]
}

// Booking Model
export interface Booking {
  id: string
  customerId: string
  tourId: string
  bookingDate: string
  numberOfPeople: number
  status: "pending" | "confirmed" | "completed" | "cancelled"
  totalAmount: number
  paymentStatus: "unpaid" | "paid" | "refunded"
  specialRequests?: string
  createdAt: string
  updatedAt: string
}

// Review Model
export interface Review {
  id: string
  customerId: string
  tourId: string
  rating: number
  comment: string
  reviewDate: string
  status: "pending" | "published" | "rejected"
  createdAt: string
  updatedAt: string
}

// Destination Model
export interface Destination {
  id: string
  name: string
  country: string
  description: string
  highlights: string[]
  bestTimeToVisit: string
  localCuisine: string
  image: string
  createdAt: string
  updatedAt: string
}
