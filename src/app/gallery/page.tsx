"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { GALLERY_IMAGES, GALLERY_CATEGORIES } from "@/lib/constants";
import { X } from "lucide-react";

export default function GalleryPage() {
    const [activeCategory, setActiveCategory] = useState<string>("All");
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    const filteredImages =
        activeCategory === "All"
            ? GALLERY_IMAGES
            : GALLERY_IMAGES.filter((img) => img.category === activeCategory);

    // Create masonry heights
    const getHeight = (index: number) => {
        const heights = [320, 420, 360, 280, 400, 340, 300, 440, 350, 380, 310, 420];
        return heights[index % heights.length];
    };

    return (
        <div className="pt-28 pb-20 section-padding min-h-screen bg-luxury-black">
            {/* Header */}
            <div className="text-center mb-16">
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="font-body text-xs uppercase tracking-[0.3em] text-gold-400/80 mb-4"
                >
                    Our Gallery
                </motion.p>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="heading-lg text-luxury-white mb-4"
                >
                    Captured <span className="text-gradient-gold">Elegance</span>
                </motion.h1>
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: 60 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="h-[1px] bg-gold-400/40 mx-auto"
                />
            </div>

            {/* Category Filters */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap justify-center gap-3 mb-16"
            >
                {GALLERY_CATEGORIES.map((category) => (
                    <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`px-6 py-2 text-sm font-body uppercase tracking-wider rounded-full transition-all duration-300 ${activeCategory === category
                            ? "bg-gold-400 text-luxury-black font-medium"
                            : "glass text-luxury-muted hover:text-gold-400 hover:border-gold-400/30"
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </motion.div>

            {/* Masonry Grid */}
            <div ref={ref} className="max-w-7xl mx-auto columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                <AnimatePresence mode="popLayout">
                    {filteredImages.map((image, index) => (
                        <motion.div
                            key={image.id}
                            layout
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                            className="break-inside-avoid group cursor-pointer relative overflow-hidden rounded-lg"
                            style={{ height: getHeight(index) }}
                            onClick={() => setSelectedImage(image.id)}
                        >
                            {/* Image */}
                            <img
                                src={image.src}
                                alt={image.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />

                            {/* Hover overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
                                <p className="font-body text-xs uppercase tracking-[0.2em] text-gold-400">{image.category}</p>
                                <h3 className="font-display text-xl text-luxury-white mt-1">{image.title}</h3>
                            </div>

                            {/* Zoom icon */}
                            <div className="absolute top-4 right-4 w-10 h-10 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-100 scale-50">
                                <span className="text-gold-400 text-lg">✦</span>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-6"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button
                            className="absolute top-6 right-6 w-10 h-10 rounded-full glass flex items-center justify-center text-luxury-white hover:text-gold-400 transition-colors"
                            onClick={() => setSelectedImage(null)}
                        >
                            <X className="w-5 h-5" />
                        </button>
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="max-w-4xl w-full aspect-[16/10] rounded-lg overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {(() => {
                                const img = GALLERY_IMAGES.find((i) => i.id === selectedImage);
                                const idx = GALLERY_IMAGES.findIndex((i) => i.id === selectedImage);
                                return (
                                    <div className="relative w-full h-full">
                                        <img
                                            src={img?.src}
                                            alt={img?.title}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                                            <p className="text-xs uppercase tracking-[0.2em] text-gold-400 mb-1">{img?.category}</p>
                                            <h3 className="font-display text-2xl text-luxury-white">{img?.title}</h3>
                                        </div>
                                    </div>
                                );
                            })()}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
