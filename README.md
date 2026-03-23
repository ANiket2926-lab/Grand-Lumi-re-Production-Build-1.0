# Grand Lumière — Premium Banquet Hall Booking

A luxury, production-ready banquet hall booking web application built with Next.js 14, TypeScript, and Tailwind CSS.

## ✨ Features

- **Cinematic Homepage** — Fullscreen hero with video background, parallax scrolling, horizontal gallery, testimonials
- **Gallery Page** — Masonry grid with category filters (Weddings, Corporate, Parties), hover zoom, lightbox viewer
- **360° Virtual Tour** — Interactive drag-to-explore panorama with area hotspots
- **Multi-step Booking** — Venue selection → Calendar with availability → Event details → Dynamic pricing → Payment
- **Payment Integration** — Razorpay checkout (simulated, ready for production keys)
- **Authentication** — Login/Signup with role-based access (User/Admin)
- **Admin Dashboard** — Booking management, revenue analytics, date blocking, status filters
- **Premium Design** — Black/gold/white palette, glassmorphism, Framer Motion animations, Lenis smooth scrolling

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm

### Installation
```bash
cd banquet-hall
npm install
```

### Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production
```bash
npm run build
npm start
```

## 🔑 Demo Credentials

| Role  | Email                    | Password  |
|-------|--------------------------|-----------|
| Admin | admin@grandlumiere.com   | admin123  |
| User  | user@demo.com            | user123   |

## 📁 Project Structure

```
banquet-hall/
├── prisma/              # Database schema
├── public/              # Static assets (images, videos)
├── src/
│   ├── app/
│   │   ├── admin/       # Admin dashboard (layout + pages)
│   │   ├── api/         # API routes (bookings, payments, availability)
│   │   ├── booking/     # Booking wizard + payment page
│   │   ├── gallery/     # Gallery with masonry grid
│   │   ├── login/       # Auth pages
│   │   ├── signup/
│   │   ├── tour/        # 360° virtual tour
│   │   ├── globals.css  # Global styles + Tailwind
│   │   ├── layout.tsx   # Root layout (providers, nav, footer)
│   │   └── page.tsx     # Homepage
│   ├── components/
│   │   ├── home/        # Homepage sections (Hero, Features, Gallery, etc.)
│   │   ├── providers/   # SmoothScrollProvider
│   │   ├── Navbar.tsx   # Glassmorphic floating nav
│   │   └── Footer.tsx   # Premium footer
│   ├── context/         # AuthContext, BookingContext
│   └── lib/             # Utils, constants, types
└── tailwind.config.ts   # Luxury design tokens
```

## 🔧 Database Setup (Optional)

The app runs with in-memory data by default. To use PostgreSQL:

1. Copy `.env.example` to `.env`
2. Set your `DATABASE_URL`
3. Run migrations:
```bash
npx prisma migrate dev --name init
npx prisma generate
```

## 💳 Razorpay Setup (Optional)

1. Create a [Razorpay account](https://razorpay.com)
2. Get your API keys from the Razorpay dashboard
3. Add to `.env`:
```
RAZORPAY_KEY_ID=rzp_test_xxx
RAZORPAY_KEY_SECRET=your_secret
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxx
```

## 🖥️ Packaging as Windows .exe

To package as a desktop app later, use [Electron](https://www.electronjs.org/) or [Tauri](https://tauri.app/):

```bash
# Build the Next.js app first
npm run build

# Then wrap with Electron (example)
npx electron-packager . GrandLumiere --platform=win32 --arch=x64
```

## Tech Stack

- **Next.js 14** (App Router, TypeScript)
- **Tailwind CSS 3** (custom luxury design system)
- **Framer Motion** (animations, page transitions)
- **Lenis** (smooth scrolling)
- **React Day Picker** (booking calendar)
- **Lucide React** (icons)
- **Prisma** (ORM, PostgreSQL ready)
- **Razorpay** (payment gateway)
