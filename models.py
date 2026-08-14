from sqlalchemy import Column, Integer, String, Float, Text, JSON
from database import Base


class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(500), nullable=False)
    price = Column(Float, nullable=False)
    original_price = Column(Float, nullable=True)
    rating = Column(Float, default=0.0)
    reviews = Column(Integer, default=0)
    image = Column(Text, nullable=True)
    badge = Column(String(100), nullable=True)
    category = Column(String(100), nullable=True, index=True)


class CategoryCard(Base):
    __tablename__ = "category_cards"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(500), nullable=False)
    link_text = Column(String(100), default="See more")
    items = Column(JSON, nullable=False)
