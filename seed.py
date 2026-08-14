"""
Seed script to populate the database with initial product and category data.
Run once: python seed.py
"""

import asyncio
from database import engine, AsyncSessionLocal, Base
from models import Product, CategoryCard


PRODUCTS = [
    {
        "title": "Apple AirPods Pro (2nd Generation) with MagSafe Case (USB-C)",
        "price": 18900.00,
        "original_price": 24900.00,
        "rating": 4.8,
        "reviews": 87432,
        "image": "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=500&auto=format&fit=crop&q=80",
        "badge": "Best Seller",
        "category": "Electronics",
    },
    {
        "title": "Kindle Paperwhite (16 GB) – Now with 6.8\" display and adjustable warm light",
        "price": 13999.00,
        "original_price": 15999.00,
        "rating": 4.7,
        "reviews": 45210,
        "image": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=80",
        "badge": "Amazon's Choice",
        "category": "Electronics",
    },
    {
        "title": "Samsung 55\" Crystal 4K Vivid Pro Ultra HD Smart LED TV (2024 Model)",
        "price": 42990.00,
        "original_price": 68900.00,
        "rating": 4.6,
        "reviews": 21034,
        "image": "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500&auto=format&fit=crop&q=80",
        "badge": "Limited Deal",
        "category": "Electronics",
    },
    {
        "title": "Nike Air Max 270 Men's Running & Walking Shoes (Triple Black)",
        "price": 8995.00,
        "original_price": 14995.00,
        "rating": 4.5,
        "reviews": 33120,
        "image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=80",
        "badge": "40% Off",
        "category": "Fashion",
    },
    {
        "title": "Instant Pot Duo 7-in-1 Electric Pressure Cooker, Slow Cooker, Rice Cooker (6 Qt)",
        "price": 5999.00,
        "original_price": 9999.00,
        "rating": 4.7,
        "reviews": 156782,
        "image": "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=500&auto=format&fit=crop&q=80",
        "badge": "Best Seller",
        "category": "Home & Kitchen",
    },
    {
        "title": "LEGO Star Wars Millennium Falcon Ultimate Collector Series 75192",
        "price": 84999.00,
        "original_price": 84999.00,
        "rating": 4.9,
        "reviews": 9871,
        "image": "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=500&auto=format&fit=crop&q=80",
        "badge": "Collector Edition",
        "category": "Toys & Games",
    },
    {
        "title": "Atomic Habits: An Easy & Proven Way to Build Good Habits by James Clear",
        "price": 399.00,
        "original_price": 799.00,
        "rating": 4.8,
        "reviews": 234567,
        "image": "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&auto=format&fit=crop&q=80",
        "badge": "Best Seller",
        "category": "Books",
    },
    {
        "title": "Logitech MX Master 3S Wireless Performance Mouse with Quiet Clicks (Graphite)",
        "price": 7999.00,
        "original_price": 10995.00,
        "rating": 4.7,
        "reviews": 18234,
        "image": "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&auto=format&fit=crop&q=80",
        "badge": "Amazon's Choice",
        "category": "Electronics",
    },
    {
        "title": "Dyson V15 Detect Absolute Cordless Vacuum Cleaner (Laser Slim Fluffy)",
        "price": 49999.00,
        "original_price": 74999.00,
        "rating": 4.6,
        "reviews": 12540,
        "image": "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=500&auto=format&fit=crop&q=80",
        "badge": "33% Off",
        "category": "Home & Kitchen",
    },
    {
        "title": "Anker 65W USB-C GaN 3-Port Fast Wall Charger for MacBook, iPhone & Galaxy",
        "price": 3599.00,
        "original_price": 4599.00,
        "rating": 4.8,
        "reviews": 67321,
        "image": "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=500&auto=format&fit=crop&q=80",
        "badge": "Best Seller",
        "category": "Electronics",
    },
    {
        "title": "Sony WH-1000XM5 Wireless Industry Leading Noise Canceling Headphones (Black)",
        "price": 26990.00,
        "original_price": 34990.00,
        "rating": 4.7,
        "reviews": 43190,
        "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=80",
        "badge": "Best Seller",
        "category": "Electronics",
    },
    {
        "title": "OnePlus Nord CE 4 5G (Dark Chrome, 8GB RAM, 128GB Storage, 100W SUPERVOOC)",
        "price": 24999.00,
        "original_price": 27999.00,
        "rating": 4.5,
        "reviews": 38910,
        "image": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&auto=format&fit=crop&q=80",
        "badge": "Limited Deal",
        "category": "Electronics",
    },
]

CATEGORY_CARDS = [
    {
        "title": "Appliances for your home | Up to 55% off",
        "link_text": "See more",
        "items": [
            {"name": "Air conditioners", "image": "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&auto=format&fit=crop&q=80"},
            {"name": "Refrigerators", "image": "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400&auto=format&fit=crop&q=80"},
            {"name": "Microwaves", "image": "https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=400&auto=format&fit=crop&q=80"},
            {"name": "Washing machines", "image": "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=400&auto=format&fit=crop&q=80"},
        ],
    },
    {
        "title": "Up to 35% off | Echo with Alexa & Smart Home",
        "link_text": "See all deals",
        "items": [
            {"name": "Echo Show 8", "image": "https://images.unsplash.com/photo-1543512214-318c7553f230?w=400&auto=format&fit=crop&q=80"},
            {"name": "Fire TV Stick 4K", "image": "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=400&auto=format&fit=crop&q=80"},
            {"name": "Echo Dot Smart", "image": "https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?w=400&auto=format&fit=crop&q=80"},
            {"name": "Smart Plugs", "image": "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&auto=format&fit=crop&q=80"},
        ],
    },
    {
        "title": "Starting ₹49 | Deals on home essentials",
        "link_text": "Explore all",
        "items": [
            {"name": "Cleaning supplies", "image": "https://images.unsplash.com/photo-1585421514738-01798e348b17?w=400&auto=format&fit=crop&q=80"},
            {"name": "Bathroom accessories", "image": "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&auto=format&fit=crop&q=80"},
            {"name": "Home tools", "image": "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=400&auto=format&fit=crop&q=80"},
            {"name": "Storage organizers", "image": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&auto=format&fit=crop&q=80"},
        ],
    },
    {
        "title": "Up to 75% off | Audio & Headphones",
        "link_text": "See all deals",
        "items": [
            {"name": "boAt earbuds", "image": "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&auto=format&fit=crop&q=80"},
            {"name": "Sony ANC", "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&auto=format&fit=crop&q=80"},
            {"name": "Wireless neckbands", "image": "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=400&auto=format&fit=crop&q=80"},
            {"name": "Noise earbuds", "image": "https://images.unsplash.com/photo-1574920162043-b872873f19c8?w=400&auto=format&fit=crop&q=80"},
        ],
    },
    {
        "title": "Starting ₹199 | Top picks from local shops",
        "link_text": "See more",
        "items": [
            {"name": "Grocery staples", "image": "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&auto=format&fit=crop&q=80"},
            {"name": "Cookware & Dining", "image": "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=400&auto=format&fit=crop&q=80"},
            {"name": "Healthy snacks", "image": "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400&auto=format&fit=crop&q=80"},
            {"name": "Personal care", "image": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&auto=format&fit=crop&q=80"},
        ],
    },
    {
        "title": "Automotive essentials | Up to 60% off",
        "link_text": "See more",
        "items": [
            {"name": "Car accessories", "image": "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&auto=format&fit=crop&q=80"},
            {"name": "Tyre inflators", "image": "https://images.unsplash.com/photo-1578844251758-2f71da64c96f?w=400&auto=format&fit=crop&q=80"},
            {"name": "Car cleaning kits", "image": "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=400&auto=format&fit=crop&q=80"},
            {"name": "Helmets & riding gear", "image": "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=400&auto=format&fit=crop&q=80"},
        ],
    },
    {
        "title": "Up to 50% off | Baby care & toys",
        "link_text": "See more",
        "items": [
            {"name": "Diapers & wipes", "image": "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&auto=format&fit=crop&q=80"},
            {"name": "Baby skincare", "image": "https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&auto=format&fit=crop&q=80"},
            {"name": "Learning toys", "image": "https://images.unsplash.com/photo-1558877385-81a1c7e67d72?w=400&auto=format&fit=crop&q=80"},
            {"name": "Baby clothing", "image": "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=400&auto=format&fit=crop&q=80"},
        ],
    },
    {
        "title": "Up to 70% off | Styles for men",
        "link_text": "See more",
        "items": [
            {"name": "Cotton T-shirts", "image": "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=400&auto=format&fit=crop&q=80"},
            {"name": "Casual sneakers", "image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&auto=format&fit=crop&q=80"},
            {"name": "Analog watches", "image": "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=400&auto=format&fit=crop&q=80"},
            {"name": "Polarized sunglasses", "image": "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&auto=format&fit=crop&q=80"},
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
