import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import './BabyBootJean.scss';

interface Size {
  label: string;
  available: boolean;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  color: string;
  size: string;
  fit: string;
  quantity: number;
  image: string;
}

export const BabyBootJean = () => {
  const navigate = useNavigate();
  const { isAuthenticated, loginWithPopup, user } = useAuth0();
  const [selectedFit, setSelectedFit] = useState('Regular');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedInseam, setSelectedInseam] = useState('');
  const [showRewardsPrompt, setShowRewardsPrompt] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [showAddedNotification, setShowAddedNotification] = useState(false);
  const [isAddingToBag, setIsAddingToBag] = useState(false);

  const handleRewardsResponse = async (isRewardsMember: boolean) => {
    // Immediately hide prompt to prevent multiple clicks
    setShowRewardsPrompt(false);
    
    if (isRewardsMember) {
      setFadeOut(true);
      await loginWithPopup();
    } else {
      // Reset fade out when user clicks "No"
      setFadeOut(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      const timer = setTimeout(() => {
        setFadeOut(true);  // This triggers the fade animation
        
        // Dispatch custom event for fade start
        const fadeStartEvent = new CustomEvent('rewardsPromptFade', {
          detail: { action: 'start' }
        });
        document.dispatchEvent(fadeStartEvent);
        
        // Show the prompt after fade
        setTimeout(() => {
          setShowRewardsPrompt(true);
          // Dispatch event for prompt shown
          const promptShowEvent = new CustomEvent('rewardsPromptShow', {
            detail: { visible: true }
          });
          document.dispatchEvent(promptShowEvent);
        }, 300);
      }, 5000);

      return () => {
        clearTimeout(timer);
        setShowRewardsPrompt(false);
        // Cleanup events
        const cleanupEvent = new CustomEvent('rewardsPromptShow', {
          detail: { visible: false }
        });
        document.dispatchEvent(cleanupEvent);
      };
    } else {
      // Reset fade out when user is authenticated
      setFadeOut(false);
      setShowRewardsPrompt(false);
    }
  }, [isAuthenticated]);

  // Pre-saved preferences for authenticated users
  useEffect(() => {
    if (isAuthenticated) {
      setSelectedFit('Tall');
      setSelectedSize('29');
      setSelectedInseam('Regular');
    }
  }, [isAuthenticated]);

  const product = {
    id: '521631032000',
    name: "Mid Rise Baby Boot Jean",
    status: "50% off: limited time",
    colors: ["Black"],
    originalPrice: 79.95,
    discountedPrice: 31.00,
    rating: 4.5,
    reviewCount: 312,
    images: [
      "https://www.gap.com/webcontent/0054/884/978/cn54884978.jpg",
      "https://www.gap.com/webcontent/0054/884/047/cn54884047.jpg",
      "https://www.gap.com/webcontent/0054/884/254/cn54884254.jpg",
      "https://www.gap.com/webcontent/0054/884/246/cn54884246.jpg"
    ]
  };

  const fits = ['Regular', 'Tall', 'Petite'];
  const sizes: Size[] = [
    { label: '24', available: true },
    { label: '25', available: true },
    { label: '26', available: true },
    { label: '27', available: true },
    { label: '28', available: true },
    { label: '29', available: true },
    { label: '30', available: true },
    { label: '31', available: true },
    { label: '32', available: true },
    { label: '33', available: true },
    { label: '34', available: true },
    { label: '35', available: true }
  ];

  const handleAddToCart = () => {
    if (!selectedSize) return;

    const cartItem: CartItem = {
      id: product.id,
      name: product.name,
      price: product.discountedPrice,
      originalPrice: product.originalPrice,
      color: 'Black',
      size: selectedSize,
      fit: selectedFit,
      quantity: quantity,
      image: product.images[0]
    };

    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    localStorage.setItem('cart', JSON.stringify([...existingCart, cartItem]));

    setShowAddedNotification(true);
    
    // Dispatch custom event for AI to respond
    const addToCartEvent = new CustomEvent('itemAddedToCart', {
      detail: { isAuthenticated }
    });
    document.dispatchEvent(addToCartEvent);

    setTimeout(() => {
      setShowAddedNotification(false);
    }, 2000);
  };

  const handleSignInClick = () => {
    loginWithPopup();
  };

  const handleJoinClick = () => {
    loginWithPopup({
      authorizationParams: {
        screen_hint: 'signup'
      }
    });
  };

  return (
    <>
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
      <div className={`product-detail-container ${fadeOut ? 'fade-out' : ''}`}>
        <div className="breadcrumb">
          Women / Casual Jeans
        </div>
        
        <div className="product-layout">
          <div className="product-images">
            <div className="main-image">
              <img src={product.images[currentImageIndex]} alt={product.name} />
            </div>
            <div className="thumbnail-grid">
              {product.images.map((image, index) => (
                <div 
                  key={index} 
                  className={`thumbnail ${currentImageIndex === index ? 'active' : ''}`}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <img src={image} alt={`${product.name} view ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>

          <div className="product-info">
            <h1 className="product-title">{product.name}</h1>
            
            <div className="product-pricing">
              <span className="sale-price">${product.discountedPrice}</span>
              <span className="original-price">${product.originalPrice}</span>
              <span className="rating">
                {'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5-Math.floor(product.rating))}
                <span className="review-count">({product.reviewCount})</span>
              </span>
            </div>

            <div className="product-status">{product.status}</div>

            <div className="color-selection">
              <label>Color</label>
              <div className="color-options">
                {product.colors.map(color => (
                  <div key={color} className="color-option selected">
                    <div className="color-swatch" style={{ backgroundColor: color.toLowerCase() }} />
                    <span>{color}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="fit-selection">
              <label>Fit</label>
              <div className="fit-options">
                {fits.map(fit => (
                  <button
                    key={fit}
                    className={`fit-option ${selectedFit === fit ? 'selected' : ''}`}
                    onClick={() => setSelectedFit(fit)}
                  >
                    {fit}
                  </button>
                ))}
              </div>
            </div>

            <div className="size-selection">
              <div className="size-header">
                <label>Size</label>
                <a href="#" className="size-guide">Size guide</a>
              </div>
              <div className="size-options">
                {sizes.map(size => (
                  <button
                    key={size.label}
                    className={`size-option ${selectedSize === size.label ? 'selected' : ''} ${!size.available ? 'disabled' : ''}`}
                    onClick={() => size.available && setSelectedSize(size.label)}
                    disabled={!size.available}
                  >
                    {size.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="inseam-selection">
              <label>Inseam</label>
              <div className="size-options">
                {['Short', 'Regular', 'Long'].map(inseam => (
                  <button
                    key={inseam}
                    className={`size-option ${selectedInseam === inseam ? 'selected' : ''}`}
                    onClick={() => setSelectedInseam(inseam)}
                  >
                    {inseam}
                  </button>
                ))}
              </div>
            </div>

            <div className="quantity-selector">
              <label>Quantity </label>
              <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
                {[1,2,3,4,5,6,7,8,9,10].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>

            <button 
              className="add-to-bag"
              onClick={handleAddToCart}
              disabled={!selectedSize}
            >
              Add to cart
            </button>

            <div className="shipping-info">
              <div className="shipping-option">
                <input type="radio" checked readOnly />
                <span>Free fast shipping</span>
                {isAuthenticated ? (
                  <p>Free shipping included with your Rewards membership, {user?.name}!</p>
                ) : (
                  <p>On $50+ for Rewards Members <a href="#" onClick={handleSignInClick}>sign in</a> or <a href="#" onClick={handleJoinClick}>join</a></p>
                )}
              </div>
              <div className="shipping-option">
                <input type="radio" />
                <span>Free pickup</span>
                <p>Order by 2pm to get today. AVALON 2150 AVALON BLVD.</p>
              </div>
            </div>

            <div className="product-details">
              <button className="accordion-btn">Fit & sizing</button>
              <button className="accordion-btn">Product details</button>
              <button className="accordion-btn">Fabric & care</button>
              <button className="accordion-btn">Shipping & returns</button>
            </div>
          </div>
        </div>
      </div>
      {showAddedNotification && (
        <div className="add-to-bag-notification">
          <div className="notification-content">
            <div className="notification-icon">✓</div>
            <div className="notification-text">
              <div className="notification-title">Added to Bag</div>
              <div className="notification-details">{product.name} - Size {selectedSize}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}; 