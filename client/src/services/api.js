const API_BASE = '/api';

export const fetchMenu = async () => {
  const res = await fetch(`${API_BASE}/menu`);
  if (!res.ok) throw new Error('Failed to fetch food menu');
  return res.json();
};

export const addMenuItem = async (itemData) => {
  const res = await fetch(`${API_BASE}/menu`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(itemData)
  });
  if (!res.ok) throw new Error('Failed to add menu item');
  return res.json();
};

export const updateMenuItem = async (id, itemData) => {
  const res = await fetch(`${API_BASE}/menu/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(itemData)
  });
  if (!res.ok) throw new Error('Failed to update item');
  return res.json();
};

export const deleteMenuItem = async (id) => {
  const res = await fetch(`${API_BASE}/menu/${id}`, {
    method: 'DELETE'
  });
  if (!res.ok) throw new Error('Failed to delete item');
  return res.json();
};

export const fetchOrders = async () => {
  const res = await fetch(`${API_BASE}/orders`);
  if (!res.ok) throw new Error('Failed to fetch orders');
  return res.json();
};

export const placeOrder = async (orderData) => {
  const res = await fetch(`${API_BASE}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData)
  });
  if (!res.ok) throw new Error('Failed to place order');
  return res.json();
};

export const updateOrderStatus = async (id, status, estimatedMins) => {
  const res = await fetch(`${API_BASE}/orders/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status, estimatedMins })
  });
  if (!res.ok) throw new Error('Failed to update order status');
  return res.json();
};

export const fetchBookings = async () => {
  const res = await fetch(`${API_BASE}/bookings`);
  if (!res.ok) throw new Error('Failed to fetch bookings');
  return res.json();
};

export const createBooking = async (bookingData) => {
  const res = await fetch(`${API_BASE}/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bookingData)
  });
  if (!res.ok) throw new Error('Failed to book station');
  return res.json();
};

export const updateBookingStatus = async (id, status) => {
  const res = await fetch(`${API_BASE}/bookings/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status })
  });
  if (!res.ok) throw new Error('Failed to update booking status');
  return res.json();
};

export const fetchFeedback = async () => {
  const res = await fetch(`${API_BASE}/feedback`);
  if (!res.ok) throw new Error('Failed to fetch feedback');
  return res.json();
};

export const submitFeedback = async (feedbackData) => {
  const res = await fetch(`${API_BASE}/feedback`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(feedbackData)
  });
  if (!res.ok) throw new Error('Failed to submit feedback');
  return res.json();
};

export const fetchAdminStats = async () => {
  const res = await fetch(`${API_BASE}/stats`);
  if (!res.ok) throw new Error('Failed to fetch admin stats');
  return res.json();
};
