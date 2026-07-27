import React, { useState } from 'react';
import { Gamepad2, Calendar, Clock, Users, ShieldCheck, Sparkles, Check, Ticket, Award } from 'lucide-react';

export default function EventBooking({ onBookingSuccess }) {
  const [selectedZone, setSelectedZone] = useState('vr');
  const [selectedPackage, setSelectedPackage] = useState('Standard Gaming Slot');
  const [bookingDate, setBookingDate] = useState(new Date().toISOString().split('T')[0]);
  const [timeSlot, setTimeSlot] = useState('18:00 - 20:00');
  const [guestCount, setGuestCount] = useState(2);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);

  const zones = [
    {
      id: 'vr',
      title: 'VR Holodeck Arena 🥽',
      hourlyRate: 499,
      capacity: 'Up to 4 Gamers',
      specs: 'KAT VR Treadmills, Meta Quest Pro 4K, 360° Wireless Haptics',
      image: 'https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&fit=crop&w=600&q=80',
      badge: 'MOST POPULAR 🌟'
    },
    {
      id: 'pc',
      title: 'Pro Esports PC Suite 🖥️',
      hourlyRate: 199,
      capacity: 'Up to 10 Rigs',
      specs: 'RTX 4090, Intel i9, 240Hz OLED screens, Secretlab TITAN Chairs',
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80',
      badge: 'TOURNAMENT READY ⚔️'
    },
    {
      id: 'vip',
      title: 'PS5 & Xbox VIP Lounge 🎮',
      hourlyRate: 299,
      capacity: 'Up to 6 Gamers',
      specs: '85" 4K OLED HDR, 7.1 Surround Sound, Reclining Leather Sofas',
      image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80',
      badge: 'LUXURY COUCH 🛋️'
    },
    {
      id: 'racing',
      title: 'Sim-Racing Motion Cockpit 🏎️',
      hourlyRate: 349,
      capacity: '1 Active Racer + Spectators',
      specs: 'Full-Motion Hydraulic Rig, Direct Drive Wheel, Triple 4K Curved Screens',
      image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=80',
      badge: 'PRO SIMULATION 🏁'
    },
    {
      id: 'karaoke',
      title: 'Karaoke & Gaming Pod 🎤',
      hourlyRate: 399,
      capacity: 'Up to 8 Gamers',
      specs: 'JBL Sound System, Dual Wireless Mics, Switch & PS5 + 50,000 Songs',
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&q=80',
      badge: 'PARTY FAVORITE 🎶'
    },
    {
      id: 'arcade',
      title: 'Retro Arcade Cabinets 👾',
      hourlyRate: 149,
      capacity: 'Unlimited Access',
      specs: '30+ Vintage Cabinets, Street Fighter, Pac-Man, Pinball, DDR',
      image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=80',
      badge: 'RETRO CLASSIC 🕹️'
    }
  ];

  const partyPackages = [
    {
      name: 'Standard Gaming Slot',
      perks: 'Hourly station rate + complimentary Gamer Energy Drink'
    },
    {
      name: '🎂 Birthday Power Hour (₹2,999)',
      fixedPrice: 2999,
      perks: '2 Hours Station + 2 Power Combos + 4 Shakes + Party Decorations'
    },
    {
      name: '⚔️ LAN Party Tournament (₹4,999)',
      fixedPrice: 4999,
      perks: '4 Hours 5-Rig PC Suite + 2 Pixel Pizzas + Unlimited Drinks'
    },
    {
      name: '💖 Gamer Date Night (₹1,999)',
      fixedPrice: 1999,
      perks: '2 Hours VR/VIP Lounge + 2 Smash Burgers + Lava Cake + 2 Shakes'
    },
    {
      name: '🏆 Weekend Esports Squad Pass (₹1,499)',
      fixedPrice: 1499,
      perks: '3 Hours Pro PCs + Loaded Peri Peri Waffle Fries + Monster Shake'
    }
  ];

  const currentZoneObj = zones.find(z => z.id === selectedZone);
  const selectedPkgObj = partyPackages.find(p => p.name === selectedPackage);
  
  const calculateTotal = () => {
    if (selectedPkgObj?.fixedPrice) return selectedPkgObj.fixedPrice;
    return (currentZoneObj?.hourlyRate || 299) * (guestCount >= 4 ? 1.5 : 1);
  };

  const handleBook = (e) => {
    e.preventDefault();
    if (!name || !email) {
      alert('Please fill in your name and email address.');
      return;
    }

    setIsSubmitting(true);

    const bookingPayload = {
      customerName: name,
      email,
      phone,
      zone: currentZoneObj.title,
      package: selectedPackage,
      date: bookingDate,
      timeSlot,
      guests: guestCount,
      totalAmount: calculateTotal()
    };

    setTimeout(() => {
      setIsSubmitting(false);
      onBookingSuccess(bookingPayload);
    }, 600);
  };

  return (
    <section style={{ padding: '40px 0 80px 0' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 40px auto' }}>
          <div className="badge-pink" style={{ marginBottom: '10px' }}>
            <Gamepad2 size={14} /> GAME ZONE & EVENT RESERVATIONS
          </div>
          <h2 style={{ fontSize: '2.4rem', color: '#fff', marginBottom: '12px' }}>
            RESERVE YOUR <span className="gradient-text-pink">GAMING STATION</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.5 }}>
            Book VR Holodecks, Pro Esports PC setups, VIP Console Suites, Racing Simulators, or throw an epic party!
          </p>
        </div>

        {/* Zone Selector Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
          marginBottom: '40px'
        }}>
          {zones.map(z => {
            const isSelected = selectedZone === z.id;
            return (
              <div
                key={z.id}
                onClick={() => setSelectedZone(z.id)}
                className={isSelected ? "glass-card-glow" : "glass-card"}
                style={{
                  cursor: 'pointer',
                  overflow: 'hidden',
                  position: 'relative',
                  border: isSelected ? '2px solid var(--cyan-neon)' : '1px solid rgba(255,255,255,0.08)',
                  transition: 'all 0.25s ease'
                }}
              >
                <div style={{ height: '140px', position: 'relative' }}>
                  <img src={z.image} alt={z.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                    <span className="badge-neon">{z.badge}</span>
                  </div>
                </div>

                <div style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <h3 style={{ color: '#fff', fontSize: '1.1rem' }}>{z.title}</h3>
                    <span style={{ color: 'var(--cyan-neon)', fontWeight: 800, fontSize: '1.1rem' }}>
                      ₹{z.hourlyRate}/hr
                    </span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--amber-neon)', marginBottom: '8px', fontWeight: 600 }}>
                    <Users size={12} style={{ display: 'inline', marginRight: '4px' }} /> {z.capacity}
                  </div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                    {z.specs}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Booking Form Card */}
        <div className="glass-card" style={{ padding: '36px', maxWidth: '840px', margin: '0 auto' }}>
          <form onSubmit={handleBook} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--cyan-neon)', display: 'block', marginBottom: '8px' }}>
                SELECT PARTY PACKAGE OR PLAY MODE
              </label>
              <select
                value={selectedPackage}
                onChange={(e) => setSelectedPackage(e.target.value)}
                className="form-select"
              >
                {partyPackages.map((p, idx) => (
                  <option key={idx} value={p.name}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Picker */}
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>
                RESERVATION DATE
              </label>
              <input
                type="date"
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                className="form-input"
              />
            </div>

            {/* Time Slot Picker */}
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>
                TIME SLOT
              </label>
              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="form-select"
              >
                <option value="12:00 - 14:00">12:00 PM - 02:00 PM</option>
                <option value="14:00 - 16:00">02:00 PM - 04:00 PM</option>
                <option value="16:00 - 18:00">04:00 PM - 06:00 PM</option>
                <option value="18:00 - 20:00">06:00 PM - 08:00 PM (Prime)</option>
                <option value="20:00 - 22:00">08:00 PM - 10:00 PM (Prime)</option>
                <option value="22:00 - 00:00">10:00 PM - 12:00 AM (Late Night)</option>
              </select>
            </div>

            {/* Guest Count */}
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>
                NUMBER OF GAMERS
              </label>
              <input
                type="number"
                min="1"
                max="12"
                value={guestCount}
                onChange={(e) => setGuestCount(parseInt(e.target.value) || 1)}
                className="form-input"
              />
            </div>

            {/* Full Name */}
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>
                PRIMARY GAMER NAME
              </label>
              <input
                type="text"
                placeholder="e.g. Rahul Sharma"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-input"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>
                EMAIL FOR DIGITAL PASS
              </label>
              <input
                type="email"
                placeholder="rahul@gamer.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>
                PHONE NUMBER
              </label>
              <input
                type="tel"
                placeholder="+91 98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="form-input"
              />
            </div>

            {/* Total Summary & Submit */}
            <div style={{ gridColumn: '1 / -1', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block' }}>ESTIMATED TOTAL</span>
                <span style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--pink-neon)' }}>
                  ₹{calculateTotal().toFixed(0)}
                </span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-pink"
                style={{ padding: '14px 32px', fontSize: '1.05rem' }}
              >
                <Ticket size={20} />
                {isSubmitting ? 'Generating Booking Pass...' : 'Confirm & Issue Pass 🎟️'}
              </button>
            </div>

          </form>
        </div>

      </div>
    </section>
  );
}
