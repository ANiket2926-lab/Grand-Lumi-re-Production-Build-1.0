import { NextResponse } from "next/server";

// POST /api/payments/verify
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingId } = body;

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return NextResponse.json({ error: "Missing payment verification fields" }, { status: 400 });
        }

        // In production: Verify Razorpay signature
        // const crypto = require('crypto');
        // const generatedSignature = crypto
        //   .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
        //   .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        //   .digest('hex');
        // const isValid = generatedSignature === razorpay_signature;

        // Mock verification (always succeeds)
        const isValid = true;

        if (isValid) {
            // In production: Update booking status in DB to 'confirmed'
            return NextResponse.json({
                success: true,
                message: "Payment verified successfully",
                bookingId,
            });
        }

        return NextResponse.json({ error: "Payment verification failed" }, { status: 400 });
    } catch {
        return NextResponse.json({ error: "Verification error" }, { status: 500 });
    }
}
