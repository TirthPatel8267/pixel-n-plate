import React, { useState } from 'react';
import { Star, ThumbsUp, MessageSquare, Sparkles, CheckCircle2, Send } from 'lucide-react';

export default function CustomerFeedback({ feedbackList, onSubmitFeedback }) {
  const [rating, setRating] = useState(5);
  const [avatar, setAvatar] = useState('👾');
  const [category, setCategory] = useState('Food & Gaming Rig');
  const [customerName, setCustomerName] = useState('');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const avatars = ['👾', '🕹️', '⚡', '🏎️', '🍔', '👑', '🥽', '🔥'];

  const emojis = ['😡 Bad', '😐 Okay', '🙂 Good', '😃 Great', '🤩 Unbelievable!'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    setIsSubmitting(true);
    const newReview = {
      customerName: customerName.trim() || 'Gamer Guest',
      avatar,
      rating,
      category,
      comment
    };

    setTimeout(() => {
      onSubmitFeedback(newReview);
      setIsSubmitting(false);
      setComment('');
      setCustomerName('');
      setSuccessMsg('Review posted to the Community Arcade Wall! 🎉');
      setTimeout(() => setSuccessMsg(''), 4000);
    }, 500);
  };

  return (
    <section style={{ padding: '40px 0 80px 0' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 40px auto' }}>
          <div className="badge-gold" style={{ marginBottom: '10px' }}>
            <Sparkles size={14} /> GAMER COMMUNITY FEEDBACK
          </div>
          <h2 style={{ fontSize: '2.4rem', color: '#fff', marginBottom: '12px' }}>
            RATE YOUR <span className="gradient-text-gold">PIXEL N PLATE VIBE</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>
            Tell us about your food quality, gaming rig performance, or VR experience!
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '32px' }}>
          
          {/* Submission Form */}
          <div className="glass-card" style={{ padding: '32px' }}>
            <h3 style={{ color: '#fff', fontSize: '1.3rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MessageSquare size={20} color="var(--amber-neon)" /> Leave Your Review
            </h3>

            {successMsg && (
              <div style={{
                background: 'rgba(57, 255, 20, 0.15)',
                border: '1px solid var(--lime-neon)',
                color: 'var(--lime-neon)',
                padding: '12px 16px',
                borderRadius: 'var(--radius-md)',
                marginBottom: '20px',
                fontSize: '0.9rem',
                fontWeight: 700
              }}>
                ✓ {successMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* Avatar Picker */}
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>
                  SELECT GAMER AVATAR
                </label>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {avatars.map((av, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setAvatar(av)}
                      style={{
                        background: avatar === av ? 'rgba(255, 183, 0, 0.2)' : 'rgba(255,255,255,0.05)',
                        border: avatar === av ? '2px solid var(--amber-neon)' : '1px solid rgba(255,255,255,0.1)',
                        width: '42px',
                        height: '42px',
                        borderRadius: '10px',
                        fontSize: '1.4rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'transform 0.15s ease'
                      }}
                    >
                      {av}
                    </button>
                  ))}
                </div>
              </div>

              {/* Star Rating Bar */}
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>
                  RATING ({emojis[rating - 1]})
                </label>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '4px'
                      }}
                    >
                      <Star
                        size={32}
                        fill={star <= rating ? 'var(--amber-neon)' : 'rgba(255,255,255,0.15)'}
                        color={star <= rating ? 'var(--amber-neon)' : 'none'}
                        style={{ transition: 'transform 0.2s ease' }}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Category */}
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>
                  REVIEW CATEGORY
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="form-select"
                >
                  <option value="Food & Gaming Rig">Food & Gaming Rig 🍔🖥️</option>
                  <option value="VR Experience">VR Arena Immersion 🥽</option>
                  <option value="Staff & Ambience">Staff Service & Ambience ✨</option>
                  <option value="Tournament / Party Event">Party / LAN Event 🎂</option>
                </select>
              </div>

              {/* Name */}
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>
                  YOUR GAMER TAG / NAME
                </label>
                <input
                  type="text"
                  placeholder="e.g. CyberKnight99"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="form-input"
                />
              </div>

              {/* Comment */}
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>
                  FEEDBACK / COMMENTS
                </label>
                <textarea
                  rows="4"
                  placeholder="Tell us what you loved or how we can improve..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="form-textarea"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: '1rem' }}
              >
                <Send size={18} />
                {isSubmitting ? 'Posting Review...' : 'Post to Community Wall 🌟'}
              </button>

            </form>
          </div>

          {/* Review Feed */}
          <div>
            <h3 style={{ color: '#fff', fontSize: '1.3rem', marginBottom: '20px' }}>
              Arcade Wall of Honor 🏆
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '640px', overflowY: 'auto' }}>
              {feedbackList.map(fb => (
                <div key={fb.id} className="glass-card" style={{ padding: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '1.8rem' }}>{fb.avatar || '👾'}</span>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <h4 style={{ color: '#fff', fontSize: '1.05rem' }}>{fb.customerName}</h4>
                          {fb.verifiedGamer && (
                            <span style={{ color: 'var(--cyan-neon)', fontSize: '0.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '2px' }}>
                              <CheckCircle2 size={13} /> Verified
                            </span>
                          )}
                        </div>
                        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                          {fb.category} • {fb.date}
                        </span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '2px' }}>
                      {[...Array(fb.rating)].map((_, i) => (
                        <Star key={i} size={16} fill="var(--amber-neon)" color="none" />
                      ))}
                    </div>
                  </div>

                  <p style={{ fontSize: '0.92rem', color: '#e2e8f0', lineHeight: 1.5, marginBottom: '12px' }}>
                    "{fb.comment}"
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '10px' }}>
                    <button style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-muted)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '0.82rem'
                    }}>
                      <ThumbsUp size={14} /> Helpful ({fb.likes || 1})
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
