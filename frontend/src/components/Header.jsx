import React from "react";
import "./Header.css";

const NAV_LINKS = [
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
  // Extract category names from passed categories prop (can be strings or objects)
  const categoryNames = categories
    .map((c) => (typeof c === "string" ? c : c.name || c.title || ""))
    .filter(Boolean);

  // Default fallback categories if empty
  const defaultList = [
    "Electronics",
    "Fashion",
    "Home & Kitchen",
    "Toys & Games",
    "Books",
    "Sports",
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
          title="Amazon.in Home"
        >
          <span className="logo__text">amazon</span>
          <span className="logo__dot">.in</span>
        </a>

        {/* Deliver to Chennai */}
        <div className="header__deliver">
          <span className="deliver__icon">
            <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
              <path
                d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                fill="#fff"
              />
              <circle cx="12" cy="9" r="2.5" fill="#131921" />
            </svg>
          </span>
          <div>
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
            aria-label="Select search category"
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
            aria-label="Search text"
          />
          <button
            className="search__btn"
            onClick={() => onSearch && onSearch()}
            aria-label="Submit search"
          >
            <svg viewBox="0 0 24 24" fill="none" className="search__icon">
              <circle
                cx="11"
                cy="11"
                r="8"
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

        {/* Right Nav */}
        <div className="header__right">
          <div className="header__lang">
            <img
              src="https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/23px-Flag_of_India.svg.png"
              alt="India Flag"
              className="flag-img"
            />
            <span>EN</span>
            <span className="chevron">&#9662;</span>
          </div>

          <div className="header__account">
            <span className="nav__label">Hello, sign in</span>
            <span className="nav__value">
              Account &amp; Lists <span className="chevron">&#9662;</span>
            </span>
          </div>

          <div className="header__returns">
            <span className="nav__label">Returns</span>
            <span className="nav__value">&amp; Orders</span>
          </div>

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

      {/* Sub Navigation Bar */}
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
            strokeWidth="2"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
          All
        </button>
        <div className="bottomnav__links">
          {NAV_LINKS.map((item) => (
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
