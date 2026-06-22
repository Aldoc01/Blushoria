// ===== BLUSHORIA ADMIN DASHBOARD APP =====

let products = [];
let editingId = null;

// Check login and load
document.addEventListener('DOMContentLoaded', function() {
  if(!isAdminLoggedIn()) {
    window.location.href = 'index.html';
  }
  
  const user = getCurrentAdminUser();
  document.getElementById('userEmail').textContent = user.email;
  document.getElementById('adminWrapper').style.display = 'grid';
  
  loadProducts();
});

// Load products from Supabase
async function loadProducts() {
  products = await getProductsFromSupabase();
  renderProducts();
}

// Render products list
function renderProducts() {
  const list = document.getElementById('productsList');
  list.innerHTML = products.length === 0 
    ? '<p style="padding:2rem;text-align:center;color:#999;">No products yet</p>'
    : products.map(p => `
      <div class="product-row">
        <div class="product-image">
          <img src="${p.image}" onerror="this.src='https://via.placeholder.com/100'">
        </div>
        <div class="product-details">
          <h3>${p.name}</h3>
          <p>₦${p.price.toLocaleString()} • ${p.category}</p>
        </div>
        <div class="actions">
          <button class="btn-small btn-edit" onclick="editProduct(${p.id})">Edit</button>
          <button class="btn-small btn-delete" onclick="deleteProduct(${p.id})">Delete</button>
        </div>
      </div>
    `).join('');
}

// Open add product modal
function openAddModal() {
  editingId = null;
  document.getElementById('productForm').reset();
  document.getElementById('modalTitle').textContent = 'Add Product';
  document.getElementById('productModal').classList.add('show');
}

// Close modal
function closeModal() {
  document.getElementById('productModal').classList.remove('show');
}

// Save product (add or update)
async function saveProduct(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button');
  btn.classList.add('loading');
  
  const product = {
    name: document.getElementById('productName').value,
    category: document.getElementById('productCategory').value,
    description: document.getElementById('productDesc').value,
    price: parseInt(document.getElementById('productPrice').value),
    image: document.getElementById('productImage').value,
    badge: document.getElementById('productBadge').value || null,
    is_active: true,
    updated_at: new Date().toISOString()
  };
  
  let result;
  if(editingId) {
    result = await updateProductInSupabase(editingId, product);
  } else {
    result = await addProductToSupabase(product);
  }
  
  btn.classList.remove('loading');
  
  if(result.success) {
    showMessage(editingId ? 'Product updated!' : 'Product added!', 'success');
    closeModal();
    loadProducts();
  } else {
    showMessage(result.message, 'error');
  }
}

// Edit product
function editProduct(id) {
  const product = products.find(p => p.id === id);
  if(!product) return;
  
  editingId = id;
  document.getElementById('productName').value = product.name;
  document.getElementById('productCategory').value = product.category;
  document.getElementById('productDesc').value = product.description;
  document.getElementById('productPrice').value = product.price;
  document.getElementById('productImage').value = product.image;
  document.getElementById('productBadge').value = product.badge || '';
  document.getElementById('modalTitle').textContent = 'Edit Product';
  document.getElementById('productModal').classList.add('show');
}

// Delete product
async function deleteProduct(id) {
  if(!confirm('Delete this product?')) return;
  const result = await deleteProductFromSupabase(id);
  if(result.success) {
    showMessage('Product deleted!', 'success');
    loadProducts();
  } else {
    showMessage(result.message, 'error');
  }
}

// Show message
function showMessage(msg, type) {
  const div = document.getElementById(type === 'success' ? 'successMsg' : 'errorMsg');
  div.textContent = msg;
  div.style.display = 'block';
  setTimeout(() => div.style.display = 'none', 3000);
}

// Close modal on escape
document.addEventListener('keydown', (e) => {
  if(e.key === 'Escape') closeModal();
});
