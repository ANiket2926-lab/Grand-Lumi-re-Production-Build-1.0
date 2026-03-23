import { NextResponse } from "next/server";

// GET /api/bookings - List all bookings
export async function GET() {
    // In production, fetch from Prisma
    return NextResponse.json({
        message: "Bookings API ready. Connect Prisma for database access.",
        bookings: [],
    });
}

// POST /api/bookings - Create a booking
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { userId, hallId, startDate, endDate, guests, eventType, totalPrice } = body;

        // Validate required fields
        if (!userId || !hallId || !startDate || !endDate || !guests || !eventType || !totalPrice) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // In production: Check availability, create booking in DB
        const booking = {
            id: `bk-${Date.now()}`,
            userId,
            hallId,
            startDate,
            endDate,
            guests,
            eventType,
            totalPrice,
            status: "pending",
            createdAt: new Date().toISOString(),
        };

        return NextResponse.json({ booking }, { status: 201 });
    } catch {
        return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
}
