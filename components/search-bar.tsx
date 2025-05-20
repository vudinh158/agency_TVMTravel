"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MapPin, Calendar, Users } from "lucide-react"

export default function SearchBar() {
  const router = useRouter()
  const [destination, setDestination] = useState("")
  const [date, setDate] = useState("")
  const [guests, setGuests] = useState("1")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/tours?destination=${destination}&date=${date}&guests=${guests}`)
  }

  return (
    <form onSubmit={handleSearch} className="w-full max-w-4xl rounded-lg bg-white p-2 shadow-lg md:p-4">
      <div className="grid gap-4 md:grid-cols-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
            <MapPin className="h-5 w-5" />
          </div>
          <Input
            type="text"
            placeholder="Where to?"
            className="pl-10"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
            <Calendar className="h-5 w-5" />
          </div>
          <Input type="date" className="pl-10" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
            <Users className="h-5 w-5" />
          </div>
          <Select value={guests} onValueChange={setGuests}>
            <SelectTrigger className="pl-10">
              <SelectValue placeholder="Guests" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 Guest</SelectItem>
              <SelectItem value="2">2 Guests</SelectItem>
              <SelectItem value="3">3 Guests</SelectItem>
              <SelectItem value="4">4 Guests</SelectItem>
              <SelectItem value="5">5+ Guests</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button type="submit" className="w-full">
          <Search className="mr-2 h-4 w-4" />
          Search
        </Button>
      </div>
    </form>
  )
}
