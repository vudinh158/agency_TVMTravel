import type { Metadata } from "next"
import TourList from "@/components/tour-list"
import TourFilters from "@/components/tour-filters"

export const metadata: Metadata = {
  title: "Tours - Travel Tours",
  description: "Browse our collection of amazing tour packages",
}

export default function ToursPage() {
  return (
    <main className="container px-4 py-12">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Tours</h1>
        <p className="text-muted-foreground">Discover our collection of amazing tour packages around the world</p>
      </div>

      <div className="grid gap-6 md:grid-cols-[300px_1fr]">
        <aside>
          <TourFilters />
        </aside>

        <div>
          <TourList />
        </div>
      </div>
    </main>
  )
}
