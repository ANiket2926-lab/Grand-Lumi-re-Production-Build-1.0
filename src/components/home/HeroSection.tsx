"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        // Removed artificial slow-down to allow native, hardware-accelerated smooth playback
    }, []);

    return (
        <section className="relative h-screen w-full overflow-hidden">
            {/* Video Background */}
            <div className="absolute inset-0 bg-luxury-black">
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="absolute inset-0 w-full h-full object-cover transform-gpu"
                    style={{ willChange: 'transform', transform: 'translateZ(0)' }}
                >
                    <source src="/videos/hero.mp4" type="video/mp4" />
                </video>
            </div>

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
                {/* Decorative line */}
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: 80 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="h-[1px] bg-gold-400/60 mb-8"
                />

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="font-body text-xs md:text-sm uppercase tracking-[0.3em] text-gold-400/80 mb-6"
                >
                    Premium Event Destination
                </motion.p>

                {/* Main Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.7 }}
                    className="heading-xl mb-4"
                >
                    <span className="block font-display text-luxury-white">Where Moments</span>
                    <span className="block font-display text-gradient-gold mt-2">Become Memories</span>
                </motion.h1>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="paragraph max-w-xl mx-auto mt-6 mb-10 text-base md:text-lg"
                >
                    Experience unparalleled luxury at Mumbai&apos;s most prestigious banquet halls.
                    Craft your dream celebration with us.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                    className="flex flex-col sm:flex-row gap-4"
                >
                    <Link href="/booking" className="btn-gold text-sm">
                        Book Your Event
                    </Link>
                    <Link href="/tour" className="btn-gold-outline text-sm">
                        Virtual Tour
                    </Link>
                </motion.div>

                {/* Decorative line */}
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: 80 }}
                    transition={{ duration: 1, delay: 1.4 }}
                    className="h-[1px] bg-gold-400/60 mt-12"
                />
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
            >
                <span className="text-xs uppercase tracking-[0.2em] text-luxury-muted font-body">Scroll</span>
                <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
                    <ChevronDown className="w-5 h-5 text-gold-400/60" />
                </motion.div>
            </motion.div>
        </section>
    );
}
