import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import './ProductDetail.scss';

interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  color: string;
  size: string;
  quantity: number;
  image: string;
}

export default function StrawPanamaHat(): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, loginWithRedirect, user } = useAuth0();
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('Natural');
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { originalPrice = 49.95, discountedPrice = 44.00 } = location.state || {};

  const product = {
    id: '557401246',
    name: "Straw Panama Hat",
    status: "Limited availability",
    colors: ["Natural"],
    originalPrice: originalPrice,
    discountedPrice: discountedPrice,
    rating: 4.3,
    reviewCount: 89,
    images: [
      "https://www.gap.com/webcontent/0057/401/246/cn57401246.jpg",
      "https://www.gap.com/webcontent/0057/400/235/cn57400235.jpg",
      // Add more images as needed
    ]
  };

  const sizes = [
    { label: 'S/M', available: true },
    { label: 'L/XL', available: true }
  ];

  const handleaddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }

    const cartItem: CartItem = {
      id: product.id,
      name: product.name,
      price: product.discountedPrice,
      originalPrice: product.originalPrice,
      color: selectedColor,
      size: selectedSize,
      quantity: quantity,
      image: product.images[0]
    };

    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    localStorage.setItem('cart', JSON.stringify([...existingCart, cartItem]));

    navigate('/cart');
  };

  return (
    <div className="product-detail-container">
      <div className="breadcrumb">
        Accessories / Hats
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
            onClick={handleaddToCart}
            disabled={!selectedSize}
          >
            Add to cart
          </button>

          <div className="product-details">
            <button className="accordion-btn">Product details</button>
            <button className="accordion-btn">Size & fit</button>
            <button className="accordion-btn">Shipping & returns</button>
          </div>
        </div>
      </div>
    </div>
  );
} 