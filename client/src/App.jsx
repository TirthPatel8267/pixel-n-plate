import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FoodMenu from './components/FoodMenu';
import CartDrawer from './components/CartDrawer';
import OrderTracker from './components/OrderTracker';
import EventBooking from './components/EventBooking';
import DigitalPassModal from './components/DigitalPassModal';
import CustomerFeedback from './components/CustomerFeedback';
import AdminDashboard from './components/AdminDashboard';
import TournamentsLeaderboard from './components/TournamentsLeaderboard';
import FloorMap from './components/FloorMap';

import {
  fetchMenu,
  fetchOrders,
  fetchBookings,
  fetchFeedback,
  placeOrder,
  createBooking,
  submitFeedback
} from './services/api';

export default function App() {
  const [activeTab, setActiveTab] = useState('food'); // food | booking | map | esports | feedback | tracker
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [menuItems, setMenuItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [feedbackList, setFeedbackList] = useState([]);

  const [cartItems, setCartItems] = useState([]);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [activeOrderId, setActiveOrderId] = useState(null);

  const [bookingPassModal, setBookingPassModal] = useState(null);
  const [notification, setNotification] = useState(null);

  const showToast = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3500);
  };

  // Initial Data Load
  const loadInitialData = async () => {
    try {
      const [m, o, b, f] = await Promise.all([
        fetchMenu().catch(() => []),
        fetchOrders().catch(() => []),
        fetchBookings().catch(() => []),
        fetchFeedback().catch(() => [])
      ]);
      setMenuItems(m);
      setOrders(o);
      setBookings(b);
      setFeedbackList(f);
    } catch (err) {
      console.error('Failed to load initial data:', err);
    }
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  // Cart Operations
  const handleAddToCart = (item) => {
    setCartItems(prev => {
      const existing = prev.find(ci => ci.id === item.id);
      if (existing) {
        return prev.map(ci => ci.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    showToast(`Added "${item.name}" to cart! 🍔`);
  };

  const handleUpdateQty = (itemId, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(itemId);
      return;
    }
    setCartItems(prev => prev.map(ci => ci.id === itemId ? { ...ci, quantity: newQty } : ci));
  };

  const handleRemoveItem = (itemId) => {
    setCartItems(prev => prev.filter(ci => ci.id !== itemId));
  };

  // Checkout Action
  const handleCheckout = async (orderPayload) => {
    setIsPlacingOrder(true);
    try {
      const newOrder = await placeOrder(orderPayload);
      setCartItems([]);
      setIsCartOpen(false);
      setActiveOrderId(newOrder.id);
      
      const freshOrders = await fetchOrders();
      setOrders(freshOrders);

      setActiveTab('tracker');
      showToast(`Order ${newOrder.id} placed! Kitchen is preparing your food 🔥`);
    } catch (err) {
      showToast('Failed to submit order. Please try again.', 'error');
    } finally {
      setIsPlacingOrder(false);
    }
  };

  // Booking Action
  const handleBookingSuccess = async (bookingPayload) => {
    try {
      const newBooking = await createBooking(bookingPayload);
      const freshBookings = await fetchBookings();
      setBookings(freshBookings);
      
      setBookingPassModal(newBooking);
      showToast(`Station Reserved! Booking Pass ${newBooking.id} generated! 🎟️`);
    } catch (err) {
      showToast('Booking failed. Please try again.', 'error');
    }
  };

  // Feedback Action
  const handleSubmitFeedback = async (feedbackPayload) => {
    try {
      const newFb = await submitFeedback(feedbackPayload);
      const freshFeedback = await fetchFeedback();
      setFeedbackList(freshFeedback);
      showToast('Thank you for rating Pixel n Plate! 🌟');
    } catch (err) {
      showToast('Failed to post feedback', 'error');
    }
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const activeOrderCount = orders.filter(o => o.status === 'Pending' || o.status === 'Preparing').length;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Toast Notification Banner */}
      {notification && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 2000,
          background: notification.type === 'error' ? 'var(--pink-neon)' : 'linear-gradient(135deg, #00f3ff 0%, #0072ff 100%)',
          color: '#fff',
          padding: '14px 22px',
          borderRadius: 'var(--radius-md)',
          fontWeight: 700,
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          animation: 'pulseGlow 2s infinite'
        }}>
          {notification.msg}
        </div>
      )}

      {/* Main Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        isAdmin={isAdmin}
        setIsAdmin={setIsAdmin}
        activeOrderCount={activeOrderCount}
      />

      {/* Main Body */}
      <main style={{ flex: 1 }}>
        {isAdmin ? (
          <AdminDashboard
            menuItems={menuItems}
            onRefreshMenu={async () => setMenuItems(await fetchMenu())}
            orders={orders}
            onRefreshOrders={async () => setOrders(await fetchOrders())}
            bookings={bookings}
            onRefreshBookings={async () => setBookings(await fetchBookings())}
          />
        ) : (
          <>
            {activeTab === 'food' && (
              <>
                <Hero
                  onExploreMenu={() => {
                    const el = document.getElementById('food-menu');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  onBookStation={() => setActiveTab('booking')}
                />
                <FoodMenu
                  menuItems={menuItems}
                  onAddToCart={handleAddToCart}
                  cartItems={cartItems}
                />
              </>
            )}

            {activeTab === 'booking' && (
              <EventBooking onBookingSuccess={handleBookingSuccess} />
            )}

            {activeTab === 'map' && (
              <FloorMap
                onSelectStationForBooking={(stationName) => {
                  setActiveTab('booking');
                }}
              />
            )}

            {activeTab === 'esports' && (
              <TournamentsLeaderboard />
            )}

            {activeTab === 'feedback' && (
              <CustomerFeedback
                feedbackList={feedbackList}
                onSubmitFeedback={handleSubmitFeedback}
              />
            )}

            {activeTab === 'tracker' && (
              <OrderTracker
                orders={orders}
                onRefresh={async () => setOrders(await fetchOrders())}
                activeOrderId={activeOrderId}
              />
            )}
          </>
        )}
      </main>

      {/* Sliding Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
        isPlacingOrder={isPlacingOrder}
      />

      {/* Digital Booking Ticket Pass Modal */}
      <DigitalPassModal
        bookingPass={bookingPassModal}
        onClose={() => setBookingPassModal(null)}
      />

      {/* Footer */}
      <footer style={{
        background: '#040508',
        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
        padding: '40px 0 24px 0',
        marginTop: '60px'
      }}>
        <div className="container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div>
            <div style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--cyan-neon)' }}>
              PIXEL N PLATE 🍔🎮
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              The Ultimate Restaurant & Game Zone Management Platform. © 2026 Pixel n Plate Inc.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '16px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            <span style={{ cursor: 'pointer' }} onClick={() => setActiveTab('food')}>Food Menu</span>
            <span>•</span>
            <span style={{ cursor: 'pointer' }} onClick={() => setActiveTab('booking')}>Game Zone</span>
            <span>•</span>
            <span style={{ cursor: 'pointer' }} onClick={() => setActiveTab('map')}>Live Map</span>
            <span>•</span>
            <span style={{ cursor: 'pointer' }} onClick={() => setActiveTab('esports')}>Tournaments</span>
            <span>•</span>
            <span style={{ cursor: 'pointer' }} onClick={() => setIsAdmin(true)}>Admin Panel</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
