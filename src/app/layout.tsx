import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { BookingProvider } from "@/context/BookingContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";

export const metadata: Metadata = {
  title: "Grand Lumière | Premium Banquet Hall",
  description:
    "Experience unparalleled luxury at Grand Lumière — the premier banquet hall for weddings, corporate events, and exclusive celebrations.",
  keywords: "banquet hall, wedding venue, corporate events, luxury venue, Mumbai",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-body bg-luxury-black text-luxury-white antialiased">
        <AuthProvider>
          <BookingProvider>
            <SmoothScrollProvider>
              <Navbar />
              <main className="min-h-screen">{children}</main>
              <Footer />
            </SmoothScrollProvider>
          </BookingProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
