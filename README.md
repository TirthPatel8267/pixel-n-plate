<div align="center">

# 🍔🎮 PIXEL N PLATE
### *Where Gourmet Dining Meets the Game Zone*

**A full-stack platform blending high-end food ordering, arcade & esports station bookings, gamified feedback, and a real-time Admin Command Center — all in one immersive experience.**

![Node.js](https://img.shields.io/badge/Node.js-v16%2B-339933?style=for-the-badge&logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/React-Vite-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Express](https://img.shields.io/badge/Express.js-Backend-000000?style=for-the-badge&logo=express&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Active%20Development-orange?style=for-the-badge)

<br/>

**[🚀 Quick Start](#-getting-started)** · **[✨ Features](#-key-features)** · **[🔌 API Docs](#-api-endpoints-reference)** · **[🤝 Contributing](#-contributing)**

</div>

---

## 📋 Table of Contents

- [About the Project](#-about-the-project)
- [Key Features](#-key-features)
  - [Gourmet & Gamer Food Ordering](#1-🍔-gourmet--gamer-food-ordering-system)
  - [Game Zone & Event Booking](#2-🕹️-game-zone--event-booking-platform)
  - [Gamified Customer Feedback](#3-⭐-gamified-customer-feedback-system)
  - [Admin Management Suite](#4-🛠️-admin-management-suite)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [API Endpoints Reference](#-api-endpoints-reference)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)
- [License](#-license)

---

## 💡 About the Project

**Pixel n Plate** reimagines what a dining experience can be — part gourmet restaurant, part next-gen gaming lounge. Customers order Cyber Burgers and Pixel Pizzas while tracking their food through a live kitchen radar, book VR Holodecks and Pro Esports Suites for a birthday bash, and earn XP with every order. Behind the scenes, a real-time Admin Dashboard keeps the kitchen, the bookings, and the vibes perfectly in sync.

<br/>

## 🌟 Key Features

### 1. 🍔 Gourmet & Gamer Food Ordering System

| Feature | Description |
|---|---|
| 🍕 **Filterable Menu** | Power Combos ⚡ · Cyber Burgers 🍔 · Pixel Pizzas 🍕 · Starters 🍟 · Gamer Energy Drinks 🍹 · Glitch Desserts 🍰 |
| 🌶️ **Spice & XP Indicators** | Visual spice meters (1–4 🌶️) and loyalty XP rewards (e.g. `+150 XP`) on every dish |
| 🛒 **Interactive Cart & Table Picker** | Choose your spot — VR Booth #01–#08, Diner Table #01–#20, or Counter Pickup |
| 🎟️ **Promo Discount System** | Apply codes like `GAMER10` (10% off) or `PIXEL20` (20% off) at checkout |
| 📡 **Live Kitchen Progress Radar** | Real-time order tracking: `Order Received` ➔ `Kitchen Firing 🔥` ➔ `Quality Check` ➔ `Delivered 🚀` |

### 2. 🕹️ Game Zone & Event Booking Platform

| Feature | Description |
|---|---|
| 🎮 **Station Selection** | VR Holodeck Arena · Pro Esports PC Suites (RTX 4090) · PS5/Xbox VIP Console Lounges · Retro Arcade Cabinets |
| 🎉 **Party Packages** | Birthday Power Hour · LAN Party Pack · Gamer Date Night |
| 🗓️ **Slot & Date Selector** | Live time slots, guest count selector, and customer detail collection |
| 🎫 **Digital Pass Generator** | Instant ticket with unique Booking ID, QR Code, and print/save option |

### 3. ⭐ Gamified Customer Feedback System

| Feature | Description |
|---|---|
| 😡😐🙂😃🤩 **Arcade Sentiment Meter** | Interactive 1–5 star rating with animated emoji reactions |
| 👾 **Gamer Avatar Selector** | Custom gamer tags paired with avatar icons (👾 🕹️ ⚡ 🏎️ 🍔 👑) |
| 🏆 **Community Wall of Honor** | A live feed of verified gamer reviews with helpful upvotes |

### 4. 🛠️ Admin Management Suite

| Feature | Description |
|---|---|
| 📊 **Analytics Overview** | Live metrics — Total Revenue ($), Active Kitchen Queue, Station Bookings Count, Avg Rating |
| 🔥 **Live Kitchen Orders Queue** | Update order status in real time as dishes move through the kitchen |
| 📅 **Reservations Manager** | Monitor and approve incoming station bookings |
| 🍽️ **Live Menu Manager** | Add new dishes, toggle In Stock / Out of Stock, or delete items instantly |

<br/>

## 🛠️ Tech Stack

<div align="center">

| Layer | Technology |
|---|---|
| **Frontend** | React + Vite |
| **Backend** | Node.js + Express |
| **Package Manager** | npm |
| **API Style** | RESTful JSON API |

</div>

<br/>

## 🚀 Getting Started

### Prerequisites

- **Node.js** v16 or higher
- **npm**

### 1️⃣ Install Dependencies

```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### 2️⃣ Run the Express Backend Server

```bash
cd server
npm start
```
> 🟢 Express server will run on **http://localhost:5000**

### 3️⃣ Run the React (Vite) Frontend App

In a separate terminal window:

```bash
cd client
npm run dev
```
> 🟣 Frontend app will run on **http://localhost:5173**

<br/>

## 🔌 API Endpoints Reference

### 🍽️ Food Menu

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/menu` | Fetch all menu items |
| `POST` | `/api/menu` | Add a new food dish |
| `PUT` | `/api/menu/:id` | Update a menu item / toggle stock |
| `DELETE` | `/api/menu/:id` | Delete a menu item |

### 🧾 Orders

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/orders` | Fetch all kitchen orders |
| `POST` | `/api/orders` | Place a new food order |
| `PATCH` | `/api/orders/:id` | Update order status (`Pending`, `Preparing`, `Ready`, `Delivered`) |

### 🎮 Bookings

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/bookings` | Fetch station reservations |
| `POST` | `/api/bookings` | Book a gaming station/event |
| `PATCH` | `/api/bookings/:id` | Update booking status (`Confirmed`, `Completed`, `Cancelled`) |

### ⭐ Feedback & Stats

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/feedback` | Fetch customer reviews |
| `POST` | `/api/feedback` | Submit a review |
| `GET` | `/api/stats` | Fetch admin summary analytics |

<br/>

## 📁 Project Structure

```
pixel-n-plate/
├── client/                 # React (Vite) frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Menu, Booking, Feedback, Admin pages
│   │   └── App.jsx
│   └── package.json
│
├── server/                 # Express backend
│   ├── routes/              # menu, orders, bookings, feedback routes
│   ├── controllers/
│   └── package.json
│
└── README.md
```

<br/>

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

<br/>

## 📄 License

This project is licensed under the **MIT License**.

---

<div align="center">

**🍔 Fuel Up. 🎮 Level Up. 🚀 Level Up Together.**

Made with ❤️ for gamers and food lovers alike.

</div>
