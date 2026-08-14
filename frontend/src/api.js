const API_BASE = "http://localhost:8000";

export async function fetchProducts(params = {}) {
  const url = new URL(`${API_BASE}/api/products`);
  Object.entries(params).forEach(([key, val]) => {
    if (val) url.searchParams.set(key, val);
  });
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function fetchCategories() {
  const res = await fetch(`${API_BASE}/api/categories`);
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

export async function fetchCart() {
  const res = await fetch(`${API_BASE}/api/cart`);
  if (!res.ok) throw new Error("Failed to fetch cart");
  return res.json();
}

export async function addToCart(productId) {
  const res = await fetch(`${API_BASE}/api/cart`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ product_id: productId }),
  });
  if (!res.ok) throw new Error("Failed to add to cart");
  return res.json();
}

export async function removeFromCart(productId) {
  const res = await fetch(`${API_BASE}/api/cart/${productId}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to remove from cart");
  return res.json();
}
