"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useBooking } from "@/context/BookingContext";
import { formatCurrency } from "@/lib/utils";
import { CheckCircle, XCircle, Ban, Filter, Phone, Mail, Hash } from "lucide-react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export default function AdminBookingsPage() {
    const { bookings, updateBookingStatus } = useBooking();
    const [filter, setFilter] = useState<string>("all");
    const [selectedBooking, setSelectedBooking] = useState<string | null>(null);

    const filteredBookings = filter === "all" ? bookings : bookings.filter((b) => b.status === filter);

    const statusFilters = ["all", "pending", "confirmed", "cancelled", "rejected"];

    return (
        <div>
            <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="font-display text-3xl text-luxury-white mb-2">Bookings</h1>
                    <p className="paragraph text-sm">Manage all venue bookings.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
                {/* Visual Calendar */}
                <div className="xl:col-span-1 glass rounded-lg p-6 self-start sticky top-24">
                    <h2 className="font-display text-lg text-luxury-white mb-2">Availability Calendar</h2>
                    <p className="text-xs text-luxury-muted font-body mb-6">See booked and available dates at a glance.</p>
                    <div className="flex justify-center">
                        <DayPicker
                            mode="multiple"
                            selected={bookings.filter(b => b.status === 'confirmed').map(b => new Date(b.startDate))}
                            modifiers={{
                                pending: bookings.filter(b => b.status === 'pending').map(b => new Date(b.startDate))
                            }}
                            modifiersStyles={{
                                selected: { backgroundColor: '#ef4444', color: '#fff', fontWeight: 'bold' },
                                pending: { backgroundColor: 'rgba(239, 68, 68, 0.2)', color: '#ef4444' }
                            }}
                            className="bg-transparent text-luxury-white font-body scale-90 sm:scale-100"
                        />
                    </div>
                    <div className="mt-4 flex flex-col gap-2 text-xs font-body">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500" />
                            <span className="text-luxury-muted">Confirmed Booking</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/30 border border-red-500/50" />
                            <span className="text-luxury-muted">Pending Request</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-transparent border border-luxury-border" />
                            <span className="text-luxury-muted">Available Date</span>
                        </div>
                    </div>
                </div>

                {/* Bookings List Area */}
                <div className="xl:col-span-3 space-y-6">
                    {/* Filters */}
                    <div className="flex flex-wrap items-center gap-2 glass px-4 py-3 rounded-lg">
                        <Filter className="w-4 h-4 text-luxury-muted mr-2" />
                        {statusFilters.map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-4 py-1.5 text-[10px] font-body uppercase tracking-wider rounded-full transition-all ${filter === f
                                    ? "bg-gold-400 text-luxury-black font-medium"
                                    : "hover:bg-luxury-border text-luxury-muted hover:text-luxury-white"
                                    }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>

                    {/* Bookings List */}
                    <div className="space-y-4">
                        <AnimatePresence mode="popLayout">
                            {filteredBookings.map((booking) => (
                                <motion.div
                                    key={booking.id}
                                    layout
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="glass rounded-lg overflow-hidden border border-luxury-border/50 hover:border-gold-400/30 transition-colors"
                                >
                                    <div className="p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                            <div>
                                                <p className="text-[10px] text-luxury-muted font-body uppercase tracking-wider mb-2">Guest Contact</p>
                                                <p className="text-sm font-medium text-luxury-white font-display mb-1">{booking.userName}</p>
                                                <div className="space-y-1">
                                                    <p className="text-xs text-luxury-muted font-body flex items-center gap-2"><Mail className="w-3 h-3" /> {booking.userEmail}</p>
                                                    {booking.userPhone && <p className="text-xs text-luxury-muted font-body flex items-center gap-2"><Phone className="w-3 h-3" /> {booking.userPhone}</p>}
                                                </div>
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-luxury-muted font-body uppercase tracking-wider mb-2">Booked Dates & Venue</p>
                                                <div className="mb-2">
                                                    <span className="text-xs text-gold-400 font-body font-medium bg-gold-400/10 px-2.5 py-1 inline-block rounded border border-gold-400/20">{booking.startDate}</span>
                                                    {booking.endDate !== booking.startDate && (
                                                        <span className="text-xs text-gold-400 font-body font-medium bg-gold-400/10 px-2.5 py-1 inline-block rounded border border-gold-400/20 ml-2">to {booking.endDate}</span>
                                                    )}
                                                </div>
                                                <p className="text-sm text-luxury-white font-body">{booking.hallName}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-luxury-muted font-body uppercase tracking-wider mb-2">Event Details</p>
                                                <p className="text-sm text-luxury-white font-body mb-1">{booking.eventType}</p>
                                                <span className="text-xs px-2 py-0.5 rounded-full bg-luxury-border text-luxury-muted font-body">{booking.guests} guests</span>
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-luxury-muted font-body uppercase tracking-wider mb-2">Payment Confirmation</p>
                                                <p className="text-sm text-luxury-white font-display mb-2">{formatCurrency(booking.totalPrice)}</p>
                                                {booking.paymentId ? (
                                                    <span className="text-[10px] text-green-400 bg-green-400/10 px-2 py-1 rounded border border-green-400/20 tracking-wider flex items-center w-fit gap-1"><Hash className="w-3 h-3" /> {booking.paymentId}</span>
                                                ) : (
                                                    <span className="text-[10px] text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded border border-yellow-400/20 tracking-wider inline-block">Pending Payment</span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex flex-row lg:flex-col items-center justify-end gap-3 flex-shrink-0 border-t lg:border-t-0 lg:border-l border-luxury-border/50 pt-4 lg:pt-0 lg:pl-6">
                                            <span className={`px-4 py-1.5 rounded-full text-[10px] uppercase tracking-wider font-body font-medium text-center w-full lg:w-auto ${booking.status === "confirmed"
                                                ? "bg-green-400/10 text-green-400 border border-green-400/20"
                                                : booking.status === "pending"
                                                    ? "bg-yellow-400/10 text-yellow-400 border border-yellow-400/20"
                                                    : booking.status === "cancelled"
                                                        ? "bg-red-400/10 text-red-400 border border-red-400/20"
                                                        : "bg-luxury-card text-luxury-muted border border-luxury-border"
                                                }`}>
                                                {booking.status}
                                            </span>

                                            {booking.status === "pending" && (
                                                <div className="flex gap-2 w-full lg:w-auto justify-center">
                                                    <button
                                                        onClick={() => updateBookingStatus(booking.id, "confirmed")}
                                                        className="p-2 rounded-full flex items-center justify-center text-green-400 hover:bg-green-400/10 border border-transparent hover:border-green-400/20 transition-all"
                                                        title="Approve"
                                                    >
                                                        <CheckCircle className="w-5 h-5" />
                                                    </button>
                                                    <button
                                                        onClick={() => updateBookingStatus(booking.id, "rejected")}
                                                        className="p-2 rounded-full flex items-center justify-center text-red-400 hover:bg-red-400/10 border border-transparent hover:border-red-400/20 transition-all"
                                                        title="Reject"
                                                    >
                                                        <XCircle className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            )}

                                            {(booking.status === "confirmed" || booking.status === "pending") && (
                                                <button
                                                    onClick={() => updateBookingStatus(booking.id, "cancelled")}
                                                    className="p-2 text-xs font-body uppercase tracking-wider rounded flex items-center justify-center text-luxury-muted hover:text-red-400 hover:bg-red-400/10 transition-colors w-full lg:w-auto mt-auto"
                                                    title="Cancel Booking"
                                                >
                                                    <Ban className="w-3 h-3 mr-1" /> Cancel
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {filteredBookings.length === 0 && (
                            <div className="glass rounded-lg p-16 text-center border border-luxury-border/50">
                                <p className="paragraph">No bookings found in this category.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
