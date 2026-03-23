"use client";

import { motion } from "framer-motion";
import { useBooking } from "@/context/BookingContext";
import { formatCurrency } from "@/lib/utils";
import { BarChart3, TrendingUp, Calendar, DollarSign } from "lucide-react";

export default function AdminAnalyticsPage() {
    const { bookings } = useBooking();

    const confirmedBookings = bookings.filter((b) => b.status === "confirmed");
    const totalRevenue = confirmedBookings.reduce((acc, b) => acc + b.totalPrice, 0);
    const avgBookingValue = confirmedBookings.length > 0 ? totalRevenue / confirmedBookings.length : 0;

    // Revenue by venue
    const revenueByVenue = confirmedBookings.reduce((acc, b) => {
        acc[b.hallName] = (acc[b.hallName] || 0) + b.totalPrice;
        return acc;
    }, {} as Record<string, number>);

    // Bookings by event type
    const bookingsByType = bookings.reduce((acc, b) => {
        acc[b.eventType] = (acc[b.eventType] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    // Bookings by status
    const bookingsByStatus = bookings.reduce((acc, b) => {
        acc[b.status] = (acc[b.status] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const maxRevenue = Math.max(...Object.values(revenueByVenue), 1);
    const maxType = Math.max(...Object.values(bookingsByType), 1);

    return (
        <div>
            <div className="mb-8">
                <h1 className="font-display text-3xl text-luxury-white mb-2">Analytics</h1>
                <p className="paragraph text-sm">Revenue insights and booking trends.</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {[
                    { label: "Total Revenue", value: formatCurrency(totalRevenue), icon: DollarSign, color: "text-green-400" },
                    { label: "Avg. Booking Value", value: formatCurrency(avgBookingValue), icon: TrendingUp, color: "text-gold-400" },
                    { label: "Total Events", value: confirmedBookings.length.toString(), icon: Calendar, color: "text-blue-400" },
                ].map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass rounded-lg p-6"
                    >
                        <stat.icon className={`w-5 h-5 ${stat.color} mb-3`} />
                        <p className="font-display text-2xl text-luxury-white mb-1">{stat.value}</p>
                        <p className="text-xs text-luxury-muted font-body uppercase tracking-wider">{stat.label}</p>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Revenue by Venue */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="glass rounded-lg p-6"
                >
                    <div className="flex items-center gap-2 mb-6">
                        <BarChart3 className="w-5 h-5 text-gold-400" />
                        <h2 className="font-display text-xl text-luxury-white">Revenue by Venue</h2>
                    </div>
                    <div className="space-y-4">
                        {Object.entries(revenueByVenue).length > 0 ? (
                            Object.entries(revenueByVenue).map(([venue, revenue]) => (
                                <div key={venue}>
                                    <div className="flex justify-between text-sm font-body mb-2">
                                        <span className="text-luxury-muted">{venue}</span>
                                        <span className="text-gold-400">{formatCurrency(revenue)}</span>
                                    </div>
                                    <div className="h-2 bg-luxury-card rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${(revenue / maxRevenue) * 100}%` }}
                                            transition={{ duration: 1, delay: 0.5 }}
                                            className="h-full bg-gold-gradient rounded-full"
                                        />
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="paragraph text-sm text-center py-4">No revenue data yet</p>
                        )}
                    </div>
                </motion.div>

                {/* Bookings by Event Type */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="glass rounded-lg p-6"
                >
                    <div className="flex items-center gap-2 mb-6">
                        <Calendar className="w-5 h-5 text-gold-400" />
                        <h2 className="font-display text-xl text-luxury-white">Events by Type</h2>
                    </div>
                    <div className="space-y-4">
                        {Object.entries(bookingsByType).length > 0 ? (
                            Object.entries(bookingsByType).map(([type, count]) => (
                                <div key={type}>
                                    <div className="flex justify-between text-sm font-body mb-2">
                                        <span className="text-luxury-muted">{type}</span>
                                        <span className="text-luxury-white">{count} bookings</span>
                                    </div>
                                    <div className="h-2 bg-luxury-card rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${(count / maxType) * 100}%` }}
                                            transition={{ duration: 1, delay: 0.6 }}
                                            className="h-full rounded-full"
                                            style={{
                                                background: `linear-gradient(90deg, #C9A84C, #D4AF37)`,
                                            }}
                                        />
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="paragraph text-sm text-center py-4">No booking data yet</p>
                        )}
                    </div>
                </motion.div>

                {/* Booking Status Distribution */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="glass rounded-lg p-6 lg:col-span-2"
                >
                    <h2 className="font-display text-xl text-luxury-white mb-6">Booking Status Distribution</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {[
                            { status: "confirmed", color: "bg-green-400", textColor: "text-green-400" },
                            { status: "pending", color: "bg-yellow-400", textColor: "text-yellow-400" },
                            { status: "cancelled", color: "bg-red-400", textColor: "text-red-400" },
                            { status: "rejected", color: "bg-luxury-muted", textColor: "text-luxury-muted" },
                        ].map((item) => (
                            <div key={item.status} className="text-center glass-gold rounded-lg p-4">
                                <div className={`w-3 h-3 rounded-full ${item.color} mx-auto mb-3`} />
                                <p className={`font-display text-3xl ${item.textColor}`}>
                                    {bookingsByStatus[item.status] || 0}
                                </p>
                                <p className="text-xs text-luxury-muted font-body uppercase tracking-wider mt-1">
                                    {item.status}
                                </p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
