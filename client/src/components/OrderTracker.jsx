import React from 'react';
import { Clock, CheckCircle, Flame, PackageCheck, Utensils, RefreshCw, AlertCircle } from 'lucide-react';

export default function OrderTracker({ orders, onRefresh, activeOrderId }) {
  const getStepNumber = (status) => {
    switch (status) {
      case 'Pending': return 1;
      case 'Preparing': return 2;
      case 'Ready': return 3;
      case 'Delivered': return 4;
      default: return 1;
    }
  };

  const getProgressPercentage = (status) => {
    switch (status) {
      case 'Pending': return 25;
      case 'Preparing': return 55;
      case 'Ready': return 85;
      case 'Delivered': return 100;
      default: return 20;
    }
  };

  return (
    <section style={{ padding: '40px 0 80px 0' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        
        {/* Section Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '32px',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div>
            <div className="badge-neon" style={{ marginBottom: '8px' }}>
              <Clock size={14} /> KITCHEN RADAR
            </div>
            <h2 style={{ fontSize: '2rem', color: '#fff' }}>
              LIVE <span className="gradient-text-cyan">ORDER TRACKING</span>
            </h2>
          </div>

          <button onClick={onRefresh} className="btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <RefreshCw size={16} /> Sync Live Status
          </button>
        </div>

        {orders.length === 0 ? (
          <div className="glass-card" style={{ padding: '60px 20px', textAlign: 'center', color: 'var(--text-muted)' }}>
            <Utensils size={48} color="var(--cyan-neon)" style={{ marginBottom: '16px', opacity: 0.8 }} />
            <h3 style={{ color: '#fff', fontSize: '1.3rem', marginBottom: '8px' }}>No Active Kitchen Orders</h3>
            <p style={{ fontSize: '0.95rem' }}>Place an order from the food menu to track your burger delivery to your gaming booth!</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {orders.map(order => {
              const currentStep = getStepNumber(order.status);
              const progressPct = getProgressPercentage(order.status);
              const isHighlight = order.id === activeOrderId;

              return (
                <div key={order.id} className={isHighlight ? "glass-card-glow" : "glass-card"} style={{
                  padding: '24px',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  
                  {/* Order Top Bar */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '12px',
                    marginBottom: '20px',
                    borderBottom: '1px solid rgba(255,255,255,0.08)',
                    paddingBottom: '16px'
                  }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--cyan-neon)' }}>
                          {order.id}
                        </span>
                        <span className="badge-pink">{order.boothNumber}</span>
                      </div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                        Customer: <strong style={{ color: '#fff' }}>{order.customerName}</strong> • Placed at {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <span className="badge-gold" style={{ fontSize: '0.85rem', padding: '6px 14px' }}>
                        Status: {order.status}
                      </span>
                      {order.status !== 'Delivered' && (
                        <div style={{ fontSize: '0.8rem', color: 'var(--lime-neon)', marginTop: '4px', fontWeight: 600 }}>
                          Est. Time: ~{order.estimatedMins || 10} mins remaining
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Progress Bar Track */}
                  <div style={{ marginBottom: '28px', padding: '0 10px' }}>
                    <div style={{
                      position: 'relative',
                      height: '8px',
                      background: 'rgba(255,255,255,0.08)',
                      borderRadius: '4px',
                      marginBottom: '24px'
                    }}>
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        height: '100%',
                        width: `${progressPct}%`,
                        background: 'linear-gradient(90deg, #00f3ff 0%, #ff007f 100%)',
                        borderRadius: '4px',
                        boxShadow: '0 0 12px var(--cyan-neon)',
                        transition: 'width 0.6s ease'
                      }} />
                    </div>

                    {/* Step Nodes */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(4, 1fr)',
                      textAlign: 'center'
                    }}>
                      {/* Step 1 */}
                      <div style={{ opacity: currentStep >= 1 ? 1 : 0.4 }}>
                        <div style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '50%',
                          background: currentStep >= 1 ? 'var(--cyan-neon)' : 'rgba(255,255,255,0.1)',
                          color: currentStep >= 1 ? '#000' : 'var(--text-muted)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          margin: '0 auto 8px auto',
                          fontWeight: 800
                        }}>
                          1
                        </div>
                        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: currentStep >= 1 ? '#fff' : 'var(--text-muted)' }}>
                          Order Received
                        </div>
                      </div>

                      {/* Step 2 */}
                      <div style={{ opacity: currentStep >= 2 ? 1 : 0.4 }}>
                        <div style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '50%',
                          background: currentStep >= 2 ? 'var(--pink-neon)' : 'rgba(255,255,255,0.1)',
                          color: currentStep >= 2 ? '#fff' : 'var(--text-muted)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          margin: '0 auto 8px auto',
                          fontWeight: 800
                        }}>
                          2
                        </div>
                        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: currentStep >= 2 ? '#fff' : 'var(--text-muted)' }}>
                          Kitchen Firing 🔥
                        </div>
                      </div>

                      {/* Step 3 */}
                      <div style={{ opacity: currentStep >= 3 ? 1 : 0.4 }}>
                        <div style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '50%',
                          background: currentStep >= 3 ? 'var(--amber-neon)' : 'rgba(255,255,255,0.1)',
                          color: currentStep >= 3 ? '#000' : 'var(--text-muted)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          margin: '0 auto 8px auto',
                          fontWeight: 800
                        }}>
                          3
                        </div>
                        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: currentStep >= 3 ? '#fff' : 'var(--text-muted)' }}>
                          Quality Check
                        </div>
                      </div>

                      {/* Step 4 */}
                      <div style={{ opacity: currentStep >= 4 ? 1 : 0.4 }}>
                        <div style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '50%',
                          background: currentStep >= 4 ? 'var(--lime-neon)' : 'rgba(255,255,255,0.1)',
                          color: currentStep >= 4 ? '#000' : 'var(--text-muted)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          margin: '0 auto 8px auto',
                          fontWeight: 800
                        }}>
                          4
                        </div>
                        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: currentStep >= 4 ? '#fff' : 'var(--text-muted)' }}>
                          Delivered 🚀
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Order Items Detail */}
                  <div style={{
                    background: 'rgba(0,0,0,0.3)',
                    borderRadius: 'var(--radius-md)',
                    padding: '16px'
                  }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '8px' }}>
                      ITEMS IN THIS ORDER:
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                      {order.items.map((it, idx) => (
                        <div key={idx} style={{
                          background: 'rgba(255,255,255,0.05)',
                          padding: '6px 12px',
                          borderRadius: '6px',
                          fontSize: '0.85rem',
                          color: '#fff'
                        }}>
                          <span style={{ color: 'var(--cyan-neon)', fontWeight: 800 }}>{it.quantity}x</span> {it.name}
                        </div>
                      ))}
                    </div>
                    <div style={{ marginTop: '12px', textAlign: 'right', fontSize: '0.95rem', fontWeight: 800, color: 'var(--cyan-neon)' }}>
                      Total Amount: ₹{order.total}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
