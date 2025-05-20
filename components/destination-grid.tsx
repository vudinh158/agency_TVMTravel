import Link from "next/link"
import Image from "next/image"

// This would normally come from an API
const destinations = [
  {
    id: 1,
    name: "Paris",
    country: "France",
    image: "/placeholder.svg?height=400&width=600",
    description: "The City of Light beckons with its iconic Eiffel Tower, world-class museums, and charming cafés.",
    tourCount: 24,
  },
  {
    id: 2,
    name: "Tokyo",
    country: "Japan",
    image: "/placeholder.svg?height=400&width=600",
    description: "A fascinating blend of ultramodern and traditional, from neon-lit skyscrapers to historic temples.",
    tourCount: 18,
  },
  {
    id: 3,
    name: "New York",
    country: "USA",
    image: "/placeholder.svg?height=400&width=600",
    description: "The Big Apple offers iconic landmarks, diverse neighborhoods, and endless entertainment options.",
    tourCount: 32,
  },
  {
    id: 4,
    name: "Bali",
    country: "Indonesia",
    image: "/placeholder.svg?height=400&width=600",
    description: "A tropical paradise with beautiful beaches, lush rice terraces, and a rich spiritual culture.",
    tourCount: 15,
  },
  {
    id: 5,
    name: "Rome",
    country: "Italy",
    image: "/placeholder.svg?height=400&width=600",
    description: "The Eternal City is a living museum of ancient ruins, Renaissance art, and vibrant street life.",
    tourCount: 22,
  },
  {
    id: 6,
    name: "Sydney",
    country: "Australia",
    image: "/placeholder.svg?height=400&width=600",
    description: "A stunning harbor city known for its iconic Opera House, beautiful beaches, and vibrant culture.",
    tourCount: 17,
  },
  {
    id: 7,
    name: "Cairo",
    country: "Egypt",
    image: "/placeholder.svg?height=400&width=600",
    description: "Home to the ancient pyramids and Sphinx, with a rich history spanning thousands of years.",
    tourCount: 14,
  },
  {
    id: 8,
    name: "Rio de Janeiro",
    country: "Brazil",
    image: "/placeholder.svg?height=400&width=600",
    description: "Famous for its stunning beaches, Christ the Redeemer statue, and vibrant carnival celebrations.",
    tourCount: 19,
  },
  {
    id: 9,
    name: "Barcelona",
    country: "Spain",
    image: "/placeholder.svg?height=400&width=600",
    description: "A city of stunning architecture, beautiful beaches, and a world-class culinary scene.",
    tourCount: 26,
  },
  {
    id: 10,
    name: "Bangkok",
    country: "Thailand",
    image: "/placeholder.svg?height=400&width=600",
    description: "A bustling city with ornate shrines, vibrant street life, and a gateway to Thailand's islands.",
    tourCount: 21,
  },
  {
    id: 11,
    name: "Cape Town",
    country: "South Africa",
    image: "/placeholder.svg?height=400&width=600",
    description: "A stunning coastal city with Table Mountain as its backdrop and diverse cultural influences.",
    tourCount: 16,
  },
  {
    id: 12,
    name: "Dubai",
    country: "UAE",
    image: "/placeholder.svg?height=400&width=600",
    description: "A city of superlatives with futuristic architecture, luxury shopping, and desert adventures.",
    tourCount: 23,
  },
]

export default function DestinationGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {destinations.map((destination) => (
        <Link
          href={`/destinations/${destination.id}`}
          key={destination.id}
          className="group overflow-hidden rounded-lg border bg-card shadow-sm transition-all hover:shadow-md"
        >
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={destination.image || "/placeholder.svg"}
              alt={destination.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <div className="p-4">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-xl font-semibold">{destination.name}</h3>
              <span className="text-sm text-muted-foreground">{destination.tourCount} tours</span>
            </div>
            <p className="mb-2 text-sm text-muted-foreground">{destination.country}</p>
            <p className="text-sm text-muted-foreground">{destination.description}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}
