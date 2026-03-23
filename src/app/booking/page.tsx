"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { addDays, format, isBefore, isWeekend as dateFnsIsWeekend, startOfDay } from "date-fns";
import { HALLS } from "@/lib/constants";
import { useAuth } from "@/context/AuthContext";
import { useBooking } from "@/context/BookingContext";
import { formatCurrency, isWeekend } from "@/lib/utils";
import { Users, Calendar, Sparkles, ChevronRight, AlertCircle } from "lucide-react";

export default function BookingPage() {
    const { user } = useAuth();
    const { addBooking, isDateBlocked, isDateBooked } = useBooking();
    const router = useRouter();

    const [selectedHall, setSelectedHall] = useState(HALLS[0]);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>();
    const [guests, setGuests] = useState(100);
    const [eventType, setEventType] = useState("Wedding");
    const [step, setStep] = useState(1);

    const eventTypes = ["Wedding", "Corporate", "Birthday", "Engagement", "Anniversary", "Other"];

    const price = useMemo(() => {
        if (!selectedDate) return 0;
        return isWeekend(selectedDate) ? selectedHall.priceWeekend : selectedHall.priceWeekday;
    }, [selectedDate, selectedHall]);

    const isDateUnavailable = (date: Date): boolean => {
        const dateStr = format(date, "yyyy-MM-dd");
        return (
            isBefore(startOfDay(date), startOfDay(new Date())) ||
            isDateBlocked(dateStr, selectedHall.id) ||
            isDateBooked(dateStr, selectedHall.id)
        );
    };

    const handleBooking = () => {
        if (!user) {
            router.push("/login");
            return;
        }
        if (!selectedDate) return;

        const dateStr = format(selectedDate, "yyyy-MM-dd");
        const bookingId = addBooking({
            userId: user.id,
            hallId: selectedHall.id,
            hallName: selectedHall.name,
            startDate: dateStr,
            endDate: dateStr,
            guests,
            eventType,
            totalPrice: price,
            userName: user.name,
            userEmail: user.email,
        });

        router.push(`/booking/payment?bookingId=${bookingId}&amount=${price}`);
    };

    return (
        <div className="pt-28 pb-20 min-h-screen bg-luxury-black section-padding">
            {/* Header */}
            <div className="text-center mb-16">
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="font-body text-xs uppercase tracking-[0.3em] text-gold-400/80 mb-4"
                >
                    Reserve Your Date
                </motion.p>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="heading-lg text-luxury-white mb-4"
                >
                    Book Your <span className="text-gradient-gold">Event</span>
                </motion.h1>
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: 60 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="h-[1px] bg-gold-400/40 mx-auto"
                />
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-center gap-4 mb-16 max-w-xl mx-auto">
                {["Select Venue", "Choose Date", "Confirm"].map((label, i) => (
                    <div key={label} className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-body transition-all duration-300 ${step > i + 1
                                    ? "bg-gold-400 text-luxury-black"
                                    : step === i + 1
                                        ? "border-2 border-gold-400 text-gold-400"
                                        : "border border-luxury-border text-luxury-muted"
                                    }`}
                            >
                                {i + 1}
                            </div>
                            <span className={`text-xs font-body uppercase tracking-wider hidden sm:inline ${step >= i + 1 ? "text-gold-400" : "text-luxury-muted"
                                }`}>
                                {label}
                            </span>
                        </div>
                        {i < 2 && (
                            <div className={`w-12 h-[1px] ${step > i + 1 ? "bg-gold-400" : "bg-luxury-border"}`} />
                        )}
                    </div>
                ))}
            </div>

            <div className="max-w-6xl mx-auto">
                <AnimatePresence mode="wait">
                    {/* Step 1: Select Venue */}
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="grid grid-cols-1 md:grid-cols-3 gap-6"
                        >
                            {HALLS.map((hall) => (
                                <motion.div
                                    key={hall.id}
                                    whileHover={{ y: -8 }}
                                    onClick={() => {
                                        setSelectedHall(hall);
                                        setStep(2);
                                    }}
                                    className={`cursor-pointer rounded-lg overflow-hidden transition-all duration-300 ${selectedHall.id === hall.id ? "glass-gold ring-1 ring-gold-400/30" : "glass hover:border-gold-400/20"
                                        }`}
                                >
                                    {/* Hall Image */}
                                    <div className="h-48 relative overflow-hidden group">
                                        <img
                                            src={hall.images[0]}
                                            alt={hall.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                                        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-luxury-card to-transparent" />
                                    </div>

                                    <div className="p-6">
                                        <h3 className="font-display text-xl text-luxury-white mb-2">{hall.name}</h3>
                                        <p className="paragraph text-xs mb-4 line-clamp-2">{hall.description}</p>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-1 text-luxury-muted">
                                                <Users className="w-4 h-4" />
                                                <span className="text-xs font-body">Up to {hall.capacity}</span>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xs text-luxury-muted font-body">from</p>
                                                <p className="text-gold-400 font-display text-lg">{formatCurrency(hall.priceWeekday)}</p>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-2 mt-4">
                                            {hall.features.map((f) => (
                                                <span key={f} className="text-[10px] uppercase tracking-wider text-luxury-muted font-body px-2 py-1 rounded-full border border-luxury-border">
                                                    {f}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}

                    {/* Step 2: Choose Date */}
                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                        >
                            {/* Calendar */}
                            <div className="glass rounded-lg p-8">
                                <h3 className="font-display text-xl text-luxury-white mb-6">Select Date</h3>
                                <div className="flex justify-center">
                                    <DayPicker
                                        mode="single"
                                        selected={selectedDate}
                                        onSelect={setSelectedDate}
                                        disabled={isDateUnavailable}
                                        fromDate={new Date()}
                                        toDate={addDays(new Date(), 365)}
                                        className="font-body"
                                        modifiers={{
                                            weekend: (date) => dateFnsIsWeekend(date),
                                            booked: (date) => isDateBooked(format(date, "yyyy-MM-dd"), selectedHall.id),
                                        }}
                                        modifiersStyles={{
                                            weekend: { color: "#D4AF37" },
                                            booked: { backgroundColor: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', textDecoration: 'line-through' }
                                        }}
                                    />
                                </div>

                                <div className="flex items-center gap-6 mt-6 text-xs font-body">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-gold-400" />
                                        <span className="text-luxury-muted">Weekend (Premium)</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500/30 border border-red-500/30" />
                                        <span className="text-luxury-muted">Already Booked</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-luxury-border" />
                                        <span className="text-luxury-muted">Unavailable</span>
                                    </div>
                                </div>
                            </div>

                            {/* Booking Form */}
                            <div className="glass rounded-lg p-8">
                                <h3 className="font-display text-xl text-luxury-white mb-6">Event Details</h3>

                                <div className="space-y-6">
                                    {/* Selected Venue */}
                                    <div className="glass-gold rounded-lg p-4 flex items-center gap-4">
                                        <Sparkles className="w-5 h-5 text-gold-400" />
                                        <div>
                                            <p className="font-display text-lg text-luxury-white">{selectedHall.name}</p>
                                            <p className="text-xs text-luxury-muted font-body">Capacity: {selectedHall.capacity} guests</p>
                                        </div>
                                    </div>

                                    {/* Event Type */}
                                    <div>
                                        <label className="block text-xs uppercase tracking-wider text-luxury-muted font-body mb-2">Event Type</label>
                                        <div className="grid grid-cols-3 gap-2">
                                            {eventTypes.map((type) => (
                                                <button
                                                    key={type}
                                                    onClick={() => setEventType(type)}
                                                    className={`py-2 px-3 text-xs font-body uppercase tracking-wider rounded transition-all duration-300 ${eventType === type
                                                        ? "bg-gold-400 text-luxury-black font-medium"
                                                        : "glass text-luxury-muted hover:text-gold-400"
                                                        }`}
                                                >
                                                    {type}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Guest Count */}
                                    <div>
                                        <label className="block text-xs uppercase tracking-wider text-luxury-muted font-body mb-2">
                                            Number of Guests: {guests}
                                        </label>
                                        <input
                                            type="range"
                                            min={20}
                                            max={selectedHall.capacity}
                                            value={guests}
                                            onChange={(e) => setGuests(Number(e.target.value))}
                                            className="w-full h-1 bg-luxury-border rounded-full appearance-none cursor-pointer accent-gold-400"
                                        />
                                        <div className="flex justify-between text-xs text-luxury-muted font-body mt-1">
                                            <span>20</span>
                                            <span>{selectedHall.capacity}</span>
                                        </div>
                                    </div>

                                    {/* Price Summary */}
                                    {selectedDate && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="border-t border-luxury-border pt-6"
                                        >
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-sm text-luxury-muted font-body">Date</span>
                                                <span className="text-sm text-luxury-white font-body">{format(selectedDate, "MMMM d, yyyy")}</span>
                                            </div>
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-sm text-luxury-muted font-body">Type</span>
                                                <span className="text-sm text-luxury-white font-body">
                                                    {isWeekend(selectedDate) ? "Weekend" : "Weekday"}
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center mb-4">
                                                <span className="text-sm text-luxury-muted font-body">Guests</span>
                                                <span className="text-sm text-luxury-white font-body">{guests}</span>
                                            </div>
                                            <div className="divider-gold mb-4" />
                                            <div className="flex justify-between items-center">
                                                <span className="font-display text-lg text-luxury-white">Total</span>
                                                <span className="font-display text-2xl text-gradient-gold">{formatCurrency(price)}</span>
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* Buttons */}
                                    <div className="flex gap-4">
                                        <button
                                            onClick={() => setStep(1)}
                                            className="btn-gold-outline text-xs flex-1"
                                        >
                                            Back
                                        </button>
                                        <button
                                            onClick={() => selectedDate && setStep(3)}
                                            disabled={!selectedDate}
                                            className="btn-gold text-xs flex-1 flex items-center justify-center gap-2 disabled:opacity-30"
                                        >
                                            Continue <ChevronRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 3: Confirm */}
                    {step === 3 && selectedDate && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="max-w-2xl mx-auto"
                        >
                            <div className="glass-gold rounded-lg p-10">
                                <h3 className="font-display text-2xl text-luxury-white text-center mb-8">Booking Summary</h3>

                                <div className="space-y-4">
                                    {[
                                        { label: "Venue", value: selectedHall.name },
                                        { label: "Date", value: format(selectedDate, "EEEE, MMMM d, yyyy") },
                                        { label: "Event Type", value: eventType },
                                        { label: "Guests", value: guests.toString() },
                                        { label: "Rate Type", value: isWeekend(selectedDate) ? "Weekend Premium" : "Weekday Standard" },
                                    ].map((item) => (
                                        <div key={item.label} className="flex justify-between items-center py-2 border-b border-luxury-border/50">
                                            <span className="text-sm text-luxury-muted font-body">{item.label}</span>
                                            <span className="text-sm text-luxury-white font-body">{item.value}</span>
                                        </div>
                                    ))}
                                    <div className="flex justify-between items-center pt-4">
                                        <span className="font-display text-xl text-luxury-white">Total Amount</span>
                                        <span className="font-display text-3xl text-gradient-gold">{formatCurrency(price)}</span>
                                    </div>
                                </div>

                                {!user && (
                                    <div className="mt-6 flex items-center gap-2 text-yellow-400 text-sm font-body">
                                        <AlertCircle className="w-4 h-4" />
                                        <span>Please sign in to complete your booking</span>
                                    </div>
                                )}

                                <div className="flex gap-4 mt-8">
                                    <button onClick={() => setStep(2)} className="btn-gold-outline text-xs flex-1">
                                        Back
                                    </button>
                                    <button onClick={handleBooking} className="btn-gold text-xs flex-1 flex items-center justify-center gap-2">
                                        <Calendar className="w-4 h-4" />
                                        {user ? "Proceed to Payment" : "Sign In to Book"}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
