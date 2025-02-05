import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import './ProductDetail.scss';
import { useLiveAPIContext } from '../contexts/LiveAPIContext';

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

export default function GapLogoTote(): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, loginWithRedirect, user } = useAuth0();
  const [selectedColor, setSelectedColor] = useState('Canvas');
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { originalPrice = 49.95, discountedPrice } = location.state || {};
  const { client, connected } = useLiveAPIContext();

  const product = {
    id: '557480176',
    name: "Gap Logo Tote Bag",
    status: "New Arrival",
    colors: ["Canvas"],
    originalPrice: originalPrice,
    discountedPrice: discountedPrice,
    rating: 4.8,
    reviewCount: 45,
    images: [
      "https://www.gap.com/webcontent/0057/480/176/cn57480176.jpg",
      "https://www.gap.com/webcontent/0057/480/176/cn57480176.jpg",
      // Add more images as needed
    ]
  };

  const handleAddToCart = () => {
    const cartItem: CartItem = {
      id: product.id,
      name: product.name,
      price: product.discountedPrice || product.originalPrice,
      originalPrice: product.originalPrice,
      color: selectedColor,
      size: 'One Size',
      quantity: quantity,
      image: product.images[0]
    };

    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    localStorage.setItem('cart', JSON.stringify([...existingCart, cartItem]));

    // AI Response
    if (client && connected) {
      if (isAuthenticated) {
        client.send([
          {
            text: "Would you like to check out some personalized items with 10% off that I've picked just for you?"
          }
        ]);
      } else {
        client.send([
          {
            text: "Great! I've added the tote bag to your cart. Would you like to continue shopping?"
          }
        ]);
      }
    }

    navigate('/cart');
  };

  return (
    <div className="product-detail-container">
      <div className="breadcrumb">
        Accessories / Bags
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
            {product.discountedPrice ? (
              <>
                <span className="sale-price">${product.discountedPrice.toFixed(2)}</span>
                <span className="original-price">${product.originalPrice.toFixed(2)}</span>
              </>
            ) : (
              <span className="sale-price">${product.originalPrice.toFixed(2)}</span>
            )}
            <span className="rating">
              {'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5-Math.floor(product.rating))}
              <span className="review-count">({product.reviewCount})</span>
            </span>
          </div>

          <div className="product-status">{product.status}</div>

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
          >
            Add to cart
          </button>

          <div className="product-details">
            <button className="accordion-btn">Product details</button>
            <button className="accordion-btn">Materials & care</button>
            <button className="accordion-btn">Shipping & returns</button>
          </div>
        </div>
      </div>
    </div>
  );
} 