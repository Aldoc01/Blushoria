// ===== BLUSHORIA STOREFRONT APP =====

let allProducts = [];
let filteredProducts = [];

// Load products on startup
async function loadProducts() {
  allProducts = await getProductsFromSupabase();
  filteredProducts = allProducts;
  renderProducts();
}

function renderProducts() {
  const grid = document.getElementById('productsGrid');
  grid.innerHTML = filteredProducts.map(p => `
    <div class="product-card">
      <div class="product-image">
        <img src="${p.image}" alt="${p.name}" onerror="this.src='https://via.placeholder.com/280?text=${encodeURIComponent(p.name)}'">
        ${p.badge ? `<span class="badge">${p.badge}</span>` : ''}
      </div>
      <div class="product-info">
        <h3>${p.name}</h3>
        <p>${p.description}</p>
        <div class="product-footer">
          <span class="price">₦${p.price.toLocaleString()}</span>
          <a href="https://wa.me/2347012620748?text=Hi!%20I'm%20interested%20in%20${encodeURIComponent(p.name)}" class="btn-order">Order</a>
        </div>
      </div>
    </div>
  `).join('');
}

function filterProducts(cat, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  filteredProducts = cat === 'all' ? allProducts : allProducts.filter(p => p.category === cat);
  renderProducts();
}

function openLoginModal() {
  document.getElementById('loginModal').classList.add('show');
}

function closeLoginModal() {
  document.getElementById('loginModal').classList.remove('show');
  document.getElementById('loginError').style.display = 'none';
}

async function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  const errorDiv = document.getElementById('loginError');
  
  const result = await adminLoginWithEmail(email, password);
  if(result.success) {
    window.location.href = 'admin.html';
  } else {
    errorDiv.textContent = '❌ ' + result.message;
    errorDiv.style.display = 'block';
  }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', loadProducts);
