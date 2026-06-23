// ===== BLUSHORIA ADMIN AUTHENTICATION - PRODUCTION =====

const SUPABASE_URL = 'https://emcdsuboutrbpsofxdjn.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_duaRAaTPArjd3sqyV69b-Q_N7iOmx2c';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Login with email and password
async function adminLoginWithEmail(email, password) {
  try {
    console.log('Attempting login for:', email);
    
    const { data, error } = await supabase
      .from('admin_users')
      .select('*')
      .eq('email', email)
      .eq('password_hash', password)
      .eq('is_active', true)
      .single();

    console.log('Login response:', { data, error });

    if (error || !data) {
      console.error('Login error:', error?.message || 'No user found');
      return { success: false, message: 'Invalid email or password' };
    }

    await supabase
      .from('admin_users')
      .update({ last_login: new Date().toISOString() })
      .eq('id', data.id);

    sessionStorage.setItem('adminLoggedIn', 'true');
    sessionStorage.setItem('adminUser', JSON.stringify(data));

    return { success: true, user: data };
  } catch (error) {
    console.error('Connection error:', error);
    return { success: false, message: 'Connection error: ' + error.message };
  }
}

// Check if logged in
function isAdminLoggedIn() {
  return sessionStorage.getItem('adminLoggedIn') === 'true';
}

// Get current user
function getCurrentAdminUser() {
  const user = sessionStorage.getItem('adminUser');
  return user ? JSON.parse(user) : null;
}

// Logout
function adminLogout() {
  sessionStorage.removeItem('adminLoggedIn');
  sessionStorage.removeItem('adminUser');
  window.location.href = 'index.html';
}

// Get products from Supabase
async function getProductsFromSupabase() {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching products:', error);
      return [];
    }
    return data || [];
  } catch (error) {
    console.error('Connection error fetching products:', error);
    return [];
  }
}

// Add product to Supabase
async function addProductToSupabase(product) {
  try {
    const { data, error } = await supabase
      .from('products')
      .insert([product])
      .select();

    if (error) {
      console.error('Add product error:', error);
      return { success: false, message: error.message };
    }
    return { success: true, data: data[0] };
  } catch (error) {
    console.error('Add product exception:', error);
    return { success: false, message: 'Add failed: ' + error.message };
  }
}

// Update product in Supabase
async function updateProductInSupabase(id, product) {
  try {
    const { data, error } = await supabase
      .from('products')
      .update(product)
      .eq('id', id)
      .select();

    if (error) {
      console.error('Update product error:', error);
      return { success: false, message: error.message };
    }
    return { success: true, data: data[0] };
  } catch (error) {
    console.error('Update product exception:', error);
    return { success: false, message: 'Update failed: ' + error.message };
  }
}

// Delete product from Supabase
async function deleteProductFromSupabase(id) {
  try {
    const { error } = await supabase
      .from('products')
      .update({ is_active: false })
      .eq('id', id);

    if (error) {
      console.error('Delete product error:', error);
      return { success: false, message: error.message };
    }
    return { success: true };
  } catch (error) {
    console.error('Delete product exception:', error);
    return { success: false, message: 'Delete failed: ' + error.message };
  }
}
