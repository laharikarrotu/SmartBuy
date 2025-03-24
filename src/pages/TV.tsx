import React from 'react';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import './TV.scss';

const TVProducts = [
  {
    id: 5,
    name: "LG C3 65-inch OLED TV",
    sizes: "4 sizes",
    reviews: 1253,
    price: 1799.99,
    image: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6535/6535929_sd.jpg"
  },
  {
    id: 6,
    name: "Samsung QN65S95B 65-inch OLED TV",
    sizes: "3 sizes",
    reviews: 892,
    price: 1699.99,
    image: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6505/6505910_sd.jpg"
  },
  {
    id: 7,
    name: "Sony A80K 65-inch OLED TV",
    sizes: "3 sizes",
    reviews: 756,
    price: 1899.99,
    image: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6505/6505931_sd.jpg"
  },
  {
    id: 8,
    name: "TCL 65-inch Q7 QLED TV",
    sizes: "4 sizes",
    reviews: 445,
    price: 799.99,
    image: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6505/6505140_sd.jpg"
  }
];

const TVDeals = [
  {
    id: 1,
    title: "OLED TV deals",
    label: "OLED deals",
    background: "#0055a6"
  },
  {
    id: 2,
    title: "QLED TV\ndeals",
    label: "QLED deals",
    background: "#0055a6"
  },
  {
    id: 3,
    title: "4K TV\ndeals",
    label: "4K TV deals",
    background: "#0055a6"
  },
  {
    id: 4,
    title: "Gaming\nTV deals",
    label: "Gaming TV deals",
    background: "#0055a6"
  },
  {
    id: 5,
    title: "Smart TV\ndeals",
    label: "Smart TV deals",
    background: "#0055a6"
  },
  {
    id: 6,
    title: "Home\nTheater\ndeals",
    label: "Home Theater deals",
    background: "#0055a6"
  }
];

const TV: React.FC = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleProductClick = (product: any) => {
    navigate(`/product/${product.id}`, { 
      state: { 
        product,
        category: 'tv'
      } 
    });
  };

  return (
    <div className="tv-page">
      <h1>TVs & Home Theater</h1>

      <div className="deals-section">
        <div className="deals-header">
          <h2>All TV deals</h2>
          <a href="#" className="shop-all">Shop all</a>
        </div>
        <div className="deals-grid">
          {TVDeals.map((deal) => (
            <div key={deal.id} className="deal-card">
              <div className="deal-circle">
                <span className="deal-text">{deal.title}</span>
              </div>
              <span className="deal-label">{deal.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="products-section">
        <h2>Featured TVs</h2>
        <div className="products-grid">
          {TVProducts.map((product) => (
            <div 
              key={product.id} 
              className="product-card"
              onClick={() => handleProductClick(product)}
            >
              <img src={product.image} alt={product.name} />
              <div className="product-info">
                <h3>{product.name}</h3>
                <div className="product-meta">
                  <span className="sizes">{product.sizes}</span>
                  <span className="reviews">{product.reviews} reviews</span>
                </div>
                <div className="price">${product.price}</div>
                <button 
                  className="add-to-cart-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart({
                      id: product.id.toString(),
                      name: product.name,
                      price: product.price,
                      image: product.image,
                      quantity: 1
                    });
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="promo-section">
        <div className="promo-card">
          <h3>SmartBuy Protection Plan</h3>
          <p>Get 2 years of protection including accidental damage coverage</p>
          <button>Learn More</button>
        </div>
        <div className="promo-card">
          <h3>Free TV Mounting</h3>
          <p>With qualifying TV purchase and SmartBuy Totaltech™ membership</p>
          <button>Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default TV; 