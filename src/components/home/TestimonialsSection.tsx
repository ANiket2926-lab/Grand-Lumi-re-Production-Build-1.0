"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { TESTIMONIALS } from "@/lib/constants";

export default function TestimonialsSection() {
    const [current, setCurrent] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    const next = () => setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
    const prev = () => setCurrent((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

    return (
        <section ref={ref} className="py-32 section-padding bg-luxury-black relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-luxury-darker via-luxury-black to-luxury-darker" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gold-400/[0.02] blur-[120px]" />

            <div className="max-w-4xl mx-auto relative">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        className="font-body text-xs uppercase tracking-[0.3em] text-gold-400/80 mb-4"
                    >
                        Testimonials
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.2 }}
                        className="heading-lg text-luxury-white"
                    >
                        Words of <span className="text-gradient-gold">Praise</span>
                    </motion.h2>
                </div>

                {/* Testimonial Card */}
                <div className="relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="glass-gold rounded-lg p-10 md:p-14 text-center"
                        >
                            {/* Stars */}
                            <div className="flex justify-center gap-1 mb-8">
                                {Array.from({ length: TESTIMONIALS[current].rating }).map((_, i) => (
                                    <Star key={i} className="w-5 h-5 text-gold-400 fill-gold-400" />
                                ))}
                            </div>

                            {/* Quote */}
                            <p className="font-display text-xl md:text-2xl text-luxury-white leading-relaxed mb-8 italic">
                                &ldquo;{TESTIMONIALS[current].quote}&rdquo;
                            </p>

                            {/* Author */}
                            <div>
                                <p className="font-display text-lg text-gold-400">{TESTIMONIALS[current].name}</p>
                                <p className="paragraph text-sm mt-1">{TESTIMONIALS[current].event}</p>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation */}
                    <div className="flex items-center justify-center gap-6 mt-8">
                        <button
                            onClick={prev}
                            className="w-10 h-10 rounded-full glass flex items-center justify-center text-luxury-muted hover:text-gold-400 hover:border-gold-400/30 transition-all"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>

                        {/* Dots */}
                        <div className="flex gap-2">
                            {TESTIMONIALS.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrent(i)}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${i === current ? "bg-gold-400 w-6" : "bg-luxury-border hover:bg-luxury-muted"
                                        }`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={next}
                            className="w-10 h-10 rounded-full glass flex items-center justify-center text-luxury-muted hover:text-gold-400 hover:border-gold-400/30 transition-all"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
