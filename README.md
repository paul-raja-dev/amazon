# Amazon E-Commerce Clone 🛒

An e-commerce web application replicating the Amazon India desktop user experience. Built with **React 19**, **Vite**, and **Vanilla CSS** on the frontend, powered by a **FastAPI** backend with **PostgreSQL** and **SQLAlchemy (Asyncpg)**.

---

## 📸 UI Preview

![Amazon Clone Preview](./docs/screenshot.png)

---

## ✨ Features

- **Iconic Amazon Header & Navigation**:
  - Full Amazon.in branding with search category dropdown selector and query input.
  - Delivery location indicator (*"Delivering to Chennai 600001"*).
  - Language picker, Account & Lists menu, Returns & Orders, and dynamic Cart item counter badge.
  - Secondary navigation bar with quick department links (*Fresh, Amazon miniTV, Best Sellers, Mobiles, Today's Deals*).

- **Full-Width Hero Promotional Carousel**:
  - Responsive full-width image slides with automatic cycling and pause-on-hover.
  - Interactive previous/next slide arrow controls and slide dot indicators.
  - Amazon-signature bottom gradient mask that seamlessly blends into the `#eaeded` background.

- **2x2 Curated Category Cards Grid**:
  - Multi-column grid overlapping the hero banner on desktop.
  - 2x2 thumbnail grid inside each category card (*Appliances, Echo & Fire TV, Audio & Headphones, Fashion, etc.*).
  - Hover zoom animations and direct category filtering links.

- **Department & Filter Pills Bar**:
  - Horizontal scrollable quick-filter chips for instant category filtering.

- **Product Showcase & Deal Rails**:
  - Badged products (*Best Seller*, *Amazon's Choice*, *Limited Deal*, *40% Off*).
  - Indian Rupee (₹) currency formatting, star ratings with review counts, and Prime delivery badges.
  - Real-time **Add to Cart** with animated toast notifications.

- **Async FastAPI Backend & PostgreSQL**:
  - High-performance asynchronous REST API powered by SQLAlchemy ORM and Asyncpg.
  - Dynamic endpoints for products, category cards, and shopping cart sessions.
  - One-command database seed script.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19, Vite, Vanilla CSS |
| **Backend** | FastAPI, Uvicorn, Python 3.12 |
| **Database** | PostgreSQL, SQLAlchemy 2.0 (AsyncIO), asyncpg |
| **Styling** | Amazon Ember design system, Custom Vanilla CSS |

---

## 📁 Project Structure

```text
amazon/
├── database.py              # Async PostgreSQL engine & session configuration
├── models.py                # SQLAlchemy models (Product, CategoryCard)
├── main.py                  # FastAPI server with REST API routes
├── seed.py                  # Database seed script for products & category cards
├── docs/
│   └── screenshot.png       # Application UI screenshot
├── frontend/
│   ├── index.html           # HTML entry point
│   ├── vite.config.js       # Vite configuration
│   ├── package.json         # Frontend dependencies & scripts
│   └── src/
│       ├── main.jsx         # React application root mount
│       ├── App.jsx          # Main application page with dynamic API state
│       ├── api.js           # Fetch API service layer
│       ├── index.css        # Global styles and layout grids
│       └── components/
│           ├── Header.jsx         # Sticky top nav, search bar, & subnav
│           ├── Header.css
│           ├── HeroBanner.jsx     # Full-width carousel banner
│           ├── HeroBanner.css
│           ├── CategoryCard.jsx   # 2x2 white category cards
│           ├── CategoryCard.css
│           ├── ProductCard.jsx    # Product card with ratings & prices
│           ├── ProductCard.css
│           ├── ProductSection.jsx # Grid sections for products & rails
│           ├── ProductSection.css
│           ├── Footer.jsx         # Amazon footer with multi-column links
│           └── Footer.css
└── README.md                # Project documentation
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description | Query Parameters |
|---|---|---|---|
| `GET` | `/api/products` | Retrieve all products | `category`, `search`, `badge` |
| `GET` | `/api/products/{id}` | Retrieve a single product by ID | - |
| `GET` | `/api/categories` | Retrieve all 2x2 category cards | - |
| `GET` | `/api/cart` | Get current shopping cart items & count | - |
| `POST` | `/api/cart` | Add an item to the shopping cart | Body: `{"product_id": int}` |
| `DELETE` | `/api/cart/{id}` | Remove an item from the cart | - |

---

## 🚀 Getting Started

### 1. Prerequisites
- **Python 3.12+**
- **Node.js 18+** & **npm**
- **PostgreSQL** running locally on port `5432`

### 2. Backend Setup
1. Create and activate a Python virtual environment:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

2. Install Python dependencies:
   ```bash
   pip install fastapi uvicorn sqlalchemy asyncpg pydantic
   ```

3. Ensure your PostgreSQL database `amazon` exists, then populate it with seed data:
   ```bash
   python seed.py
   ```

4. Start the FastAPI server:
   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```
   API Docs available at: `http://localhost:8000/docs`

### 3. Frontend Setup
1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```

4. Open `http://localhost:5173` in your browser.

---

## 📜 License

This project is open-source and built for educational and demonstration purposes.
