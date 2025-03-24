import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import './ComputersAndTablets.scss';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  specs: {
    [key: string]: string;
  };
  reviews: {
    rating: number;
    count: number;
  };
}

const products: Product[] = [
  {
    id: "laptop-1",
    name: "SmartBook Pro 15",
    price: 999.99,
    image: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6506/6506325_sd.jpg",
    description: "15.6\" Laptop - Intel Core i7 - 16GB Memory - 512GB SSD",
    specs: {
      processor: "Intel Core i7",
      memory: "16GB",
      storage: "512GB SSD",
      display: "15.6\" FHD (1920 x 1080)",
      os: "Windows 11"
    },
    reviews: {
      rating: 4.5,
      count: 128
    }
  },
  {
    id: "tablet-1",
    name: "SmartTab Ultra",
    price: 599.99,
    image: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6506/6506325_sd.jpg",
    description: "11\" Tablet - 256GB - With Smart Keyboard Support",
    specs: {
      processor: "A14 Bionic",
      storage: "256GB",
      display: "11\" Liquid Retina",
      battery: "Up to 10 hours"
    },
    reviews: {
      rating: 4.8,
      count: 256
    }
  }
];

const ComputersAndTablets: React.FC = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  };

  return (
    <div className="computers-tablets-page">
      <div className="hero-section">
        <h1>Computers & Tablets</h1>
        <p>Find the perfect device for work, play, and everything in between</p>
      </div>

      <div className="deals-section">
        <h2>Featured Deals</h2>
        <div className="deals-grid">
          <div className="deal-card">
            <h3>Student Discount</h3>
            <p>Save up to $200 on select laptops</p>
          </div>
          <div className="deal-card">
            <h3>Bundle & Save</h3>
            <p>Free accessories with tablet purchase</p>
          </div>
        </div>
      </div>

      <div className="products-section">
        <h2>Popular Products</h2>
        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="description">{product.description}</p>
                <div className="specs">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="spec-item">
                      <span className="spec-key">{key}:</span>
                      <span className="spec-value">{value}</span>
                    </div>
                  ))}
                </div>
                <div className="reviews">
                  <span className="rating">★ {product.reviews.rating}</span>
                  <span className="count">({product.reviews.count} reviews)</span>
                </div>
                <div className="price">${product.price}</div>
                <button 
                  className="add-to-cart-btn"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="categories-section">
        <h2>Shop by Category</h2>
        <div className="categories-grid">
          <div className="category-card">
            <h3>Laptops</h3>
          </div>
          <div className="category-card">
            <h3>Tablets</h3>
          </div>
          <div className="category-card">
            <h3>Desktop PCs</h3>
          </div>
          <div className="category-card">
            <h3>Accessories</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComputersAndTablets; 