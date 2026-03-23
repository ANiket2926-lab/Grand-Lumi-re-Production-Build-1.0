"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="pt-28 pb-20 min-h-screen bg-luxury-black section-padding">
            {/* Header */}
            <div className="text-center mb-16">
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="font-body text-xs uppercase tracking-[0.3em] text-gold-400/80 mb-4"
                >
                    Get in Touch
                </motion.p>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="heading-lg text-luxury-white mb-4"
                >
                    Contact <span className="text-gradient-gold">Us</span>
                </motion.h1>
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: 60 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="h-[1px] bg-gold-400/40 mx-auto"
                />
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Contact Info */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="font-display text-3xl text-luxury-white mb-6">We Would Love to Hear From You</h2>
                    <p className="paragraph text-luxury-muted mb-10">
                        Whether you are planning a grand royal wedding, a corporate gala, or an intimate celebration,
                        our event specialists are here to bring your vision to life.
                    </p>

                    <div className="space-y-8">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full glass flex items-center justify-center flex-shrink-0">
                                <MapPin className="w-5 h-5 text-gold-400" />
                            </div>
                            <div>
                                <h3 className="font-display text-xl text-luxury-white mb-2">Location</h3>
                                <p className="paragraph text-sm">123 Royal Palace Marg,<br />Bandra West, Mumbai 400050<br />India</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full glass flex items-center justify-center flex-shrink-0">
                                <Phone className="w-5 h-5 text-gold-400" />
                            </div>
                            <div>
                                <h3 className="font-display text-xl text-luxury-white mb-2">Phone</h3>
                                <p className="paragraph text-sm">+91 98765 43210<br />+91 11 2345 6789</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full glass flex items-center justify-center flex-shrink-0">
                                <Mail className="w-5 h-5 text-gold-400" />
                            </div>
                            <div>
                                <h3 className="font-display text-xl text-luxury-white mb-2">Email</h3>
                                <p className="paragraph text-sm">events@grandlumiere.com<br />info@grandlumiere.com</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Contact Form */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="glass rounded-xl p-8"
                >
                    <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Message Sent!"); }}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs uppercase tracking-wider text-luxury-muted font-body mb-2">First Name</label>
                                <input type="text" required className="w-full px-4 py-3 bg-luxury-darker border border-luxury-border rounded-lg text-luxury-white focus:border-gold-400/50 focus:outline-none transition-colors font-body text-sm" placeholder="John" />
                            </div>
                            <div>
                                <label className="block text-xs uppercase tracking-wider text-luxury-muted font-body mb-2">Last Name</label>
                                <input type="text" required className="w-full px-4 py-3 bg-luxury-darker border border-luxury-border rounded-lg text-luxury-white focus:border-gold-400/50 focus:outline-none transition-colors font-body text-sm" placeholder="Doe" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs uppercase tracking-wider text-luxury-muted font-body mb-2">Email Address</label>
                            <input type="email" required className="w-full px-4 py-3 bg-luxury-darker border border-luxury-border rounded-lg text-luxury-white focus:border-gold-400/50 focus:outline-none transition-colors font-body text-sm" placeholder="john@example.com" />
                        </div>

                        <div>
                            <label className="block text-xs uppercase tracking-wider text-luxury-muted font-body mb-2">Event Type</label>
                            <select className="w-full px-4 py-3 bg-luxury-darker border border-luxury-border rounded-lg text-luxury-white focus:border-gold-400/50 focus:outline-none transition-colors font-body text-sm appearance-none">
                                <option>Wedding</option>
                                <option>Corporate Event</option>
                                <option>Social Gathering</option>
                                <option>Other</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs uppercase tracking-wider text-luxury-muted font-body mb-2">Message</label>
                            <textarea required rows={4} className="w-full px-4 py-3 bg-luxury-darker border border-luxury-border rounded-lg text-luxury-white focus:border-gold-400/50 focus:outline-none transition-colors font-body text-sm resize-none" placeholder="Tell us about your event..."></textarea>
                        </div>

                        <button type="submit" className="w-full btn-gold py-4 flex items-center justify-center gap-2">
                            Send Message <Send className="w-4 h-4" />
                        </button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}
