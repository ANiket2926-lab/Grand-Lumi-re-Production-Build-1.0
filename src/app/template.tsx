"use client";

import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
    // Optimized transition: Hardware-accelerated opacity and minimal transform to prevent jank
    const variants = {
        initial: {
            opacity: 0,
            y: 10,
        },
        enter: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.4,
                ease: "easeOut",
            },
        },
    };

    return (
        <motion.div
            variants={variants}
            initial="initial"
            animate="enter"
            className="will-change-transform"
        >
            {children}
        </motion.div>
    );
}
