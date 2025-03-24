import React from 'react';
import { useCart } from '../contexts/CartContext';
import './SmartHome.scss';

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
    id: "smart-home-1",
    name: "SmartBuy Hub Pro",
    price: 249.99,
    image: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6373/6373995_sd.jpg",
    description: "Smart Home Hub with Voice Control & Display",
    specs: {
      display: "7-inch HD Touchscreen",
      assistant: "Multi-Assistant Compatible",
      connectivity: "Wi-Fi 6, Bluetooth 5.0, Zigbee",
      features: "Smart Home Controller",
      power: "Built-in Battery Backup"
    },
    reviews: {
      rating: 4.7,
      count: 312
    }
  },
  {
    id: "smart-home-2",
    name: "SmartBuy Doorbell",
    price: 179.99,
    image: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6373/6373995_sd.jpg",
    description: "Video Doorbell with Night Vision & Two-Way Audio",
    specs: {
      resolution: "2K HDR Video",
      audio: "Two-Way with Noise Cancellation",
      vision: "Color Night Vision",
      storage: "Cloud + Local Storage",
      power: "Battery or Hardwired"
    },
    reviews: {
      rating: 4.5,
      count: 245
    }
  }
];

const SmartHome: React.FC = () => {
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
    <div className="smart-home-page">
      <div className="hero-section">
        <h1>Smart Home & Security</h1>
        <p>Transform your home with intelligent devices and automation solutions</p>
      </div>

      <div className="deals-section">
        <h2>Featured Deals</h2>
        <div className="deals-grid">
          <div className="deal-card">
            <h3>Smart Security Bundle</h3>
            <p>Save up to $150 on security packages</p>
          </div>
          <div className="deal-card">
            <h3>Smart Lighting Kit</h3>
            <p>Free bridge with select smart bulb packs</p>
          </div>
        </div>
      </div>

      <div className="products-section">
        <h2>Popular Smart Home Devices</h2>
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
                  aria-label={`Add ${product.name} to cart`}
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
          <button 
            className="category-card"
            onClick={() => window.location.href = '/cameras'}
            aria-label="Browse Security Cameras"
          >
            <h3>Security Cameras</h3>
          </button>
          <button 
            className="category-card"
            onClick={() => window.location.href = '/smart-home/lighting'}
            aria-label="Browse Smart Lighting"
          >
            <h3>Smart Lighting</h3>
          </button>
          <button 
            className="category-card"
            onClick={() => window.location.href = '/smart-home/speakers'}
            aria-label="Browse Smart Speakers"
          >
            <h3>Smart Speakers</h3>
          </button>
          <button 
            className="category-card"
            onClick={() => window.location.href = '/smart-home/automation'}
            aria-label="Browse Home Automation"
          >
            <h3>Home Automation</h3>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SmartHome; 