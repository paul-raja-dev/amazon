import React from "react";
import "./ProductCard.css";

const StarRating = ({ rating = 0 }) => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <div className="stars" title={`${rating} out of 5 stars`}>
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          className={`star ${i < full ? "star--full" : i === full && half ? "star--half" : "star--empty"}`}
        >
          ★
        </span>
      ))}
    </div>
  );
};

const ProductCard = ({ product, onAddToCart }) => {
  const originalPrice =
    product.original_price !== undefined && product.original_price !== null
      ? product.original_price
      : product.originalPrice !== undefined && product.originalPrice !== null
      ? product.originalPrice
      : product.price;

  const price = product.price ?? 0;
  const discount =
    originalPrice > price
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : 0;

  return (
    <div className="product-card" onClick={() => onAddToCart && onAddToCart(product)}>
      {product.badge && (
        <span
          className={`product-card__badge ${
            product.badge.toLowerCase().includes("deal") ||
            product.badge.toLowerCase().includes("off")
              ? "product-card__badge--deal"
              : product.badge.toLowerCase().includes("choice")
              ? "product-card__badge--choice"
              : ""
          }`}
        >
          {product.badge}
        </span>
      )}
      <div className="product-card__img-wrap">
        <img
          src={product.image}
          alt={product.title}
          className="product-card__img"
          loading="lazy"
          onError={(e) => {
            e.target.src = `https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&auto=format&fit=crop&q=60`;
          }}
        />
      </div>
      <div className="product-card__body">
        <p className="product-card__title" title={product.title}>
          {product.title}
        </p>

        <div className="product-card__rating">
          <StarRating rating={product.rating || 0} />
          <span className="product-card__reviews">
            {(product.reviews || 0).toLocaleString("en-IN")}
          </span>
        </div>

        <div className="product-card__price-row">
          <span className="product-card__currency">₹</span>
          <span className="product-card__price">
            {price.toLocaleString("en-IN", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
          {discount > 0 && (
            <span className="product-card__discount">-{discount}%</span>
          )}
        </div>

        {originalPrice > price && (
          <span className="product-card__original">
            M.R.P.:{" "}
            <s>
              ₹
              {originalPrice.toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </s>
          </span>
        )}

        <div className="product-card__prime-row">
          <span className="prime-tag">
            <span className="prime-check">✓</span>prime
          </span>
          <span className="delivery-tag">FREE Delivery by Tomorrow</span>
        </div>

        <button
          className="product-card__cart-btn"
          onClick={(e) => {
            e.stopPropagation();
            if (onAddToCart) onAddToCart(product);
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
