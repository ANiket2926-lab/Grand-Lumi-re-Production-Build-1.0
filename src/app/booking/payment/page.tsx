"use client";

import { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import { useSearchParams, useRouter } from "next/navigation";
import { useBooking } from "@/context/BookingContext";
import { formatCurrency } from "@/lib/utils";
import { CheckCircle, XCircle, CreditCard, Shield, ArrowLeft } from "lucide-react";
import Link from "next/link";

function PaymentContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { bookings, updateBookingStatus } = useBooking();

    const bookingId = searchParams.get("bookingId");
    const amount = Number(searchParams.get("amount") || 0);

    const booking = bookings.find((b) => b.id === bookingId);

    const [status, setStatus] = useState<"pending" | "processing" | "success" | "failed">("pending");

    const handlePayment = () => {
        setStatus("processing");

        // Simulate Razorpay payment
        // In production, you would initialize Razorpay here:
        // const options = {
        //   key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        //   amount: amount * 100,
        //   currency: "INR",
        //   name: "Grand Lumière",
        //   ...
        // };
        // const rzp = new Razorpay(options);
        // rzp.open();

        setTimeout(() => {
            // Simulate 90% success rate
            const success = Math.random() > 0.1;
            if (success && bookingId) {
                updateBookingStatus(bookingId, "confirmed");
                setStatus("success");
            } else {
                setStatus("failed");
            }
        }, 3000);
    };

    if (!booking) {
        return (
            <div className="pt-28 pb-20 min-h-screen bg-luxury-black section-padding text-center">
                <p className="paragraph mt-20">Booking not found.</p>
                <Link href="/booking" className="btn-gold-outline text-xs mt-4 inline-block">
                    Go to Booking
                </Link>
            </div>
        );
    }

    return (
        <div className="pt-28 pb-20 min-h-screen bg-luxury-black section-padding">
            <div className="max-w-lg mx-auto">
                {status === "pending" && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        {/* Order Summary */}
                        <div className="glass-gold rounded-lg p-8 mb-6">
                            <h2 className="font-display text-2xl text-luxury-white text-center mb-6">Payment</h2>

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-sm font-body">
                                    <span className="text-luxury-muted">Venue</span>
                                    <span className="text-luxury-white">{booking.hallName}</span>
                                </div>
                                <div className="flex justify-between text-sm font-body">
                                    <span className="text-luxury-muted">Date</span>
                                    <span className="text-luxury-white">{booking.startDate}</span>
                                </div>
                                <div className="flex justify-between text-sm font-body">
                                    <span className="text-luxury-muted">Event</span>
                                    <span className="text-luxury-white">{booking.eventType}</span>
                                </div>
                                <div className="divider-gold my-4" />
                                <div className="flex justify-between items-center">
                                    <span className="font-display text-lg text-luxury-white">Amount</span>
                                    <span className="font-display text-2xl text-gradient-gold">{formatCurrency(amount)}</span>
                                </div>
                            </div>

                            <button onClick={handlePayment} className="w-full btn-gold text-sm py-4 rounded-lg flex items-center justify-center gap-2">
                                <CreditCard className="w-4 h-4" />
                                Pay with Razorpay
                            </button>

                            <div className="flex items-center justify-center gap-2 mt-4 text-luxury-muted">
                                <Shield className="w-3 h-3" />
                                <span className="text-xs font-body">Secure payment powered by Razorpay</span>
                            </div>
                        </div>

                        <button onClick={() => router.back()} className="flex items-center gap-2 text-sm text-luxury-muted hover:text-gold-400 transition-colors font-body mx-auto">
                            <ArrowLeft className="w-4 h-4" />
                            Go back
                        </button>
                    </motion.div>
                )}

                {status === "processing" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mt-20">
                        <div className="w-16 h-16 border-2 border-gold-400 border-t-transparent rounded-full animate-spin mx-auto mb-6" />
                        <h2 className="font-display text-2xl text-luxury-white mb-2">Processing Payment</h2>
                        <p className="paragraph">Please wait while we confirm your payment...</p>
                    </motion.div>
                )}

                {status === "success" && (
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center mt-20">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", delay: 0.2 }}
                        >
                            <CheckCircle className="w-20 h-20 text-green-400 mx-auto mb-6" />
                        </motion.div>
                        <h2 className="font-display text-3xl text-luxury-white mb-4">Booking Confirmed!</h2>
                        <p className="paragraph mb-4">Your event has been successfully booked.</p>

                        <div className="mb-8 inline-flex items-center gap-2 bg-green-400/10 border border-green-400/20 px-4 py-2 rounded-full text-green-400 text-xs font-body">
                            <CheckCircle className="w-4 h-4" />
                            <span>Confirmation email sent to {booking.userEmail}</span>
                        </div>

                        <p className="text-sm text-gold-400 font-body mb-8">Booking ID: {bookingId}</p>

                        <div className="glass-gold rounded-lg p-6 text-left max-w-sm mx-auto mb-8">
                            <div className="space-y-2 text-sm font-body">
                                <div className="flex justify-between">
                                    <span className="text-luxury-muted">Venue</span>
                                    <span className="text-luxury-white">{booking.hallName}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-luxury-muted">Date</span>
                                    <span className="text-luxury-white">{booking.startDate}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-luxury-muted">Amount Paid</span>
                                    <span className="text-green-400">{formatCurrency(amount)}</span>
                                </div>
                            </div>
                        </div>

                        <Link href="/" className="btn-gold text-sm">
                            Return to Home
                        </Link>
                    </motion.div>
                )}

                {status === "failed" && (
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center mt-20">
                        <XCircle className="w-20 h-20 text-red-400 mx-auto mb-6" />
                        <h2 className="font-display text-3xl text-luxury-white mb-4">Payment Failed</h2>
                        <p className="paragraph mb-8">
                            Don&apos;t worry, your booking dates have not been blocked. Please try again.
                        </p>
                        <div className="flex gap-4 justify-center">
                            <button onClick={() => setStatus("pending")} className="btn-gold text-sm">
                                Try Again
                            </button>
                            <Link href="/booking" className="btn-gold-outline text-sm">
                                New Booking
                            </Link>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}

export default function PaymentPage() {
    return (
        <Suspense fallback={
            <div className="pt-28 pb-20 min-h-screen bg-luxury-black flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-gold-400 border-t-transparent rounded-full animate-spin" />
            </div>
        }>
            <PaymentContent />
        </Suspense>
    );
}
