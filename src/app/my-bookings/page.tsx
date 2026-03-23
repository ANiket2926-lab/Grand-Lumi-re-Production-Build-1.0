"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useBooking } from "@/context/BookingContext";
import { formatCurrency } from "@/lib/utils";
import { Calendar, Hash, MapPin, Mail, Phone, Clock } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function MyBookingsPage() {
    const { user, isLoading } = useAuth();
    const { bookings } = useBooking();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && (!user || user.role === "admin")) {
            router.push("/");
        }
    }, [user, isLoading, router]);

    if (isLoading || !user) {
        return (
            <div className="min-h-screen bg-luxury-black flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-gold-400 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    // Filter bookings specific to the logged-in user
    const myBookings = bookings.filter((b) => b.userId === user.id);

    return (
        <div className="pt-28 pb-20 min-h-screen bg-luxury-black section-padding">
            <div className="max-w-5xl mx-auto">
                <div className="mb-10 text-center md:text-left">
                    <h1 className="font-display text-3xl md:text-4xl text-luxury-white mb-2">My Bookings</h1>
                    <p className="paragraph text-sm">View and track the status of your event reservations.</p>
                </div>

                {myBookings.length === 0 ? (
                    <div className="glass rounded-lg p-16 text-center border border-luxury-border/50">
                        <Calendar className="w-12 h-12 text-luxury-muted mx-auto mb-4" />
                        <h2 className="text-xl font-display text-luxury-white mb-2">No Bookings Found</h2>
                        <p className="paragraph mb-6">You haven&apos;t made any reservations yet.</p>
                        <Link href="/booking" className="btn-gold inline-flex items-center gap-2">
                            Book a Venue
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        <AnimatePresence>
                            {myBookings.map((booking, index) => (
                                <motion.div
                                    key={booking.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="glass rounded-xl overflow-hidden border border-luxury-border/30 hover:border-gold-400/30 transition-all"
                                >
                                    <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 md:items-center justify-between relative overflow-hidden">

                                        {/* Background status accent */}
                                        <div className={`absolute left-0 top-0 bottom-0 w-1 ${booking.status === "confirmed" ? "bg-green-400" : booking.status === "pending" ? "bg-yellow-400" : "bg-red-400"}`} />

                                        {/* Booking Details */}
                                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                            <div>
                                                <p className="text-[10px] text-luxury-muted font-body uppercase tracking-wider mb-2">Venue & Event</p>
                                                <p className="text-lg text-luxury-white font-display flex items-center gap-2"><MapPin className="w-4 h-4 text-gold-400" /> {booking.hallName}</p>
                                                <p className="text-sm text-luxury-muted font-body mt-1">{booking.eventType} <span>•</span> {booking.guests} Guests</p>
                                            </div>

                                            <div>
                                                <p className="text-[10px] text-luxury-muted font-body uppercase tracking-wider mb-2">Reservation Date</p>
                                                <div className="flex items-center gap-2">
                                                    <Clock className="w-4 h-4 text-gold-400" />
                                                    <span className="text-sm font-medium text-luxury-white">{booking.startDate}</span>
                                                    {booking.endDate !== booking.startDate && (
                                                        <span className="text-sm font-medium text-luxury-white">to {booking.endDate}</span>
                                                    )}
                                                </div>
                                                <p className="text-[10px] text-luxury-muted font-body mt-2">Booked on: {booking.createdAt}</p>
                                            </div>

                                            <div>
                                                <p className="text-[10px] text-luxury-muted font-body uppercase tracking-wider mb-2">Payment</p>
                                                <p className="text-lg text-gold-400 font-display mb-1">{formatCurrency(booking.totalPrice)}</p>
                                                {booking.paymentId ? (
                                                    <span className="text-xs text-luxury-muted font-mono flex items-center gap-1 w-fit"><Hash className="w-3 h-3" /> Txn: {booking.paymentId}</span>
                                                ) : (
                                                    <span className="text-xs text-yellow-400/80 font-body">Payment Pending</span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Status Badge */}
                                        <div className="flex-shrink-0 md:text-right flex flex-row md:flex-col items-center md:items-end justify-between border-t md:border-t-0 md:border-l border-luxury-border/50 pt-4 md:pt-0 md:pl-8">
                                            <div>
                                                <p className="text-[10px] text-luxury-muted font-body uppercase tracking-wider mb-2 hidden md:block">Status</p>
                                                <span className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider font-body font-medium inline-block w-full text-center ${booking.status === "confirmed"
                                                    ? "bg-green-400/10 text-green-400 border border-green-400/20"
                                                    : booking.status === "pending"
                                                        ? "bg-yellow-400/10 text-yellow-400 border border-yellow-400/20"
                                                        : booking.status === "cancelled"
                                                            ? "bg-red-400/10 text-red-400 border border-red-400/20"
                                                            : "bg-luxury-card text-luxury-muted border border-luxury-border"
                                                    }`}>
                                                    {booking.status === "confirmed" ? "Confirmed ✓" : booking.status}
                                                </span>
                                            </div>
                                        </div>

                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </div>
    );
}
