"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

export default function CTASection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section ref={ref} className="py-32 section-padding relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-luxury-black via-[#0f0d08] to-luxury-black" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-gold-400/[0.03] blur-[150px]" />

            <div className="max-w-4xl mx-auto text-center relative">
                <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: 60 } : {}}
                    transition={{ duration: 0.8 }}
                    className="h-[1px] bg-gold-400/40 mx-auto mb-8"
                />

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.2 }}
                    className="font-body text-xs uppercase tracking-[0.3em] text-gold-400/80 mb-6"
                >
                    Begin Your Journey
                </motion.p>

                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="heading-lg text-luxury-white mb-6"
                >
                    Ready to Create Something{" "}
                    <span className="text-gradient-gold">Extraordinary</span>?
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="paragraph max-w-2xl mx-auto mb-10 text-base"
                >
                    Let us help you design an unforgettable event. From intimate gatherings to grand celebrations,
                    every detail will be meticulously crafted to exceed your expectations.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <Link href="/booking" className="btn-gold text-sm">
                        Book Your Dream Event
                    </Link>
                    <Link href="/gallery" className="btn-gold-outline text-sm">
                        View Our Gallery
                    </Link>
                </motion.div>

                <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: 60 } : {}}
                    transition={{ duration: 0.8, delay: 0.9 }}
                    className="h-[1px] bg-gold-400/40 mx-auto mt-16"
                />
            </div>
        </section>
    );
}
