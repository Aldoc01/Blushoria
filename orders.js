// orders.js - Blushoria Order Management & Email Notifications
// Handles order creation, inventory reduction, and email notifications

const SUPABASE_URL = 'https://emcdsuboutrbpsofxdjn.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_duaRAaTPArjd3sqyV69b-Q_N7iOmx2c';
const EMAILJS_SERVICE_ID = 'service_qg7ncer';
const EMAILJS_TEMPLATE_ID = 'template_cxzcatg';
const EMAILJS_PUBLIC_KEY = 'ggqG171hRYuZVGa9';

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

// Process WhatsApp checkout
async function processWhatsAppCheckout(cartItems, customerEmail, customerPhone) {
  try {
    console.log('📦 Processing order...');

    // Calculate total
    const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);

    // Create order in Supabase
    const orderResponse = await fetch(
      `${SUPABASE_URL}/rest/v1/orders`,
      {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_email: customerEmail,
          phone_number: customerPhone,
          total_amount: totalAmount,
          products_ordered: JSON.stringify(cartItems),
          status: 'pending'
        })
      }
    );

    if (!orderResponse.ok) {
      throw new Error('Failed to create order');
    }

    const order = await orderResponse.json();
    const orderId = order[0].id;

    console.log(`✅ Order created: #${orderId}`);

    // Create order items and reduce inventory
    for (const item of cartItems) {
      // Create order item
      await fetch(
        `${SUPABASE_URL}/rest/v1/order_items`,
        {
          method: 'POST',
          headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            order_id: orderId,
            product_id: item.id,
            quantity: item.qty || 1,
            price_at_purchase: item.price
          })
        }
      );

      // Reduce inventory
      await window.blushInventory?.reduceInventory?.(item.id, item.qty || 1);
    }

    // Send order confirmation email
    await sendOrderConfirmationEmail(orderId, customerEmail, cartItems, totalAmount);

    // Track purchase in analytics
    await window.blushAnalytics?.trackPurchase?.({
      order_id: orderId,
      total_amount: totalAmount,
      items_count: cartItems.length,
      email: customerEmail
    });

    return {
      success: true,
      orderId: orderId,
      message: 'Order created successfully'
    };
  } catch (error) {
    console.error('Error processing order:', error);
    return {
      success: false,
      message: error.message || 'Error processing order'
    };
  }
}

// Send order confirmation email
async function sendOrderConfirmationEmail(orderId, customerEmail, items, totalAmount) {
  try {
    // Format items for email
    const itemsList = items.map(item => 
      `${item.name} x${item.qty || 1} - ₦${(item.price * (item.qty || 1)).toLocaleString()}`
    ).join('\n');

    const templateParams = {
      customer_email: customerEmail,
      order_id: orderId,
      items: itemsList,
      total_amount: `₦${totalAmount.toLocaleString()}`,
      order_date: new Date().toLocaleDateString()
    };

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );

    console.log('📧 Order confirmation email sent:', response);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

// Send low stock alert email
async function sendLowStockAlert(productName, currentStock, reorderLevel, adminEmail) {
  try {
    const templateParams = {
      admin_email: adminEmail,
      product_name: productName,
      current_stock: currentStock,
      reorder_level: reorderLevel,
      alert_date: new Date().toLocaleDateString()
    };

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );

    console.log('⚠️ Low stock alert sent:', response);
    return true;
  } catch (error) {
    console.error('Error sending alert:', error);
    return false;
  }
}

// Get order by ID
async function getOrder(orderId) {
  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/orders?id=eq.${orderId}`,
      {
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Content-Type': 'application/json',
        }
      }
    );

    const data = await response.json();
    return data[0] || null;
  } catch (error) {
    console.error('Error fetching order:', error);
    return null;
  }
}

// Update order status
async function updateOrderStatus(orderId, status) {
  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/orders?id=eq.${orderId}`,
      {
        method: 'PATCH',
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: status,
          updated_at: new Date().toISOString()
        })
      }
    );

    if (response.ok) {
      console.log(`📦 Order #${orderId} status updated to: ${status}`);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error updating order:', error);
    return false;
  }
}

// Export for global use
window.blushOrders = {
  processWhatsAppCheckout,
  sendOrderConfirmationEmail,
  sendLowStockAlert,
  getOrder,
  updateOrderStatus
};
