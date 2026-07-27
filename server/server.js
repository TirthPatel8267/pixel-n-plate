const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const DATA_DIR = path.join(__dirname, 'data');

// Helper function to read JSON data safely
const readData = (filename) => {
  const filePath = path.join(DATA_DIR, filename);
  try {
    if (!fs.existsSync(filePath)) return [];
    const content = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(content || '[]');
  } catch (err) {
    console.error(`Error reading ${filename}:`, err);
    return [];
  }
};

// Helper function to write JSON data safely
const writeData = (filename, data) => {
  const filePath = path.join(DATA_DIR, filename);
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error(`Error writing ${filename}:`, err);
  }
};

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'Pixel n Plate API', timestamp: new Date() });
});

// ---------------- MENU ENDPOINTS ----------------
app.get('/api/menu', (req, res) => {
  const menu = readData('menu.json');
  res.json(menu);
});

app.post('/api/menu', (req, res) => {
  const menu = readData('menu.json');
  const newItem = {
    id: `m_${Date.now()}`,
    name: req.body.name || 'New Item',
    category: req.body.category || 'burgers',
    price: parseFloat(req.body.price) || 9.99,
    rating: 5.0,
    prepTime: req.body.prepTime || '10 mins',
    spicyLevel: parseInt(req.body.spicyLevel) || 0,
    xpPerk: req.body.xpPerk || '+50 XP',
    description: req.body.description || '',
    image: req.body.image || 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
    isAvailable: true,
    popular: req.body.popular || false
  };
  menu.unshift(newItem);
  writeData('menu.json', menu);
  res.status(201).json(newItem);
});

app.put('/api/menu/:id', (req, res) => {
  let menu = readData('menu.json');
  const index = menu.findIndex(item => item.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }
  menu[index] = { ...menu[index], ...req.body };
  writeData('menu.json', menu);
  res.json(menu[index]);
});

app.delete('/api/menu/:id', (req, res) => {
  let menu = readData('menu.json');
  menu = menu.filter(item => item.id !== req.params.id);
  writeData('menu.json', menu);
  res.json({ success: true, id: req.params.id });
});

// ---------------- ORDERS ENDPOINTS ----------------
app.get('/api/orders', (req, res) => {
  const orders = readData('orders.json');
  res.json(orders);
});

app.post('/api/orders', (req, res) => {
  const orders = readData('orders.json');
  const { customerName, boothNumber, items, subtotal, discount, total } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ error: 'Cart is empty' });
  }

  const newOrder = {
    id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
    customerName: customerName || 'Valued Gamer',
    boothNumber: boothNumber || 'Table #01',
    items: items,
    subtotal: subtotal || 0,
    discount: discount || 0,
    total: total || 0,
    status: 'Pending',
    createdAt: new Date().toISOString(),
    estimatedMins: 15
  };

  orders.unshift(newOrder);
  writeData('orders.json', orders);
  res.status(201).json(newOrder);
});

app.patch('/api/orders/:id', (req, res) => {
  let orders = readData('orders.json');
  const index = orders.findIndex(o => o.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Order not found' });
  }

  if (req.body.status) orders[index].status = req.body.status;
  if (req.body.estimatedMins !== undefined) orders[index].estimatedMins = req.body.estimatedMins;

  writeData('orders.json', orders);
  res.json(orders[index]);
});

// ---------------- BOOKINGS ENDPOINTS ----------------
app.get('/api/bookings', (req, res) => {
  const bookings = readData('bookings.json');
  res.json(bookings);
});

app.post('/api/bookings', (req, res) => {
  const bookings = readData('bookings.json');
  const { customerName, email, phone, zone, package: pkg, date, timeSlot, guests, totalAmount } = req.body;

  const newBooking = {
    id: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
    customerName: customerName || 'Anonymous Gamer',
    email: email || '',
    phone: phone || '',
    zone: zone || 'Arcade Station',
    package: pkg || 'Standard Gaming (1 Hour)',
    date: date || new Date().toISOString().split('T')[0],
    timeSlot: timeSlot || '18:00 - 19:00',
    guests: guests || 1,
    totalAmount: totalAmount || 25.00,
    status: 'Confirmed',
    createdAt: new Date().toISOString()
  };

  bookings.unshift(newBooking);
  writeData('bookings.json', bookings);
  res.status(201).json(newBooking);
});

app.patch('/api/bookings/:id', (req, res) => {
  let bookings = readData('bookings.json');
  const index = bookings.findIndex(b => b.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Booking not found' });
  }

  if (req.body.status) bookings[index].status = req.body.status;

  writeData('bookings.json', bookings);
  res.json(bookings[index]);
});

// ---------------- FEEDBACK ENDPOINTS ----------------
app.get('/api/feedback', (req, res) => {
  const feedback = readData('feedback.json');
  res.json(feedback);
});

app.post('/api/feedback', (req, res) => {
  const feedback = readData('feedback.json');
  const { customerName, avatar, rating, category, comment } = req.body;

  const newFeedback = {
    id: `FB-${Math.floor(100 + Math.random() * 900)}`,
    customerName: customerName || 'Gamer Guest',
    avatar: avatar || '👾',
    rating: parseInt(rating) || 5,
    category: category || 'Overall Vibe',
    comment: comment || 'Awesome food and games!',
    date: new Date().toISOString().split('T')[0],
    likes: 0,
    verifiedGamer: true
  };

  feedback.unshift(newFeedback);
  writeData('feedback.json', feedback);
  res.status(201).json(newFeedback);
});

// ---------------- ADMIN ANALYTICS ENDPOINT ----------------
app.get('/api/stats', (req, res) => {
  const orders = readData('orders.json');
  const bookings = readData('bookings.json');
  const feedback = readData('feedback.json');
  const menu = readData('menu.json');

  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0) +
                       bookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0);
  
  const activeOrders = orders.filter(o => o.status === 'Pending' || o.status === 'Preparing').length;
  const totalBookings = bookings.length;
  
  const avgRating = feedback.length > 0
    ? (feedback.reduce((sum, f) => sum + f.rating, 0) / feedback.length).toFixed(1)
    : '5.0';

  res.json({
    totalRevenue: parseFloat(totalRevenue.toFixed(2)),
    activeOrders,
    totalBookings,
    avgRating: parseFloat(avgRating),
    totalMenuItems: menu.length,
    recentOrders: orders.slice(0, 5),
    recentBookings: bookings.slice(0, 5)
  });
});

app.listen(PORT, () => {
  console.log(`🎮 Pixel n Plate Server running on http://localhost:${PORT}`);
});
