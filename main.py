from fastapi import FastAPI, Depends, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from contextlib import asynccontextmanager

from database import get_db, init_db
from models import Product, CategoryCard


cart = {}
DEFAULT_SESSION = "default"


@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    yield


app = FastAPI(title="Amazon Clone API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:3000", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/products")
async def get_products(
    category: str = Query(None),
    search: str = Query(None),
    badge: str = Query(None),
    db: AsyncSession = Depends(get_db),
):
    query = select(Product)

    if category:
        query = query.where(Product.category == category)
    if badge:
        query = query.where(Product.badge == badge)
    if search:
        query = query.where(Product.title.ilike(f"%{search}%"))

    result = await db.execute(query)
    products = result.scalars().all()

    return [
        {
            "id": p.id,
            "title": p.title,
            "price": p.price,
            "original_price": p.original_price,
            "rating": p.rating,
            "reviews": p.reviews,
            "image": p.image,
            "badge": p.badge,
            "category": p.category,
        }
        for p in products
    ]


@app.get("/api/products/{product_id}")
async def get_product(product_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Product).where(Product.id == product_id))
    product = result.scalar_one_or_none()

    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    return {
        "id": product.id,
        "title": product.title,
        "price": product.price,
        "original_price": product.original_price,
        "rating": product.rating,
        "reviews": product.reviews,
        "image": product.image,
        "badge": product.badge,
        "category": product.category,
    }


@app.get("/api/categories")
async def get_categories(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(CategoryCard))
    cards = result.scalars().all()

    return [
        {
            "id": c.id,
            "title": c.title,
            "link_text": c.link_text,
            "items": c.items,
        }
        for c in cards
    ]


@app.get("/api/cart")
async def get_cart():
    items = cart.get(DEFAULT_SESSION, [])
    return {"items": items, "count": sum(i["quantity"] for i in items)}


@app.post("/api/cart")
async def add_to_cart(body: dict, db: AsyncSession = Depends(get_db)):
    product_id = body.get("product_id")
    if not product_id:
        raise HTTPException(status_code=400, detail="product_id is required")

    result = await db.execute(select(Product).where(Product.id == product_id))
    product = result.scalar_one_or_none()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    if DEFAULT_SESSION not in cart:
        cart[DEFAULT_SESSION] = []

    for item in cart[DEFAULT_SESSION]:
        if item["product_id"] == product_id:
            item["quantity"] += 1
            return {"message": "Quantity updated", "cart": cart[DEFAULT_SESSION]}

    cart[DEFAULT_SESSION].append({
        "product_id": product.id,
        "title": product.title,
        "price": product.price,
        "image": product.image,
        "quantity": 1,
    })

    return {"message": "Added to cart", "cart": cart[DEFAULT_SESSION]}


@app.put("/api/cart/{product_id}")
async def update_cart_quantity(product_id: int, body: dict):
    quantity = body.get("quantity", 1)
    if DEFAULT_SESSION not in cart:
        raise HTTPException(status_code=404, detail="Cart is empty")

    if quantity <= 0:
        cart[DEFAULT_SESSION] = [
            i for i in cart[DEFAULT_SESSION] if i["product_id"] != product_id
        ]
    else:
        for item in cart[DEFAULT_SESSION]:
            if item["product_id"] == product_id:
                item["quantity"] = quantity
                break

    return {"message": "Cart updated", "cart": cart[DEFAULT_SESSION]}


@app.delete("/api/cart/{product_id}")
async def remove_from_cart(product_id: int):
    if DEFAULT_SESSION not in cart:
        raise HTTPException(status_code=404, detail="Cart is empty")

    cart[DEFAULT_SESSION] = [
        i for i in cart[DEFAULT_SESSION] if i["product_id"] != product_id
    ]

    return {"message": "Removed from cart", "cart": cart[DEFAULT_SESSION]}