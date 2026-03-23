"use client";

import { createContext, useContext, useState, useCallback } from "react";
import type { Booking, BookingStatus } from "@/lib/constants";
import { generateId } from "@/lib/utils";

interface BookingContextType {
    bookings: Booking[];
    blockedDates: { date: string; hallId: string; reason?: string }[];
    addBooking: (booking: Omit<Booking, "id" | "createdAt" | "status">) => string;
    updateBookingStatus: (id: string, status: BookingStatus) => void;
    getBookingsForHall: (hallId: string) => Booking[];
    isDateBlocked: (date: string, hallId: string) => boolean;
    isDateBooked: (date: string, hallId: string) => boolean;
    blockDate: (date: string, hallId: string, reason?: string) => void;
    unblockDate: (date: string, hallId: string) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

// Initial demo bookings
const INITIAL_BOOKINGS: Booking[] = [
    {
        id: "bk-1",
        userId: "user-1",
        hallId: "grand-ballroom",
        hallName: "The Grand Ballroom",
        startDate: "2026-04-15",
        endDate: "2026-04-15",
        guests: 350,
        eventType: "Wedding",
        status: "confirmed",
        totalPrice: 250000,
        userName: "Demo User",
        userEmail: "user@demo.com",
        userPhone: "+91 98765 43210",
        paymentId: "pay_XYZLumiere123",
        createdAt: "2026-03-20",
    },
    {
        id: "bk-2",
        userId: "user-1",
        hallId: "ivory-lounge",
        hallName: "The Ivory Lounge",
        startDate: "2026-04-20",
        endDate: "2026-04-20",
        guests: 80,
        eventType: "Corporate",
        status: "pending",
        totalPrice: 120000,
        userName: "Demo User",
        userEmail: "user@demo.com",
        userPhone: "+91 91234 56780",
        createdAt: "2026-03-21",
    },
];

export function BookingProvider({ children }: { children: React.ReactNode }) {
    const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
    const [blockedDates, setBlockedDates] = useState<{ date: string; hallId: string; reason?: string }[]>([]);

    const addBooking = useCallback((bookingData: Omit<Booking, "id" | "createdAt" | "status">): string => {
        const id = `bk-${generateId()}`;
        const newBooking: Booking = {
            ...bookingData,
            id,
            status: "pending",
            createdAt: new Date().toISOString().split("T")[0],
        };
        setBookings((prev) => [...prev, newBooking]);
        return id;
    }, []);

    const updateBookingStatus = useCallback((id: string, status: BookingStatus) => {
        setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
    }, []);

    const getBookingsForHall = useCallback(
        (hallId: string) => bookings.filter((b) => b.hallId === hallId),
        [bookings]
    );

    const isDateBlocked = useCallback(
        (date: string, hallId: string) => blockedDates.some((d) => d.date === date && d.hallId === hallId),
        [blockedDates]
    );

    const isDateBooked = useCallback(
        (date: string, hallId: string) =>
            bookings.some(
                (b) =>
                    b.hallId === hallId &&
                    b.startDate <= date &&
                    b.endDate >= date &&
                    (b.status === "confirmed" || b.status === "pending")
            ),
        [bookings]
    );

    const blockDate = useCallback((date: string, hallId: string, reason?: string) => {
        setBlockedDates((prev) => [...prev, { date, hallId, reason }]);
    }, []);

    const unblockDate = useCallback((date: string, hallId: string) => {
        setBlockedDates((prev) => prev.filter((d) => !(d.date === date && d.hallId === hallId)));
    }, []);

    return (
        <BookingContext.Provider
            value={{
                bookings,
                blockedDates,
                addBooking,
                updateBookingStatus,
                getBookingsForHall,
                isDateBlocked,
                isDateBooked,
                blockDate,
                unblockDate,
            }}
        >
            {children}
        </BookingContext.Provider>
    );
}

export function useBooking() {
    const context = useContext(BookingContext);
    if (!context) throw new Error("useBooking must be used within a BookingProvider");
    return context;
}
