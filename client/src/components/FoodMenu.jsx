import React, { useState } from 'react';
import { Search, Flame, Clock, Star, Plus, Check, Sparkles, Filter } from 'lucide-react';

export default function FoodMenu({ menuItems, onAddToCart, cartItems }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [spicyFilter, setSpicyFilter] = useState('all');
  const [addedItemIds, setAddedItemIds] = useState({});

  const categories = [
    { id: 'all', label: 'All Items 🍽️' },
    { id: 'combos', label: 'Power Combos ⚡' },
    { id: 'burgers', label: 'Cyber Burgers 🍔' },
    { id: 'pizzas', label: 'Pixel Pizzas 🍕' },
    { id: 'starters', label: 'Starters & Fries 🍟' },
    { id: 'drinks', label: 'Gamer Drinks 🍹' },
    { id: 'desserts', label: 'Glitch Sweets 🍰' }
  ];

  const filteredItems = menuItems.filter(item => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpicy = spicyFilter === 'all' || 
      (spicyFilter === 'mild' && item.spicyLevel === 0) ||
      (spicyFilter === 'medium' && (item.spicyLevel === 1 || item.spicyLevel === 2)) ||
      (spicyFilter === 'hot' && item.spicyLevel >= 3);

    return matchesCat && matchesSearch && matchesSpicy;
  });

  const handleAdd = (item) => {
    onAddToCart(item);
    setAddedItemIds(prev => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItemIds(prev => ({ ...prev, [item.id]: false }));
    }, 1200);
  };

  const getCartQuantity = (itemId) => {
    const found = cartItems.find(ci => ci.id === itemId);
    return found ? found.quantity : 0;
  };

  return (
    <section id="food-menu" style={{ padding: '40px 0 80px 0' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          marginBottom: '32px',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div>
            <div className="badge-neon" style={{ marginBottom: '8px' }}>
              <Sparkles size={14} /> GOURMET DINER MENU
            </div>
            <h2 style={{ fontSize: '2.2rem', color: '#fff' }}>
              FUEL YOUR <span className="gradient-text-cyan">GAMING SESSION</span>
            </h2>
          </div>

          {/* Search & Spicy Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', width: '240px' }}>
              <Search size={18} style={{
                position: 'absolute',
                left: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-muted)'
              }} />
              <input
                type="text"
                placeholder="Search burgers, drinks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-input"
                style={{ paddingLeft: '40px', paddingRight: '12px' }}
              />
            </div>

            <select
              value={spicyFilter}
              onChange={(e) => setSpicyFilter(e.target.value)}
              className="form-select"
              style={{ width: '150px' }}
            >
              <option value="all">Spice Level: All</option>
              <option value="mild">Mild (0 🌶️)</option>
              <option value="medium">Medium (1-2 🌶️)</option>
              <option value="hot">Hot/Inferno (3+ 🌶️)</option>
            </select>
          </div>
        </div>

        {/* Category Tabs */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          overflowX: 'auto',
          paddingBottom: '12px',
          marginBottom: '36px',
          scrollbarWidth: 'none'
        }}>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              style={{
                background: selectedCategory === cat.id ? 'linear-gradient(135deg, #00f3ff 0%, #0072ff 100%)' : 'rgba(255,255,255,0.05)',
                color: selectedCategory === cat.id ? '#000' : 'var(--text-main)',
                border: selectedCategory === cat.id ? 'none' : '1px solid rgba(255,255,255,0.1)',
                padding: '10px 18px',
                borderRadius: 'var(--radius-full)',
                fontWeight: 700,
                fontSize: '0.9rem',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease',
                boxShadow: selectedCategory === cat.id ? '0 0 15px rgba(0, 243, 255, 0.4)' : 'none'
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        {filteredItems.length === 0 ? (
          <div className="glass-card" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
            <p style={{ fontSize: '1.1rem' }}>No food items matched your search filter.</p>
            <button onClick={() => { setSearchQuery(''); setSelectedCategory('all'); setSpicyFilter('all'); }} className="btn-outline" style={{ marginTop: '16px' }}>
              Reset Filters
            </button>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
            gap: '24px'
          }}>
            {filteredItems.map(item => {
              const qtyInCart = getCartQuantity(item.id);
              const isAdded = addedItemIds[item.id];

              return (
                <div key={item.id} className="glass-card" style={{
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative'
                }}>
                  {/* Image Header */}
                  <div style={{
                    position: 'relative',
                    height: '180px',
                    overflow: 'hidden',
                    background: '#1a1d2d'
                  }}>
                    <img 
                      src={item.image} 
                      alt={item.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
                      onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1.0)'}
                    />

                    {/* Badges overlay */}
                    <div style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      display: 'flex',
                      gap: '6px',
                      flexWrap: 'wrap'
                    }}>
                      {item.popular && (
                        <span className="badge-pink">POPULAR 🔥</span>
                      )}
                      <span className="badge-gold">{item.xpPerk}</span>
                    </div>

                    <div style={{
                      position: 'absolute',
                      bottom: '12px',
                      right: '12px',
                      background: 'rgba(0,0,0,0.75)',
                      backdropFilter: 'blur(8px)',
                      padding: '4px 10px',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      color: 'var(--amber-neon)'
                    }}>
                      <Star size={14} fill="var(--amber-neon)" color="none" />
                      {item.rating}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Clock size={13} /> {item.prepTime}
                      </span>

                      {item.spicyLevel > 0 && (
                        <span style={{ fontSize: '0.8rem', color: 'var(--pink-neon)' }}>
                          {'🌶️'.repeat(item.spicyLevel)}
                        </span>
                      )}
                    </div>

                    <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '8px' }}>
                      {item.name}
                    </h3>

                    <p style={{
                      fontSize: '0.88rem',
                      color: 'var(--text-muted)',
                      lineHeight: 1.45,
                      marginBottom: '20px',
                      flex: 1
                    }}>
                      {item.description}
                    </p>

                    {/* Price in Rupees & Add Button */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderTop: '1px solid rgba(255,255,255,0.08)',
                      paddingTop: '16px'
                    }}>
                      <div>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Price</span>
                        <span style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--cyan-neon)' }}>
                          ₹{item.price}
                        </span>
                      </div>

                      <button
                        onClick={() => handleAdd(item)}
                        style={{
                          background: isAdded
                            ? 'var(--lime-neon)'
                            : 'linear-gradient(135deg, #00f3ff 0%, #0072ff 100%)',
                          color: isAdded ? '#000' : '#fff',
                          border: 'none',
                          padding: '10px 18px',
                          borderRadius: 'var(--radius-md)',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          transition: 'all 0.2s ease',
                          boxShadow: '0 4px 12px rgba(0, 243, 255, 0.3)'
                        }}
                      >
                        {isAdded ? (
                          <>
                            <Check size={16} /> Added!
                          </>
                        ) : (
                          <>
                            <Plus size={16} />
                            {qtyInCart > 0 ? `Add (${qtyInCart})` : 'Add to Cart'}
                          </>
                        )}
                      </button>
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
