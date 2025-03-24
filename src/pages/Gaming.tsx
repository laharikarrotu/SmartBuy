import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import './Gaming.scss';

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
    id: "console-1",
    name: "SmartPlay 5",
    price: 499.99,
    image: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6509/6509942_sd.jpg",
    description: "Next-Gen Gaming Console - 1TB SSD",
    specs: {
      storage: "1TB SSD",
      resolution: "4K/8K",
      fps: "Up to 120fps",
      features: "Ray Tracing",
      connectivity: "Wi-Fi 6"
    },
    reviews: {
      rating: 4.8,
      count: 456
    }
  },
  {
    id: "console-2",
    name: "SmartBox Series X",
    price: 549.99,
    image: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6509/6509942_sd.jpg",
    description: "Premium Gaming Console - 1TB Custom SSD",
    specs: {
      storage: "1TB Custom SSD",
      resolution: "True 4K",
      fps: "Up to 120fps",
      features: "Quick Resume",
      connectivity: "HDMI 2.1"
    },
    reviews: {
      rating: 4.9,
      count: 389
    }
  }
];

const Gaming: React.FC = () => {
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
    <div className="gaming-page">
      <div className="hero-section">
        <h1>Gaming</h1>
        <p>Level up your gaming experience with the latest consoles and accessories</p>
      </div>

      <div className="deals-section">
        <h2>Featured Deals</h2>
        <div className="deals-grid">
          <div className="deal-card">
            <h3>Console Bundle</h3>
            <p>Save $100 on select console bundles</p>
          </div>
          <div className="deal-card">
            <h3>Trade & Save</h3>
            <p>Get extra credit when you trade in your old console</p>
          </div>
        </div>
      </div>

      <div className="products-section">
        <h2>Popular Consoles</h2>
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
            <h3>Consoles</h3>
          </div>
          <div className="category-card">
            <h3>Games</h3>
          </div>
          <div className="category-card">
            <h3>Controllers</h3>
          </div>
          <div className="category-card">
            <h3>Gaming Accessories</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gaming; 