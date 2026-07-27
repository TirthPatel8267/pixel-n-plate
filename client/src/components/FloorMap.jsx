import React, { useState } from 'react';
import { LayoutGrid, MapPin, Users, Monitor, Gamepad, Utensils, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function FloorMap({ onSelectStationForBooking }) {
  const [selectedStation, setSelectedStation] = useState(null);

  const stations = [
    { id: 'VR-01', name: 'VR Holodeck Arena #01', type: 'vr', status: 'occupied', gamers: 3, capacity: 4 },
    { id: 'VR-02', name: 'VR Holodeck Arena #02', type: 'vr', status: 'available', gamers: 0, capacity: 4 },
    { id: 'VR-03', name: 'VR Holodeck Arena #03', type: 'vr', status: 'available', gamers: 0, capacity: 4 },
    { id: 'PC-01', name: 'Esports Rig #01 (RTX 4090)', type: 'pc', status: 'occupied', gamers: 1, capacity: 1 },
    { id: 'PC-02', name: 'Esports Rig #02 (RTX 4090)', type: 'pc', status: 'occupied', gamers: 1, capacity: 1 },
    { id: 'PC-03', name: 'Esports Rig #03 (RTX 4090)', type: 'pc', status: 'available', gamers: 0, capacity: 1 },
    { id: 'PC-04', name: 'Esports Rig #04 (RTX 4090)', type: 'pc', status: 'reserved', gamers: 0, capacity: 1 },
    { id: 'VIP-01', name: 'PS5 & Xbox VIP Lounge #01', type: 'vip', status: 'occupied', gamers: 5, capacity: 6 },
    { id: 'VIP-02', name: 'PS5 & Xbox VIP Lounge #02', type: 'vip', status: 'available', gamers: 0, capacity: 6 },
    { id: 'RACE-01', name: 'Motion Sim Racing Rig #01', type: 'sim', status: 'available', gamers: 0, capacity: 2 },
    { id: 'T-01', name: 'Diner Table #01', type: 'table', status: 'available', gamers: 0, capacity: 4 },
    { id: 'T-02', name: 'Diner Table #02', type: 'table', status: 'occupied', gamers: 4, capacity: 4 }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'var(--lime-neon)';
      case 'occupied': return 'var(--pink-neon)';
      case 'reserved': return 'var(--amber-neon)';
      default: return 'var(--text-muted)';
    }
  };

  return (
    <section style={{ padding: '40px 0 80px 0' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 40px auto' }}>
          <div className="badge-neon" style={{ marginBottom: '10px' }}>
            <LayoutGrid size={14} /> LIVE VENUE MAP & RADAR
          </div>
          <h2 style={{ fontSize: '2.4rem', color: '#fff', marginBottom: '12px' }}>
            INTERACTIVE <span className="gradient-text-cyan">FLOOR PLAN & STATIONS</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>
            Check live occupancy of VR arenas, pro PC rigs, VIP console lounges, and dining tables.
          </p>
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginBottom: '32px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#fff' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--lime-neon)', boxShadow: '0 0 8px var(--lime-neon)' }} />
            Available (Open for Booking)
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#fff' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--pink-neon)', boxShadow: '0 0 8px var(--pink-neon)' }} />
            Occupied (In Game Session / Dining)
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#fff' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--amber-neon)', boxShadow: '0 0 8px var(--amber-neon)' }} />
            Reserved (Starting Soon)
          </div>
        </div>

        {/* Floor Layout Grid */}
        <div className="glass-card" style={{ padding: '36px', background: 'rgba(9, 10, 16, 0.9)' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px'
          }}>
            {stations.map(s => {
              const isSelected = selectedStation?.id === s.id;
              const statusColor = getStatusColor(s.status);

              return (
                <div
                  key={s.id}
                  onClick={() => setSelectedStation(s)}
                  style={{
                    background: isSelected ? 'rgba(0, 243, 255, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                    border: `1px solid ${isSelected ? 'var(--cyan-neon)' : 'rgba(255, 255, 255, 0.08)'}`,
                    borderRadius: 'var(--radius-md)',
                    padding: '16px',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'all 0.2s ease',
                    boxShadow: isSelected ? '0 0 20px rgba(0, 243, 255, 0.3)' : 'none'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span className="pixel-font" style={{ color: 'var(--cyan-neon)', fontSize: '0.8rem' }}>{s.id}</span>
                    <span style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      background: statusColor,
                      boxShadow: `0 0 10px ${statusColor}`
                    }} />
                  </div>

                  <h4 style={{ color: '#fff', fontSize: '0.95rem', marginBottom: '6px' }}>{s.name}</h4>
                  
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between' }}>
                    <span>Capacity: {s.capacity}</span>
                    <span style={{ textTransform: 'capitalize', color: statusColor, fontWeight: 700 }}>{s.status}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Station Quick Detail Drawer */}
          {selectedStation && (
            <div style={{
              marginTop: '32px',
              padding: '20px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(0, 243, 255, 0.08)',
              border: '1px solid var(--cyan-neon)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px'
            }}>
              <div>
                <span className="pixel-font" style={{ color: 'var(--cyan-neon)', fontSize: '0.8rem' }}>SELECTED STATION: {selectedStation.id}</span>
                <h3 style={{ color: '#fff', fontSize: '1.2rem', marginTop: '2px' }}>{selectedStation.name}</h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  Current Status: <strong style={{ color: getStatusColor(selectedStation.status), textTransform: 'capitalize' }}>{selectedStation.status}</strong>
                </p>
              </div>

              {selectedStation.status === 'available' ? (
                <button
                  onClick={() => onSelectStationForBooking(selectedStation.name)}
                  className="btn-pink"
                  style={{ padding: '10px 20px' }}
                >
                  Book This Station Now 🎟️
                </button>
              ) : (
                <span style={{ fontSize: '0.88rem', color: 'var(--amber-neon)', fontWeight: 700 }}>
                  Station currently in use. Estimated free slot in 25 mins.
                </span>
              )}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
