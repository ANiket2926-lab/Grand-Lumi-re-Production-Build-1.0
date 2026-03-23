import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                gold: {
                    50: "#FFF9E6",
                    100: "#FFF0BF",
                    200: "#FFE699",
                    300: "#FFD966",
                    400: "#D4AF37",
                    500: "#C9A84C",
                    600: "#B8941F",
                    700: "#9A7B1A",
                    800: "#7C6315",
                    900: "#5E4A10",
                },
                luxury: {
                    black: "#0A0A0A",
                    dark: "#111111",
                    darker: "#0D0D0D",
                    card: "#1A1A1A",
                    border: "#2A2A2A",
                    muted: "#888888",
                    cream: "#F5F0E8",
                    white: "#FAFAFA",
                },
            },
            fontFamily: {
                display: ["Playfair Display", "serif"],
                body: ["Inter", "sans-serif"],
            },
            backgroundImage: {
                "gold-gradient": "linear-gradient(135deg, #C9A84C 0%, #D4AF37 50%, #B8941F 100%)",
                "dark-gradient": "linear-gradient(180deg, #0A0A0A 0%, #111111 50%, #0D0D0D 100%)",
                "glass-gradient": "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
            },
            animation: {
                "scroll-indicator": "scrollBounce 2s ease-in-out infinite",
                "fade-in": "fadeIn 0.6s ease-out forwards",
                "slide-up": "slideUp 0.6s ease-out forwards",
                "shimmer": "shimmer 2s linear infinite",
                "float": "float 6s ease-in-out infinite",
            },
            keyframes: {
                scrollBounce: {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(10px)" },
                },
                fadeIn: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                slideUp: {
                    "0%": { opacity: "0", transform: "translateY(30px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                shimmer: {
                    "0%": { backgroundPosition: "-200% 0" },
                    "100%": { backgroundPosition: "200% 0" },
                },
                float: {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-20px)" },
                },
            },
            backdropBlur: {
                xs: "2px",
            },
        },
    },
    plugins: [],
};

export default config;
