import React, { useState, useEffect } from 'react';
import { IndianRupee, Clock, Gamepad2, Star, Utensils, Plus, Trash2, Edit, CheckCircle, AlertTriangle, Filter, Eye } from 'lucide-react';
import { fetchAdminStats, updateOrderStatus, updateBookingStatus, addMenuItem, deleteMenuItem, updateMenuItem } from '../services/api';

export default function AdminDashboard({ menuItems, onRefreshMenu, orders, onRefreshOrders, bookings, onRefreshBookings }) {
  const [adminTab, setAdminTab] = useState('orders');
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // New Menu Item Form State
  const [newItem, setNewItem] = useState({
    name: '',
    category: 'burgers',
    price: '',
    prepTime: '12 mins',
    spicyLevel: 0,
    xpPerk: '+100 XP',
    description: '',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
    popular: false
  });

  const [formMsg, setFormMsg] = useState('');

  const loadStats = async () => {
    try {
      const data = await fetchAdminStats();
      setStats(data);
    } catch (err) {
      console.error('Failed to load admin stats:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      onRefreshOrders();
      loadStats();
    } catch (err) {
      alert('Error updating order status');
    }
  };

  const handleUpdateBookingStatus = async (bookingId, newStatus) => {
    try {
      await updateBookingStatus(bookingId, newStatus);
      onRefreshBookings();
      loadStats();
    } catch (err) {
      alert('Error updating booking status');
    }
  };

  const handleCreateMenuItem = async (e) => {
    e.preventDefault();
    if (!newItem.name || !newItem.price) return;

    try {
      await addMenuItem({
        ...newItem,
        price: parseFloat(newItem.price)
      });
      setFormMsg('Food item added successfully to live menu!');
      onRefreshMenu();
      loadStats();
      setNewItem({
        name: '',
        category: 'burgers',
        price: '',
        prepTime: '12 mins',
        spicyLevel: 0,
        xpPerk: '+100 XP',
        description: '',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
        popular: false
      });
      setTimeout(() => setFormMsg(''), 3000);
    } catch (err) {
      alert('Failed to add item to menu');
    }
  };

  const handleToggleStock = async (item) => {
    try {
      await updateMenuItem(item.id, { isAvailable: !item.isAvailable });
      onRefreshMenu();
    } catch (err) {
      alert('Failed to update item availability');
    }
  };

  const handleDeleteItem = async (itemId) => {
    if (!window.confirm('Are you sure you want to remove this item from the menu?')) return;
    try {
      await deleteMenuItem(itemId);
      onRefreshMenu();
      loadStats();
    } catch (err) {
      alert('Failed to delete menu item');
    }
  };

  return (
    <section style={{ padding: '40px 0 80px 0' }}>
      <div className="container">
        
        {/* Admin Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '32px',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div>
            <div className="badge-pink" style={{ marginBottom: '6px' }}>
              ADMIN MANAGEMENT SUITE 🛠️
            </div>
            <h2 style={{ fontSize: '2.2rem', color: '#fff' }}>
              PIXEL N PLATE <span className="gradient-text-pink">CONTROL CENTER</span>
            </h2>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setAdminTab('orders')}
              className={adminTab === 'orders' ? 'btn-primary' : 'btn-ghost'}
            >
              <Clock size={16} /> Kitchen Orders ({orders.filter(o => o.status !== 'Delivered').length})
            </button>

            <button
              onClick={() => setAdminTab('bookings')}
              className={adminTab === 'bookings' ? 'btn-primary' : 'btn-ghost'}
            >
              <Gamepad2 size={16} /> Bookings ({bookings.length})
            </button>

            <button
              onClick={() => setAdminTab('menu')}
              className={adminTab === 'menu' ? 'btn-primary' : 'btn-ghost'}
            >
              <Utensils size={16} /> Menu Manager ({menuItems.length})
            </button>
          </div>
        </div>

        {/* Top Metric Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '20px',
          marginBottom: '40px'
        }}>
          <div className="glass-card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 700 }}>TOTAL REVENUE</span>
              <IndianRupee size={20} color="var(--lime-neon)" />
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--lime-neon)' }}>
              ₹{stats?.totalRevenue ? stats.totalRevenue.toFixed(0) : '0'}
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Food + Station Bookings</span>
          </div>

          <div className="glass-card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 700 }}>ACTIVE KITCHEN ORDERS</span>
              <Clock size={20} color="var(--cyan-neon)" />
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--cyan-neon)' }}>
              {orders.filter(o => o.status === 'Pending' || o.status === 'Preparing').length}
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Orders currently in queue</span>
          </div>

          <div className="glass-card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 700 }}>TOTAL RESERVATIONS</span>
              <Gamepad2 size={20} color="var(--pink-neon)" />
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--pink-neon)' }}>
              {bookings.length}
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>VR & LAN Station Slots</span>
          </div>

          <div className="glass-card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 700 }}>AVG GAMER RATING</span>
              <Star size={20} color="var(--amber-neon)" fill="var(--amber-neon)" />
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--amber-neon)' }}>
              {stats?.avgRating || '4.9'} / 5.0
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>From customer reviews</span>
          </div>
        </div>

        {/* TAB 1: ORDERS KITCHEN MANAGER */}
        {adminTab === 'orders' && (
          <div>
            <h3 style={{ color: '#fff', fontSize: '1.3rem', marginBottom: '20px' }}>
              Live Kitchen Orders Queue 🍔
            </h3>

            {orders.length === 0 ? (
              <div className="glass-card" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                No orders in history.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {orders.map(order => (
                  <div key={order.id} className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--cyan-neon)' }}>
                            {order.id}
                          </span>
                          <span className="badge-pink">{order.boothNumber}</span>
                          <span style={{ fontSize: '0.85rem', color: '#fff', fontWeight: 700 }}>
                            {order.customerName}
                          </span>
                        </div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                          Ordered: {new Date(order.createdAt).toLocaleString()}
                        </div>
                      </div>

                      {/* Status Selector */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Change Status:</span>
                        <select
                          value={order.status}
                          onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                          className="form-select"
                          style={{ width: '160px', padding: '6px 12px', fontSize: '0.85rem' }}
                        >
                          <option value="Pending">Pending 📝</option>
                          <option value="Preparing">Preparing 🔥</option>
                          <option value="Ready">Ready for Delivery 📦</option>
                          <option value="Delivered">Delivered 🚀</option>
                          <option value="Cancelled">Cancelled ❌</option>
                        </select>
                      </div>
                    </div>

                    {/* Items */}
                    <div style={{ background: 'rgba(0,0,0,0.3)', padding: '12px 16px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                        {order.items.map((it, idx) => (
                          <span key={idx} style={{ fontSize: '0.88rem', color: '#fff' }}>
                            <strong style={{ color: 'var(--cyan-neon)' }}>{it.quantity}x</strong> {it.name}
                          </span>
                        ))}
                      </div>
                      <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--lime-neon)' }}>
                        ₹{order.total}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: BOOKINGS RESERVATIONS MANAGER */}
        {adminTab === 'bookings' && (
          <div>
            <h3 style={{ color: '#fff', fontSize: '1.3rem', marginBottom: '20px' }}>
              Station & Event Reservations Manager 🕹️
            </h3>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', color: '#fff', fontSize: '0.9rem' }} className="glass-card">
                <thead>
                  <tr style={{ background: 'rgba(255,255,255,0.05)', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <th style={{ padding: '14px 16px' }}>Booking ID</th>
                    <th style={{ padding: '14px 16px' }}>Gamer Details</th>
                    <th style={{ padding: '14px 16px' }}>Zone & Package</th>
                    <th style={{ padding: '14px 16px' }}>Date & Time Slot</th>
                    <th style={{ padding: '14px 16px' }}>Guests</th>
                    <th style={{ padding: '14px 16px' }}>Amount</th>
                    <th style={{ padding: '14px 16px' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map(b => (
                    <tr key={b.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '14px 16px', fontWeight: 800, color: 'var(--cyan-neon)' }}>
                        {b.id}
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ fontWeight: 700 }}>{b.customerName}</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{b.email || b.phone}</div>
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ color: 'var(--pink-neon)', fontWeight: 700 }}>{b.zone}</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--amber-neon)' }}>{b.package}</div>
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <div>{b.date}</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{b.timeSlot}</div>
                      </td>
                      <td style={{ padding: '14px 16px' }}>{b.guests} Gamers</td>
                      <td style={{ padding: '14px 16px', fontWeight: 800, color: 'var(--lime-neon)' }}>
                        ₹{b.totalAmount}
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <select
                          value={b.status}
                          onChange={(e) => handleUpdateBookingStatus(b.id, e.target.value)}
                          className="form-select"
                          style={{ padding: '4px 8px', fontSize: '0.82rem', width: '130px' }}
                        >
                          <option value="Confirmed">Confirmed ✅</option>
                          <option value="Completed">Completed 🎉</option>
                          <option value="Cancelled">Cancelled ❌</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: MENU MANAGER */}
        {adminTab === 'menu' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '32px' }}>
            
            {/* Add New Item Form */}
            <div className="glass-card" style={{ padding: '28px' }}>
              <h3 style={{ color: '#fff', fontSize: '1.25rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Plus size={20} color="var(--cyan-neon)" /> Add New Food Dish
              </h3>

              {formMsg && (
                <div style={{ background: 'rgba(57,255,20,0.15)', color: 'var(--lime-neon)', padding: '10px 14px', borderRadius: '8px', marginBottom: '16px', fontSize: '0.88rem' }}>
                  ✓ {formMsg}
                </div>
              )}

              <form onSubmit={handleCreateMenuItem} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>ITEM NAME</label>
                  <input
                    type="text"
                    placeholder="e.g. Tandoori Chicken Cyber Pizza"
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                    className="form-input"
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>CATEGORY</label>
                    <select
                      value={newItem.category}
                      onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                      className="form-select"
                    >
                      <option value="burgers">Burgers 🍔</option>
                      <option value="pizzas">Pizzas 🍕</option>
                      <option value="combos">Power Combos ⚡</option>
                      <option value="starters">Starters 🍟</option>
                      <option value="drinks">Drinks 🍹</option>
                      <option value="desserts">Desserts 🍰</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>PRICE (₹)</label>
                    <input
                      type="number"
                      placeholder="349"
                      value={newItem.price}
                      onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                      className="form-input"
                      required
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>PREP TIME</label>
                    <input
                      type="text"
                      placeholder="12 mins"
                      value={newItem.prepTime}
                      onChange={(e) => setNewItem({ ...newItem, prepTime: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>SPICY LEVEL (0-4)</label>
                    <input
                      type="number"
                      min="0"
                      max="4"
                      value={newItem.spicyLevel}
                      onChange={(e) => setNewItem({ ...newItem, spicyLevel: parseInt(e.target.value) || 0 })}
                      className="form-input"
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>XP LOYALTY PERK</label>
                  <input
                    type="text"
                    placeholder="+100 XP"
                    value={newItem.xpPerk}
                    onChange={(e) => setNewItem({ ...newItem, xpPerk: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>DESCRIPTION</label>
                  <textarea
                    rows="3"
                    placeholder="Short appetizing description..."
                    value={newItem.description}
                    onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                    className="form-textarea"
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>IMAGE URL</label>
                  <input
                    type="text"
                    value={newItem.image}
                    onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
                    className="form-input"
                  />
                </div>

                <button type="submit" className="btn-primary" style={{ marginTop: '8px', justifyContent: 'center' }}>
                  <Plus size={18} /> Add Dish to Live Menu
                </button>
              </form>
            </div>

            {/* Menu Items List */}
            <div>
              <h3 style={{ color: '#fff', fontSize: '1.25rem', marginBottom: '16px' }}>
                Existing Menu Items ({menuItems.length})
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '720px', overflowY: 'auto' }}>
                {menuItems.map(item => (
                  <div key={item.id} className="glass-card" style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                      <img src={item.image} alt={item.name} style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover' }} />
                      <div>
                        <h4 style={{ color: '#fff', fontSize: '0.95rem' }}>{item.name}</h4>
                        <span style={{ fontSize: '0.82rem', color: 'var(--cyan-neon)', fontWeight: 700 }}>
                          ₹{item.price} • {item.category}
                        </span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <button
                        onClick={() => handleToggleStock(item)}
                        style={{
                          background: item.isAvailable ? 'rgba(57,255,20,0.15)' : 'rgba(255,0,127,0.15)',
                          color: item.isAvailable ? 'var(--lime-neon)' : 'var(--pink-neon)',
                          border: 'none',
                          padding: '6px 10px',
                          borderRadius: '6px',
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        {item.isAvailable ? 'In Stock' : 'Out of Stock'}
                      </button>

                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        style={{ background: 'none', border: 'none', color: '#ff4d4d', cursor: 'pointer', padding: '4px' }}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
