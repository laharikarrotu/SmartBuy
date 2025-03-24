import React from 'react';
import { useCart } from '../contexts/CartContext';
import './Cameras.scss';

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
    id: "camera-1",
    name: "SmartCam Pro",
    price: 1299.99,
    image: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6505/6505727_sd.jpg",
    description: "Mirrorless Digital Camera - 24.2MP - 4K Video",
    specs: {
      sensor: "24.2MP Full-Frame",
      video: "4K/60fps",
      autofocus: "693-point AF",
      stabilization: "5-axis IBIS",
      connectivity: "Wi-Fi & Bluetooth"
    },
    reviews: {
      rating: 4.8,
      count: 245
    }
  },
  {
    id: "camera-2",
    name: "SmartCam Compact",
    price: 799.99,
    image: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6505/6505727_sd.jpg",
    description: "Compact Digital Camera - 20.1MP - Vlogger Kit",
    specs: {
      sensor: "20.1MP APS-C",
      video: "4K/30fps",
      autofocus: "425-point AF",
      screen: "Vari-angle LCD",
      features: "Content Creator Kit"
    },
    reviews: {
      rating: 4.6,
      count: 178
    }
  }
];

const Cameras: React.FC = () => {
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
    <div className="cameras-page">
      <div className="hero-section">
        <h1>Cameras & Photography</h1>
        <p>Capture life's moments with professional quality cameras and accessories</p>
      </div>

      <div className="deals-section">
        <h2>Featured Deals</h2>
        <div className="deals-grid">
          <div className="deal-card">
            <h3>Lens Bundle</h3>
            <p>Save up to $300 on lens bundles</p>
          </div>
          <div className="deal-card">
            <h3>Creator Kit</h3>
            <p>Free accessories with select cameras</p>
          </div>
        </div>
      </div>

      <div className="products-section">
        <h2>Popular Cameras</h2>
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
            onClick={() => window.location.href = '/cameras/mirrorless'}
            aria-label="Browse Mirrorless Cameras"
          >
            <h3>Mirrorless Cameras</h3>
          </button>
          <button 
            className="category-card"
            onClick={() => window.location.href = '/cameras/dslr'}
            aria-label="Browse DSLR Cameras"
          >
            <h3>DSLR Cameras</h3>
          </button>
          <button 
            className="category-card"
            onClick={() => window.location.href = '/cameras/lenses'}
            aria-label="Browse Camera Lenses"
          >
            <h3>Lenses</h3>
          </button>
          <button 
            className="category-card"
            onClick={() => window.location.href = '/cameras/accessories'}
            aria-label="Browse Camera Accessories"
          >
            <h3>Camera Accessories</h3>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cameras; 