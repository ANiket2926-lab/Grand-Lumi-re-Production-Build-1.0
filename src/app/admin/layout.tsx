"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import {
    LayoutDashboard,
    CalendarDays,
    BarChart3,
    CalendarOff,
    LogOut,
    ChevronRight,
} from "lucide-react";

const adminLinks = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/bookings", label: "Bookings", icon: CalendarDays },
    { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
    { href: "/admin/blocked-dates", label: "Block Dates", icon: CalendarOff },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { user, isAdmin, logout, isLoading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!isLoading && (!user || !isAdmin)) {
            router.push("/login");
        }
    }, [user, isAdmin, isLoading, router]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-luxury-black flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-gold-400 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!user || !isAdmin) return null;

    return (
        <div className="min-h-screen bg-luxury-black pt-20">
            <div className="flex">
                {/* Sidebar */}
                <motion.aside
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="hidden md:flex w-64 flex-col fixed left-0 top-20 bottom-0 glass border-r border-luxury-border z-30"
                >
                    <div className="p-6 border-b border-luxury-border">
                        <h2 className="font-display text-lg text-gradient-gold font-bold">Admin Panel</h2>
                        <p className="text-xs text-luxury-muted font-body mt-1">Grand Lumière</p>
                    </div>

                    <nav className="flex-1 p-4 space-y-1">
                        {adminLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-body transition-all duration-300 ${isActive
                                            ? "bg-gold-400/10 text-gold-400 border border-gold-400/20"
                                            : "text-luxury-muted hover:text-luxury-white hover:bg-luxury-card"
                                        }`}
                                >
                                    <link.icon className="w-4 h-4" />
                                    <span>{link.label}</span>
                                    {isActive && <ChevronRight className="w-3 h-3 ml-auto" />}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="p-4 border-t border-luxury-border">
                        <button
                            onClick={logout}
                            className="flex items-center gap-3 px-4 py-3 w-full text-sm font-body text-luxury-muted hover:text-red-400 transition-colors rounded-lg hover:bg-luxury-card"
                        >
                            <LogOut className="w-4 h-4" />
                            <span>Sign Out</span>
                        </button>
                    </div>
                </motion.aside>

                {/* Mobile Nav */}
                <div className="md:hidden fixed bottom-0 left-0 right-0 glass border-t border-luxury-border z-30 flex">
                    {adminLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`flex-1 flex flex-col items-center gap-1 py-3 text-[10px] font-body uppercase tracking-wider transition-colors ${isActive ? "text-gold-400" : "text-luxury-muted"
                                    }`}
                            >
                                <link.icon className="w-4 h-4" />
                                <span>{link.label.split(" ")[0]}</span>
                            </Link>
                        );
                    })}
                </div>

                {/* Main Content */}
                <main className="flex-1 md:ml-64 p-6 md:p-10 pb-24 md:pb-10">
                    {children}
                </main>
            </div>
        </div>
    );
}
