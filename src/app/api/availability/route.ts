import { NextResponse } from "next/server";

// GET /api/availability?hallId=xxx&date=2026-04-15
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const hallId = searchParams.get("hallId");
    const date = searchParams.get("date");

    if (!hallId || !date) {
        return NextResponse.json({ error: "hallId and date are required" }, { status: 400 });
    }

    // In production: Check against Prisma DB
    return NextResponse.json({
        hallId,
        date,
        available: true,
        message: "Connect Prisma for real-time availability checking.",
    });
}
