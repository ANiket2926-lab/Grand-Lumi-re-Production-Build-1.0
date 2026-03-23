"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format, isBefore, startOfDay } from "date-fns";
import { HALLS } from "@/lib/constants";
import { useBooking } from "@/context/BookingContext";
import { CalendarOff, X, Plus } from "lucide-react";

export default function AdminBlockedDatesPage() {
    const { blockedDates, blockDate, unblockDate } = useBooking();
    const [selectedHall, setSelectedHall] = useState(HALLS[0].id);
    const [reason, setReason] = useState("");

    const hallBlockedDates = blockedDates.filter((d) => d.hallId === selectedHall);

    const handleSelect = (date: Date | undefined) => {
        if (!date) return;
        const dateStr = format(date, "yyyy-MM-dd");
        const isBlocked = hallBlockedDates.some((d) => d.date === dateStr);
        if (isBlocked) {
            unblockDate(dateStr, selectedHall);
        } else {
            blockDate(dateStr, selectedHall, reason || "Blocked by admin");
        }
    };

    const isBlocked = (date: Date): boolean => {
        const dateStr = format(date, "yyyy-MM-dd");
        return hallBlockedDates.some((d) => d.date === dateStr);
    };

    return (
        <div>
            <div className="mb-8">
                <h1 className="font-display text-3xl text-luxury-white mb-2">Block Dates</h1>
                <p className="paragraph text-sm">Manually block dates to prevent bookings.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Calendar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass rounded-lg p-6"
                >
                    {/* Hall Selector */}
                    <div className="mb-6">
                        <label className="block text-xs uppercase tracking-wider text-luxury-muted font-body mb-2">Select Venue</label>
                        <div className="flex gap-2 flex-wrap">
                            {HALLS.map((hall) => (
                                <button
                                    key={hall.id}
                                    onClick={() => setSelectedHall(hall.id)}
                                    className={`px-4 py-2 text-xs font-body uppercase tracking-wider rounded transition-all ${selectedHall === hall.id
                                            ? "bg-gold-400 text-luxury-black font-medium"
                                            : "glass text-luxury-muted hover:text-gold-400"
                                        }`}
                                >
                                    {hall.name.split("The ")[1] || hall.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Reason Input */}
                    <div className="mb-6">
                        <label className="block text-xs uppercase tracking-wider text-luxury-muted font-body mb-2">Block Reason (optional)</label>
                        <input
                            type="text"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            placeholder="e.g., Maintenance, Private Event"
                            className="w-full px-4 py-2 bg-luxury-card border border-luxury-border rounded-lg text-luxury-white placeholder:text-luxury-muted/50 focus:border-gold-400/50 focus:outline-none transition-colors font-body text-sm"
                        />
                    </div>

                    {/* Calendar */}
                    <div className="flex justify-center">
                        <DayPicker
                            mode="single"
                            onSelect={handleSelect}
                            disabled={(date) => isBefore(startOfDay(date), startOfDay(new Date()))}
                            fromDate={new Date()}
                            className="font-body"
                            modifiers={{
                                blocked: isBlocked,
                            }}
                            modifiersStyles={{
                                blocked: {
                                    backgroundColor: "rgba(239, 68, 68, 0.2)",
                                    color: "#ef4444",
                                    borderRadius: "4px",
                                },
                            }}
                        />
                    </div>

                    <p className="text-xs text-luxury-muted font-body text-center mt-4">
                        Click a date to block/unblock it. Red dates are currently blocked.
                    </p>
                </motion.div>

                {/* Blocked Dates List */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="glass rounded-lg p-6"
                >
                    <div className="flex items-center gap-2 mb-6">
                        <CalendarOff className="w-5 h-5 text-red-400" />
                        <h2 className="font-display text-xl text-luxury-white">Blocked Dates</h2>
                        <span className="ml-auto text-xs text-luxury-muted font-body glass px-3 py-1 rounded-full">
                            {hallBlockedDates.length} dates
                        </span>
                    </div>

                    <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
                        <AnimatePresence>
                            {hallBlockedDates.length > 0 ? (
                                hallBlockedDates
                                    .sort((a, b) => a.date.localeCompare(b.date))
                                    .map((blocked) => (
                                        <motion.div
                                            key={`${blocked.date}-${blocked.hallId}`}
                                            initial={{ opacity: 0, x: 10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -10 }}
                                            className="flex items-center justify-between p-3 rounded-lg bg-red-400/5 border border-red-400/10"
                                        >
                                            <div>
                                                <p className="text-sm text-luxury-white font-body">{blocked.date}</p>
                                                <p className="text-xs text-luxury-muted font-body">{blocked.reason}</p>
                                            </div>
                                            <button
                                                onClick={() => unblockDate(blocked.date, blocked.hallId)}
                                                className="w-7 h-7 rounded-full flex items-center justify-center text-red-400 hover:bg-red-400/10 transition-colors"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </motion.div>
                                    ))
                            ) : (
                                <div className="text-center py-12">
                                    <CalendarOff className="w-12 h-12 text-luxury-border mx-auto mb-4" />
                                    <p className="paragraph text-sm">No blocked dates for this venue.</p>
                                    <p className="text-xs text-luxury-muted font-body mt-1">Click dates on the calendar to block them.</p>
                                </div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
