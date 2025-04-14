// Use explicit API URL to ensure we're connecting to the right server
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
console.log(`[API CONFIG] Using API URL: ${API_URL}`);

/**
 * Fetches data from the API with error handling
 */
async function fetchFromAPI(endpoint) {
  const fullUrl = `${API_URL}${endpoint}`;
  console.log(`[API] Fetching from ${fullUrl}`);
  
  try {
    // Add cache-busting query param to ensure fresh data
    const urlWithParam = `${fullUrl}${fullUrl.includes('?') ? '&' : '?'}_t=${Date.now()}`;
    
    // Use more lenient error handling to avoid breaking the page
    let response;
    try {
      response = await fetch(urlWithParam, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        cache: 'no-store',
        next: { revalidate: 0 }
      });
    } catch (fetchError) {
      console.error(`[API] Network error fetching ${urlWithParam}:`, fetchError);
      // Return empty array for collections or empty object for single items
      return endpoint.includes('categories') || endpoint.includes('products') ? [] : {};
    }
    
    if (!response.ok) {
      console.error(`[API] Error response: ${response.status}`);
      const errorText = await response.text();
      console.error(`[API] Error details: ${errorText}`);
      // Return empty array for collections or empty object for single items
      return endpoint.includes('categories') || endpoint.includes('products') ? [] : {};
    }
    
    try {
      const data = await response.json();
      console.log(`[API] Success response from ${endpoint}. Items: ${Array.isArray(data) ? data.length : 'N/A'}`);
      return data;
    } catch (jsonError) {
      console.error(`[API] JSON parsing error:`, jsonError);
      // Return empty array for collections or empty object for single items
      return endpoint.includes('categories') || endpoint.includes('products') ? [] : {};
    }
  } catch (error) {
    console.error('[API] Fetch error:', error);
    // Return empty array for collections or empty object for single items
    return endpoint.includes('categories') || endpoint.includes('products') ? [] : {};
  }
}

/**
 * Get all categories
 */
export async function getCategories() {
  return fetchFromAPI('/categories');
}

/**
 * Get a specific category by slug
 * This function maps from slug (men, women) to the database category with appropriate gender
 */
export async function getCategoryBySlug(slug) {
  // Map front-end slugs to backend gender filter
  const genderMap = {
    'men': 'mens',
    'women': 'womens',
    'kids': 'kids'
  };
  
  const gender = genderMap[slug];
  
  if (gender) {
    // Get all categories and filter by gender
    const categories = await fetchFromAPI('/categories');
    return categories.find(cat => cat.gender === gender);
  } else if (slug === 'accessories') {
    // For accessories, we need a special handling
    // For now, hardcode it until we have a proper accessories category in the DB
    return {
      id: 999,
      name: 'Accessories',
      description: 'Complete your look with our fashionable accessories',
      gender: 'all'
    };
  }
  
  throw new Error(`Category ${slug} not found`);
}

/**
 * Get products by category ID
 */
export async function getProductsByCategoryId(categoryId) {
  return fetchFromAPI(`/products/category/${categoryId}`);
}

/**
 * Get products by gender
 */
export async function getProductsByGender(gender) {
  console.log(`[API] Getting products for gender: ${gender}`);
  const genderMap = {
    'men': 'mens',
    'women': 'womens',
    'kids': 'kids'
  };
  
  const apiGender = genderMap[gender];
  if (!apiGender) {
    console.error(`[API] Invalid gender: ${gender}`);
    throw new Error(`Invalid gender: ${gender}`);
  }
  
  return fetchFromAPI(`/products/gender/${apiGender}`);
}

/**
 * Get products by category slug
 */
export async function getProductsByCategorySlug(slug) {
  console.log(`[API] Getting products for category slug: ${slug}`);
  
  // For regular gender-based categories
  if (['men', 'women', 'kids'].includes(slug)) {
    return getProductsByGender(slug);
  }
  
  // For other categories like accessories
  try {
    const category = await getCategoryBySlug(slug);
    console.log(`[API] Category for slug ${slug}:`, category);
    
    if (category && category.id) {
      return getProductsByCategoryId(category.id);
    }
    
    console.warn(`[API] No category ID found for slug: ${slug}`);
    return [];
  } catch (error) {
    console.error(`[API] Error getting products for category slug ${slug}:`, error);
    return [];
  }
}

/**
 * Get a product by ID 
 */
export async function getProductById(id) {
  return fetchFromAPI(`/products/${id}`);
}

/**
 * Get subcategories by category ID
 */
export async function getSubcategoriesByCategoryId(categoryId) {
  return fetchFromAPI(`/subcategories?categoryId=${categoryId}`);
}

export default {
  getCategories,
  getCategoryBySlug,
  getProductsByCategoryId,
  getProductsByCategorySlug,
  getProductsByGender,
  getProductById,
  getSubcategoriesByCategoryId
}; 