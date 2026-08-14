import React from "react";
import ProductCard from "./ProductCard";
import "./ProductSection.css";

const ProductSection = ({ title, products, onAddToCart }) => {
  return (
    <section className="product-section">
      <div className="product-section__header">
        <h2 className="product-section__title">{title}</h2>
        <a href="#" className="product-section__see-all">
          See all results ›
        </a>
      </div>
      <div className="product-section__grid">
        {products.map((product) => (
          <div key={product.id} className="product-section__item">
            <ProductCard product={product} onAddToCart={onAddToCart} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductSection;
