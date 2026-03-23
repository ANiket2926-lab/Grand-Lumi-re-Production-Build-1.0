"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Crown, UtensilsCrossed, Palette, Music, Camera, Sparkles } from "lucide-react";
import { FEATURES } from "@/lib/constants";

const iconMap: Record<string, React.ReactNode> = {
    crown: <Crown className="w-8 h-8" />,
    utensils: <UtensilsCrossed className="w-8 h-8" />,
    palette: <Palette className="w-8 h-8" />,
    music: <Music className="w-8 h-8" />,
    camera: <Camera className="w-8 h-8" />,
    sparkles: <Sparkles className="w-8 h-8" />,
};

export default function FeaturesSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section ref={ref} className="py-32 section-padding bg-luxury-black relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-gold-400/[0.02] blur-[150px]" />

            <div className="max-w-7xl mx-auto relative">
                {/* Section Header */}
                <div className="text-center mb-20">
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.6 }}
                        className="font-body text-xs uppercase tracking-[0.3em] text-gold-400/80 mb-4"
                    >
                        What We Offer
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="heading-lg text-luxury-white"
                    >
                        Exquisite <span className="text-gradient-gold">Services</span>
                    </motion.h2>
                    <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: 60 } : {}}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="h-[1px] bg-gold-400/40 mx-auto mt-6"
                    />
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {FEATURES.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                            className="glass group p-8 rounded-lg hover:border-gold-400/20 transition-all duration-500 cursor-default"
                        >
                            <div className="text-gold-400 mb-6 group-hover:scale-110 transition-transform duration-500">
                                {iconMap[feature.icon]}
                            </div>
                            <h3 className="font-display text-xl text-luxury-white mb-3">{feature.title}</h3>
                            <p className="paragraph text-sm">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
