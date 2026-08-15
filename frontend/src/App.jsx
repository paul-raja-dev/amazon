import React, { useState, useEffect, useMemo, useCallback } from "react";
import Header from "./components/Header";
import HeroBanner from "./components/HeroBanner";
import CategoryCard from "./components/CategoryCard";
import ProductSection from "./components/ProductSection";
import CartModal from "./components/CartModal";
import Footer from "./components/Footer";
import {
  fetchProducts,
  fetchCategories,
  fetchCart,
  addToCart,
  updateCartQuantity,
  removeFromCart,
} from "./api";
import "./index.css";

/* Mini toast notification */
const Toast = ({ message }) =>
  message ? <div className="toast">{message}</div> : null;

function App() {
  const [products, setProducts] = useState([]);
  const [categoryCards, setCategoryCards] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSearch, setActiveSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState("");

  // Load initial products, category cards, and cart data from backend API
  const loadData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [productsData, categoriesData, cartData] = await Promise.all([
        fetchProducts().catch(() => []),
        fetchCategories().catch(() => []),
        fetchCart().catch(() => ({ items: [], count: 0 })),
      ]);

      setProducts(productsData);
      setCategoryCards(categoriesData);
      setCartItems(cartData.items || []);
      setCartCount(cartData.count || 0);
    } catch (err) {
      console.error("Error loading data from API:", err);
      setError("Unable to connect to backend server. Please ensure FastAPI is running.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Sync Cart Data from Server
  const syncCart = async () => {
    try {
      const cartData = await fetchCart();
      setCartItems(cartData.items || []);
      setCartCount(cartData.count || 0);
    } catch (err) {
      console.error("Error syncing cart:", err);
    }
  };

  // Handle Add to Cart
  const handleAddToCart = async (product) => {
    try {
      await addToCart(product.id);
      await syncCart();
      setToast(`"${product.title.slice(0, 35)}..." added to cart`);
      setTimeout(() => setToast(""), 2500);
    } catch (err) {
      console.error("Failed to add to cart on server:", err);
      setToast(`Failed to add item to cart`);
      setTimeout(() => setToast(""), 2500);
    }
  };

  // Handle Update Quantity in Cart
  const handleUpdateQuantity = async (productId, newQuantity) => {
    try {
      if (newQuantity <= 0) {
        await removeFromCart(productId);
      } else {
        await updateCartQuantity(productId, newQuantity);
      }
      await syncCart();
    } catch (err) {
      console.error("Failed to update quantity:", err);
    }
  };

  // Handle Remove Item from Cart
  const handleRemoveItem = async (productId) => {
    try {
      await removeFromCart(productId);
      await syncCart();
      setToast("Item removed from cart");
      setTimeout(() => setToast(""), 2500);
    } catch (err) {
      console.error("Failed to remove item:", err);
    }
  };

  // Handle Checkout / Proceed to Buy
  const handleProceedToBuy = () => {
    setToast(`Proceeding to checkout with ${cartCount} items!`);
    setTimeout(() => setToast(""), 3500);
  };

  // Handle Search Submission
  const handleSearch = (overrideQuery) => {
    const queryToUse = typeof overrideQuery === "string" ? overrideQuery : searchQuery;
    setActiveSearch(queryToUse.trim());
  };

  // Clear Search / Category Filter
  const handleClearFilter = () => {
    setActiveSearch("");
    setSearchQuery("");
    setSelectedCategory("All");
  };

  // Derive unique product categories for dropdown & subnav
  const uniqueCategories = useMemo(() => {
    const fromProducts = products.map((p) => p.category).filter(Boolean);
    const categoryList = Array.from(new Set(fromProducts));
    return categoryList.length > 0
      ? categoryList
      : ["Electronics", "Fashion", "Home & Kitchen", "Toys & Games", "Books"];
  }, [products]);

  // Filter products based on search query and category
  const visibleProducts = useMemo(() => {
    let filtered = products;

    if (selectedCategory && selectedCategory !== "All") {
      filtered = filtered.filter(
        (p) => p.category && p.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (activeSearch) {
      const lower = activeSearch.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          (p.title && p.title.toLowerCase().includes(lower)) ||
          (p.category && p.category.toLowerCase().includes(lower)) ||
          (p.badge && p.badge.toLowerCase().includes(lower))
      );
    }

    return filtered;
  }, [products, activeSearch, selectedCategory]);

  // Segment products for home sections
  const bestSellers = useMemo(
    () => products.filter((p) => p.badge && p.badge.toLowerCase().includes("best")),
    [products]
  );

  const dealsProducts = useMemo(
    () =>
      products.filter(
        (p) =>
          p.badge &&
          (p.badge.toLowerCase().includes("deal") ||
            p.badge.toLowerCase().includes("off") ||
            p.badge.toLowerCase().includes("choice"))
      ),
    [products]
  );

  const isFiltering = Boolean(activeSearch || (selectedCategory && selectedCategory !== "All"));

  return (
    <div className="app">
      <Header
        cartCount={cartCount}
        onSearch={handleSearch}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        categories={uniqueCategories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        onOpenCart={() => setIsCartOpen(true)}
        onNavClick={(item) => {
          if (uniqueCategories.some((c) => c.toLowerCase() === item.toLowerCase())) {
            setSelectedCategory(item);
            setActiveSearch("");
          } else if (item.toLowerCase().includes("deals") || item.toLowerCase().includes("bestseller")) {
            setSelectedCategory("All");
            setSearchQuery(item);
            handleSearch(item);
          } else {
            setSearchQuery(item);
            handleSearch(item);
          }
        }}
      />

      <main className="app__main">
        {/* Loading State */}
        {isLoading && (
          <div className="state-message">
            <div className="spinner" />
            <h3>Loading Amazon Store...</h3>
            <p>Fetching latest products and curated deals.</p>
          </div>
        )}

        {/* Error State */}
        {!isLoading && error && products.length === 0 && (
          <div className="state-message">
            <h3>Something went wrong</h3>
            <p>{error}</p>
            <button className="search-clear" onClick={loadData}>
              Retry Connection
            </button>
          </div>
        )}

        {/* Filtering Results View */}
        {!isLoading && isFiltering && (
          <div className="search-results-view">
            <div className="search-banner">
              <div>
                Showing results for{" "}
                {selectedCategory !== "All" && (
                  <span>
                    category <strong>"{selectedCategory}"</strong>
                    {activeSearch ? " and " : ""}
                  </span>
                )}
                {activeSearch && <strong>"{activeSearch}"</strong>}
                {" — "}({visibleProducts.length} items found)
              </div>
              <button className="search-clear" onClick={handleClearFilter}>
                ✕ Clear Filter
              </button>
            </div>

            {visibleProducts.length > 0 ? (
              <ProductSection
                title={activeSearch ? `Search Results for "${activeSearch}"` : `${selectedCategory}`}
                products={visibleProducts}
                onAddToCart={handleAddToCart}
              />
            ) : (
              <div className="state-message">
                <h3>No products found</h3>
                <p>Try searching with different keywords or clearing your active category filters.</p>
                <button className="search-clear" onClick={handleClearFilter}>
                  View All Products
                </button>
              </div>
            )}
          </div>
        )}

        {/* Default Home View with HeroBanner and Category Cards */}
        {!isLoading && !isFiltering && (
          <>
            {/* Full-width Hero Banner */}
            <HeroBanner />

            {/* 2x2 Category Cards Grid overlapping Hero */}
            {categoryCards.length > 0 && (
              <section className="category-cards-container" aria-label="Curated Categories">
                <div className="category-cards-grid">
                  {categoryCards.map((card) => (
                    <CategoryCard
                      key={card.id || card.title}
                      title={card.title}
                      items={card.items}
                      linkText={card.link_text}
                      onCategoryClick={(catName) => {
                        setSearchQuery(catName);
                        handleSearch(catName);
                      }}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Best Sellers Section */}
            {bestSellers.length > 0 && (
              <ProductSection
                title="Best Sellers in All Departments"
                products={bestSellers}
                onAddToCart={handleAddToCart}
              />
            )}

            {/* Today's Deals & Special Offers */}
            {dealsProducts.length > 0 && (
              <ProductSection
                title="Today's Deals & Limited Time Offers"
                products={dealsProducts}
                onAddToCart={handleAddToCart}
              />
            )}

            {/* Recommended / All Products */}
            <ProductSection
              title="Recommended For You"
              products={products}
              onAddToCart={handleAddToCart}
            />
          </>
        )}
      </main>

      <Footer />

      {/* Cart Modal Slide-over */}
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToBuy={handleProceedToBuy}
      />

      <Toast message={toast} />
    </div>
  );
}

export default App;
