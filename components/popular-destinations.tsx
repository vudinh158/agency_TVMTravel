import Link from "next/link"
import Image from "next/image"

// This would normally come from an API
const destinations = [
  {
    id: 1,
    name: "Paris",
    country: "France",
    image: "/placeholder.svg?height=400&width=600",
    tourCount: 24,
  },
  {
    id: 2,
    name: "Tokyo",
    country: "Japan",
    image: "/placeholder.svg?height=400&width=600",
    tourCount: 18,
  },
  {
    id: 3,
    name: "New York",
    country: "USA",
    image: "/placeholder.svg?height=400&width=600",
    tourCount: 32,
  },
  {
    id: 4,
    name: "Bali",
    country: "Indonesia",
    image: "/placeholder.svg?height=400&width=600",
    tourCount: 15,
  },
  {
    id: 5,
    name: "Rome",
    country: "Italy",
    image: "/placeholder.svg?height=400&width=600",
    tourCount: 22,
  },
  {
    id: 6,
    name: "Sydney",
    country: "Australia",
    image: "/placeholder.svg?height=400&width=600",
    tourCount: 17,
  },
]

export default function PopularDestinations() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {destinations.map((destination) => (
        <Link
          href={`/destinations/${destination.id}`}
          key={destination.id}
          className="group overflow-hidden rounded-lg"
        >
          <div className="relative h-64 w-full overflow-hidden rounded-lg">
            <Image
              src={destination.image || "/placeholder.svg"}
              alt={destination.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-0 left-0 p-4 text-white">
              <h3 className="text-xl font-bold">{destination.name}</h3>
              <div className="flex items-center justify-between">
                <span>{destination.country}</span>
                <span className="text-sm">{destination.tourCount} tours</span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
