"use client";

import { motion } from "framer-motion";
import { useBooking } from "@/context/BookingContext";
import { formatCurrency } from "@/lib/utils";
import {
    CalendarDays,
    DollarSign,
    Clock,
    CheckCircle,
    TrendingUp,
    Users,
} from "lucide-react";

export default function AdminDashboard() {
    const { bookings } = useBooking();

    const totalBookings = bookings.length;
    const confirmedBookings = bookings.filter((b) => b.status === "confirmed").length;
    const pendingBookings = bookings.filter((b) => b.status === "pending").length;
    const totalRevenue = bookings
        .filter((b) => b.status === "confirmed")
        .reduce((acc, b) => acc + b.totalPrice, 0);

    const stats = [
        { label: "Total Bookings", value: totalBookings.toString(), icon: CalendarDays, trend: "+12%" },
        { label: "Confirmed", value: confirmedBookings.toString(), icon: CheckCircle, trend: "+8%" },
        { label: "Pending", value: pendingBookings.toString(), icon: Clock, trend: "-3%" },
        { label: "Revenue", value: formatCurrency(totalRevenue), icon: DollarSign, trend: "+24%" },
    ];

    const recentBookings = [...bookings].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ).slice(0, 5);

    return (
        <div>
            <div className="mb-8">
                <h1 className="font-display text-3xl text-luxury-white mb-2">Dashboard</h1>
                <p className="paragraph text-sm">Welcome back, here&apos;s your venue overview.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {stats.map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="glass rounded-lg p-6 hover:border-gold-400/20 transition-all duration-300"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <stat.icon className="w-5 h-5 text-gold-400" />
                            <span className={`text-xs font-body flex items-center gap-1 ${stat.trend.startsWith("+") ? "text-green-400" : "text-red-400"
                                }`}>
                                <TrendingUp className="w-3 h-3" />
                                {stat.trend}
                            </span>
                        </div>
                        <p className="font-display text-2xl text-luxury-white mb-1">{stat.value}</p>
                        <p className="text-xs text-luxury-muted font-body uppercase tracking-wider">{stat.label}</p>
                    </motion.div>
                ))}
            </div>

            {/* Recent Bookings */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="glass rounded-lg"
            >
                <div className="p-6 border-b border-luxury-border flex items-center justify-between">
                    <h2 className="font-display text-xl text-luxury-white">Recent Bookings</h2>
                    <a href="/admin/bookings" className="text-xs text-gold-400 font-body uppercase tracking-wider hover:text-gold-300 transition-colors">
                        View All →
                    </a>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-luxury-border">
                                <th className="text-left p-4 text-xs text-luxury-muted font-body uppercase tracking-wider">Guest</th>
                                <th className="text-left p-4 text-xs text-luxury-muted font-body uppercase tracking-wider">Venue</th>
                                <th className="text-left p-4 text-xs text-luxury-muted font-body uppercase tracking-wider">Date</th>
                                <th className="text-left p-4 text-xs text-luxury-muted font-body uppercase tracking-wider">Payment</th>
                                <th className="text-left p-4 text-xs text-luxury-muted font-body uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentBookings.map((booking) => (
                                <tr key={booking.id} className="border-b border-luxury-border/50 hover:bg-luxury-card/50 transition-colors">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-gold-400/10 flex items-center justify-center">
                                                <Users className="w-4 h-4 text-gold-400" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-luxury-white font-body">{booking.userName}</p>
                                                <p className="text-xs text-luxury-muted font-body">{booking.userEmail}</p>
                                                {booking.userPhone && <p className="text-[10px] text-luxury-muted/70 font-body mt-0.5">{booking.userPhone}</p>}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 text-sm text-luxury-white font-body">{booking.hallName}</td>
                                    <td className="p-4 text-sm text-luxury-muted font-body">{booking.startDate}</td>
                                    <td className="p-4">
                                        <p className="text-sm text-gold-400 font-body">{formatCurrency(booking.totalPrice)}</p>
                                        {booking.paymentId ? (
                                            <p className="text-[10px] text-luxury-muted font-mono mt-1 w-fit truncate">Txn: {booking.paymentId}</p>
                                        ) : (
                                            <p className="text-[10px] text-luxury-muted/50 font-body mt-1 italic">Pending</p>
                                        )}
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-body font-medium ${booking.status === "confirmed"
                                            ? "bg-green-400/10 text-green-400 border border-green-400/20"
                                            : booking.status === "pending"
                                                ? "bg-yellow-400/10 text-yellow-400 border border-yellow-400/20"
                                                : booking.status === "cancelled"
                                                    ? "bg-red-400/10 text-red-400 border border-red-400/20"
                                                    : "bg-luxury-card text-luxury-muted border border-luxury-border"
                                            }`}>
                                            {booking.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {recentBookings.length === 0 && (
                    <div className="p-10 text-center">
                        <p className="paragraph">No bookings yet.</p>
                    </div>
                )}
            </motion.div>
        </div>
    );
}
