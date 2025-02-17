import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth0 } from '@auth0/auth0-react';
import './ProductDetail.scss';

// Define the product data structure
const productData = [
  {
    id: 1,
    name: "Purina Pro Plan Sensitive Skin & Stomach Adult Dry Dog Food",
    sizes: "4 sizes",
    reviews: 2693,
    price: 89.99,
    image: "https://s7d2.scene7.com/is/image/PetSmart/5339575?$sclp-prd-main_large$"
  },
  {
    id: 2,
    name: "Hill's® Science Diet® Sensitive Stomach & Skin Adult Dry Dog Food",
    sizes: "4 sizes",
    reviews: 768,
    price: 83.99,
    image: "https://s7d2.scene7.com/is/image/PetSmart/5154856?$sclp-prd-main_large$"
  },
  {
    id: 3,
    name: "Blue Buffalo® Life Protection Formula™ Adult Dry Dog Food",
    sizes: "5 sizes",
    reviews: 937,
    price: 64.99,
    image: "https://s7d2.scene7.com/is/image/PetSmart/5066968?$sclp-prd-main_large$"
  },
  {
    id: 4,
    name: "Royal Canin Size Health Nutrition Small Breed Adult Dry Dog Food",
    sizes: "2 sizes",
    reviews: 760,
    price: 59.99,
    image: "https://s7d2.scene7.com/is/image/PetSmart/5173207?$sclp-prd-main_large$"
  }
];

const ProductDetail: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { addToCart } = useCart();
  const { isAuthenticated, loginWithPopup } = useAuth0();
  
  // Get product from location state or find by ID
  const productFromState = location.state?.product;
  const productFromId = productData.find(p => p.id === Number(id));
  const product = productFromState || productFromId;
  
  const [selectedSize, setSelectedSize] = useState('34 Lb');
  const [quantity, setQuantity] = useState(1);
  const [showRewardsPrompt, setShowRewardsPrompt] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [returnFromAuth, setReturnFromAuth] = useState(false);

  const breadcrumbs = ['Dog', 'Food', 'Dry Food'];

  // Redirect if product not found
  useEffect(() => {
    if (!product) {
      navigate('/dog');
    }
  }, [product, navigate]);

  // Add effect to handle auth state changes
  useEffect(() => {
    if (isAuthenticated && returnFromAuth) {
      setFadeOut(true);
      setTimeout(() => {
        setFadeOut(false);
        setReturnFromAuth(false);
      }, 100); // Adjust timing as needed
    }
  }, [isAuthenticated, returnFromAuth]);

  // Update the handleRewardsResponse function
  const handleRewardsResponse = async (isRewardsMember: boolean) => {
    setShowRewardsPrompt(false);
    
    if (isRewardsMember) {
      setReturnFromAuth(true);
      await loginWithPopup();
    }
  };

  // Show rewards prompt after delay
  useEffect(() => {
    if (!isAuthenticated) {
      const timer = setTimeout(() => {
        setFadeOut(true);
        
        const fadeStartEvent = new CustomEvent('rewardsPromptFade', {
          detail: { action: 'start' }
        });
        document.dispatchEvent(fadeStartEvent);
        
        setTimeout(() => {
          setShowRewardsPrompt(true);
          const promptShowEvent = new CustomEvent('rewardsPromptShow', {
            detail: { visible: true }
          });
          document.dispatchEvent(promptShowEvent);
        }, 300);
      }, 5000);

      return () => {
        clearTimeout(timer);
        setShowRewardsPrompt(false);
        const cleanupEvent = new CustomEvent('rewardsPromptShow', {
          detail: { visible: false }
        });
        document.dispatchEvent(cleanupEvent);
      };
    }
  }, [isAuthenticated]);

  if (!product) {
    return null; // or a loading spinner
  }

  return (
    <div className="product-detail-page">
      {showRewardsPrompt && (
        <div className="rewards-prompt-overlay">
          <div className="rewards-prompt">
            <h2>Are you a rewards member?</h2>
            <div className="rewards-buttons">
              <button onClick={() => handleRewardsResponse(true)}>Yes</button>
              <button onClick={() => handleRewardsResponse(false)}>No</button>
            </div>
          </div>
        </div>
      )}
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

      <div className={`product-container ${fadeOut ? 'fade-out' : ''}`}>
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

            </div>
          </div>

          <div className="button-group">
            <button 
              className="add-to-cart-btn" 
              onClick={() => addToCart({...product, quantity})}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                width: '100%',
                padding: '14px 28px',
                background: '#0055a6',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 8px rgba(0, 85, 166, 0.25)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                const btn = e.currentTarget;
                btn.style.background = '#004485';
                btn.style.boxShadow = '0 4px 12px rgba(0, 85, 166, 0.35)';
                btn.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                const btn = e.currentTarget;
                btn.style.background = '#0055a6';
                btn.style.boxShadow = '0 2px 8px rgba(0, 85, 166, 0.25)';
                btn.style.transform = 'translateY(0)';
              }}
              onMouseDown={(e) => {
                const btn = e.currentTarget;
                btn.style.transform = 'translateY(1px)';
                btn.style.boxShadow = '0 2px 6px rgba(0, 85, 166, 0.2)';
              }}
            >
              <span style={{ fontSize: '1.2rem' }}>🛒</span>
              <span>Add to cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 