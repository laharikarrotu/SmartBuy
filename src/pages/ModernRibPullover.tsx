import { useState } from 'react';
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

export default function ModernRibPullover(): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, loginWithRedirect, user } = useAuth0();
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('Black');
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { originalPrice = 44.95, discountedPrice = 17.00 } = location.state || {};

  const product = {
    id: '556909974',
    name: "Modern Rib Half-Zip Pullover",
    status: "Really big deal",
    colors: ["Black", "White", "Navy"],
    originalPrice: originalPrice,
    discountedPrice: discountedPrice,
    rating: 4.7,
    reviewCount: 156,
    images: [
      "https://www.gap.com/webcontent/0056/909/974/cn56909974.jpg",
      "https://www.gap.com/webcontent/0056/746/603/cn56746603.jpg",
    ]
  };

  const sizes = [
    { label: 'XS', available: true },
    { label: 'S', available: true },
    { label: 'M', available: true },
    { label: 'L', available: true },
    { label: 'XL', available: true },
    { label: 'XXL', available: true }
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
        Women / Tops / Pullovers
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
            <label>Color: {selectedColor}</label>
            <div className="color-options">
              {product.colors.map(color => (
                <button
                  key={color}
                  className={`color-option ${selectedColor === color ? 'selected' : ''}`}
                  onClick={() => setSelectedColor(color)}
                >
                  {color}
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