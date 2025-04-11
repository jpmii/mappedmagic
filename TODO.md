# 🗂️ Laravel Disney Planner – TODO List

A living list of short-term tasks, improvements, and ideas for the app.

---

## ✅ Core Setup

- [x] Set up Laravel Breeze with Inertia + React
- [x] Configure auth system and profile editing
- [x] Create models and migrations for:
  - [x] Destinations
  - [x] Parks
  - [x] Hotels
  - [x] Attractions
  - [x] Reservations
  - [x] Trips

---

## 🚧 Current Work

- [x] Do `themepark:sync` command
- [ ] Add dropdown select for destinations in trip form
- [ ] Set up page & route for `/trips` (list + create)
- [ ] Build CRUD UI for trips
- [ ] Show park reservations grouped by date
- [x] Integrate ThemePark API to populate:
  - [x] Destinations
  - [x] Parks
  - [x] Attractions
- [x] Validate API data before saving (skip missing names, etc.)
- [x] Seed Disney + Universal hotels with lat/long, DVC, and transport
- [x] Handle duplicate prevention in seeders
- [ ] Setup Premium Tier
  - [ ] Way to make Premium lifetime aswell as monthly

---

## ✨ Premium Tier Ideas

- [ ] Add user tier field to users table
- [ ] Limit features based on tier (e.g., number of trips)
- [ ] Add Stripe integration for subscriptions
- [ ] Live Wait times from themeparks.wiki api on reservation list

---

## 🧹 Polishing

- [ ] Add global layout with header/footer React components
- [ ] Move common layouts into shared components
- [ ] Add Tailwind styling for inputs, buttons, and layout
- [ ] Display confirmation_number on reservation pages (if available)

---

## 🔁 Scheduled Tasks

- [ ] Finalize `themepark:sync` command
- [x] Add `Log::info()` tracking in sync tasks
- [ ] Configure daily sync schedule on Forge
- [ ] Optionally cache API responses

---

## 📱 Future Features

- [ ] Mobile view optimizations
- [ ] Trip timeline view
- [ ] Shareable trip itinerary URL
- [ ] Print-friendly view for trips
- [ ] Gameify attractions with badges earned?

---
