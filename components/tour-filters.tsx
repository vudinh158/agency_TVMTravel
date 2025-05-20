"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function TourFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [priceRange, setPriceRange] = useState([0, 5000])
  const [duration, setDuration] = useState<string[]>([])
  const [destinations, setDestinations] = useState<string[]>([])

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value)
  }

  const handleDurationChange = (value: string) => {
    setDuration(duration.includes(value) ? duration.filter((item) => item !== value) : [...duration, value])
  }

  const handleDestinationChange = (value: string) => {
    setDestinations(
      destinations.includes(value) ? destinations.filter((item) => item !== value) : [...destinations, value],
    )
  }

  const handleApplyFilters = () => {
    const params = new URLSearchParams(searchParams.toString())

    params.set("minPrice", priceRange[0].toString())
    params.set("maxPrice", priceRange[1].toString())

    if (duration.length > 0) {
      params.set("duration", duration.join(","))
    } else {
      params.delete("duration")
    }

    if (destinations.length > 0) {
      params.set("destinations", destinations.join(","))
    } else {
      params.delete("destinations")
    }

    router.push(`/tours?${params.toString()}`)
  }

  const handleResetFilters = () => {
    setPriceRange([0, 5000])
    setDuration([])
    setDestinations([])
    router.push("/tours")
  }

  return (
    <div className="rounded-lg border bg-card p-4 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold">Filters</h2>

      <Accordion type="multiple" defaultValue={["price", "duration", "destination"]}>
        <AccordionItem value="price">
          <AccordionTrigger>Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Slider value={priceRange} min={0} max={5000} step={100} onValueChange={handlePriceChange} />
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="min-price">Min</Label>
                  <Input
                    id="min-price"
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => handlePriceChange([Number.parseInt(e.target.value), priceRange[1]])}
                    className="mt-1 w-24"
                  />
                </div>
                <div>
                  <Label htmlFor="max-price">Max</Label>
                  <Input
                    id="max-price"
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => handlePriceChange([priceRange[0], Number.parseInt(e.target.value)])}
                    className="mt-1 w-24"
                  />
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="duration">
          <AccordionTrigger>Duration</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {["1-3 days", "4-6 days", "7-9 days", "10+ days"].map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <Checkbox
                    id={`duration-${option}`}
                    checked={duration.includes(option)}
                    onCheckedChange={() => handleDurationChange(option)}
                  />
                  <Label htmlFor={`duration-${option}`}>{option}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="destination">
          <AccordionTrigger>Destination</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {["Europe", "Asia", "North America", "South America", "Africa", "Australia"].map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <Checkbox
                    id={`destination-${option}`}
                    checked={destinations.includes(option)}
                    onCheckedChange={() => handleDestinationChange(option)}
                  />
                  <Label htmlFor={`destination-${option}`}>{option}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="mt-6 flex flex-col gap-2">
        <Button onClick={handleApplyFilters}>Apply Filters</Button>
        <Button variant="outline" onClick={handleResetFilters}>
          Reset Filters
        </Button>
      </div>
    </div>
  )
}
