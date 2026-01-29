# Kevs Kitchen - Multi-Restaurant Management Platform

A comprehensive restaurant management platform built with Next.js 14, featuring digital menus, table booking, real-time order management, and complete staff dashboards.

![Kevs Kitchen](https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=400&fit=crop)

## Features

### For Customers
- 🍽️ **Digital Menu** - Interactive menus with dietary filters, allergen info, and beautiful imagery
- 📅 **Table Booking** - Real-time availability with floor plan selection
- 🛒 **Online Ordering** - Cart management with customizations and special instructions
- 💳 **Seamless Payments** - Stripe integration with tip options and bill splitting
- ⭐ **Reviews & Ratings** - Rate dishes and service
- 🎁 **Loyalty Program** - Earn points and unlock rewards

### For Staff
- **Waiter Dashboard** - Order queue, table management, customer messaging
- **Kitchen Display System (KDS)** - Real-time orders with timers and priority handling
- **Reception Portal** - Reservations, waitlist, and floor plan management

### For Management
- 📊 **Analytics Dashboard** - Revenue, orders, and performance metrics
- 👥 **Staff Management** - Scheduling, roles, and performance tracking
- 📋 **Menu Management** - CRUD for items, categories, and pricing
- 🪑 **Table Configuration** - Floor plan editor

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 14 (App Router), TypeScript, React |
| Styling | Tailwind CSS, shadcn/ui |
| State | Zustand, TanStack Query |
| Database | PostgreSQL, Prisma ORM |
| Auth | NextAuth.js v5 |
| Real-time | Socket.io |
| Payments | Stripe |

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   cd kevs-kitchen
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your database URL and other credentials:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/kevs_kitchen"
   AUTH_SECRET="your-secret-key"
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Seed the database** (optional)
   ```bash
   npx prisma db seed
   ```

6. **Start the development server**
   ```bash
   npm run dev
   ```

7. Open [http://localhost:3000](http://localhost:3000) in your browser

## Demo Accounts

After seeding the database, you can log in with these demo accounts:

| Role | Email | Password |
|------|-------|----------|
| Customer | demo@customer.com | demo123 |
| Manager | demo@manager.com | demo123 |
| Waiter | waiter@demo.com | demo123 |
| Chef | chef@demo.com | demo123 |
| Receptionist | reception@demo.com | demo123 |

## Project Structure

```
src/
├── app/
│   ├── (auth)/           # Login, register pages
│   ├── (customer)/       # Customer-facing pages
│   │   ├── restaurants/  # Restaurant listing & details
│   │   ├── booking/      # Reservation pages
│   │   ├── orders/       # Order history
│   │   └── checkout/     # Checkout flow
│   ├── (staff)/          # Staff dashboards
│   │   ├── waiter/       # Waiter portal
│   │   ├── kitchen/      # Kitchen display
│   │   └── reception/    # Reception portal
│   ├── (admin)/          # Admin/manager dashboard
│   └── api/              # API routes
├── components/
│   ├── ui/               # shadcn/ui components
│   ├── customer/         # Customer components
│   ├── staff/            # Staff components
│   └── admin/            # Admin components
├── lib/                  # Utilities and configs
├── stores/               # Zustand stores
├── types/                # TypeScript types
└── prisma/               # Database schema
```

## Key Pages

| Path | Description |
|------|-------------|
| `/` | Landing page |
| `/restaurants` | Restaurant listing |
| `/restaurants/[slug]` | Restaurant menu |
| `/restaurants/[slug]/book` | Table booking |
| `/checkout` | Order checkout |
| `/waiter` | Waiter dashboard |
| `/kitchen` | Kitchen display |
| `/reception` | Reception portal |
| `/dashboard` | Manager dashboard |
| `/admin/menu` | Menu management |
| `/admin/staff` | Staff management |

## Environment Variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `AUTH_SECRET` | NextAuth secret key |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth secret |
| `STRIPE_SECRET_KEY` | Stripe secret key |
| `STRIPE_PUBLISHABLE_KEY` | Stripe publishable key |

## Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Run production build
npm start

# Run linter
npm run lint

# Generate Prisma client
npx prisma generate

# Push database schema
npx prisma db push

# Open Prisma Studio
npx prisma studio
```

## Deployment

This app is designed to be deployed on Vercel with a PostgreSQL database (Supabase, Neon, or similar).

1. Push your code to GitHub
2. Import the repository in Vercel
3. Add environment variables
4. Deploy!

## License

MIT License - feel free to use this project for your own restaurant!

---

Built with ❤️ using Next.js, Tailwind CSS, and shadcn/ui
