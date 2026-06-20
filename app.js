// ===== BLUSHORIA MAIN APP =====

// All Products Data
const PRODUCTS = [
  {
    id: 1,
    name: 'Sadoer Fruit Lip Masks',
    category: 'lipmask',
    description: 'Sweet Strawberry, Avocado, Blueberry & Gold Collagen variants. Plumper, softer lips overnight.',
    price: 400,
    image: 'product1.jpg',
    badge: 'Best Seller'
  },
  {
    id: 2,
    name: 'Sadoer Fruit Face Mask Sheet',
    category: 'facemask',
    description: 'Honey, Raspberry, Coconut, Oatmeal & Orange. Deep hydration, brightening & nourishing.',
    price: 400,
    image: 'product2.jpg'
  },
  {
    id: 3,
    name: 'Sadoer Salicylic Acid 3% Mask',
    category: 'facemask',
    description: 'Niacinamide, Hyaluronic Acid & Centella Collagen. Shrinks pores & reduces acne scars.',
    price: 400,
    image: 'product3.jpg',
    badge: 'Acne Care'
  },
  {
    id: 4,
    name: 'Sadoer Ampoule Serum Masks',
    category: 'facemask',
    description: 'Vitamin C, Hyaluronic Acid & 24K Golden Serum variants. Glass-skin glow in one mask.',
    price: 400,
    image: 'product4.jpg'
  },
  {
    id: 5,
    name: 'Cute Glitter Lipgloss (Bear Bell)',
    category: 'lipgloss',
    description: 'Holographic glitter, bear charm, waterproof. Hot pink & champagne gold shades.',
    price: 1200,
    image: 'product5.jpg',
    badge: 'Girlie Fave ✨'
  },
  {
    id: 6,
    name: 'Hanlanya Hydra Kiss Lip Oil',
    category: 'lipoil',
    description: 'Hydrating, plumping, high-gloss mirror finish. Cherry & berry variants. All-day softness.',
    price: 1500,
    image: 'product6.jpg'
  },
  {
    id: 7,
    name: 'Coloured Drip Lipgloss (Kolor-Me)',
    category: 'lipgloss',
    description: 'Nude, mocha, brown & hot pink. Creamy pigmented, high-gloss, long-wearing formula.',
    price: 1500,
    image: 'product7.jpg'
  },
  {
    id: 8,
    name: 'Mini Milky Lipgloss',
    category: 'lipgloss',
    description: 'Perfect for your bag or pocket. Milky soft finish, pretty colour payoff. Cute & affordable.',
    price: 1000,
    image: 'product8.jpg'
  },
  {
    id: 9,
    name: 'Magic Lip Color (Chanlan Cute)',
    category: 'lipgloss',
    description: 'Glitter, bear paw motifs & gold shimmer. Lip-oil formula. A total conversation starter.',
    price: 1200,
    image: 'product9.jpg',
    badge: 'Magic ✨'
  },
  {
    id: 10,
    name: 'Fruit 3D Lip Oil (Peach & Cherry)',
    category: 'lipoil',
    description: 'Fruit-themed with mirror cap. Honey Peach & Cherry variants. Plumping & glossy daily glow.',
    price: 1500,
    image: 'product10.jpg',
    badge: 'Fan Fave 💕'
  }
];

// Global Cart State
let cart = [];

// ===== INITIALIZE ===== 
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  setupAnimations();
  setupCursor();
  setupEventListeners();
});

// ===== RENDER PRODUCTS ===== 
function renderProducts(category = 'all') {
  const grid = document.getElementById('productsGrid');
  grid.innerHTML = '';
  
  const filtered = category === 'all' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === category);
  
  filtered.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.cat = product.category;
    
    const badgeHTML = product.badge 
      ? `<span class="product-badge">${product.badge}</span>` 
      : '';
    
    card.innerHTML = `
      <div class="product-img">
        <img src="${product.image}" alt="${product.name}" loading="lazy" onclick="openLightbox('${product.image}', '${product.name}', '${product.description}', ${product.price})">
        ${badgeHTML}
      </div>
      <div class="product-body">
        <div class="product-cat">${product.category.replace(/([a-z])([A-Z])/g, '$1 $2')}</div>
        <div class="product-name">${product.name}</div>
        <div class="product-desc">${product.description}</div>
        <div class="product-footer">
          <div class="product-price">₦${product.price.toLocaleString()}</div>
          <div class="product-controls">
            <button class="qty-btn" onclick="changeQty(this, -1)">−</button>
            <span class="qty-display">1</span>
            <button class="qty-btn" onclick="changeQty(this, 1)">+</button>
            <button class="add-btn" onclick="addToCart('${product.name}', ${product.price}, this)" title="Add to order">🛒 Add</button>
          </div>
        </div>
      </div>
    `;
    
    grid.appendChild(card);
  });
}

// ===== PRODUCT LIGHTBOX ===== 
function openLightbox(image, name, desc, price) {
  const lightbox = document.getElementById('productLightbox');
  document.getElementById('lightboxImage').src = image;
  document.getElementById('lightboxImage').onerror = function() {
    this.src = 'https://via.placeholder.com/500?text=Product+Image';
  };
  document.getElementById('lightboxName').textContent = name;
  document.getElementById('lightboxDesc').textContent = desc;
  document.getElementById('lightboxPrice').textContent = price.toLocaleString();
  lightbox.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('productLightbox').classList.remove('show');
  document.body.style.overflow = 'auto';
}

// ===== FILTER PRODUCTS ===== 
function filterProducts(cat, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderProducts(cat);
  
  // Track in analytics
  if(window.blushAnalytics) {
    window.blushAnalytics.trackProductView(cat, 'Filter: ' + cat);
  }
}

// ===== QUANTITY CONTROL ===== 
function changeQty(btn, delta) {
  const controls = btn.closest('.product-controls');
  const disp = controls.querySelector('.qty-display');
  let q = parseInt(disp.textContent) + delta;
  if(q < 1) q = 1;
  if(q > 99) q = 99;
  disp.textContent = q;
}

function getQty(btn) {
  return parseInt(btn.closest('.product-controls').querySelector('.qty-display').textContent) || 1;
}

// ===== ADD TO CART ===== 
function addToCart(name, price, btn) {
  const qty = getQty(btn);
  const existing = cart.find(i => i.name === name);
  
  if(existing) {
    existing.qty += qty;
  } else {
    cart.push({ name, price, qty });
  }
  
  // Track analytics
  if(window.blushAnalytics) {
    window.blushAnalytics.trackAddToCart(null, name, price);
  }
  
  // Visual feedback
  btn.textContent = '✓ Added';
  btn.classList.add('added');
  setTimeout(() => {
    btn.textContent = '🛒 Add';
    btn.classList.remove('added');
  }, 1400);
  
  updateCartBar();
}

// ===== UPDATE CART BAR ===== 
function updateCartBar() {
  const bar = document.getElementById('cartBar');
  
  if(cart.length === 0) {
    bar.classList.remove('show');
    return;
  }
  
  bar.classList.add('show');
  const total = cart.reduce((s, i) => s + (i.price * i.qty), 0);
  const count = cart.reduce((s, i) => s + i.qty, 0);
  
  document.getElementById('cartCount').textContent = count + ' item' + (count !== 1 ? 's' : '');
  document.getElementById('cartTotal').textContent = '₦' + total.toLocaleString();
}

// ===== ORDER ON WHATSAPP ===== 
async function orderOnWhatsApp() {
  if(cart.length === 0) {
    alert('Your cart is empty');
    return;
  }
  
  const name = prompt('Enter your name:');
  const phone = prompt('Enter your phone number:');
  
  if(!name || !phone) {
    alert('Name and phone are required');
    return;
  }
  
  // Process order with Supabase
  const orderResult = await window.blushOrders?.processWhatsAppCheckout?.(
    cart,
    name,
    phone
  );
  
  if(!orderResult?.success) {
    alert('Error: ' + (orderResult?.message || 'Order processing failed'));
    return;
  }
  
  // Build WhatsApp message
  let message = `✨ BLUSHORIA ORDER #${orderResult.orderId} ✨%0A%0A`;
  message += `👩 Name: ${name}%0A`;
  message += `📱 Phone: ${phone}%0A%0A`;
  message += `🛍️ ITEMS:%0A`;
  
  let total = 0;
  cart.forEach(item => {
    message += `• ${item.name} x${item.qty} - ₦${(item.price * item.qty).toLocaleString()}%0A`;
    total += item.price * item.qty;
  });
  
  message += `%0A💰 TOTAL: ₦${total.toLocaleString()}%0A`;
  message += `%0A🚚 Delivery fee to be confirmed`;
  
  window.open(`https://wa.me/2347012620748?text=${message}`, '_blank');
  
  // Clear cart
  cart = [];
  updateCartBar();
}

// ===== ADMIN LOGIN ===== 
function toggleAdminLogin(e) {
  e.preventDefault();
  const modal = document.getElementById('adminLoginModal');
  modal.classList.toggle('show');
}

function closeAdminLogin() {
  document.getElementById('adminLoginModal').classList.remove('show');
}

function adminLogin() {
  const password = document.getElementById('adminPassword').value;
  
  // Simple authentication (use environment variable for production)
  if(password === 'admin123') {
    closeAdminLogin();
    window.location.href = 'admin.html';
  } else {
    alert('Incorrect password');
  }
}

// ===== MOBILE DRAWER ===== 
function toggleDrawer() {
  document.getElementById('mobileDrawer').classList.toggle('open');
  document.getElementById('drawerOverlay').classList.toggle('open');
  document.getElementById('hamburger').classList.toggle('open');
}

function closeDrawer() {
  document.getElementById('mobileDrawer').classList.remove('open');
  document.getElementById('drawerOverlay').classList.remove('open');
  document.getElementById('hamburger').classList.remove('open');
}

// ===== SMOOTH SCROLL ===== 
document.addEventListener('click', (e) => {
  if(e.target.tagName === 'A' && e.target.hash) {
    const hash = e.target.hash.substring(1);
    const target = document.getElementById(hash);
    if(target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
      closeDrawer();
    }
  }
});

// ===== ANIMATIONS ===== 
function setupAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        entry.target.style.opacity = '1';
      }
    });
  }, { threshold: 0.1 });
  
  document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
  });
}

// ===== CUSTOM CURSOR ===== 
function setupCursor() {
  const cursor = document.querySelector('.cursor');
  const cursorRing = document.querySelector('.cursor-ring');
  
  if(!cursor || !cursorRing) return;
  
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    cursorRing.style.left = (e.clientX - 16) + 'px';
    cursorRing.style.top = (e.clientY - 16) + 'px';
  });
}

// ===== EVENT LISTENERS ===== 
function setupEventListeners() {
  // Close lightbox on escape
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape') {
      closeLightbox();
      closeAdminLogin();
    }
  });
  
  // Close drawer on resize
  window.addEventListener('resize', () => {
    if(window.innerWidth > 768) {
      closeDrawer();
    }
  });
}
