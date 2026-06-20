// ===== ADMIN AUTHENTICATION - SUPABASE VERSION =====

// Initialize Supabase
const SUPABASE_URL = 'https://emcdsuboutrbpsofxdjn.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_duaRAaTPArjd3sqyV69b-Q_N7iOmx2c';

// ✅ YOUR CREDENTIALS ADDED

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ===== ADMIN LOGIN FUNCTION =====
async function adminLoginToSupabase(username, password) {
  try {
    // Query admin_users table
    const { data, error } = await supabaseClient
      .from('admin_users')
      .select('*')
      .eq('username', username)
      .eq('password_hash', password)
      .eq('is_active', true)
      .single();

    if (error) {
      console.log('Login error:', error.message);
      return { success: false, message: 'Invalid username or password' };
    }

    if (!data) {
      return { success: false, message: 'Invalid username or password' };
    }

    // Update last login time
    await supabaseClient
      .from('admin_users')
      .update({ last_login: new Date().toISOString() })
      .eq('id', data.id);

    // Store in session
    sessionStorage.setItem('adminLoggedIn', 'true');
    sessionStorage.setItem('adminUser', JSON.stringify(data));

    return { success: true, user: data };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, message: 'Connection error. Check Supabase keys.' };
  }
}

// ===== CHECK IF ADMIN IS LOGGED IN =====
function isAdminLoggedIn() {
  return sessionStorage.getItem('adminLoggedIn') === 'true';
}

// ===== GET CURRENT ADMIN USER =====
function getCurrentAdminUser() {
  const user = sessionStorage.getItem('adminUser');
  return user ? JSON.parse(user) : null;
}

// ===== SET ADMIN LOGGED IN =====
function setAdminLoggedIn(value, user = null) {
  if (value) {
    sessionStorage.setItem('adminLoggedIn', 'true');
    if (user) {
      sessionStorage.setItem('adminUser', JSON.stringify(user));
    }
  } else {
    sessionStorage.removeItem('adminLoggedIn');
    sessionStorage.removeItem('adminUser');
  }
}

// ===== ADMIN LOGOUT =====
function adminLogout() {
  setAdminLoggedIn(false);
  window.location.href = 'index.html';
}

// ===== PROTECT ADMIN PAGE =====
function protectAdminPage() {
  if (!isAdminLoggedIn()) {
    window.location.href = 'index.html';
  }
}

// ===== VERIFY ADMIN PASSWORD (Legacy - for compatibility) =====
function verifyAdminPassword(password) {
  // This is for legacy compatibility
  // Use adminLoginToSupabase instead for Supabase
  return false;
}