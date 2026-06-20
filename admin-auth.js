// ===== ADMIN AUTHENTICATION =====

const ADMIN_PASSWORD = 'Blushoria13$';

// Check if admin is logged in
function isAdminLoggedIn() {
  return sessionStorage.getItem('adminLoggedIn') === 'true';
}

// Set admin logged in
function setAdminLoggedIn(value) {
  if(value) {
    sessionStorage.setItem('adminLoggedIn', 'true');
  } else {
    sessionStorage.removeItem('adminLoggedIn');
  }
}

// Verify admin password
function verifyAdminPassword(password) {
  return password === ADMIN_PASSWORD;
}

// Logout admin
function adminLogout() {
  setAdminLoggedIn(false);
  window.location.href = 'index.html';
}

// Redirect to login if not authenticated
function protectAdminPage() {
  if(!isAdminLoggedIn()) {
    window.location.href = 'index.html';
  }
}
