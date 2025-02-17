import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import './All.scss';

interface Product {
  Name: string;
  Category: string;
  Price: string;
  DiscountedPrice?: number;
  Image: string;
  Link: string;
}

const PopularPicks = [
  {
    points: "5X",
    category: "All dog food, any brand",
    image: "https://s7d2.scene7.com/is/image/PetSmart/WEB-2644550-Feb25_4CU1_HP_FW01_DMA"
  },
  {
    points: "5X",
    category: "All cat food & treats, any brand",
    image: "https://s7d2.scene7.com/is/image/PetSmart/WEB-2644550-Feb25_4CU2_HP_FW01_DMA"
  },
  {
    points: "5X",
    category: "All dog treats, any brand",
    image: "https://s7d2.scene7.com/is/image/PetSmart/WEB-2644550-Feb25_4CU3_HP_FW01_DMA"
  },
  {
    points: "5X",
    category: "Any Salon, PetsHotel, Doggie Day Camp, or Training service",
    image: "https://s7d2.scene7.com/is/image/PetSmart/WEB-2644550-Feb25_4CU4_HP_FW01_DMA"
  }
];

const PromotionalOffers = [
  {
    offer: "Get 10% in Savings",
    details: "5X points on products, services, or donations",
    conditions: "Offer valid through 2/9",
    image: "https://s7d2.scene7.com/is/image/PetSmart/WEB-2644550-Feb25_4CU1_HP_FW01_DMA",
    description: "Treats Rewards logo and a woman hugging her dog"
  },
  {
    offer: "Earn 5X points",
    details: "10% back in savings for eligible purchases",
    conditions: "Products, services, or donations",
    image: "https://s7d2.scene7.com/is/image/PetSmart/WEB-2644550-Feb25_4CU2_HP_FW01_DMA",
    description: "Treats Rewards logo and a woman hugging her dog"
  },
  {
    offer: "Activate Now",
    details: "Requires activation to earn rewards and savings",
    conditions: "Must activate before making purchases",
    image: "https://s7d2.scene7.com/is/image/PetSmart/WEB-2644550-Feb25_4CU3_HP_FW01_DMA",
    description: "Treats Rewards logo and a woman hugging her dog"
  }
];

const PromotionalBanner = {
  title: "Earn 5X points*",
  subtitle: "10% back in savings",
  description: "products, services or donations thru 2/9",
  buttonText: "Activate now",
  image: "https://s7d2.scene7.com/is/image/PetSmart/WEB-2644550-Feb25_HCHS_HP_FW01_DT",
  logo: "https://s7d2.scene7.com/is/image/PetSmart/treats_rewards_logo"
};

const PetCategories = [
  {
    name: "Dog",
    image: "https://s7d2.scene7.com/is/image/PetSmart/WEB-2678953-Jan25_6TUS1_NewPet_DT",
    link: "/dog"
  },
  {
    name: "Cat",
    image: "https://s7d2.scene7.com/is/image/PetSmart/WEB-2678953-Jan25_6TUS2_NewPet_DT",
    link: "/category/cat"
  },
  {
    name: "Fish",
    image: "https://s7d2.scene7.com/is/image/PetSmart/WEB-2678953-Jan25_6TUS3_NewPet_DT",
    link: "/category/fish"
  },
  {
    name: "Bird",
    image: "https://s7d2.scene7.com/is/image/PetSmart/WEB-2678953-Jan25_6TUS4_NewPet_DT",
    link: "/category/birds"
  },
  {
    name: "Reptile",
    image: "https://s7d2.scene7.com/is/image/PetSmart/WEB-2678953-Jan25_6TUS5_NewPet_DT",
    link: "/category/reptiles"
  },
  {
    name: "Small Pet",
    image: "https://s7d2.scene7.com/is/image/PetSmart/WEB-2678953-Jan25_6TUS6_NewPet_DT",
    link: "/category/small-pets"
  }
];

const Services = [
  {
    name: "Grooming Salon",
    description: "Valentine's Day Package - Earn 2X points on package thru 2/14",
    visualElements: "Grooming Salon logo, 2X points callout, dog wearing a Valentine's bandana",
    expirationDate: "14-Feb",
    image: "https://s7d2.scene7.com/is/image/PetSmart/WEB-2644550-Feb25_4CS1_HP_FW01_DT",
    link: "/services/grooming"
  },
  {
    name: "Dog Training",
    description: "6-wk. Training Classes - Only $129 thru 3/2",
    visualElements: "Dog Training logo, dog wearing a graduation cap",
    expirationDate: "2-Mar",
    image: "https://s7d2.scene7.com/is/image/PetSmart/WEB-2268408-Jan25_4CS2_HP-FW48_DMA",
    link: "/services/training"
  },
  {
    name: "PetsHotel",
    description: "Book a 4-night stay, get the 5th night FREE thru 3/2",
    visualElements: "PetsHotel logo, dog laying in a dog bed",
    expirationDate: "2-Mar",
    image: "https://s7d2.scene7.com/is/image/PetSmart/WEB-2268408-Jan25_4CS3_HP-FW48_DMA",
    link: "/services/petshotel"
  },
  {
    name: "Doggie Day Camp",
    description: "Doggie Day Camp - New campers SAVE 50% on 1st day of play",
    visualElements: "Doggie Day Camp logo, three dogs playing",
    expirationDate: "No specific expiration mentioned",
    image: "https://s7d2.scene7.com/is/image/PetSmart/WEB-2268408-Jan25_4CS4_HP-FW48_DMA",
    link: "/services/doggie-day-camp"
  }
];

const Deals = [
  {
    title: "Save 30% on select dog toys",
    image: "https://s7d2.scene7.com/is/image/PetSmart/deals-dog-toys",
    link: "/deals/dog-toys"
  },
  {
    title: "Buy 1, Get 1 50% off cat treats",
    image: "https://s7d2.scene7.com/is/image/PetSmart/deals-cat-treats",
    link: "/deals/cat-treats"
  }
];

const All: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, loginWithPopup } = useAuth0();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<string>("default");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("All.tsx is mounted!");
    const fetchProducts = async () => {
      try {
        const response = await fetch("/petsmart_all_products.json");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let sortedProducts = [...products];

    if (categoryFilter) {
      sortedProducts = sortedProducts.filter((p) => p.Category === categoryFilter);
    }

    if (sortOption === "price-low-high") {
      sortedProducts.sort((a, b) => (a.DiscountedPrice || 0) - (b.DiscountedPrice || 0));
    } else if (sortOption === "price-high-low") {
      sortedProducts.sort((a, b) => (b.DiscountedPrice || 0) - (a.DiscountedPrice || 0));
    }

    setFilteredProducts(sortedProducts);
  }, [categoryFilter, sortOption, products]);

  if (loading) return <div className="loading-message">Loading pet products...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <div className="home-page">
      {/* Top Promo Banner */}
      <div className="top-promo-banner">
        <a href="#">Get 10% IN SAVINGS (5X pts) on products, services or donations thru 2/9 ›</a>
      </div>

      {/* Hero Banner */}
      <section className="hero-banner">
        <div className="banner-content">
          <div className="banner-text">
            <h1>Earn 5X points*</h1>
            <h2>10% back in savings</h2>
            <p>products, services or donations thru 2/9</p>
            <button className="activate-button">Activate now</button>
          </div>
          <img 
            src="https://s7d2.scene7.com/is/image/PetSmart/WEB-2644550-Feb25_HCHS_HP_FW01_DT"
            alt="PetSmart Treats Rewards"
            className="banner-image"
          />
        </div>
      </section>

      {/* Popular Picks Section */}
      <section className="popular-picks">
        <h2>Popular Categories</h2>
        <div className="picks-grid">
          {PopularPicks.map((pick, index) => (
            <div key={index} className="pick-card">
              <div className="points-badge">
                <span className="points">{pick.points}</span>
                <span className="pts">pts</span>
              </div>
              <div className="pick-content">
                <h3>{pick.category}</h3>
                <img src={pick.image} alt={pick.category} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pet Categories Section */}
      <section className="pet-categories">
        <h2>Shop by Pet</h2>
        <div className="categories-grid">
          {PetCategories.map((category, index) => (
            <div 
              key={index} 
              className="category-card"
              onClick={() => {
                console.log('Navigating to:', category.name === "Dog" ? "/dog" : category.link);
                if (category.name === "Dog") {
                  navigate('/dog');
                } else {
                  navigate(category.link);
                }
              }}
            >
              <div className="image-container">
                <img src={category.image} alt={category.name} />
              </div>
              <h3>{category.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Products Grid */}
      <div className="store-layout">
        <div className="products-grid">
          {products.map((item, index) => (
            <div key={index} className="product-card">
              <img src={item.Image} alt={item.Name} className="product-image" />
              <div className="product-info">
                <h3 className="product-name">{item.Name}</h3>
                <p className="product-price">{item.Price}</p>
                <button 
                  className="view-button"
                  onClick={() => navigate(item.Link)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Services Section */}
      <section className="pet-services">
        <h2>Our Services</h2>
        <div className="services-grid">
          {Services.map((service, index) => (
            <div 
              key={index} 
              className="service-card"
              onClick={() => navigate(service.link)}
            >
              <img src={service.image} alt={service.name} />
              <div className="service-content">
                <h3>{service.name}</h3>
                <p>{service.description}</p>
                {service.expirationDate && (
                  <span className="expiration-date">
                    Expires: {service.expirationDate}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>



      {/* Newsletter Signup */}
      <section className="newsletter-signup">
        <div className="signup-content">
          <h2>Get Pet Parent News & Offers</h2>
          <p>Sign up to receive updates, special offers, pet wellness tips and more!</p>
          <form className="signup-form">
            <input type="email" placeholder="Enter your email" />
            <button type="submit">Sign Up</button>
          </form>
        </div>
      </section>

      {/* Bottom Banner */}
      <section className="bottom-banner">
        <div className="banner-content">
          <div className="banner-text">
            <h2>Find a PetSmart Store Near You</h2>
            <p>Shop in store or pick up curbside</p>
          </div>
          <button className="find-store-btn">Find a Store</button>
        </div>
      </section>
    </div>
  );
};

export default All;
