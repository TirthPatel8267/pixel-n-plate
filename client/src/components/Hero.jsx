import React from 'react';
import { Gamepad2, Utensils, Zap, Flame, Trophy, Award } from 'lucide-react';

export default function Hero({ onExploreMenu, onBookStation }) {
  return (
    <section style={{
      position: 'relative',
      padding: '60px 0 40px 0',
      overflow: 'hidden'
    }}>
      {/* Background Neon Orbs */}
      <div style={{
        position: 'absolute',
        top: '-100px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '600px',
        height: '300px',
        background: 'radial-gradient(ellipse, rgba(0, 243, 255, 0.15) 0%, rgba(255, 0, 127, 0.1) 50%, transparent 70%)',
        filter: 'blur(50px)',
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ textAlign: 'center', maxWidth: '840px', margin: '0 auto' }}>
          
          {/* Live Status Pill */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }} className="badge-neon pulse-glow">
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--cyan-neon)' }} />
            <span style={{ textTransform: 'uppercase', letterSpacing: '0.08em' }}>LIVE AT BOOTH #01 - #20 • ONLINE ORDERING ACTIVE</span>
          </div>

          {/* Main Title */}
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4.2rem)',
            lineHeight: 1.1,
            marginBottom: '20px',
            textTransform: 'uppercase'
          }}>
            LEVEL UP YOUR TASTE. <br />
            <span className="gradient-text-cyan">GAME ON YOUR TERMS.</span>
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: '1.15rem',
            color: 'var(--text-muted)',
            lineHeight: 1.6,
            marginBottom: '32px',
            maxWidth: '680px',
            margin: '0 auto 32px auto'
          }}>
            Welcome to <strong style={{ color: '#fff' }}>Pixel n Plate</strong> — where gourmet smash burgers, loaded fries, and craft energy shakes meet 4K 240Hz PC setups, VR Holodecks, and Retro Arcade Cabins!
          </p>

          {/* Action CTA Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <button onClick={onExploreMenu} className="btn-primary" style={{ padding: '14px 28px', fontSize: '1rem' }}>
              <Utensils size={20} />
              Order Food to Booth 🍔
            </button>
            <button onClick={onBookStation} className="btn-pink" style={{ padding: '14px 28px', fontSize: '1rem' }}>
              <Gamepad2 size={20} />
              Book Game Station 🕹️
            </button>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '20px',
          marginTop: '50px'
        }}>
          <div className="glass-card" style={{ padding: '24px', display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'rgba(0, 243, 255, 0.12)',
              color: 'var(--cyan-neon)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Flame size={26} />
            </div>
            <div>
              <h4 style={{ color: '#fff', fontSize: '1.05rem', marginBottom: '6px' }}>Chef-Crafted Gamer Eats</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                100% Angus smash burgers, hot honey pepperoni pizzas, & energy shakes delivered straight to your rig.
              </p>
            </div>
          </div>

          <div className="glass-card" style={{ padding: '24px', display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'rgba(255, 0, 127, 0.12)',
              color: 'var(--pink-neon)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Zap size={26} />
            </div>
            <div>
              <h4 style={{ color: '#fff', fontSize: '1.05rem', marginBottom: '6px' }}>Pro Rigs & VR Arena</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                RTX 4090 gaming towers, 240Hz OLED screens, VR Omnis, PS5 VIP lounges, & private LAN suites.
              </p>
            </div>
          </div>

          <div className="glass-card" style={{ padding: '24px', display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'rgba(255, 183, 0, 0.12)',
              color: 'var(--amber-neon)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Trophy size={26} />
            </div>
            <div>
              <h4 style={{ color: '#fff', fontSize: '1.05rem', marginBottom: '6px' }}>XP Loyalty & Perks</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                Earn XP points with every meal order and redeem for free VR hours, secret menu items, & tournaments.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
