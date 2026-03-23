"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        const authUser = await login(email, password);
        if (authUser) {
            if (authUser.role === "admin") {
                router.push("/admin");
            } else {
                router.push("/");
            }
        } else {
            setError("Invalid email or password");
        }
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Side - Image */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
                <img
                    src="/images/auth/login-bg.jpg"
                    alt="Indian Royal Banquet"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-luxury-black/80 via-luxury-black/40 to-luxury-black/90" />
                <div className="relative z-10 flex flex-col items-center justify-center p-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <h2 className="font-display text-5xl text-luxury-white mb-4">Welcome Back</h2>
                        <p className="paragraph text-base">Sign in to manage your bookings and access exclusive features.</p>
                    </motion.div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-luxury-darker">
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-md"
                >
                    <div className="text-center mb-10">
                        <h1 className="font-display text-3xl text-gradient-gold font-bold mb-2">Grand Lumière</h1>
                        <p className="paragraph text-sm">Sign in to your account</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email */}
                        <div>
                            <label className="block text-xs uppercase tracking-wider text-luxury-muted font-body mb-2">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-luxury-muted" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="your@email.com"
                                    required
                                    className="w-full pl-12 pr-4 py-3 bg-luxury-card border border-luxury-border rounded-lg text-luxury-white placeholder:text-luxury-muted/50 focus:border-gold-400/50 focus:outline-none transition-colors font-body text-sm"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-xs uppercase tracking-wider text-luxury-muted font-body mb-2">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-luxury-muted" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    required
                                    className="w-full pl-12 pr-12 py-3 bg-luxury-card border border-luxury-border rounded-lg text-luxury-white placeholder:text-luxury-muted/50 focus:border-gold-400/50 focus:outline-none transition-colors font-body text-sm"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-luxury-muted hover:text-gold-400 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        {/* Error */}
                        {error && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-red-400 text-sm font-body text-center"
                            >
                                {error}
                            </motion.p>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full btn-gold text-sm py-4 rounded-lg disabled:opacity-50"
                        >
                            {isLoading ? "Signing in..." : "Sign In"}
                        </button>
                    </form>

                    {/* Demo Credentials */}
                    <div className="mt-8 glass rounded-lg p-4">
                        <p className="text-xs text-luxury-muted font-body text-center mb-2">Demo Credentials</p>
                        <div className="grid grid-cols-2 gap-2 text-xs font-body">
                            <div className="text-center">
                                <p className="text-gold-400">Admin</p>
                                <p className="text-luxury-muted">admin@grandlumiere.com</p>
                                <p className="text-luxury-muted">admin123</p>
                            </div>
                            <div className="text-center">
                                <p className="text-gold-400">User</p>
                                <p className="text-luxury-muted">user@demo.com</p>
                                <p className="text-luxury-muted">user123</p>
                            </div>
                        </div>
                    </div>

                    {/* Sign Up Link */}
                    <p className="text-center mt-8 paragraph text-sm">
                        Don&apos;t have an account?{" "}
                        <Link href="/signup" className="text-gold-400 hover:text-gold-300 transition-colors">
                            Create one
                        </Link>
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
