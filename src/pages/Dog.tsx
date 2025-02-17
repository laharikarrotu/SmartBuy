import React from 'react';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import './Dog.scss';

const DogProducts = [
  {
    id: 1,
    name: "Purina Pro Plan Sensitive Skin & Stomach Adult Dry Dog Food",
    sizes: "4 sizes",
    reviews: -2693,
    price: 89.99,
    image: "https://s7d2.scene7.com/is/image/PetSmart/5339575?$sclp-prd-main_large$"
  },
  {
    id: 2,
    name: "Hill's® Science Diet® Sensitive Stomach & Skin Adult Dry Dog Food",
    sizes: "4 sizes",
    reviews: -768,
    price: 83.99,
    image: "https://s7d2.scene7.com/is/image/PetSmart/5154856?$sclp-prd-main_large$"
  },
  {
    id: 3,
    name: "Blue Buffalo® Life Protection Formula™ Adult Dry Dog Food - Chicken",
    sizes: "5 sizes",
    reviews: -937,
    price: 64.99,
    image: "https://s7d2.scene7.com/is/image/PetSmart/5066968?$sclp-prd-main_large$"
  },
  {
    id: 4,
    name: "Royal Canin Size Health Nutrition Small Breed Adult Dry Dog Food",
    sizes: "2 sizes",
    reviews: -760,
    price: 59.99,
    image: "https://s7d2.scene7.com/is/image/PetSmart/5173207?$sclp-prd-main_large$"
  }
];

const DogDeals = [
  {
    id: 1,
    title: "Toy deals",
    label: "Toy deals",
    background: "#e31837"
  },
  {
    id: 2,
    title: "Food deals",
    label: "Food deals",
    background: "#e31837"
  },
  {
    id: 3,
    title: "Treat deals",
    label: "Treat deals",
    background: "#e31837"
  },
  {
    id: 4,
    title: "Cleaning\nsupplies\ndeals",
    label: "Cleaning supplies deals",
    background: "#e31837"
  },
  {
    id: 5,
    title: "Crate &\ncarrier\ndeals",
    label: "Crate & carrier deals",
    background: "#e31837"
  },
  {
    id: 6,
    title: "Food\ntopper\ndeals",
    label: "Food topper deals",
    background: "#e31837"
  }
];

const Dog: React.FC = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleProductClick = (product: any) => {
    navigate(`/product/${product.id}`, { 
      state: { 
        product,
        category: 'dog'
      } 
    });
  };

  return (
    <div className="dog-page">
      <h1>Dog Products & Supplies</h1>

      
      <div className="deals-section">
        <div className="deals-header">
          <h2>All dog deals</h2>
          <a href="#" className="shop-all">Shop all</a>
        </div>
        <div className="deals-grid">
          {DogDeals.map((deal) => (
            <div key={deal.id} className="deal-card">
              <div className="deal-circle">
                <span className="deal-text">{deal.title}</span>
              </div>
              <span className="deal-label">{deal.label}</span>
            </div>
          ))}
        </div>
      </div>

      <br />
      <br />


      <div className="products-section">
        <div className="products-grid">
          {DogProducts.map((product) => (
            <div 
              key={product.id} 
              className="product-card"
              onClick={() => handleProductClick(product)}
            >
              <div className="product-image">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <div className="product-meta">
                  <span className="sizes">{product.sizes}</span>
                  <span className="reviews">{Math.abs(product.reviews)} Reviews</span>
                </div>
                <div className="price">${product.price}</div>
                <button 
                  className="view-details"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleProductClick(product);
                  }}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      

      <div className="hero-banner">
        <img 
          src="https://s7d2.scene7.com/is/image/PetSmart/WEB-2679600-Jan25_dPCS_CONs_DT" 
          alt="Dog Food Promotion"
        />
        <div className="promo-content">
          <h1>Dog Shop</h1>
          <h2>Food, treats, supplies, toys & more</h2>
          <div className="offer-banner">
            <h3>$10 back in savings</h3>
            <p>EARN 5,000 pts ($10 back in savings) when you spend $60+ on all dog food PER DAY thru 3/2*</p>
            <button className="activate-btn">Activate</button>
          </div>
        </div>
      </div>


    </div>
  );
};

export default Dog; 