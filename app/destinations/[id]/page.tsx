import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Star } from "lucide-react"

// This would normally come from an API
const destinations = [
  {
    id: "1",
    name: "Paris",
    country: "France",
    image: "/placeholder.svg?height=600&width=1200",
    description:
      "Paris, the capital of France, is a major European city and a global center for art, fashion, gastronomy, and culture. Its 19th-century cityscape is crisscrossed by wide boulevards and the River Seine. Beyond such landmarks as the Eiffel Tower and the 12th-century, Gothic Notre-Dame cathedral, the city is known for its cafe culture and designer boutiques along the Rue du Faubourg Saint-Honoré.",
    highlights: [
      "Eiffel Tower",
      "Louvre Museum",
      "Notre-Dame Cathedral",
      "Montmartre",
      "Seine River Cruise",
      "Champs-Élysées",
    ],
    bestTimeToVisit: "April to June and October to early November",
    localCuisine:
      "French cuisine is renowned worldwide. Try classics like croissants, baguettes, escargot, coq au vin, and crème brûlée.",
    tours: [
      {
        id: "1",
        name: "Paris City Tour",
        image: "/placeholder.svg?height=300&width=400",
        duration: "3 days",
        price: 599,
        rating: 4.8,
      },
      {
        id: "5",
        name: "Paris Food Tour",
        image: "/placeholder.svg?height=300&width=400",
        duration: "1 day",
        price: 149,
        rating: 4.9,
      },
      {
        id: "9",
        name: "Paris Art & Museums",
        image: "/placeholder.svg?height=300&width=400",
        duration: "2 days",
        price: 299,
        rating: 4.7,
      },
    ],
  },
]

type Props = {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const destination = destinations.find((dest) => dest.id === params.id)

  if (!destination) {
    return {
      title: "Destination Not Found",
    }
  }

  return {
    title: `${destination.name}, ${destination.country} - Travel Tours`,
    description: destination.description.substring(0, 160),
  }
}

export default function DestinationPage({ params }: Props) {
  const destination = destinations.find((dest) => dest.id === params.id)

  if (!destination) {
    notFound()
  }

  return (
    <main className="pb-16">
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px]">
        <Image
          src={destination.image || "/placeholder.svg"}
          alt={`${destination.name}, ${destination.country}`}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="container relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
          <h1 className="mb-2 text-4xl font-bold md:text-5xl">{destination.name}</h1>
          <p className="text-xl">{destination.country}</p>
        </div>
      </section>

      {/* Destination Details */}
      <section className="container px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 rounded-lg border bg-card p-6 shadow-sm">
            <h2 className="mb-4 text-2xl font-bold">About {destination.name}</h2>
            <p className="mb-6 text-muted-foreground">{destination.description}</p>

            <div className="mb-6">
              <h3 className="mb-3 text-xl font-semibold">Highlights</h3>
              <ul className="grid gap-2 sm:grid-cols-2">
                {destination.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-center">
                    <span className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                      •
                    </span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="mb-2 text-xl font-semibold">Best Time to Visit</h3>
              <p className="text-muted-foreground">{destination.bestTimeToVisit}</p>
            </div>

            <div>
              <h3 className="mb-2 text-xl font-semibold">Local Cuisine</h3>
              <p className="text-muted-foreground">{destination.localCuisine}</p>
            </div>
          </div>

          {/* Tours in this destination */}
          <div>
            <h2 className="mb-6 text-2xl font-bold">Tours in {destination.name}</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {destination.tours.map((tour) => (
                <Link href={`/tours/${tour.id}`} key={tour.id}>
                  <Card className="h-full overflow-hidden transition-all hover:shadow-md">
                    <div className="relative h-48 w-full">
                      <Image src={tour.image || "/placeholder.svg"} alt={tour.name} fill className="object-cover" />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="mb-2 text-xl font-semibold">{tour.name}</h3>
                      <div className="mb-4 flex items-center text-sm">
                        <Calendar className="mr-1 h-4 w-4 text-muted-foreground" />
                        <span>{tour.duration}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Star className="mr-1 h-4 w-4 fill-primary text-primary" />
                          <span className="font-medium">{tour.rating}</span>
                        </div>
                        <div>
                          <span className="text-lg font-bold">${tour.price}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Button asChild>
                <Link href={`/tours?destination=${destination.name}`}>View All Tours in {destination.name}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
