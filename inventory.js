// inventory.js - Blushoria Inventory Management System
// Manages stock levels, low stock alerts, and inventory display

const SUPABASE_URL = 'https://emcdsuboutrbpsofxdjn.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_duaRAaTPArjd3sqyV69b-Q_N7iOmx2c';

// Get stock status for a product
async function getStockStatus(productId) {
  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/products?id=eq.${productId}&select=stock_quantity,reorder_level,is_discontinued`,
      {
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Content-Type': 'application/json',
        }
      }
    );

    const data = await response.json();
    if (!data || data.length === 0) return null;

    const product = data[0];
    const stock = product.stock_quantity;
    const reorderLevel = product.reorder_level;

    if (product.is_discontinued) {
      return {
        status: 'discontinued',
        label: 'Discontinued',
        color: '#7a6e6e'
      };
    }

    if (stock === 0) {
      return {
        status: 'out_of_stock',
        label: 'Out of Stock',
        color: '#dc3545'
      };
    }

    if (stock <= reorderLevel) {
      return {
        status: 'low_stock',
        label: `Only ${stock} left!`,
        color: '#ff9800'
      };
    }

    return {
      status: 'in_stock',
      label: 'In Stock',
      color: '#4caf50'
    };
  } catch (error) {
    console.error('Error getting stock status:', error);
    return null;
  }
}

// Reduce inventory after purchase
async function reduceInventory(productId, quantity) {
  try {
    // Get current stock
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/products?id=eq.${productId}&select=stock_quantity,reorder_level`,
      {
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Content-Type': 'application/json',
        }
      }
    );

    const data = await response.json();
    if (!data || data.length === 0) return false;

    const currentStock = data[0].stock_quantity;
    const reorderLevel = data[0].reorder_level;
    const newStock = currentStock - quantity;

    // Update stock
    const updateResponse = await fetch(
      `${SUPABASE_URL}/rest/v1/products?id=eq.${productId}`,
      {
        method: 'PATCH',
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          stock_quantity: newStock
        })
      }
    );

    if (!updateResponse.ok) {
      console.error('Failed to update inventory');
      return false;
    }

    // Check if we need to create a low stock alert
    if (newStock <= reorderLevel && newStock > 0) {
      await createLowStockAlert(productId, newStock, reorderLevel);
    }

    console.log(`📦 Inventory updated for product ${productId}: ${currentStock} → ${newStock}`);
    return true;
  } catch (error) {
    console.error('Error reducing inventory:', error);
    return false;
  }
}

// Create low stock alert
async function createLowStockAlert(productId, currentStock, reorderLevel) {
  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/low_stock_alerts`,
      {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product_id: productId,
          current_stock: currentStock,
          reorder_level: reorderLevel,
          alert_status: 'pending'
        })
      }
    );

    if (response.ok) {
      console.log(`⚠️ Low stock alert created for product ${productId}`);
    }
  } catch (error) {
    console.error('Error creating low stock alert:', error);
  }
}

// Update all product stock displays on the page
async function updateAllProductStockDisplay() {
  try {
    // Get all product cards
    const productCards = document.querySelectorAll('[data-product-id]');

    for (const card of productCards) {
      const productId = card.getAttribute('data-product-id');
      const status = await getStockStatus(productId);

      if (!status) continue;

      // Find or create stock badge
      let badge = card.querySelector('.stock-badge');
      if (!badge) {
        badge = document.createElement('div');
        badge.className = 'stock-badge';
        card.appendChild(badge);
      }

      badge.textContent = status.label;
      badge.style.backgroundColor = status.color;
      badge.style.color = 'white';
      badge.style.padding = '0.5rem 1rem';
      badge.style.borderRadius = '4px';
      badge.style.fontSize = '0.85rem';
      badge.style.marginTop = '0.5rem';
      badge.style.textAlign = 'center';

      // Disable button if out of stock
      const button = card.querySelector('button');
      if (button) {
        if (status.status === 'out_of_stock' || status.status === 'discontinued') {
          button.disabled = true;
          button.style.opacity = '0.5';
          button.style.cursor = 'not-allowed';
          button.textContent = status.status === 'discontinued' ? 'Discontinued' : 'Out of Stock';
        }
      }
    }
  } catch (error) {
    console.error('Error updating stock display:', error);
  }
}

// Export for global use
window.blushInventory = {
  getStockStatus,
  reduceInventory,
  createLowStockAlert,
  updateAllProductStockDisplay
};

// Update stock display on page load
document.addEventListener('DOMContentLoaded', () => {
  updateAllProductStockDisplay();
});
