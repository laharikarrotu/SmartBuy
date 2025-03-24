import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import './CellPhones.scss';

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
    id: "phone-1",
    name: "SmartPhone Pro Max",
    price: 999.99,
    image: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6505/6505631_sd.jpg",
    description: "6.7\" 5G Smartphone - 256GB - Midnight Blue",
    specs: {
      display: "6.7\" OLED",
      storage: "256GB",
      camera: "48MP Triple Camera",
      battery: "4500mAh",
      processor: "Latest Gen Chip"
    },
    reviews: {
      rating: 4.7,
      count: 342
    }
  },
  {
    id: "phone-2",
    name: "SmartPhone Lite",
    price: 699.99,
    image: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6505/6505631_sd.jpg",
    description: "6.1\" 5G Smartphone - 128GB - Silver",
    specs: {
      display: "6.1\" OLED",
      storage: "128GB",
      camera: "12MP Dual Camera",
      battery: "3500mAh",
      processor: "Fast Chip"
    },
    reviews: {
      rating: 4.5,
      count: 256
    }
  }
];

const CellPhones: React.FC = () => {
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
    <div className="cell-phones-page">
      <div className="hero-section">
        <h1>Cell Phones & Accessories</h1>
        <p>Stay connected with the latest smartphones and accessories</p>
      </div>

      <div className="deals-section">
        <h2>Featured Deals</h2>
        <div className="deals-grid">
          <div className="deal-card">
            <h3>Trade-In Offer</h3>
            <p>Get up to $800 off with eligible trade-in</p>
          </div>
          <div className="deal-card">
            <h3>Free Accessories</h3>
            <p>Get a free case & screen protector with any phone</p>
          </div>
        </div>
      </div>

      <div className="products-section">
        <h2>Popular Phones</h2>
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
            <h3>Smartphones</h3>
          </div>
          <div className="category-card">
            <h3>Cases & Protection</h3>
          </div>
          <div className="category-card">
            <h3>Chargers & Cables</h3>
          </div>
          <div className="category-card">
            <h3>Screen Protectors</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CellPhones; 