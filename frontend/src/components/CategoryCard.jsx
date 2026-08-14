import React from "react";
import "./CategoryCard.css";

const CategoryCard = ({ title, items = [], linkText = "See more", onCategoryClick }) => {
  return (
    <div className="category-card">
      <h3 className="category-card__title">{title}</h3>
      <div className="category-card__grid">
        {items.map((item, index) => (
          <div
            className="category-card__item"
            key={index}
            onClick={() => onCategoryClick && onCategoryClick(item.name)}
            role="button"
            tabIndex={0}
          >
            <div className="category-card__img-wrap">
              <img
                src={item.image}
                alt={item.name}
                className="category-card__img"
                loading="lazy"
                onError={(e) => {
                  e.target.src = `https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&auto=format&fit=crop&q=60`;
                }}
              />
            </div>
            <span className="category-card__label">{item.name}</span>
          </div>
        ))}
      </div>
      <a
        href="#"
        className="category-card__link"
        onClick={(e) => {
          e.preventDefault();
          if (onCategoryClick) {
            const cleanTitle = title.split("|")[0].trim();
            onCategoryClick(cleanTitle);
          }
        }}
      >
        {linkText || "See more"}
      </a>
    </div>
  );
};

export default CategoryCard;
