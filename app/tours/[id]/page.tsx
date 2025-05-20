import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, MapPin, Clock, Users, Calendar, Utensils, Wifi, Car, Hotel, Check } from "lucide-react"
import TourReviews from "@/components/tour-reviews"
import TourBookingForm from "@/components/tour-booking-form"
import RelatedTours from "@/components/related-tours"

// This would normally come from an API
const mockTours = [
  {
    id: "1",
    name: "Paris City Tour",
    destination: "Paris, France",
    region: "Europe",
    image: "/placeholder.svg?height=600&width=1200",
    gallery: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    duration: "3 days",
    groupSize: "10 people",
    price: 599,
    rating: 4.8,
    reviewCount: 124,
    featured: true,
    description:
      "Experience the magic of Paris with our comprehensive city tour. Visit iconic landmarks like the Eiffel Tower, Louvre Museum, and Notre-Dame Cathedral. Enjoy a Seine River cruise and explore charming neighborhoods like Montmartre.",
    itinerary: [
      {
        day: 1,
        title: "Arrival and Eiffel Tower",
        description:
          "Arrive in Paris and check into your hotel. In the afternoon, visit the iconic Eiffel Tower and enjoy a welcome dinner with a view of the city lights.",
      },
      {
        day: 2,
        title: "Louvre and Seine River Cruise",
        description:
          "Spend the morning exploring the Louvre Museum. After lunch, enjoy a relaxing Seine River cruise, followed by free time for shopping.",
      },
      {
        day: 3,
        title: "Montmartre and Departure",
        description:
          "Visit the charming Montmartre district and Sacré-Cœur Basilica. Enjoy a farewell lunch before departure.",
      },
    ],
    included: [
      "Hotel accommodation (3-star)",
      "Daily breakfast",
      "Welcome and farewell meals",
      "Seine River cruise ticket",
      "Skip-the-line Eiffel Tower access",
      "Professional guide",
      "Airport transfers",
    ],
    excluded: [
      "Flights to/from Paris",
      "Travel insurance",
      "Personal expenses",
      "Optional activities",
      "Meals not mentioned",
    ],
    availableSeats: 8,
    startDate: "2023-06-15",
    endDate: "2023-06-18",
  },
]

type Props = {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tour = mockTours.find((tour) => tour.id === params.id)

  if (!tour) {
    return {
      title: "Tour Not Found",
    }
  }

  return {
    title: `${tour.name} - Travel Tours`,
    description: tour.description,
  }
}

export default function TourPage({ params }: Props) {
  const tour = mockTours.find((tour) => tour.id === params.id)

  if (!tour) {
    notFound()
  }

  return (
    <main className="pb-16">
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px]">
        <Image src={tour.image || "/placeholder.svg"} alt={tour.name} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/40" />
        <div className="container relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">{tour.name}</h1>
          <div className="flex items-center">
            <MapPin className="mr-1 h-5 w-5" />
            <span>{tour.destination}</span>
          </div>
        </div>
      </section>

      {/* Tour Details */}
      <section className="container px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_350px]">
          <div>
            {/* Overview */}
            <div className="mb-8 rounded-lg border bg-card p-6 shadow-sm">
              <div className="mb-4 flex flex-wrap items-center gap-4">
                <div className="flex items-center">
                  <Clock className="mr-2 h-5 w-5 text-primary" />
                  <span>{tour.duration}</span>
                </div>
                <div className="flex items-center">
                  <Users className="mr-2 h-5 w-5 text-primary" />
                  <span>{tour.groupSize}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-primary" />
                  <span>Available: {tour.availableSeats} seats</span>
                </div>
                <div className="flex items-center">
                  <Star className="mr-1 h-5 w-5 fill-primary text-primary" />
                  <span className="font-medium">{tour.rating}</span>
                  <span className="ml-1 text-muted-foreground">({tour.reviewCount} reviews)</span>
                </div>
              </div>

              <h2 className="mb-4 text-2xl font-bold">Overview</h2>
              <p className="mb-6 text-muted-foreground">{tour.description}</p>

              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
                <div className="rounded-lg border bg-muted/50 p-4 text-center">
                  <Utensils className="mx-auto mb-2 h-6 w-6 text-primary" />
                  <span className="text-sm">Meals Included</span>
                </div>
                <div className="rounded-lg border bg-muted/50 p-4 text-center">
                  <Wifi className="mx-auto mb-2 h-6 w-6 text-primary" />
                  <span className="text-sm">Free Wifi</span>
                </div>
                <div className="rounded-lg border bg-muted/50 p-4 text-center">
                  <Car className="mx-auto mb-2 h-6 w-6 text-primary" />
                  <span className="text-sm">Transportation</span>
                </div>
                <div className="rounded-lg border bg-muted/50 p-4 text-center">
                  <Hotel className="mx-auto mb-2 h-6 w-6 text-primary" />
                  <span className="text-sm">Accommodation</span>
                </div>
              </div>
            </div>

            {/* Gallery */}
            <div className="mb-8">
              <h2 className="mb-4 text-2xl font-bold">Gallery</h2>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {tour.gallery.map((image, index) => (
                  <div key={index} className="relative h-40 overflow-hidden rounded-lg">
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${tour.name} - Image ${index + 1}`}
                      fill
                      className="object-cover transition-transform hover:scale-110"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="itinerary">
              <TabsList className="mb-4 grid w-full grid-cols-3">
                <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
                <TabsTrigger value="included">What's Included</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="itinerary" className="rounded-lg border bg-card p-6 shadow-sm">
                <h3 className="mb-4 text-xl font-semibold">Tour Itinerary</h3>
                <div className="space-y-6">
                  {tour.itinerary.map((day) => (
                    <div key={day.day} className="relative border-l border-primary pl-6">
                      <div className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                        {day.day}
                      </div>
                      <h4 className="mb-2 text-lg font-semibold">{day.title}</h4>
                      <p className="text-muted-foreground">{day.description}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="included" className="rounded-lg border bg-card p-6 shadow-sm">
                <div className="grid gap-8 md:grid-cols-2">
                  <div>
                    <h3 className="mb-4 text-xl font-semibold">What's Included</h3>
                    <ul className="space-y-2">
                      {tour.included.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="mr-2 h-5 w-5 shrink-0 text-primary" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="mb-4 text-xl font-semibold">Not Included</h3>
                    <ul className="space-y-2">
                      {tour.excluded.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <span className="mr-2 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-destructive text-xs font-bold text-destructive">
                            ✕
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="rounded-lg border bg-card p-6 shadow-sm">
                <TourReviews tourId={tour.id} />
              </TabsContent>
            </Tabs>
          </div>

          {/* Booking Form */}
          <div className="lg:sticky lg:top-20">
            <TourBookingForm tour={tour} />
          </div>
        </div>
      </section>

      {/* Related Tours */}
      <section className="container px-4 py-8">
        <h2 className="mb-6 text-2xl font-bold">Related Tours</h2>
        <RelatedTours currentTourId={tour.id} />
      </section>
    </main>
  )
}
