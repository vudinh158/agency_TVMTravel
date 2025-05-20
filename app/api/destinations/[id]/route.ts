import { NextResponse } from "next/server"
import { dbService } from "@/lib/db/db-service"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const destinationId = params.id
    const destination = await dbService.getDestinationById(destinationId)

    if (!destination) {
      return NextResponse.json({ error: "Destination not found" }, { status: 404 })
    }

    return NextResponse.json(destination)
  } catch (error) {
    console.error(`Error fetching destination ${params.id}:`, error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
