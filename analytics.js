// analytics.js - Blushoria Analytics Tracking System
// Tracks all user interactions: page views, product clicks, favorites, purchases

const SUPABASE_URL = 'https://emcdsuboutrbpsofxdjn.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_duaRAaTPArjd3sqyV69b-Q_N7iOmx2c';

// Get or create session ID (for anonymous users)
function getSessionId() {
  let sessionId = localStorage.getItem('blushoria_session_id');
  if (!sessionId) {
    sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('blushoria_session_id', sessionId);
  }
  return sessionId;
}

// Get device type
function getDeviceType() {
  const ua = navigator.userAgent;
  if (/mobile|android|iphone|ipod|blackberry|iemobile|opera mini/i.test(ua.toLowerCase())) {
    return 'mobile';
  } else if (/tablet|ipad|playbook|silk/i.test(ua.toLowerCase())) {
    return 'tablet';
  }
  return 'desktop';
}

// Log an event to analytics
async function logEvent(eventType, productId = null, additionalData = {}) {
  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/analytics`,
      {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event_type: eventType,
          product_id: productId,
          session_id: getSessionId(),
          page: window.location.pathname,
          device_info: getDeviceType(),
          ...additionalData
        })
      }
    );

    if (!response.ok) {
      console.error('Analytics logging failed:', response.status);
    }
  } catch (error) {
    console.error('Error logging event:', error);
  }
}

// Track page view
async function trackPageView() {
  const page = document.title;
  await logEvent('page_view', null, { page });
  console.log(`📊 Tracked page view: ${page}`);
}

// Track product view
async function trackProductView(productId, productName) {
  await logEvent('product_view', productId, { product_name: productName });
  console.log(`👀 Tracked product view: ${productName}`);
}

// Track product click
async function trackProductClick(productId, productName) {
  await logEvent('product_click', productId, { product_name: productName });
  console.log(`🖱️ Tracked product click: ${productName}`);
}

// Track add to cart
async function trackAddToCart(productId, productName, price) {
  await logEvent('add_to_cart', productId, {
    product_name: productName,
    price: price
  });
  console.log(`🛒 Tracked add to cart: ${productName}`);
}

// Track purchase
async function trackPurchase(orderData) {
  await logEvent('purchase', null, {
    order_id: orderData.order_id,
    total_amount: orderData.total_amount,
    items_count: orderData.items_count,
    email: orderData.email
  });
  console.log(`✅ Tracked purchase: Order ${orderData.order_id}`);
}

// Track search/filter
async function trackSearch(query, category = null) {
  await logEvent('search', null, {
    query: query,
    category: category
  });
  console.log(`🔍 Tracked search: ${query}`);
}

// Track favorite toggle
async function trackFavoriteToggle(productId, productName, isFavorite) {
  await logEvent('favorite_toggle', productId, {
    product_name: productName,
    is_favorite: isFavorite
  });
  console.log(`❤️ Tracked favorite: ${productName} - ${isFavorite ? 'Added' : 'Removed'}`);
}

// Track page view on load
document.addEventListener('DOMContentLoaded', () => {
  trackPageView();
});

// Track visibility changes
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') {
    logEvent('session_end', null, { session_id: getSessionId() });
  }
});

// Export functions for manual use
window.blushAnalytics = {
  logEvent,
  trackPageView,
  trackProductView,
  trackProductClick,
  trackAddToCart,
  trackPurchase,
  trackSearch,
  trackFavoriteToggle,
  getSessionId
};
