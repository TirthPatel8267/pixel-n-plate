# 🍔🎮 Pixel n Plate — Restaurant & Game Zone Management Platform

Pixel n Plate is an immersive full-stack web application combining high-end gourmet dining with an arcade & gaming zone. It features online food ordering, station/event bookings, gamified customer feedback, and a real-time Admin Management Dashboard.

---

## 🌟 Key Features

### 1. 🍔 Gourmet & Gamer Food Ordering System
- **Filterable Menu**: Power Combos ⚡, Cyber Burgers 🍔, Pixel Pizzas 🍕, Starters 🍟, Gamer Energy Drinks 🍹, Glitch Desserts 🍰.
- **Spice & XP Perk Indicators**: Spice meters (1-4 🌶️) and XP loyalty rewards (e.g. `+150 XP`).
- **Interactive Cart & Table Picker**: Select delivery location (VR Booth #01-#08, Diner Table #01-#20, or Counter Pickup).
- **Promo Discount System**: Apply promo codes (`GAMER10` for 10% off, `PIXEL20` for 20% off).
- **Live Kitchen Progress Radar**: Track status in real-time (`Order Received` ➔ `Kitchen Firing 🔥` ➔ `Quality Check` ➔ `Delivered 🚀`).

### 2. 🕹️ Game Zone & Event Booking Platform
- **Station Selection**: VR Holodeck Arena, Pro Esports PC Suites (RTX 4090), PS5/Xbox VIP Console Lounges, Retro Arcade Cabinets.
- **Party Packages**: Birthday Power Hour, LAN Party Pack, Gamer Date Night.
- **Slot & Date Selector**: Live time slots, guest count selector, customer detail collection.
- **Digital Pass Generator**: Instant digital ticket pass with unique Booking ID, QR Code, and print/save pass action.

### 3. ⭐ Gamified Customer Feedback System
- **Arcade Sentiment Meter**: Interactive 1-5 Star rating with animated emojis (😡 😐 🙂 😃 🤩).
- **Gamer Avatar Selector**: Pick custom gamer tags and avatar icons (👾 🕹️ ⚡ 🏎️ 🍔 👑).
- **Community Wall of Honor**: Verified gamer reviews feed with helpful upvotes.

### 4. 🛠️ Admin Management Suite
- **Analytics Overview**: Live metrics for Total Revenue ($), Active Kitchen Queue, Station Bookings Count, Avg Rating.
- **Live Kitchen Orders Queue**: Update status of orders in real-time.
- **Reservations Manager**: Monitor and approve station bookings.
- **Live Menu Manager**: Add new food dishes, toggle stock availability (In Stock / Out of Stock), delete items.

---

## 🚀 How to Run Locally

### Prerequisites
- Node.js (v16 or higher)
- npm

### 1. Install Dependencies
```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### 2. Run the Express Backend Server
```bash
cd server
npm start
# Express Server will run on http://localhost:5000
```

### 3. Run the React (Vite) Frontend Application
In a separate terminal window:
```bash
cd client
npm run dev
# Frontend App will run on http://localhost:5173
```

---

## 🔌 API Endpoints Reference

### Food Menu
- `GET /api/menu` — Fetch all menu items
- `POST /api/menu` — Add new food dish
- `PUT /api/menu/:id` — Update menu item / toggle stock
- `DELETE /api/menu/:id` — Delete menu item

### Orders
- `GET /api/orders` — Fetch all kitchen orders
- `POST /api/orders` — Place a new food order
- `PATCH /api/orders/:id` — Update order status (`Pending`, `Preparing`, `Ready`, `Delivered`)

### Bookings
- `GET /api/bookings` — Fetch station reservations
- `POST /api/bookings` — Book a gaming station/event
- `PATCH /api/bookings/:id` — Update booking status (`Confirmed`, `Completed`, `Cancelled`)

### Feedback & Stats
- `GET /api/feedback` — Fetch customer reviews
- `POST /api/feedback` — Submit a review
- `GET /api/stats` — Fetch admin summary analytics
