import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import type { Product as ProductType, ApiResponse } from '../types';
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
    image: "https://s7d2.scene7.com/is/image/PetSmart/WEB-2644551-Mar25_US-4CS1_HP-CWD"
  },
  {
    points: "5X",
    category: "All cat food & treats, any brand",
    image: "https://s7d2.scene7.com/is/image/PetSmart/WEB-2644551-Mar25_US-4CS2_HP-CWD"
  },
  {
    points: "5X",
    category: "All dog treats, any brand",
    image: "https://s7d2.scene7.com/is/image/PetSmart/WEB-2644551-Mar25_US-4CS3_HP-CWD"
  },
  {
    points: "5X",
    category: "Any Salon, PetsHotel, Doggie Day Camp, or Training service",
    image: "https://s7d2.scene7.com/is/image/PetSmart/WEB-2644551-Mar25_US-4CS4_HP-CWD"
  }
];

const PromotionalOffers = [
  {
    offer: "Get 10% in Savings",
    details: "5X points on products, services, or donations",
    conditions: "Offer valid through 2/9",
    image: "https://s7d2.scene7.com/is/image/smartbuy/WEB-2644550-Feb25_4CU1_HP_FW01_DMA",
    description: "Treats Rewards logo and a woman hugging her dog"
  },
  {
    offer: "Earn 5X points",
    details: "10% back in savings for eligible purchases",
    conditions: "Products, services, or donations",
    image: "https://s7d2.scene7.com/is/image/smartbuy/WEB-2644550-Feb25_4CU2_HP_FW01_DMA",
    description: "Treats Rewards logo and a woman hugging her dog"
  },
  {
    offer: "Activate Now",
    details: "Requires activation to earn rewards and savings",
    conditions: "Must activate before making purchases",
    image: "https://s7d2.scene7.com/is/image/smartbuy/WEB-2644550-Feb25_4CU3_HP_FW01_DMA",
    description: "Treats Rewards logo and a woman hugging her dog"
  }
];

const PromotionalBanner = {
  title: "Earn 5X points*",
  subtitle: "10% back in savings",
  description: "products, services or donations thru 2/9",
  buttonText: "Activate now",
  image: "https://s7d2.scene7.com/is/image/smartbuy/WEB-2644550-Feb25_HCHS_HP_FW01_DT",
  logo: "https://s7d2.scene7.com/is/image/smartbuy/treats_rewards_logo"
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
    expirationDate: "14-Feb",
    image: "https://s7d2.scene7.com/is/image/PetSmart/WEB-2644551-Mar25_US-4CS1_HP-CWD",
    link: "/services/grooming"
  },
  {
    name: "Dog Training",
    description: "6-wk. Training Classes - Only $129 thru 3/2",
    expirationDate: "2-Mar",
    image: "https://s7d2.scene7.com/is/image/PetSmart/WEB-2644551-Mar25_US-4CS2_HP-CWD",
    link: "/services/training"
  },
  {
    name: "PetsHotel",
    description: "Book a 4-night stay, get the 5th night FREE thru 3/2",
    expirationDate: "2-Mar",
    image: "https://s7d2.scene7.com/is/image/PetSmart/WEB-2644551-Mar25_US-4CS3_HP-CWD",
    link: "/services/petshotel"
  },
  {
    name: "Doggie Day Camp",
    description: "Doggie Day Camp - New campers SAVE 50% on 1st day of play",
    expirationDate: "No specific expiration mentioned",
    image: "https://s7d2.scene7.com/is/image/PetSmart/WEB-2644551-Mar25_US-4CS4_HP-CWD",
    link: "/services/doggie-day-camp"
  }
];

const Deals = [
  {
    title: "Save 30% on select dog toys",
    image: "https://s7d2.scene7.com/is/image/smartbuy/deals-dog-toys",
    link: "/deals/dog-toys"
  },
  {
    title: "Buy 1, Get 1 50% off cat treats",
    image: "https://s7d2.scene7.com/is/image/smartbuy/deals-cat-treats",
    link: "/deals/cat-treats"
  }
];

const ElectronicsCategories = [
  {
    name: "TVs & Home Theater",
    image: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6505/6505140_sd.jpg",
    link: "/tv"
  },
  {
    name: "Computers & Tablets",
    image: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6506/6506325_sd.jpg",
    link: "/category/computers-tablets"
  },
  {
    name: "Cell Phones",
    image: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6505/6505631_sd.jpg",
    link: "/category/cell-phones"
  },
  {
    name: "Gaming",
    image: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6509/6509942_sd.jpg",
    link: "/category/gaming"
  },
  {
    name: "Cameras",
    image: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6505/6505727_sd.jpg",
    link: "/category/cameras"
  },
  {
    name: "Smart Home",
    image: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6505/6505910_sd.jpg",
    link: "/category/smart-home"
  }
];

const TechDeals = [
  {
    title: "Save up to $500 on select OLED TVs",
    image: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6505/6505140_sd.jpg",
    link: "/deals/tv-deals",
    savings: "Up to $500 off",
    endDate: "Ends Saturday"
  },
  {
    title: "Save $200 on select laptops",
    image: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6506/6506325_sd.jpg",
    link: "/deals/laptop-deals",
    savings: "$200 off",
    endDate: "Limited time offer"
  },
  {
    title: "Save up to $100 on the latest smartphones",
    image: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6505/6505631_sd.jpg",
    link: "/deals/phone-deals",
    savings: "Up to $100 off",
    endDate: "This week only"
  }
];

const TechPromotions = [
  {
    offer: "Student Deals",
    details: "Save up to $100 extra on laptops",
    conditions: "Valid student ID required",
    image: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6506/6506325_sd.jpg",
    description: "Student shopping for laptop"
  },
  {
    offer: "Trade-In Offer",
    details: "Get up to $800 in trade-in value",
    conditions: "For eligible smartphones",
    image: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6505/6505631_sd.jpg",
    description: "Latest smartphones on display"
  },
  {
    offer: "Gaming Bundle",
    details: "Save $50 when you buy console + game",
    conditions: "Select items only",
    image: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6509/6509942_sd.jpg",
    description: "Gaming console and accessories"
  }
];

const FeaturedTechProducts = [
  {
    points: "3X",
    category: "4K & 8K TVs",
    image: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6505/6505140_sd.jpg"
  },
  {
    points: "2X",
    category: "Gaming Laptops & PCs",
    image: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6506/6506325_sd.jpg"
  },
  {
    points: "2X",
    category: "Smart Home Devices",
    image: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6505/6505910_sd.jpg"
  }
];

const WomenCategories = [
  {
    name: "Jeans",
    image: "https://s7d2.scene7.com/is/image/PetSmart/WEB-2644551-Mar25_US-4CS1_HP-CWD",
    link: "/category/womens-jeans"
  },
  {
    name: "Tops & T-Shirts",
    image: "https://s7d2.scene7.com/is/image/PetSmart/WEB-2644551-Mar25_US-4CS2_HP-CWD",
    link: "/category/womens-tops"
  },
  {
    name: "Dresses",
    image: "https://s7d2.scene7.com/is/image/PetSmart/WEB-2644551-Mar25_US-4CS3_HP-CWD",
    link: "/category/womens-dresses"
  },
  {
    name: "Activewear",
    image: "https://s7d2.scene7.com/is/image/PetSmart/WEB-2644551-Mar25_US-4CS4_HP-CWD",
    link: "/category/womens-activewear"
  }
];

const WomenFeaturedProducts = [
  {
    name: "Mid Rise Baby Boot Jean",
    price: "$31.00",
    originalPrice: "$79.95",
    image: "https://s7d2.scene7.com/is/image/PetSmart/WEB-2644551-Mar25_US-4CS1_HP-CWD",
    link: "/baby-boot-jean"
  },
  {
    name: "Modern Rib Pullover",
    price: "$45.00",
    originalPrice: "$89.95",
    image: "https://s7d2.scene7.com/is/image/PetSmart/WEB-2644551-Mar25_US-4CS2_HP-CWD",
    link: "/modern-rib-pullover"
  }
];

const All: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth0();
  const [products, setProducts] = useState<ProductType[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<string>("default");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("/smartbuy_all_products.json");
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data: ApiResponse<{ products: ProductType[] }> = await response.json();
        
        if (!data.success) {
          throw new Error(data.error || 'Failed to fetch products');
        }
        
        setProducts(data.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError(error instanceof Error ? error.message : 'An unknown error occurred');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (!products.length) return;

    let filtered = [...products];

    if (categoryFilter) {
      filtered = filtered.filter(product => 
        product.category.toLowerCase() === categoryFilter.toLowerCase()
      );
    }

    switch (sortOption) {
      case "price-low-high":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high-low":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Keep original order
        break;
    }

    setFilteredProducts(filtered);
  }, [products, categoryFilter, sortOption]);

  if (loading) return <div className="loading-message">Loading pet products...</div>;

  return (
    <div className="home-page">
      {/* Hero Banner */}
      <section className="hero-banner">
        {/* Promotional Banner */}
        <div className="promotional-banner">
          <h2>Get 10% IN SAVINGS (5X pts) on products, services or donations thru 2/9 ›</h2>
        </div>

        <div className="banner-content">
          <div className="banner-text">
            <h1>Everything You Need<br/>All in One Place</h1>
            <div className="banner-buttons">
              <button 
                onClick={() => navigate('/new-arrivals')}
                className="primary-button"
              >
                Shop Now
              </button>
              <button 
                onClick={() => navigate('/deals')}
                className="secondary-button"
              >
                View Deals
              </button>
            </div>
          </div>
          <div className="banner-images">
            <div className="image-container">
              <img 
                src="https://s7d2.scene7.com/is/image/PetSmart/WEB-2678953-Jan25_6TUS1_NewPet_DT" 
                alt="Pet Category"
                className="category-image rotate-left"
              />
              <div className="image-overlay">
                <h3>Pets</h3>
              </div>
            </div>
            <div className="image-container">
              <img 
                src="https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6505/6505140_sd.jpg" 
                alt="Electronics Category"
                className="category-image rotate-right"
              />
              <div className="image-overlay">
                <h3>Electronics</h3>
              </div>
            </div>
            <div className="image-container">
              <img 
                src="https://www.panaprium.com/cdn/shop/articles/different_fashion_styles_up.jpg?v=1712222301&width=1024" 
                alt="Fashion Category"
                className="category-image rotate-left"
              />
              <div className="image-overlay">
                <h3>Fashion</h3>
              </div>
            </div>
            <div className="image-container">
              <img 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR726y2T4O7Tn31ZxjqGtMxCnTiPTAdJWzFpA&s" 
                alt="Deals Category"
                className="category-image rotate-right"
              />
              <div className="image-overlay">
                <h3>Deals</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Women's Categories Section */}
      <section className="categories-section">
        <h2>Shop Women's</h2>
        <div className="categories-grid">
          {WomenCategories.map((category, index) => (
            <div key={index} className="category-card" onClick={() => navigate(category.link)}>
              <img src={category.image} alt={category.name} />
              <h3>{category.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Women's Featured Products */}
      <section className="featured-products">
        <h2>Featured Women's Styles</h2>
        <div className="products-grid">
          {WomenFeaturedProducts.map((product, index) => (
            <div key={index} className="product-card" onClick={() => navigate(product.link)}>
              <img src={product.image} alt={product.name} />
              <div className="product-info">
                <h3>{product.name}</h3>
                <div className="price-container">
                  <span className="sale-price">{product.price}</span>
                  <span className="original-price">{product.originalPrice}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Electronics Categories Section */}
      <section className="categories-section">
        <h2>Shop Electronics</h2>
        <div className="categories-grid">
          {ElectronicsCategories.map((category, index) => (
            <div key={index} className="category-card" onClick={() => navigate(category.link)}>
              <img src={category.image} alt={category.name} />
              <h3>{category.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Deals Section */}
      <section className="deals-section">
        <h2>Top Tech Deals</h2>
        <div className="deals-grid">
          {TechDeals.map((deal, index) => (
            <div key={index} className="deal-card" onClick={() => navigate(deal.link)}>
              <img src={deal.image} alt={deal.title} />
              <div className="deal-content">
                <h3>{deal.title}</h3>
                <p className="savings">{deal.savings}</p>
                <p className="end-date">{deal.endDate}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Tech Products */}
      <section className="featured-section">
        <h2>Featured Tech</h2>
        <div className="featured-grid">
          {FeaturedTechProducts.map((product, index) => (
            <div key={index} className="featured-card">
              <div className="points-badge">
                <span className="points">{product.points}</span>
                <span className="pts">pts</span>
              </div>
              <div className="featured-content">
                <h3>{product.category}</h3>
                <img src={product.image} alt={product.category} />
              </div>
            </div>
          ))}
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
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p className="price">${product.price.toFixed(2)}</p>
              <div className="rating">Rating: {product.rating}/5</div>
              <button onClick={() => navigate(`/product/${product.id}`)}>
                View Details
              </button>
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
            <h2>Find a smartbuy Store Near You</h2>
            <p>Shop in store or pick up curbside</p>
          </div>
          <button className="find-store-btn">Find a Store</button>
        </div>
      </section>
    </div>
  );
};

export default All;
