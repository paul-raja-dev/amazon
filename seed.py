"""
Seed script to populate the database with initial product and category data.
Run once: python seed.py
"""

import asyncio
from sqlalchemy.ext.asyncio import AsyncSession
from database import engine, AsyncSessionLocal, Base
from models import Product, CategoryCard


PRODUCTS = [
    {
        "title": "Apple AirPods Pro (2nd Generation)",
        "price": 18900.00,
        "original_price": 24900.00,
        "rating": 4.8,
        "reviews": 87432,
        "image": "https://m.media-amazon.com/images/I/61f1YfTkTDL._AC_SL1500_.jpg",
        "badge": "Best Seller",
        "category": "Electronics",
    },
    {
        "title": "Kindle Paperwhite (16 GB) - Now with a 7 inch display",
        "price": 13999.00,
        "original_price": 15999.00,
        "rating": 4.7,
        "reviews": 45210,
        "image": "https://m.media-amazon.com/images/I/61Wvj8MNbML._AC_SL1000_.jpg",
        "badge": "Amazon's Choice",
        "category": "Electronics",
    },
    {
        "title": "Samsung 55 inch QLED 4K Smart TV (2024)",
        "price": 69799.00,
        "original_price": 109999.00,
        "rating": 4.6,
        "reviews": 21034,
        "image": "https://m.media-amazon.com/images/I/71LJJrKbezL._AC_SL1500_.jpg",
        "badge": "Limited Deal",
        "category": "Electronics",
    },
    {
        "title": "Nike Air Max 270 Men's Running Shoes",
        "price": 8995.00,
        "original_price": 15000.00,
        "rating": 4.5,
        "reviews": 33120,
        "image": "https://m.media-amazon.com/images/I/71s4DBFnF1L._AC_UL1500_.jpg",
        "badge": "40% Off",
        "category": "Fashion",
    },
    {
        "title": "Instant Pot Duo 7-in-1 Electric Pressure Cooker, 6 Qt",
        "price": 5999.00,
        "original_price": 9999.00,
        "rating": 4.7,
        "reviews": 156782,
        "image": "https://m.media-amazon.com/images/I/71V1LqVvnuL._AC_SL1500_.jpg",
        "badge": "Best Seller",
        "category": "Home & Kitchen",
    },
    {
        "title": "LEGO Star Wars Millennium Falcon 75192",
        "price": 84999.00,
        "original_price": 84999.00,
        "rating": 4.9,
        "reviews": 9871,
        "image": "https://m.media-amazon.com/images/I/91Vvqx9GMQL._AC_SL1500_.jpg",
        "badge": None,
        "category": "Toys & Games",
    },
    {
        "title": "Atomic Habits by James Clear - Paperback",
        "price": 399.00,
        "original_price": 799.00,
        "rating": 4.8,
        "reviews": 234567,
        "image": "https://m.media-amazon.com/images/I/91bYsX41DVL._AC_SL1500_.jpg",
        "badge": "Best Seller",
        "category": "Books",
    },
    {
        "title": "Logitech MX Master 3S Wireless Performance Mouse",
        "price": 7999.00,
        "original_price": 9999.00,
        "rating": 4.7,
        "reviews": 18234,
        "image": "https://m.media-amazon.com/images/I/614yAEX8VLL._AC_SL1500_.jpg",
        "badge": "Amazon's Choice",
        "category": "Electronics",
    },
    {
        "title": "Dyson V15 Detect Absolute Cordless Vacuum",
        "price": 49999.00,
        "original_price": 74999.00,
        "rating": 4.6,
        "reviews": 12540,
        "image": "https://m.media-amazon.com/images/I/61p2fHOLZIL._AC_SL1500_.jpg",
        "badge": "33% Off",
        "category": "Home & Kitchen",
    },
    {
        "title": "Anker 65W USB C Charger, 3-Port GaN Fast Wall Charger",
        "price": 3599.00,
        "original_price": 4599.00,
        "rating": 4.8,
        "reviews": 67321,
        "image": "https://m.media-amazon.com/images/I/61TTIBkOkrL._AC_SL1500_.jpg",
        "badge": "Best Seller",
        "category": "Electronics",
    },
]

CATEGORY_CARDS = [
    {
        "title": "Appliances for your home | Up to 55% off",
        "link_text": "See more",
        "items": [
            {"name": "Air conditioners", "image": "https://m.media-amazon.com/images/I/51nOL-jVtfL._AC_SL1500_.jpg"},
            {"name": "Refrigerators", "image": "https://m.media-amazon.com/images/I/71bR5RMxHiL._AC_SL1500_.jpg"},
            {"name": "Microwaves", "image": "https://m.media-amazon.com/images/I/81NjB5vMMgL._AC_SL1500_.jpg"},
            {"name": "Washing machines", "image": "https://m.media-amazon.com/images/I/71dRvFpiteL._AC_SL1500_.jpg"},
        ],
    },
    {
        "title": "Up to 35% off | Echo with Alexa and Fire TV",
        "link_text": "See all deals",
        "items": [
            {"name": "Echo Show 8", "image": "https://m.media-amazon.com/images/I/71BnTMY2RyL._AC_SL1000_.jpg"},
            {"name": "Fire TV Stick HD", "image": "https://m.media-amazon.com/images/I/51TjJOTfslL._AC_SL1000_.jpg"},
            {"name": "Echo Dot Max", "image": "https://m.media-amazon.com/images/I/71JB6hM6Z6L._AC_SL1000_.jpg"},
            {"name": "Echo Dot (5th Gen)", "image": "https://m.media-amazon.com/images/I/518cRYanpbL._AC_SL1000_.jpg"},
        ],
    },
    {
        "title": "Starting 49 | Deals on home essentials",
        "link_text": "Explore all",
        "items": [
            {"name": "Cleaning supplies", "image": "https://m.media-amazon.com/images/I/71e3dB8qDwL._AC_SL1500_.jpg"},
            {"name": "Bathroom accessories", "image": "https://m.media-amazon.com/images/I/61FXEMH8e3L._AC_SL1500_.jpg"},
            {"name": "Home tools", "image": "https://m.media-amazon.com/images/I/71iN0LFPMYL._AC_SL1500_.jpg"},
            {"name": "Storage solutions", "image": "https://m.media-amazon.com/images/I/71YAVQr56vL._AC_SL1500_.jpg"},
        ],
    },
    {
        "title": "Up to 75% off | Deals on headphones",
        "link_text": "See all deals",
        "items": [
            {"name": "boAt earbuds", "image": "https://m.media-amazon.com/images/I/51K3K1VD6fL._AC_SL1500_.jpg"},
            {"name": "Sony headphones", "image": "https://m.media-amazon.com/images/I/61SUj2aKoEL._AC_SL1500_.jpg"},
            {"name": "JBL neckband", "image": "https://m.media-amazon.com/images/I/61GJMdn0vDL._AC_SL1500_.jpg"},
            {"name": "Noise earbuds", "image": "https://m.media-amazon.com/images/I/61RKkODaM6L._AC_SL1500_.jpg"},
        ],
    },
    {
        "title": "Starting 199 | Top picks from local shops",
        "link_text": "See more",
        "items": [
            {"name": "Grocery staples", "image": "https://m.media-amazon.com/images/I/71WJCr-GHwL._AC_SL1500_.jpg"},
            {"name": "Kitchen tools", "image": "https://m.media-amazon.com/images/I/71YAVQr56vL._AC_SL1500_.jpg"},
            {"name": "Snacks", "image": "https://m.media-amazon.com/images/I/81-hE7jx5sL._AC_SL1500_.jpg"},
            {"name": "Personal care", "image": "https://m.media-amazon.com/images/I/71P-FXKZ5bL._AC_SL1500_.jpg"},
        ],
    },
    {
        "title": "Automotive essentials | Up to 60% off",
        "link_text": "See more",
        "items": [
            {"name": "Car accessories", "image": "https://m.media-amazon.com/images/I/71fVwVNwg0L._AC_SL1500_.jpg"},
            {"name": "Tyre inflators", "image": "https://m.media-amazon.com/images/I/71g2-GFnSGL._AC_SL1500_.jpg"},
            {"name": "Car cleaners", "image": "https://m.media-amazon.com/images/I/81nMNj4PJAL._AC_SL1500_.jpg"},
            {"name": "Helmet & gear", "image": "https://m.media-amazon.com/images/I/71dPkVaiddL._AC_SL1500_.jpg"},
        ],
    },
    {
        "title": "Up to 50% off | Baby care essentials",
        "link_text": "See more",
        "items": [
            {"name": "Diapers", "image": "https://m.media-amazon.com/images/I/71c34bTEaIL._AC_SL1500_.jpg"},
            {"name": "Baby food", "image": "https://m.media-amazon.com/images/I/71cLu6GzRaL._AC_SL1500_.jpg"},
            {"name": "Toys", "image": "https://m.media-amazon.com/images/I/91Vvqx9GMQL._AC_SL1500_.jpg"},
            {"name": "Baby clothing", "image": "https://m.media-amazon.com/images/I/81L7KCjCM3L._AC_SL1500_.jpg"},
        ],
    },
    {
        "title": "Up to 70% off | Styles for men",
        "link_text": "See more",
        "items": [
            {"name": "T-shirts", "image": "https://m.media-amazon.com/images/I/71i2XhHU3pL._AC_UL1500_.jpg"},
            {"name": "Casual shoes", "image": "https://m.media-amazon.com/images/I/71s4DBFnF1L._AC_UL1500_.jpg"},
            {"name": "Watches", "image": "https://m.media-amazon.com/images/I/71cW0jRRNHL._AC_UL1500_.jpg"},
            {"name": "Sunglasses", "image": "https://m.media-amazon.com/images/I/51EPCxCmKYL._AC_SL1500_.jpg"},
        ],
    },
]


async def seed():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    async with AsyncSessionLocal() as session:
        # Clear existing data
        from sqlalchemy import text
        await session.execute(text("DELETE FROM products"))
        await session.execute(text("DELETE FROM category_cards"))
        await session.commit()

        # Insert products
        for data in PRODUCTS:
            product = Product(**data)
            session.add(product)

        # Insert category cards
        for data in CATEGORY_CARDS:
            card = CategoryCard(**data)
            session.add(card)

        await session.commit()
        print(f"Seeded {len(PRODUCTS)} products and {len(CATEGORY_CARDS)} category cards.")


if __name__ == "__main__":
    asyncio.run(seed())
