// Database Service
import type { Customer, Admin, Tour, Booking, Review, Destination } from "./models"

// Mock database implementation
// In a real application, this would connect to a real database like MongoDB, PostgreSQL, etc.

class DatabaseService {
  private customers: Customer[] = []
  private admins: Admin[] = []
  private tours: Tour[] = []
  private bookings: Booking[] = []
  private reviews: Review[] = []
  private destinations: Destination[] = []

  // Customer methods
  async createCustomer(customer: Omit<Customer, "id" | "createdAt" | "updatedAt">): Promise<Customer> {
    const newCustomer: Customer = {
      ...customer,
      id: `C${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    this.customers.push(newCustomer)
    return newCustomer
  }

  async getCustomerById(id: string): Promise<Customer | null> {
    return this.customers.find((customer) => customer.id === id) || null
  }

  async getCustomerByEmail(email: string): Promise<Customer | null> {
    return this.customers.find((customer) => customer.email === email) || null
  }

  async updateCustomer(id: string, data: Partial<Customer>): Promise<Customer | null> {
    const index = this.customers.findIndex((customer) => customer.id === id)
    if (index === -1) return null

    this.customers[index] = {
      ...this.customers[index],
      ...data,
      updatedAt: new Date().toISOString(),
    }

    return this.customers[index]
  }

  async deleteCustomer(id: string): Promise<boolean> {
    const initialLength = this.customers.length
    this.customers = this.customers.filter((customer) => customer.id !== id)
    return initialLength !== this.customers.length
  }

  // Admin methods
  async createAdmin(admin: Omit<Admin, "id" | "createdAt" | "updatedAt">): Promise<Admin> {
    const newAdmin: Admin = {
      ...admin,
      id: `A${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    this.admins.push(newAdmin)
    return newAdmin
  }

  async getAdminById(id: string): Promise<Admin | null> {
    return this.admins.find((admin) => admin.id === id) || null
  }

  async getAdminByEmail(email: string): Promise<Admin | null> {
    return this.admins.find((admin) => admin.email === email) || null
  }

  // Tour methods
  async createTour(tour: Omit<Tour, "id" | "createdAt" | "updatedAt">): Promise<Tour> {
    const newTour: Tour = {
      ...tour,
      id: `T${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    this.tours.push(newTour)
    return newTour
  }

  async getTourById(id: string): Promise<Tour | null> {
    return this.tours.find((tour) => tour.id === id) || null
  }

  async getTours(filters?: Partial<Tour>): Promise<Tour[]> {
    if (!filters) return this.tours

    return this.tours.filter((tour) => {
      return Object.entries(filters).every(([key, value]) => {
        return tour[key as keyof Tour] === value
      })
    })
  }

  async updateTour(id: string, data: Partial<Tour>): Promise<Tour | null> {
    const index = this.tours.findIndex((tour) => tour.id === id)
    if (index === -1) return null

    this.tours[index] = {
      ...this.tours[index],
      ...data,
      updatedAt: new Date().toISOString(),
    }

    return this.tours[index]
  }

  async deleteTour(id: string): Promise<boolean> {
    const initialLength = this.tours.length
    this.tours = this.tours.filter((tour) => tour.id !== id)
    return initialLength !== this.tours.length
  }

  // Booking methods
  async createBooking(booking: Omit<Booking, "id" | "createdAt" | "updatedAt">): Promise<Booking> {
    const newBooking: Booking = {
      ...booking,
      id: `B${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    this.bookings.push(newBooking)
    return newBooking
  }

  async getBookingById(id: string): Promise<Booking | null> {
    return this.bookings.find((booking) => booking.id === id) || null
  }

  async getBookingsByCustomerId(customerId: string): Promise<Booking[]> {
    return this.bookings.filter((booking) => booking.customerId === customerId)
  }

  async getBookingsByTourId(tourId: string): Promise<Booking[]> {
    return this.bookings.filter((booking) => booking.tourId === tourId)
  }

  async updateBooking(id: string, data: Partial<Booking>): Promise<Booking | null> {
    const index = this.bookings.findIndex((booking) => booking.id === id)
    if (index === -1) return null

    this.bookings[index] = {
      ...this.bookings[index],
      ...data,
      updatedAt: new Date().toISOString(),
    }

    return this.bookings[index]
  }

  // Review methods
  async createReview(review: Omit<Review, "id" | "createdAt" | "updatedAt">): Promise<Review> {
    const newReview: Review = {
      ...review,
      id: `R${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    this.reviews.push(newReview)
    return newReview
  }

  async getReviewById(id: string): Promise<Review | null> {
    return this.reviews.find((review) => review.id === id) || null
  }

  async getReviewsByTourId(tourId: string): Promise<Review[]> {
    return this.reviews.filter((review) => review.tourId === tourId)
  }

  async getReviewsByCustomerId(customerId: string): Promise<Review[]> {
    return this.reviews.filter((review) => review.customerId === customerId)
  }

  async updateReview(id: string, data: Partial<Review>): Promise<Review | null> {
    const index = this.reviews.findIndex((review) => review.id === id)
    if (index === -1) return null

    this.reviews[index] = {
      ...this.reviews[index],
      ...data,
      updatedAt: new Date().toISOString(),
    }

    return this.reviews[index]
  }

  async deleteReview(id: string): Promise<boolean> {
    const initialLength = this.reviews.length
    this.reviews = this.reviews.filter((review) => review.id !== id)
    return initialLength !== this.reviews.length
  }

  // Destination methods
  async createDestination(destination: Omit<Destination, "id" | "createdAt" | "updatedAt">): Promise<Destination> {
    const newDestination: Destination = {
      ...destination,
      id: `D${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    this.destinations.push(newDestination)
    return newDestination
  }

  async getDestinationById(id: string): Promise<Destination | null> {
    return this.destinations.find((destination) => destination.id === id) || null
  }

  async getDestinations(): Promise<Destination[]> {
    return this.destinations
  }

  // Statistics methods
  async getBookingStatistics(startDate: string, endDate: string): Promise<any> {
    const filteredBookings = this.bookings.filter((booking) => {
      const bookingDate = new Date(booking.bookingDate)
      return bookingDate >= new Date(startDate) && bookingDate <= new Date(endDate)
    })

    const totalBookings = filteredBookings.length
    const totalRevenue = filteredBookings.reduce((sum, booking) => sum + booking.totalAmount, 0)

    const bookingsByTour = filteredBookings.reduce(
      (acc, booking) => {
        acc[booking.tourId] = (acc[booking.tourId] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    return {
      totalBookings,
      totalRevenue,
      bookingsByTour,
    }
  }

  async getPopularTours(limit = 5): Promise<any[]> {
    const tourBookingCounts = this.bookings.reduce(
      (acc, booking) => {
        acc[booking.tourId] = (acc[booking.tourId] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    const popularTourIds = Object.entries(tourBookingCounts)
      .sort(([, countA], [, countB]) => countB - countA)
      .slice(0, limit)
      .map(([tourId]) => tourId)

    const popularTours = popularTourIds.map((tourId) => {
      const tour = this.tours.find((t) => t.id === tourId)
      return {
        ...tour,
        bookingCount: tourBookingCounts[tourId],
      }
    })

    return popularTours
  }
}

// Create and export a singleton instance
export const dbService = new DatabaseService()
