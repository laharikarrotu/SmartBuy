import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth0 } from '@auth0/auth0-react';
import './PersonalizedProductDetail.scss';

const PersonalizedProductDetail: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth0();
  const [selectedSize, setSelectedSize] = useState('34 Lb');
  const [quantity, setQuantity] = useState(1);
  
  // Get product from location state
  const product = location.state?.product;
  
  // Redirect if product not found or if not accessed through personalized page
  React.useEffect(() => {
    if (!product || !location.state?.isPersonalized) {
      navigate('/personalized');
    }
  }, [product, navigate, location.state]);

  if (!product) {
    return null;
  }

  const breadcrumbs = ['Dog', 'Food', 'Personalized'];

  return (
    <div className="product-detail-page personalized">
      {/* Simplified Promo Banner */}
      <div className="promo-banner">
        <a href="#">10% IN SAVINGS (5X pts) thru 2/9* ›</a>
      </div>

      {/* Combined Breadcrumb and Personalized Banner */}
      <div className="personalized-banner">
        <span>✨ Personalized for Your Pet</span>
      </div>

      <div className="product-container">
        {/* Optimized Image Section */}
        <div className="product-images">
          <div className="main-image">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="thumbnail-list">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="thumbnail">
                <img src={product.image} alt={product.name} />
              </div>
            ))}
          </div>
        </div>

        {/* Optimized Product Info */}
        <div className="product-info">
          <div className="product-header">
            <h1>{product.name}</h1>
          </div>

          <div className="price-section">
            <div className="price">${product.price}</div>
            <div className="autoship-price">
              ${(product.price * (1 - product.autoshipDiscount/100)).toFixed(2)} with Autoship
            </div>
          </div>

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

          <div className="quantity-selector">
            <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
              {[...Array(5)].map((_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>
          </div>

          <div className="button-group">
            <button 
              className="add-to-cart-btn"
              onClick={() => addToCart({
                id: product.id.toString(),
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: quantity
              })}
            >
              <span className="cart-icon">🛒</span>
              <span className="btn-text">Add to Cart</span>
            </button>
            <button className="autoship-btn">
              Autoship & Save {product.autoshipDiscount}%
            </button>
          </div>

          <div className="personalized-features">
            <h3>Why We Recommend This</h3>
            <div className="features-list">
              <div className="feature-item">✓ Matches your pet's needs</div>
              <div className="feature-item">✓ Popular with similar pets</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalizedProductDetail; 