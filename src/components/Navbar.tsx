"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, User, LogOut } from "lucide-react";
import { NAV_LINKS, SITE_NAME } from "@/lib/constants";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const pathname = usePathname();
    const { user, logout, isAdmin } = useAuth();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
                    ? "glass-strong py-3 shadow-lg shadow-black/20"
                    : "py-6 bg-transparent"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <span className="text-2xl font-display font-bold text-gradient-gold tracking-wider">
                            {SITE_NAME}
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-8">
                        {NAV_LINKS.map((link) => {
                            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`relative font-body text-sm uppercase tracking-widest transition-colors duration-300 group ${isActive ? "text-gold-400" : "text-luxury-muted hover:text-gold-400"}`}
                                >
                                    {link.label}
                                    <span className={`absolute -bottom-1 left-0 h-[1px] bg-gold-400 transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"}`} />
                                </Link>
                            );
                        })}
                        {isAdmin ? (
                            <Link
                                href="/admin"
                                className="relative font-body text-sm uppercase tracking-widest text-gold-400 hover:text-gold-300 transition-colors duration-300"
                            >
                                Admin
                            </Link>
                        ) : user ? (
                            <Link
                                href="/my-bookings"
                                className="relative font-body text-sm uppercase tracking-widest text-gold-400 hover:text-gold-300 transition-colors duration-300"
                            >
                                My Bookings
                            </Link>
                        ) : null}
                    </div>

                    {/* Auth Buttons */}
                    <div className="hidden lg:flex items-center gap-4">
                        {user ? (
                            <div className="flex items-center gap-4">
                                <span className="text-sm text-luxury-muted font-body">
                                    <User className="w-4 h-4 inline mr-1" />
                                    {user.name}
                                </span>
                                <button
                                    onClick={logout}
                                    className="flex items-center gap-1 text-sm text-luxury-muted hover:text-gold-400 transition-colors font-body"
                                >
                                    <LogOut className="w-4 h-4" />
                                </button>
                            </div>
                        ) : (
                            <Link href="/login" className="btn-gold-outline text-xs">
                                Sign In
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="lg:hidden text-luxury-white"
                        onClick={() => setIsMobileOpen(!isMobileOpen)}
                    >
                        {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed inset-0 z-40 bg-luxury-black/98 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
                    >
                        {NAV_LINKS.map((link, i) => {
                            const isActive = pathname === link.href;
                            return (
                                <motion.div
                                    key={link.href}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsMobileOpen(false)}
                                        className={`font-display text-3xl transition-colors ${isActive ? "text-gold-400" : "text-luxury-white hover:text-gold-400"}`}
                                    >
                                        {link.label}
                                    </Link>
                                </motion.div>
                            );
                        })}
                        {user && !isAdmin && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: NAV_LINKS.length * 0.1 }}
                            >
                                <Link
                                    href="/my-bookings"
                                    onClick={() => setIsMobileOpen(false)}
                                    className="font-display text-3xl text-gold-400 hover:text-gold-300 transition-colors"
                                >
                                    My Bookings
                                </Link>
                            </motion.div>
                        )}
                        {isAdmin && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: NAV_LINKS.length * 0.1 }}
                            >
                                <Link
                                    href="/admin"
                                    onClick={() => setIsMobileOpen(false)}
                                    className="font-display text-3xl text-gold-400 hover:text-gold-300 transition-colors"
                                >
                                    Admin
                                </Link>
                            </motion.div>
                        )}
                        {user ? (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: (NAV_LINKS.length + 1) * 0.1 }}
                                className="flex flex-col items-center gap-4 mt-4"
                            >
                                <span className="text-luxury-muted font-body">{user.name}</span>
                                <button onClick={() => { logout(); setIsMobileOpen(false); }} className="btn-gold-outline text-xs">
                                    Sign Out
                                </button>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: NAV_LINKS.length * 0.1 }}
                            >
                                <Link href="/login" onClick={() => setIsMobileOpen(false)} className="btn-gold text-sm">
                                    Sign In
                                </Link>
                            </motion.div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
