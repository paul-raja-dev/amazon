import React from "react";
import "./CartModal.css";

const CartModal = ({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem, onProceedToBuy }) => {
  if (!isOpen) return null;

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-modal-backdrop" onClick={onClose}>
      <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="cart-modal__header">
          <div className="cart-modal__header-title">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0" />
            </svg>
            <h2>Shopping Cart ({totalItems} {totalItems === 1 ? "item" : "items"})</h2>
          </div>
          <button className="cart-modal__close-btn" onClick={onClose} aria-label="Close Cart">
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="cart-modal__body">
          {cartItems.length === 0 ? (
            <div className="cart-modal__empty">
              <div className="cart-modal__empty-icon">🛒</div>
              <h3>Your Amazon Cart is empty</h3>
              <p>Check out recommendations or search for products to add to your cart.</p>
              <button className="cart-modal__shop-btn" onClick={onClose}>
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="cart-modal__content">
              {/* Items list */}
              <div className="cart-modal__items-list">
                {cartItems.map((item) => (
                  <div key={item.product_id} className="cart-item">
                    <div className="cart-item__image-container">
                      <img src={item.image} alt={item.title} className="cart-item__image" />
                    </div>

                    <div className="cart-item__details">
                      <h4 className="cart-item__title">{item.title}</h4>
                      <div className="cart-item__stock">In Stock</div>
                      <div className="cart-item__shipping">Eligible for FREE Shipping</div>

                      <div className="cart-item__actions">
                        <div className="cart-item__quantity">
                          <button
                            className="qty-btn"
                            onClick={() => onUpdateQuantity(item.product_id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            −
                          </button>
                          <span className="qty-value">{item.quantity}</span>
                          <button
                            className="qty-btn"
                            onClick={() => onUpdateQuantity(item.product_id, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>

                        <span className="cart-item__divider">|</span>

                        <button
                          className="cart-item__delete-btn"
                          onClick={() => onRemoveItem(item.product_id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                    <div className="cart-item__price">
                      ₹
                      {(item.price * item.quantity).toLocaleString("en-IN", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary Footer */}
              <div className="cart-modal__summary">
                <div className="cart-modal__free-delivery">
                  <span className="check-mark">✓</span>
                  <span>Your order qualifies for <strong>FREE Delivery</strong></span>
                </div>

                <div className="cart-modal__subtotal-row">
                  <span>Subtotal ({totalItems} {totalItems === 1 ? "item" : "items"}):</span>
                  <strong className="subtotal-amount">
                    ₹
                    {subtotal.toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </strong>
                </div>

                <button className="cart-modal__checkout-btn" onClick={onProceedToBuy}>
                  Proceed to Buy ({totalItems} {totalItems === 1 ? "item" : "items"})
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartModal;
