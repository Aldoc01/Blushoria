// recommendations.js - Blushoria AI Product Recommendations
// Uses Claude API to intelligently recommend products based on user behavior

// ⚠️ NEVER commit API keys to GitHub!
// Add this line LOCALLY ONLY (not in GitHub):
// const CLAUDE_API_KEY = 'your-api-key-here';
// OR use environment variable:
const CLAUDE_API_KEY = localStorage.getItem('claude_api_key') || 'ADD_YOUR_CLAUDE_KEY_LOCALLY';
const SUPABASE_URL = 'https://emcdsuboutrbpsofxdjn.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_duaRAaTPArjd3sqyV69b-Q_N7iOmx2c';

// Get user's recently viewed products from analytics
async function getRecentlyViewedProducts() {
  try {
    const sessionId = localStorage.getItem('blushoria_session_id');
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/analytics?select=product_id,event_type&session_id=eq.${sessionId}&order=timestamp.desc&limit=10`,
      {
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Content-Type': 'application/json',
        }
      }
    );

    const data = await response.json();
    return data.map(row => row.product_id).filter(Boolean);
  } catch (error) {
    console.error('Error fetching view history:', error);
    return [];
  }
}

// Get all products (for context)
async function getAllProducts() {
  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/products?select=id,name,category,description,price`,
      {
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Content-Type': 'application/json',
        }
      }
    );

    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

// Call Claude API for recommendations
async function getRecommendationsFromClaude(context) {
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': CLAUDE_API_KEY,
        'content-type': 'application/json',
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-opus-4-6',
        max_tokens: 500,
        messages: [
          {
            role: 'user',
            content: `You are a beauty product recommendation AI for Blushoria, a Nigerian beauty brand.
            
User Context:
${context}

Based on the user's viewing history and interests, recommend exactly 3 product IDs from the available products that they would like. 
Return ONLY a JSON object with this format:
{
  "recommended_product_ids": [id1, id2, id3],
  "reason": "Brief explanation of why these products match their interests"
}

Be specific - the IDs must be from the product list provided. Recommend complementary products that match the user's beauty style.`
          }
        ]
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error?.message || 'Claude API error');
    }

    // Extract JSON from Claude's response
    const responseText = data.content[0].text;
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    
    if (!jsonMatch) {
      throw new Error('Could not parse Claude response');
    }

    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error('Error calling Claude API:', error);
    return null;
  }
}

// Main recommendation function
async function getProductRecommendations() {
  try {
    console.log('🤖 Generating new recommendations with Claude...');

    // Get context
    const viewedProducts = await getRecentlyViewedProducts();
    const allProducts = await getAllProducts();

    // If no viewing history, return popular products
    if (viewedProducts.length === 0) {
      console.log('📊 No user data - returning popular products');
      return getPopularProducts(allProducts);
    }

    // Build context for Claude
    const context = buildClaudeContext(viewedProducts, allProducts);

    // Get recommendations from Claude
    const recommendations = await getRecommendationsFromClaude(context);

    if (!recommendations) {
      return getPopularProducts(allProducts);
    }

    return recommendations;
  } catch (error) {
    console.error('Error getting recommendations:', error);
    return null;
  }
}

// Build context string for Claude
function buildClaudeContext(viewedIds, allProducts) {
  const viewedProducts = allProducts.filter(p => viewedIds.includes(p.id));
  
  let context = 'Available Products:\n';
  allProducts.forEach(p => {
    context += `- ID: ${p.id}, Name: "${p.name}", Category: ${p.category}, Price: ₦${p.price}\n`;
  });

  if (viewedProducts.length > 0) {
    context += '\n\nRecently Viewed Products:\n';
    viewedProducts.forEach(p => {
      context += `- "${p.name}" (${p.category})\n`;
    });
  }

  return context;
}

// Get popular products as fallback
function getPopularProducts(allProducts) {
  // Return first 3 products as defaults
  return {
    recommended_product_ids: allProducts.slice(0, 3).map(p => p.id),
    reason: 'Popular Blushoria bestsellers'
  };
}

// Display recommendations in UI
async function displayRecommendations(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = '<div class="loading"><p>🤖 Loading personalized recommendations...</p></div>';

  const recommendations = await getProductRecommendations();

  if (!recommendations) {
    container.innerHTML = '<p>Unable to load recommendations at this time.</p>';
    return;
  }

  // Get full product details
  const allProducts = await getAllProducts();
  const recommendedProducts = allProducts.filter(p => 
    recommendations.recommended_product_ids.includes(p.id)
  );

  let html = `
    <div class="recommendations-header">
      <h3>🎀 Recommended For You</h3>
      <p>${recommendations.reason}</p>
    </div>
    <div class="recommendations-grid">
  `;

  recommendedProducts.forEach(product => {
    html += `
      <div class="product-card scroll-reveal">
        <div class="product-image">
          <img src="${product.image_url || 'https://via.placeholder.com/300'}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/300'">
        </div>
        <div class="product-info">
          <div class="product-name">${product.name}</div>
          <div class="product-price">₦${product.price.toLocaleString()}</div>
          <div class="product-description">${product.description}</div>
          <button class="btn-primary" onclick="addToCart('${product.name}', ${product.price}, this)">Add to Cart</button>
        </div>
      </div>
    `;
  });

  html += '</div>';

  container.innerHTML = html;
}

// Export for global use
window.blushRecommendations = {
  getProductRecommendations,
  displayRecommendations,
  getRecentlyViewedProducts
};
