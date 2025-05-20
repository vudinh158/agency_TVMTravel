import type { Metadata } from "next"
import DestinationGrid from "@/components/destination-grid"

export const metadata: Metadata = {
  title: "Destinations - Travel Tours",
  description: "Explore our popular travel destinations around the world",
}

export default function DestinationsPage() {
  return (
    <main className="container px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold md:text-4xl">Popular Destinations</h1>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          Explore our collection of handpicked destinations around the world. From bustling cities to serene beaches, we
          have something for every traveler.
        </p>
      </div>

      <DestinationGrid />
    </main>
  )
}
