import { NextResponse } from "next/server";

// POST /api/payments/create-order
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { amount, bookingId } = body;

        if (!amount || !bookingId) {
            return NextResponse.json({ error: "amount and bookingId are required" }, { status: 400 });
        }

        // In production: Initialize Razorpay and create order
        // const Razorpay = require('razorpay');
        // const instance = new Razorpay({
        //   key_id: process.env.RAZORPAY_KEY_ID,
        //   key_secret: process.env.RAZORPAY_KEY_SECRET,
        // });
        // const order = await instance.orders.create({
        //   amount: amount * 100,
        //   currency: "INR",
        //   receipt: bookingId,
        // });

        const mockOrder = {
            id: `order_${Date.now()}`,
            amount: amount * 100,
            currency: "INR",
            receipt: bookingId,
            status: "created",
        };

        return NextResponse.json({ order: mockOrder });
    } catch {
        return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
    }
}
