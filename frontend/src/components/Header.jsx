import React from "react";
import "./Header.css";

const NAV_LINKS = [
  "All",
  "Fresh",
  "Amazon miniTV",
  "Sell",
  "Best Sellers",
  "Today's Deals",
  "Mobiles",
  "Customer Service",
  "Electronics",
  "Home & Kitchen",
  "Fashion",
  "Amazon Pay",
  "Computers",
];

const Header = ({
  cartCount = 0,
  onSearch,
  searchQuery = "",
  setSearchQuery,
  categories = [],
  selectedCategory = "All",
  setSelectedCategory,
  onNavClick,
}) => {
  const categoryNames = categories
    .map((c) => (typeof c === "string" ? c : c.name || c.title || ""))
    .filter(Boolean);

  const defaultList = [
    "Electronics",
    "Fashion",
    "Home & Kitchen",
    "Toys & Games",
    "Books",
  ];

  const combinedCategories = [
    "All",
    ...Array.from(new Set(categoryNames.length > 0 ? categoryNames : defaultList)),
  ];

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && onSearch) {
      onSearch();
    }
  };

  return (
    <header className="header">
      {/* Top Navbar */}
      <nav className="header__topnav">
        {/* Amazon Logo */}
        <a
          href="/"
          className="header__logo"
          onClick={(e) => {
            e.preventDefault();
            if (setSearchQuery) setSearchQuery("");
            if (setSelectedCategory) setSelectedCategory("All");
            if (onSearch) onSearch("");
          }}
          title="Amazon.in Homepage"
        >
          <span className="logo__text">amazon</span>
          <span className="logo__dot">.in</span>
        </a>

        {/* Deliver to Chennai */}
        <div className="header__deliver">
          <span className="deliver__icon">
            <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
              <path
                d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                fill="#ffffff"
              />
              <circle cx="12" cy="9" r="2.5" fill="#131921" />
            </svg>
          </span>
          <div className="deliver__text-wrap">
            <span className="deliver__label">Delivering to Chennai 600001</span>
            <span className="deliver__location">Update location</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="header__search">
          <select
            className="search__category"
            value={selectedCategory}
            onChange={(e) =>
              setSelectedCategory && setSelectedCategory(e.target.value)
            }
            aria-label="Select Category"
          >
            {combinedCategories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <input
            type="text"
            className="search__input"
            placeholder="Search Amazon.in"
            value={searchQuery}
            onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            aria-label="Search Amazon.in"
          />
          <button
            className="search__btn"
            onClick={() => onSearch && onSearch()}
            aria-label="Submit Search"
          >
            <svg viewBox="0 0 24 24" fill="none" className="search__icon">
              <circle
                cx="11"
                cy="11"
                r="7"
                stroke="currentColor"
                strokeWidth="2.5"
              />
              <path
                d="m21 21-4.35-4.35"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Right Navigation */}
        <div className="header__right">
          {/* Language Selector */}
          <div className="header__lang">
            <span className="flag-emoji" role="img" aria-label="India">🇮🇳</span>
            <span>EN</span>
            <span className="chevron">&#9662;</span>
          </div>

          {/* Account & Lists */}
          <div className="header__account">
            <span className="nav__label">Hello, sign in</span>
            <span className="nav__value">
              Account &amp; Lists <span className="chevron">&#9662;</span>
            </span>
          </div>

          {/* Returns & Orders */}
          <div className="header__returns">
            <span className="nav__label">Returns</span>
            <span className="nav__value">&amp; Orders</span>
          </div>

          {/* Shopping Cart */}
          <div className="header__cart">
            <div className="cart__wrapper">
              <span className="cart__count">{cartCount}</span>
              <svg
                viewBox="0 0 40 40"
                width="34"
                height="34"
                className="cart__icon"
              >
                <path
                  d="M14.5 34a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM30.5 34a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"
                  fill="#fff"
                />
                <path
                  d="M2 2h6l3.6 18.4a2 2 0 0 0 2 1.6h12.4a2 2 0 0 0 2-1.6L32 10H10"
                  stroke="#fff"
                  strokeWidth="2.5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="cart__label">Cart</span>
          </div>
        </div>
      </nav>

      {/* Sub Navigation */}
      <nav className="header__bottomnav">
        <button
          className="bottomnav__all"
          onClick={() => {
            if (setSelectedCategory) setSelectedCategory("All");
            if (setSearchQuery) setSearchQuery("");
            if (onSearch) onSearch("");
          }}
        >
          <svg
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="none"
            stroke="#fff"
            strokeWidth="2.2"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
          All
        </button>
        <div className="bottomnav__links">
          {NAV_LINKS.filter((item) => item !== "All").map((item) => (
            <a
              key={item}
              href="#"
              className="bottomnav__link"
              onClick={(e) => {
                e.preventDefault();
                if (onNavClick) {
                  onNavClick(item);
                } else {
                  if (setSearchQuery) setSearchQuery(item);
                  if (onSearch) onSearch(item);
                }
              }}
            >
              {item}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Header;
