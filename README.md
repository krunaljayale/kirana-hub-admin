<<<<<<< HEAD
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
=======
# 🛒 Kirana Hub - SaaS Admin Dashboard

![Project Status](https://img.shields.io/badge/Status-In%20Development-orange?style=flat-square)
![Tech Stack](https://img.shields.io/badge/Stack-Next.js_14_|_TypeScript_|_Tailwind-blue?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

**Kirana Hub** is a modern, high-performance SaaS platform designed to help local grocery stores manage inventory, track real-time orders, and analyze sales performance. Built with a focus on UI/UX, it features a dual-theme interface ("Sello" Light / "Clarid" Dark) and a responsive, data-driven dashboard.

---

## 🚀 Key Features

### 1. 🌐 Public Landing Page
- **Design:** Futuristic "Clarid" aesthetic with glassmorphism, glowing orbs, and gradients.
- **Components:** Floating Navbar, Hero Section, Feature Highlights, and Trust Badges.
- **Logic:** Automatically hides the Admin Sidebar and Header when viewing the landing page.

### 2. 📊 Admin Dashboard
- **Analytics:** Real-time KPI cards for Total Sales, Products, and Active Customers.
- **Visualization:** Interactive Sales Area Chart using `Recharts`.
- **Delivery Tracking:** Widget showing available delivery partners and their status.

### 3. 🛍️ Order Management System
- **Live Board (Kanban):**
  - Card-based layout for active orders (Pending → Preparing → Ready).
  - Visual status indicators (Orange/Blue/Green) for quick scanning.
  - Quick actions to Accept, Reject, or Mark Ready.
- **Order History (Data Table):**
  - **Search & Filter:** Filter by Order ID, Customer Name, Status, or Date.
  - **Export:** One-click CSV export functionality.
  - **Interactive Actions:** Hover-revealed actions for viewing details, marking delivered, or deleting records.
  - **Feedback:** Glass-morphic Modals for confirmation and Toast Notifications for success messages.

### 4. 🎨 Advanced Theming
- **Dark Mode:** Fully integrated Dark Mode using Tailwind's `class` strategy.
- **Auto-Detection:** Respects the user's OS system preferences automatically.
- **Smooth Transitions:** Global color transitions for a premium feel.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Heroicons (Outline & Solid)
- **Charts:** Recharts
- **State Management:** React Hooks (`useState`, `useEffect`, `useMemo`)

---

## 📂 Project Structure

```bash
kirana-hub/
├── app/
│   ├── layout.tsx          # Root Layout (Sidebar logic + Dark Mode check)
│   ├── page.tsx            # Public Landing Page
│   ├── globals.css         # Global styles & Theme variables
│   ├── dashboard/          # Admin Overview (KPIs + Charts)
│   └── orders/             # Order Management (Kanban + Table)
├── components/
│   ├── layout/             # Sidebar, Header, Mobile Menu
│   ├── ui/                 # Reusable UI (KpiCard, Buttons, Modals)
│   ├── charts/             # Recharts components
│   ├── landing/            # Landing page specific components
│   └── orders/             # OrderCard, OrdersTable
├── public/                 # Static assets (images, icons)
├── tailwind.config.ts      # Tailwind configuration
└── postcss.config.mjs      # PostCSS configuration
```


---

### 🗺️ Roadmap
[✓] Project Setup & Theming: Dark mode, Sidebar, Layouts.

[✓] Dashboard: KPI Cards, Charts, Delivery Widget.

[✓] Orders: Live Kanban Board & History Table with Export.

[ ] Inventory: Product management (Add/Edit/Delete) & Image Upload.

[ ] Customers: Customer CRM and purchase history.

[ ] Backend: Integration with Supabase/Firebase for real database persistence.

[ ] Auth: Clerk or NextAuth integration.
>>>>>>> c32eaeb3444ce53e5c8eb72feaec2665ec3f5b4b
