import React, { useState } from 'react';
import { Trophy, Swords, Crown, Calendar, Sparkles, Flame, Check } from 'lucide-react';

export default function TournamentsLeaderboard() {
  const [registeredEvents, setRegisteredEvents] = useState({});

  const tournaments = [
    {
      id: 't1',
      title: 'Valorant 5v5 Tactical Showdown 🎯',
      date: 'This Saturday, 5:00 PM',
      prizePool: '₹25,000 + Free Pizza',
      entryFee: '₹499 / Team',
      slotsLeft: 3,
      rigs: '240Hz Pro PCs (RTX 4090)',
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 't2',
      title: 'Tekken 8 King of Iron Fist Blitz 👊',
      date: 'Sunday, 6:30 PM',
      prizePool: '₹15,000 + VIP VR Pass',
      entryFee: '₹199 / Solo Gamer',
      slotsLeft: 6,
      rigs: 'PS5 VIP Lounge 85" OLED',
      image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 't3',
      title: 'EA FC 24 Ultimate Champion Cup ⚽',
      date: 'Next Friday, 7:00 PM',
      prizePool: '₹10,000 + Unlimited Drinks',
      entryFee: '₹149 / Solo Gamer',
      slotsLeft: 4,
      rigs: 'PS5 VIP Suites',
      image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=80'
    }
  ];

  const highScores = [
    { rank: 1, gamerTag: 'ViperX_99', game: 'Street Fighter VI', score: '998,400', badge: '👑 GOLD CHAMP' },
    { rank: 2, gamerTag: 'CyberGoddess', game: 'Pac-Man Deluxe', score: '884,210', badge: '🥈 SILVER HERO' },
    { rank: 3, gamerTag: 'NeonRider', game: 'Sim-Racing Lap Record', score: '1:14.302', badge: '🥉 BRONZE ACE' },
    { rank: 4, gamerTag: 'PixelMaster', game: 'KAT VR Space Runner', score: '752,900', badge: '🔥 TOP 5' },
    { rank: 5, gamerTag: 'AlphaSniper', game: 'Tekken 8 Perfects', score: '640,150', badge: '🔥 TOP 5' }
  ];

  const handleRegister = (id, title) => {
    setRegisteredEvents(prev => ({ ...prev, [id]: true }));
    alert(`🎉 Successfully registered for ${title}! Check your email for tournament bracket details.`);
  };

  return (
    <section style={{ padding: '40px 0 80px 0' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 40px auto' }}>
          <div className="badge-gold" style={{ marginBottom: '10px' }}>
            <Trophy size={14} /> ESPORTS & HALL OF FAME
          </div>
          <h2 style={{ fontSize: '2.4rem', color: '#fff', marginBottom: '12px' }}>
            WEEKLY TOURNAMENTS & <span className="gradient-text-gold">ARCADE LEADERBOARD</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>
            Compete in high-stakes esports tournaments or conquer the high-score wall for cash prizes & food perks!
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '32px' }}>
          
          {/* Tournament Fixtures List */}
          <div>
            <h3 style={{ color: '#fff', fontSize: '1.3rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Swords size={22} color="var(--pink-neon)" /> Upcoming Esports Tournaments
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {tournaments.map(t => {
                const isReg = registeredEvents[t.id];
                return (
                  <div key={t.id} className="glass-card" style={{ padding: '20px', display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <img src={t.image} alt={t.title} style={{ width: '120px', height: '90px', borderRadius: '12px', objectFit: 'cover' }} />
                    
                    <div style={{ flex: 1, minWidth: '220px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <span className="badge-pink" style={{ fontSize: '0.72rem' }}>PRIZE: {t.prizePool}</span>
                        <span className="badge-neon" style={{ fontSize: '0.72rem' }}>{t.slotsLeft} Slots Left</span>
                      </div>
                      <h4 style={{ color: '#fff', fontSize: '1.15rem', marginBottom: '6px' }}>{t.title}</h4>
                      <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                        <span><Calendar size={13} style={{ display: 'inline', marginRight: '4px' }} /> {t.date}</span>
                        <span>Fee: <strong style={{ color: 'var(--cyan-neon)' }}>{t.entryFee}</strong></span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleRegister(t.id, t.title)}
                      disabled={isReg}
                      className={isReg ? "btn-outline" : "btn-pink"}
                      style={{ padding: '10px 18px', fontSize: '0.88rem', whiteSpace: 'nowrap' }}
                    >
                      {isReg ? (
                        <>
                          <Check size={16} /> Registered!
                        </>
                      ) : (
                        'Register Team 🚀'
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* High Score Wall */}
          <div>
            <h3 style={{ color: '#fff', fontSize: '1.3rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Crown size={22} color="var(--amber-neon)" /> Arcade High Score Wall
            </h3>

            <div className="glass-card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {highScores.map(score => (
                  <div key={score.rank} style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-md)',
                    background: score.rank === 1 ? 'rgba(255, 183, 0, 0.12)' : 'rgba(255,255,255,0.03)',
                    border: score.rank === 1 ? '1px solid var(--amber-neon)' : '1px solid rgba(255,255,255,0.06)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        background: score.rank === 1 ? 'var(--amber-neon)' : score.rank === 2 ? '#cbd5e1' : '#b45309',
                        color: '#000',
                        fontWeight: 900,
                        fontSize: '0.85rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        #{score.rank}
                      </span>
                      <div>
                        <div style={{ fontWeight: 800, color: '#fff', fontSize: '0.95rem' }}>{score.gamerTag}</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{score.game}</div>
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div className="pixel-font" style={{ color: 'var(--cyan-neon)', fontSize: '0.85rem' }}>
                        {score.score}
                      </div>
                      <span style={{ fontSize: '0.7rem', color: 'var(--amber-neon)', fontWeight: 700 }}>
                        {score.badge}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
