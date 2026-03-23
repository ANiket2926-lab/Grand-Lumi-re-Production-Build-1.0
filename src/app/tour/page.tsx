"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { RotateCcw, ZoomIn, ZoomOut, Maximize2 } from "lucide-react";

const hotspots = [
    { id: "main-hall", name: "Main Hall", image: "/images/360/main-hall.jpg", description: "Our grand ballroom with crystal chandeliers" },
    { id: "stage", name: "Stage Area", image: "/images/360/stage.jpg", description: "State-of-the-art stage with LED backdrop" },
    { id: "dining", name: "Dining Area", image: "/images/360/dining.jpg", description: "Elegant dining setup for up to 500 guests" },
    { id: "garden", name: "Garden", image: "/images/360/garden.jpg", description: "Lush outdoor garden for cocktail hours" },
];

export default function TourPage() {
    const [activeSpot, setActiveSpot] = useState(hotspots[0]);
    const [rotation, setRotation] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    // Simulated panorama with CSS gradient
    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setDragStart(e.clientX - rotation);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        setRotation(e.clientX - dragStart);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        const handleGlobalUp = () => setIsDragging(false);
        window.addEventListener("mouseup", handleGlobalUp);
        return () => window.removeEventListener("mouseup", handleGlobalUp);
    }, []);

    return (
        <div className="pt-28 pb-20 min-h-screen bg-luxury-black">
            {/* Header */}
            <div className="text-center mb-12 section-padding">
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="font-body text-xs uppercase tracking-[0.3em] text-gold-400/80 mb-4"
                >
                    Virtual Experience
                </motion.p>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="heading-lg text-luxury-white mb-4"
                >
                    360° <span className="text-gradient-gold">Tour</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="paragraph max-w-xl mx-auto"
                >
                    Drag to explore our stunning venue. Click hotspots to navigate between areas.
                </motion.p>
            </div>

            <div className="max-w-7xl mx-auto section-padding">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="relative"
                >
                    {/* Panorama Viewer */}
                    <div
                        ref={containerRef}
                        className="relative w-full h-[500px] md:h-[600px] rounded-lg overflow-hidden cursor-grab active:cursor-grabbing glass"
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        style={{ userSelect: "none" }}
                    >
                        <div
                            className="absolute inset-0 w-full h-full transition-all duration-0"
                            style={{
                                backgroundImage: `url(${activeSpot.image})`,
                                backgroundSize: "cover",
                                backgroundPosition: `${rotation * 0.1}% center`,
                                backgroundRepeat: "repeat-x"
                            }}
                        />
                        <div className="absolute inset-0 bg-black/20 pointer-events-none" />

                        {/* Drag hint overlay */}
                        <div className="absolute top-4 left-4 z-20 pointer-events-none">
                            <span className="text-xs font-body text-white/80 bg-black/40 px-3 py-1 rounded-full tracking-wider uppercase backdrop-blur-sm">← Drag to explore →</span>
                        </div>
                    </div>

                    {/* Active Hotspot Info */}
                    <motion.div
                        key={activeSpot.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass-gold rounded-lg p-6 mt-6"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-3 h-3 rounded-full bg-gold-400" />
                            <div>
                                <h3 className="font-display text-xl text-luxury-white">{activeSpot.name}</h3>
                                <p className="paragraph text-sm mt-1">{activeSpot.description}</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Navigation Thumbnails */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                        {hotspots.map((spot) => (
                            <button
                                key={spot.id}
                                onClick={() => {
                                    setActiveSpot(spot);
                                }}
                                className={`p-4 rounded-lg transition-all duration-300 ${activeSpot.id === spot.id
                                    ? "glass-gold border-gold-400/30"
                                    : "glass hover:border-gold-400/20"
                                    }`}
                            >
                                <div
                                    className="w-full h-20 rounded mb-3"
                                    style={{
                                        background: `linear-gradient(${135 + hotspots.indexOf(spot) * 40}deg, 
                      hsl(40, 30%, ${10 + hotspots.indexOf(spot) * 3}%), 
                      hsl(45, 40%, ${18 + hotspots.indexOf(spot) * 3}%))`,
                                    }}
                                />
                                <p className="font-body text-xs text-center tracking-wider uppercase text-luxury-muted">
                                    {spot.name}
                                </p>
                            </button>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
