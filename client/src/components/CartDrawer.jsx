import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, Ticket, ShoppingBag, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQty,
  onRemoveItem,
  onCheckout,
  isPlacingOrder
}) {
  const [boothNumber, setBoothNumber] = useState('Booth #04 (VR Arena)');
  const [customerName, setCustomerName] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = subtotal * appliedDiscount;
  const grandTotal = Math.max(0, subtotal - discountAmount);

  const handleApplyPromo = () => {
    setPromoError('');
    setPromoSuccess('');
    const code = promoCode.trim().toUpperCase();
    if (code === 'GAMER10') {
      setAppliedDiscount(0.10);
      setPromoSuccess('10% Gamer Discount Applied!');
    } else if (code === 'PIXEL20') {
      setAppliedDiscount(0.20);
      setPromoSuccess('20% Pixel VIP Discount Applied!');
    } else {
      setPromoError('Invalid promo code. Try "GAMER10" or "PIXEL20"');
    }
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return;
    
    onCheckout({
      customerName: customerName || 'Valued Gamer',
      boothNumber,
      items: cartItems,
      subtotal: parseFloat(subtotal.toFixed(2)),
      discount: parseFloat(discountAmount.toFixed(2)),
      total: parseFloat(grandTotal.toFixed(2))
    });
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1000,
      background: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      justifyContent: 'flex-end'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '460px',
        height: '100%',
        background: '#0e1019',
        borderLeft: '1px solid rgba(0, 243, 255, 0.2)',
        boxShadow: '-10px 0 30px rgba(0, 0, 0, 0.8)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
      }}>
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(255, 255, 255, 0.02)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShoppingBag size={22} color="var(--cyan-neon)" />
            <h3 style={{ color: '#fff', fontSize: '1.25rem' }}>Your Gaming Tray</h3>
            <span className="badge-pink">{cartItems.length} Items</span>
          </div>
          <button 
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              padding: '6px'
            }}
          >
            <X size={22} />
          </button>
        </div>

        {/* Content Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
              <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🍔🕹️</div>
              <h4 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '8px' }}>Your Cart is Empty</h4>
              <p style={{ fontSize: '0.9rem' }}>Add some Cyber Burgers, Pizzas, or Power Drinks to start your order!</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* Table / Booth Selection */}
              <div className="glass-card" style={{ padding: '16px' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--cyan-neon)', display: 'block', marginBottom: '8px', letterSpacing: '0.05em' }}>
                  DELIVERY LOCATION / BOOTH NUMBER
                </label>
                <select
                  value={boothNumber}
                  onChange={(e) => setBoothNumber(e.target.value)}
                  className="form-select"
                  style={{ marginBottom: '12px' }}
                >
                  <optgroup label="VR & LAN Gaming Zone">
                    <option value="Booth #01 (VR Arena)">Booth #01 (VR Arena)</option>
                    <option value="Booth #02 (VR Arena)">Booth #02 (VR Arena)</option>
                    <option value="Booth #04 (VR Arena)">Booth #04 (VR Arena)</option>
                    <option value="Rig #12 (Pro PC Suite)">Rig #12 (Pro PC Suite)</option>
                    <option value="Rig #15 (Pro PC Suite)">Rig #15 (Pro PC Suite)</option>
                    <option value="PS5 VIP Lounge #01">PS5 VIP Lounge #01</option>
                  </optgroup>
                  <optgroup label="Restaurant Dining Tables">
                    <option value="Table #01 (Diner)">Table #01 (Diner)</option>
                    <option value="Table #05 (Diner)">Table #05 (Diner)</option>
                    <option value="Table #10 (Retro Arcade)">Table #10 (Retro Arcade)</option>
                  </optgroup>
                  <option value="Takeout / Pickup Bar">Takeout / Counter Pickup</option>
                </select>

                <input
                  type="text"
                  placeholder="Gamer Name (e.g. Alex Mercer)"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="form-input"
                />
              </div>

              {/* Items List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {cartItems.map(item => (
                  <div key={item.id} className="glass-card" style={{
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '12px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover' }}
                      />
                      <div style={{ overflow: 'hidden' }}>
                        <h4 style={{ color: '#fff', fontSize: '0.95rem', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                          {item.name}
                        </h4>
                        <span style={{ fontSize: '0.85rem', color: 'var(--cyan-neon)', fontWeight: 700 }}>
                          ₹{(item.price * item.quantity).toFixed(0)}
                        </span>
                      </div>
                    </div>

                    {/* Quantity controls */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <button
                        onClick={() => onUpdateQty(item.id, item.quantity - 1)}
                        style={{
                          background: 'rgba(255,255,255,0.08)',
                          border: 'none',
                          color: '#fff',
                          width: '26px',
                          height: '26px',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Minus size={14} />
                      </button>
                      <span style={{ fontWeight: 800, fontSize: '0.9rem', width: '16px', textAlign: 'center' }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                        style={{
                          background: 'rgba(0,243,255,0.15)',
                          border: 'none',
                          color: 'var(--cyan-neon)',
                          width: '26px',
                          height: '26px',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Plus size={14} />
                      </button>

                      <button
                        onClick={() => onRemoveItem(item.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#ff4d4d',
                          cursor: 'pointer',
                          padding: '4px',
                          marginLeft: '4px'
                        }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Promo Code Box */}
              <div className="glass-card" style={{ padding: '16px' }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    placeholder="Promo Code (GAMER10)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="form-input"
                    style={{ textTransform: 'uppercase', fontSize: '0.85rem' }}
                  />
                  <button onClick={handleApplyPromo} className="btn-outline" style={{ padding: '8px 14px', whiteSpace: 'nowrap' }}>
                    Apply
                  </button>
                </div>
                {promoSuccess && (
                  <p style={{ fontSize: '0.8rem', color: 'var(--lime-neon)', marginTop: '6px', fontWeight: 600 }}>
                    ✓ {promoSuccess}
                  </p>
                )}
                {promoError && (
                  <p style={{ fontSize: '0.8rem', color: '#ff4d4d', marginTop: '6px' }}>
                    ✕ {promoError}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer Checkout */}
        {cartItems.length > 0 && (
          <div style={{
            padding: '20px 24px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            background: '#090a10'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '16px', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(0)}</span>
              </div>
              {appliedDiscount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--lime-neon)', fontWeight: 600 }}>
                  <span>Discount ({(appliedDiscount * 100)}%)</span>
                  <span>-₹{discountAmount.toFixed(0)}</span>
                </div>
              )}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                color: '#fff',
                fontSize: '1.2rem',
                fontWeight: 800,
                borderTop: '1px dashed rgba(255,255,255,0.1)',
                paddingTop: '8px',
                marginTop: '4px'
              }}>
                <span>Total</span>
                <span className="gradient-text-cyan">₹{grandTotal.toFixed(0)}</span>
              </div>
            </div>

            <button
              onClick={handleSubmitOrder}
              disabled={isPlacingOrder}
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: '1.05rem' }}
            >
              {isPlacingOrder ? 'Sending Order to Kitchen...' : 'Fire Order to Kitchen 🔥'}
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
