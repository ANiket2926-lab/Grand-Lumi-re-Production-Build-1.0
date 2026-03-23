import Link from "next/link";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/constants";

export default function Footer() {
    return (
        <footer className="relative bg-luxury-darker border-t border-luxury-border">
            {/* Gold divider */}
            <div className="divider-gold" />

            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <h3 className="font-display text-2xl text-gradient-gold font-bold mb-4">{SITE_NAME}</h3>
                        <p className="paragraph text-sm leading-relaxed mb-6">
                            {SITE_TAGLINE}. The premier destination for luxury events, weddings, and celebrations.
                        </p>
                        <div className="flex gap-4">
                            {["instagram", "facebook", "twitter"].map((social) => (
                                <a
                                    key={social}
                                    href="#"
                                    className="w-10 h-10 rounded-full glass flex items-center justify-center text-luxury-muted hover:text-gold-400 hover:border-gold-400/30 transition-all duration-300"
                                >
                                    <span className="text-xs uppercase font-body tracking-wider">{social[0].toUpperCase()}</span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-display text-lg text-luxury-white mb-6">Quick Links</h4>
                        <ul className="space-y-3">
                            {["Home", "Gallery", "Virtual Tour", "Book Now"].map((item) => (
                                <li key={item}>
                                    <Link
                                        href={`/${item === "Home" ? "" : item.toLowerCase().replace(" ", "-").replace("book-now", "booking").replace("virtual-tour", "tour")}`}
                                        className="paragraph text-sm hover:text-gold-400 transition-colors duration-300"
                                    >
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-display text-lg text-luxury-white mb-6">Contact</h4>
                        <ul className="space-y-3 paragraph text-sm">
                            <li>📍 42 Royal Avenue, Mumbai 400001</li>
                            <li>📞 +91 22 1234 5678</li>
                            <li>✉️ events@grandlumiere.com</li>
                            <li>🕐 Mon–Sun: 10AM – 10PM</li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="font-display text-lg text-luxury-white mb-6">Newsletter</h4>
                        <p className="paragraph text-sm mb-4">Stay updated with our latest events and offers.</p>
                        <div className="flex">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="flex-1 px-4 py-2 bg-luxury-card border border-luxury-border text-sm text-luxury-white placeholder:text-luxury-muted focus:border-gold-400/50 focus:outline-none transition-colors font-body"
                            />
                            <button className="px-4 py-2 bg-gold-gradient text-luxury-black text-sm font-medium font-body hover:opacity-90 transition-opacity">
                                →
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="divider-gold mt-12 mb-8" />
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="paragraph text-xs">© 2026 {SITE_NAME}. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="paragraph text-xs hover:text-gold-400 transition-colors">Privacy Policy</a>
                        <a href="#" className="paragraph text-xs hover:text-gold-400 transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
