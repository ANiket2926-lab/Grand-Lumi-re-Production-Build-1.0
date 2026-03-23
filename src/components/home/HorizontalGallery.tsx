"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";

const images = [
    { src: "/images/gallery/1.jpg", title: "Royal Detail" },
    { src: "/images/gallery/3.jpg", title: "Grand Mandap" },
    { src: "/images/gallery/5.jpg", title: "Palatial Setup" },
    { src: "/images/gallery/8.jpg", title: "Sangeet Decor" },
    { src: "/images/gallery/9.jpg", title: "Royal Feast" },
    { src: "/images/gallery/10.jpg", title: "Festive Night" },
];

export default function HorizontalGallery() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    useEffect(() => {
        const section = sectionRef.current;
        const container = scrollContainerRef.current;
        if (!section || !container) return;

        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const rect = section.getBoundingClientRect();
                    const sectionHeight = section.offsetHeight;
                    const windowHeight = window.innerHeight;
                    const scrollProgress = Math.max(0, Math.min(1, -rect.top / (sectionHeight - windowHeight)));
                    const maxScroll = container.scrollWidth - container.offsetWidth;
                    container.scrollLeft = scrollProgress * maxScroll;
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <section ref={sectionRef} className="relative bg-luxury-darker" style={{ height: "250vh" }}>
            <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
                {/* Section Header */}
                <div className="section-padding mb-12">
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.6 }}
                        className="font-body text-xs uppercase tracking-[0.3em] text-gold-400/80 mb-4"
                    >
                        Our Portfolio
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="heading-lg text-luxury-white"
                    >
                        Moments We&apos;ve <span className="text-gradient-gold">Crafted</span>
                    </motion.h2>
                </div>

                {/* Horizontal Scroll Container */}
                <div
                    ref={scrollContainerRef}
                    className="flex gap-6 px-6 md:px-12 lg:px-20 overflow-hidden"
                    style={{ scrollbarWidth: "none" }}
                >
                    {images.map((image, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="flex-shrink-0 w-[350px] md:w-[450px] lg:w-[550px] relative group cursor-pointer"
                        >
                            <div className="aspect-[4/3] rounded-lg overflow-hidden relative">
                                {/* Image */}
                                <img
                                    src={image.src}
                                    alt={image.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                                {/* Title */}
                                <div className="absolute bottom-0 left-0 right-0 p-6">
                                    <p className="font-body text-xs uppercase tracking-[0.2em] text-gold-400/80 mb-2">
                                        0{index + 1}
                                    </p>
                                    <h3 className="font-display text-xl text-luxury-white">{image.title}</h3>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Progress bar */}
                <div className="section-padding mt-8">
                    <div className="h-[1px] bg-luxury-border relative">
                        <motion.div className="h-full bg-gold-400/40 absolute top-0 left-0" style={{ width: "30%" }} />
                    </div>
                </div>
            </div>
        </section>
    );
}
