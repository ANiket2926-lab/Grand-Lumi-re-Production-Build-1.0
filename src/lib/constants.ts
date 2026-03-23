export const SITE_NAME = "Grand Lumière";
export const SITE_TAGLINE = "Where Moments Become Memories";
export const SITE_DESCRIPTION = "Experience unparalleled luxury at Grand Lumière — the premier banquet hall for weddings, corporate events, and exclusive celebrations.";

export const NAV_LINKS = [
    { label: "Home", href: "/" },
    { label: "Gallery", href: "/gallery" },
    { label: "Virtual Tour", href: "/tour" },
    { label: "Book Now", href: "/booking" },
    { label: "Contact", href: "/contact" },
];

export const HALLS = [
    {
        id: "grand-ballroom",
        name: "The Grand Ballroom",
        description: "Our flagship venue featuring soaring 30-foot ceilings, crystal chandeliers, and capacity for up to 500 guests. Perfect for grand weddings and gala events.",
        capacity: 500,
        priceWeekday: 150000,
        priceWeekend: 250000,
        images: ["/images/halls/grand-ballroom-1.jpg", "/images/halls/grand-ballroom-2.jpg", "/images/halls/grand-ballroom-3.jpg"],
        features: ["Crystal Chandeliers", "Grand Stage", "Bridal Suite", "Valet Parking"],
    },
    {
        id: "ivory-lounge",
        name: "The Ivory Lounge",
        description: "An intimate space with elegant ivory and gold décor, ideal for corporate gatherings, cocktail parties, and private celebrations of 50–150 guests.",
        capacity: 150,
        priceWeekday: 75000,
        priceWeekend: 120000,
        images: ["/images/halls/ivory-lounge-1.jpg", "/images/halls/ivory-lounge-2.jpg", "/images/halls/ivory-lounge-3.jpg"],
        features: ["Private Bar", "AV Equipment", "Lounge Seating", "Garden Access"],
    },
    {
        id: "royal-terrace",
        name: "The Royal Terrace",
        description: "An open-air rooftop venue under the stars with panoramic city views. Perfect for cocktail nights, engagement ceremonies, and exclusive dinners.",
        capacity: 200,
        priceWeekday: 100000,
        priceWeekend: 175000,
        images: ["/images/halls/royal-terrace-1.jpg", "/images/halls/royal-terrace-2.jpg", "/images/halls/royal-terrace-3.jpg"],
        features: ["Open Air", "City Views", "LED Lighting", "Dance Floor"],
    },
];

export const GALLERY_CATEGORIES = ["All", "Weddings", "Corporate", "Parties"] as const;

export const GALLERY_IMAGES = [
    { id: "1", src: "/images/gallery/1.jpg", category: "Weddings", title: "Royal Baraat" },
    { id: "2", src: "/images/gallery/2.jpg", category: "Weddings", title: "Bridal Elegance" },
    { id: "3", src: "/images/gallery/3.jpg", category: "Corporate", title: "Grand Setup" },
    { id: "4", src: "/images/gallery/4.jpg", category: "Parties", title: "Palatial View" },
    { id: "5", src: "/images/gallery/5.jpg", category: "Weddings", title: "Mandap Decor" },
    { id: "6", src: "/images/gallery/6.jpg", category: "Corporate", title: "Sangeet Night" },
    { id: "7", src: "/images/gallery/7.jpg", category: "Parties", title: "Floral Canopies" },
    { id: "8", src: "/images/gallery/8.jpg", category: "Weddings", title: "Mehndi Ceremony" },
    { id: "9", src: "/images/gallery/9.jpg", category: "Corporate", title: "Royal Feast" },
    { id: "10", src: "/images/gallery/10.jpg", category: "Parties", title: "Traditional Motifs" },
    { id: "11", src: "/images/gallery/11.jpg", category: "Weddings", title: "Couples Portrait" },
    { id: "12", src: "/images/gallery/12.jpg", category: "Parties", title: "Pre-wedding Rituals" },
];

export const TESTIMONIALS = [
    {
        id: "1",
        name: "Priya & Arjun Sharma",
        event: "Wedding Reception",
        quote: "Grand Lumière transformed our wedding into a fairy tale. Every detail was absolutely perfect — from the floral arrangements to the impeccable service.",
        rating: 5,
    },
    {
        id: "2",
        name: "Rajesh Mehta",
        event: "Corporate Gala",
        quote: "We've hosted our annual gala here for three years running. The professionalism and luxury ambiance never fails to impress our clients and partners.",
        rating: 5,
    },
    {
        id: "3",
        name: "Ananya Reddy",
        event: "Engagement Party",
        quote: "The Royal Terrace provided the most magical backdrop for our engagement. The city lights and the open-air setting made it truly unforgettable.",
        rating: 5,
    },
];

export const FEATURES = [
    {
        icon: "crown",
        title: "Luxury Venues",
        description: "Three distinct halls, each with its own character — from grand ballrooms to rooftop terraces.",
    },
    {
        icon: "utensils",
        title: "Gourmet Catering",
        description: "World-class culinary team offering customizable menus from global cuisines.",
    },
    {
        icon: "palette",
        title: "Bespoke Décor",
        description: "Our in-house design team creates stunning, personalized event décor tailored to your vision.",
    },
    {
        icon: "music",
        title: "Entertainment",
        description: "State-of-the-art sound & lighting systems with access to premium entertainment partners.",
    },
    {
        icon: "camera",
        title: "Photography",
        description: "Professional photography & videography services to capture every precious moment.",
    },
    {
        icon: "sparkles",
        title: "Event Planning",
        description: "Dedicated event coordinators to manage every detail from start to finish.",
    },
];

export type BookingStatus = "pending" | "confirmed" | "cancelled" | "rejected";

export interface Booking {
    id: string;
    userId: string;
    hallId: string;
    hallName: string;
    startDate: string;
    endDate: string;
    guests: number;
    eventType: string;
    status: BookingStatus;
    totalPrice: number;
    userName: string;
    userEmail: string;
    userPhone?: string;
    paymentId?: string;
    createdAt: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    role: "user" | "admin";
}
