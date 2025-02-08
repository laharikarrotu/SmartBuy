import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import './ProductDetail.scss';

const ProductDetail: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { product } = location.state || {};
  const [selectedSize, setSelectedSize] = useState('34 Lb');
  const [quantity, setQuantity] = useState(1);

  const breadcrumbs = ['Dog', 'Food', 'Dry Food'];

  return (
    <div className="product-detail-page">
      {/* Top Promo Banner */}
      <div className="promo-banner">
        <a href="#">Get 10% IN SAVINGS (5X pts) on products, services or donations thru 2/9* ›</a>
      </div>

      {/* Breadcrumb Navigation */}
      <div className="breadcrumb">
        {breadcrumbs.map((crumb, index) => (
          <React.Fragment key={index}>
            <span>{crumb}</span>
            {index < breadcrumbs.length - 1 && <span className="separator">/</span>}
          </React.Fragment>
        ))}
      </div>

      <div className="product-container">
        {/* Left Column - Images */}
        <div className="product-images">
          <div className="main-image">
            <img src={product.image} alt={product.name} />
            <span className="zoom-hint">Hover over image to zoom in</span>
          </div>
          <div className="thumbnail-list">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="thumbnail">
                <img src={product.image} alt={product.name} />
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Product Info */}
        <div className="product-info">
          <div className="product-header">
            <h1>{product.name}</h1>
            <button className="favorite-btn">♡</button>
          </div>

          <div className="brand">
            <span>Item #{product.id}</span>
            <div className="reviews">
              <span className="stars">★★★★½</span>
              <span className="count">{Math.abs(product.reviews)} reviews</span>
            </div>
          </div>

          <div className="price-section">
            <div className="price">${product.price}</div>
            <div className="afterpay">
              or 4 interest-free payments of ${(product.price / 4).toFixed(2)} with <span className="afterpay-logo">afterpay</span> ⓘ
            </div>
          </div>

          <div className="product-options">
            <div className="flavor">
              <h3>Flavor:</h3>
              <div className="option">Salmon & Rice</div>
            </div>

            <div className="size">
              <h3>Size: {selectedSize}</h3>
              <div className="size-options">
                {['6 Lb', '18 Lb', '34 Lb'].map((size) => (
                  <button 
                    key={size}
                    className={`size-btn ${selectedSize === size ? 'selected' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="promotions">
              <div className="promo-item">
                <span className="icon">🏷️</span>
                <span>5X points (10% back in savings) on merchandise, services, & donations.</span>
                <a href="#">Details</a>
              </div>
              <div className="promo-item">
                <span className="icon">💰</span>
                <span>EARN 5,000 points ($10 in future savings) when you spend $60+ on any dog food!</span>
                <a href="#">Details</a>
              </div>
            </div>

            <div className="pickup-section">
              <h3>Pick up in store</h3>
              <p>Most orders ready within 2 hours</p>
              <div className="store-info">
                <p>In stock at <strong>Melbourne</strong></p>
                <a href="#">Change store</a>
              </div>

              <div className="quantity-selector">
                <label>Quantity</label>
                <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
                  {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  ))}
                </select>
              </div>

              <div className="points-earned">
                <span className="icon">🏷️</span>
                Estimated {quantity * 599} points earned
              </div>

              <button className="add-to-cart-btn" onClick={() => addToCart({...product, quantity})}>
                Add to cart
              </button>

              <button className="delivery-btn">Same-day delivery</button>
              <button className="autoship-btn">Autoship & Save 35%</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 