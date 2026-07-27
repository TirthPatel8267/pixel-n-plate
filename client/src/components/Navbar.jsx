import React from 'react';
import { ShoppingBag, Gamepad2, UtensilsCrossed, ShieldAlert, Trophy, Map, Clock, Star } from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  cartCount, 
  onOpenCart, 
  isAdmin, 
  setIsAdmin,
  activeOrderCount
}) {
  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'rgba(7, 8, 12, 0.88)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '76px'
      }}>
        {/* Brand Logo */}
        <div 
          onClick={() => { setIsAdmin(false); setActiveTab('food'); }}
          style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
        >
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #00f3ff 0%, #ff007f 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(0, 243, 255, 0.4)',
            fontSize: '1.4rem'
          }}>
            🍔
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '1.4rem', fontWeight: 900, fontFamily: 'var(--font-heading)' }} className="gradient-text-cyan">
                PIXEL
              </span>
              <span className="pixel-font" style={{ color: 'var(--pink-neon)', fontSize: '0.65rem' }}>N</span>
              <span style={{ fontSize: '1.4rem', fontWeight: 900, fontFamily: 'var(--font-heading)', color: '#fff' }}>
                PLATE
              </span>
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', letterSpacing: '0.08em', fontWeight: 600 }}>
              RESTAURANT & GAME ZONE
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        {!isAdmin && (
          <nav style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setActiveTab('food')}
              className={activeTab === 'food' ? 'btn-primary' : 'btn-ghost'}
              style={{ fontSize: '0.88rem', padding: '7px 14px' }}
            >
              <UtensilsCrossed size={15} />
              Food Menu
            </button>

            <button
              onClick={() => setActiveTab('booking')}
              className={activeTab === 'booking' ? 'btn-primary' : 'btn-ghost'}
              style={{ fontSize: '0.88rem', padding: '7px 14px' }}
            >
              <Gamepad2 size={15} />
              Game Zone
            </button>

            <button
              onClick={() => setActiveTab('map')}
              className={activeTab === 'map' ? 'btn-primary' : 'btn-ghost'}
              style={{ fontSize: '0.88rem', padding: '7px 14px' }}
            >
              <Map size={15} />
              Live Map
            </button>

            <button
              onClick={() => setActiveTab('esports')}
              className={activeTab === 'esports' ? 'btn-primary' : 'btn-ghost'}
              style={{ fontSize: '0.88rem', padding: '7px 14px' }}
            >
              <Trophy size={15} />
              Tournaments
            </button>

            <button
              onClick={() => setActiveTab('feedback')}
              className={activeTab === 'feedback' ? 'btn-primary' : 'btn-ghost'}
              style={{ fontSize: '0.88rem', padding: '7px 14px' }}
            >
              <Star size={15} />
              Reviews
            </button>

            <button
              onClick={() => setActiveTab('tracker')}
              className={activeTab === 'tracker' ? 'btn-primary' : 'btn-ghost'}
              style={{ fontSize: '0.88rem', padding: '7px 14px', position: 'relative' }}
            >
              <Clock size={15} />
              Tracker
              {activeOrderCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: 'var(--lime-neon)',
                  boxShadow: '0 0 8px var(--lime-neon)'
                }} />
              )}
            </button>
          </nav>
        )}

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {!isAdmin && (
            <button 
              onClick={onOpenCart}
              className="btn-outline"
              style={{ position: 'relative', padding: '8px 14px', fontSize: '0.88rem' }}
            >
              <ShoppingBag size={17} />
              <span style={{ fontWeight: 700 }}>Cart</span>
              {cartCount > 0 && (
                <span style={{
                  background: 'var(--pink-neon)',
                  color: '#fff',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  borderRadius: '99px',
                  padding: '2px 7px',
                  marginLeft: '4px',
                  boxShadow: '0 0 10px rgba(255,0,127,0.6)'
                }}>
                  {cartCount}
                </span>
              )}
            </button>
          )}

          {/* Admin Switcher Toggle */}
          <button
            onClick={() => setIsAdmin(!isAdmin)}
            style={{
              background: isAdmin 
                ? 'linear-gradient(135deg, #ff007f 0%, #9d4edd 100%)' 
                : 'rgba(255, 255, 255, 0.06)',
              border: isAdmin ? 'none' : '1px solid rgba(255,255,255,0.15)',
              color: '#fff',
              padding: '8px 14px',
              borderRadius: 'var(--radius-md)',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.25s ease'
            }}
          >
            <ShieldAlert size={16} color={isAdmin ? '#fff' : 'var(--amber-neon)'} />
            {isAdmin ? 'Exit Admin' : 'Admin Portal 🛠️'}
          </button>
        </div>
      </div>
    </header>
  );
}
