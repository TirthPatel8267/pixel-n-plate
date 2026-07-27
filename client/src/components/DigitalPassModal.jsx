import React from 'react';
import { X, CheckCircle, Ticket, Calendar, Clock, Users, QrCode, Printer } from 'lucide-react';

export default function DigitalPassModal({ bookingPass, onClose }) {
  if (!bookingPass) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1100,
      background: 'rgba(0, 0, 0, 0.85)',
      backdropFilter: 'blur(12px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '520px',
        width: '100%',
        background: 'linear-gradient(145deg, #0c0e18 0%, #151828 100%)',
        border: '2px solid var(--cyan-neon)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: '0 0 40px rgba(0, 243, 255, 0.3)',
        overflow: 'hidden',
        position: 'relative'
      }}>
        {/* Top Header */}
        <div style={{
          background: 'linear-gradient(135deg, #00f3ff 0%, #ff007f 100%)',
          padding: '16px 24px',
          color: '#000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Ticket size={24} />
            <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '1.2rem' }}>
              VIP GAMER ACCESS PASS
            </h3>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#000', cursor: 'pointer' }}>
            <X size={22} />
          </button>
        </div>

        {/* Ticket Body */}
        <div style={{ padding: '28px' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'rgba(57, 255, 20, 0.15)',
              color: 'var(--lime-neon)',
              marginBottom: '12px'
            }}>
              <CheckCircle size={32} />
            </div>
            <h2 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '4px' }}>
              Booking Confirmed!
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Show this digital ticket at the Pixel n Plate front desk.
            </p>
          </div>

          {/* Ticket Information Card */}
          <div style={{
            background: 'rgba(0, 0, 0, 0.5)',
            border: '1px dashed rgba(0, 243, 255, 0.4)',
            borderRadius: 'var(--radius-md)',
            padding: '20px',
            position: 'relative',
            marginBottom: '24px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>BOOKING ID</span>
                <span className="pixel-font" style={{ color: 'var(--cyan-neon)', fontSize: '0.9rem' }}>
                  {bookingPass.id}
                </span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>GAMER</span>
                <span style={{ fontWeight: 800, color: '#fff', fontSize: '0.95rem' }}>
                  {bookingPass.customerName}
                </span>
              </div>
            </div>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '12px', marginBottom: '16px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>RESERVED STATION</span>
              <h4 style={{ color: 'var(--pink-neon)', fontSize: '1.1rem', marginTop: '2px' }}>
                {bookingPass.zone}
              </h4>
              <span style={{ fontSize: '0.82rem', color: 'var(--amber-neon)', fontWeight: 600 }}>
                {bookingPass.package}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '8px' }}>
              <div>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Calendar size={12} /> DATE
                </span>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff' }}>
                  {bookingPass.date}
                </span>
              </div>
              <div>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={12} /> TIME
                </span>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff' }}>
                  {bookingPass.timeSlot}
                </span>
              </div>
              <div>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Users size={12} /> GUESTS
                </span>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff' }}>
                  {bookingPass.guests} Gamers
                </span>
              </div>
            </div>

            {/* Simulated QR Code */}
            <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '16px' }}>
              <div style={{ background: '#fff', padding: '8px', borderRadius: '8px' }}>
                <QrCode size={64} color="#000" />
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--cyan-neon)' }}>
                  SCAN FOR ENTRY & FOOD PERKS
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  Total Paid: <strong>₹{bookingPass.totalAmount}</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={handlePrint} className="btn-outline" style={{ flex: 1, justifyContent: 'center' }}>
              <Printer size={16} /> Print / Save Pass
            </button>
            <button onClick={onClose} className="btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
              Done
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
