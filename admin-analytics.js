// admin-analytics.js - Blushoria Admin Analytics Dashboard
// Displays sales data, customer insights, and inventory management

const SUPABASE_URL = 'https://emcdsuboutrbpsofxdjn.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_duaRAaTPArjd3sqyV69b-Q_N7iOmx2c';

// Get analytics data for dashboard
async function getAnalyticsData() {
  try {
    // Get all orders
    const ordersResponse = await fetch(
      `${SUPABASE_URL}/rest/v1/orders?select=*&order=created_at.desc`,
      {
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Content-Type': 'application/json',
        }
      }
    );

    const orders = await ordersResponse.json();

    // Get all analytics events
    const analyticsResponse = await fetch(
      `${SUPABASE_URL}/rest/v1/analytics?select=*&order=timestamp.desc&limit=1000`,
      {
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Content-Type': 'application/json',
        }
      }
    );

    const analytics = await analyticsResponse.json();

    // Calculate metrics
    const last30Days = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const recentOrders = orders.filter(o => new Date(o.created_at) > last30Days);

    const totalRevenue = recentOrders.reduce((sum, o) => sum + (o.total_amount || 0), 0);
    const totalCustomers = new Set(recentOrders.map(o => o.user_email)).size;
    const totalPurchases = recentOrders.length;

    const pageViews = analytics.filter(e => e.event_type === 'page_view').length;
    const conversionRate = pageViews > 0 ? ((totalPurchases / pageViews) * 100).toFixed(2) : 0;

    return {
      totalRevenue,
      totalCustomers,
      totalPurchases,
      conversionRate,
      orders: recentOrders,
      analytics: analytics
    };
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return null;
  }
}

// Get top selling products
async function getTopSellingProducts() {
  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/order_items?select=product_id,quantity,price_at_purchase&order=quantity.desc&limit=10`,
      {
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Content-Type': 'application/json',
        }
      }
    );

    const items = await response.json();

    // Get product details
    const productsResponse = await fetch(
      `${SUPABASE_URL}/rest/v1/products?select=id,name`,
      {
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Content-Type': 'application/json',
        }
      }
    );

    const products = await productsResponse.json();

    // Combine data
    return items.map(item => {
      const product = products.find(p => p.id === item.product_id);
      return {
        product_id: item.product_id,
        product_name: product?.name || 'Unknown Product',
        quantity_sold: item.quantity,
        revenue: item.quantity * item.price_at_purchase
      };
    });
  } catch (error) {
    console.error('Error fetching top products:', error);
    return [];
  }
}

// Get low stock alerts
async function getLowStockAlerts() {
  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/low_stock_alerts?select=*&order=created_at.desc`,
      {
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Content-Type': 'application/json',
        }
      }
    );

    const alerts = await response.json();

    // Get product details
    const productsResponse = await fetch(
      `${SUPABASE_URL}/rest/v1/products?select=id,name`,
      {
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Content-Type': 'application/json',
        }
      }
    );

    const products = await productsResponse.json();

    // Combine data
    return alerts.map(alert => ({
      ...alert,
      product_name: products.find(p => p.id === alert.product_id)?.name || 'Unknown'
    }));
  } catch (error) {
    console.error('Error fetching alerts:', error);
    return [];
  }
}

// Display analytics dashboard
async function displayAnalyticsDashboard(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = '<p style="color: white;">Loading analytics...</p>';

  const data = await getAnalyticsData();
  const topProducts = await getTopSellingProducts();
  const alerts = await getLowStockAlerts();

  if (!data) {
    container.innerHTML = '<p style="color: red;">Error loading analytics</p>';
    return;
  }

  const html = `
    <style>
      .dashboard { background: #1a1212; color: #fdf6f0; padding: 2rem; font-family: 'Jost', sans-serif; }
      .metrics { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin-bottom: 2rem; }
      .metric-card { background: #2a1f17; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #c9737a; }
      .metric-value { font-size: 2rem; font-weight: bold; color: #c9737a; }
      .metric-label { font-size: 0.9rem; color: #bbb; margin-top: 0.5rem; }
      .section { margin-bottom: 3rem; }
      .section-title { font-size: 1.3rem; color: #c9737a; margin-bottom: 1rem; border-bottom: 2px solid #c9737a; padding-bottom: 0.5rem; }
      table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
      th { background: #2a1f17; padding: 1rem; text-align: left; color: #c9737a; border-bottom: 1px solid #c9737a; }
      td { padding: 0.8rem 1rem; border-bottom: 1px solid #3a2f27; }
      tr:hover { background: #2a1f17; }
      .alert-pending { color: #ff9800; }
      .alert-resolved { color: #4caf50; }
    </style>

    <div class="dashboard">
      <h1>📊 Blushoria Analytics Dashboard</h1>

      <div class="metrics">
        <div class="metric-card">
          <div class="metric-value">₦${(data.totalRevenue / 1000).toFixed(1)}K</div>
          <div class="metric-label">Revenue (30 days)</div>
        </div>
        <div class="metric-card">
          <div class="metric-value">${data.totalCustomers}</div>
          <div class="metric-label">Customers (30 days)</div>
        </div>
        <div class="metric-card">
          <div class="metric-value">${data.totalPurchases}</div>
          <div class="metric-label">Orders (30 days)</div>
        </div>
        <div class="metric-card">
          <div class="metric-value">${data.conversionRate}%</div>
          <div class="metric-label">Conversion Rate</div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">🏆 Top Selling Products</div>
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Units Sold</th>
              <th>Revenue</th>
            </tr>
          </thead>
          <tbody>
            ${topProducts.slice(0, 5).map(p => `
              <tr>
                <td>${p.product_name}</td>
                <td>${p.quantity_sold}</td>
                <td>₦${(p.revenue).toLocaleString()}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <div class="section">
        <div class="section-title">⚠️ Low Stock Alerts</div>
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Current Stock</th>
              <th>Reorder Level</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${alerts.slice(0, 10).map(a => `
              <tr>
                <td>${a.product_name}</td>
                <td>${a.current_stock}</td>
                <td>${a.reorder_level}</td>
                <td class="alert-${a.alert_status}">${a.alert_status}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <div class="section">
        <div class="section-title">📦 Recent Orders</div>
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer Email</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            ${data.orders.slice(0, 10).map(o => `
              <tr>
                <td>#${o.id}</td>
                <td>${o.user_email}</td>
                <td>₦${o.total_amount.toLocaleString()}</td>
                <td>${o.status}</td>
                <td>${new Date(o.created_at).toLocaleDateString()}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;

  container.innerHTML = html;
}

// Export for global use
window.blushAnalyticsDashboard = {
  displayAnalyticsDashboard,
  getAnalyticsData,
  getTopSellingProducts,
  getLowStockAlerts
};
