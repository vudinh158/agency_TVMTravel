import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MapPin, Calendar, Users } from "lucide-react"
import FeaturedTours from "@/components/featured-tours"
import PopularDestinations from "@/components/popular-destinations"
import TestimonialSection from "@/components/testimonial-section"
import SearchBar from "@/components/search-bar"

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative h-[600px] bg-cover bg-center"
        style={{ backgroundImage: "url('/placeholder.svg?height=600&width=1200')" }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="container relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
          <h1 className="mb-4 text-4xl font-bold md:text-6xl">Discover Amazing Places</h1>
          <p className="mb-8 max-w-2xl text-lg">
            Find and book tours to the most beautiful destinations around the world
          </p>
          <SearchBar />
        </div>
      </section>

      {/* Featured Tours Section */}
      <section className="py-16">
        <div className="container px-4">
          <div className="mb-10 text-center">
            <h2 className="mb-2 text-3xl font-bold">Featured Tours</h2>
            <p className="text-muted-foreground">Explore our most popular tour packages</p>
          </div>
          <FeaturedTours />
          <div className="mt-10 text-center">
            <Link href="/tours">
              <Button size="lg">View All Tours</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="bg-muted py-16">
        <div className="container px-4">
          <div className="mb-10 text-center">
            <h2 className="mb-2 text-3xl font-bold">Popular Destinations</h2>
            <p className="text-muted-foreground">Explore our top destinations</p>
          </div>
          <PopularDestinations />
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="container px-4">
          <div className="mb-10 text-center">
            <h2 className="mb-2 text-3xl font-bold">Why Choose Us</h2>
            <p className="text-muted-foreground">We offer the best experience for your journey</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-lg border bg-card p-6 text-center shadow-sm">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <MapPin className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Handpicked Destinations</h3>
              <p className="text-muted-foreground">We select only the best destinations for your perfect vacation</p>
            </div>
            <div className="rounded-lg border bg-card p-6 text-center shadow-sm">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Calendar className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Flexible Booking</h3>
              <p className="text-muted-foreground">Change your plans with ease with our flexible booking policy</p>
            </div>
            <div className="rounded-lg border bg-card p-6 text-center shadow-sm">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Dedicated Support</h3>
              <p className="text-muted-foreground">Our team is available 24/7 to assist you with any questions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-muted py-16">
        <div className="container px-4">
          <div className="mb-10 text-center">
            <h2 className="mb-2 text-3xl font-bold">What Our Customers Say</h2>
            <p className="text-muted-foreground">Read testimonials from our satisfied customers</p>
          </div>
          <TestimonialSection />
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16">
        <div className="container px-4">
          <div className="rounded-xl bg-primary/10 p-8 md:p-12">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="mb-4 text-3xl font-bold">Subscribe to Our Newsletter</h2>
              <p className="mb-6 text-muted-foreground">Get the latest updates on new tours and special offers</p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 rounded-md border border-input bg-background px-4 py-2"
                />
                <Button>Subscribe</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
