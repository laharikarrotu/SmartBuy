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
  const [products, setProducts] = useState<Product[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<string>("default");
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/smartbuy_all_products.json");
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        // Log error to a proper logging service
        if (error instanceof Error) {
          // You could replace this with a proper logging service
          console.error("Error fetching products:", error.message);
        }
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

  return (
    <div className="home-page">
      {/* Top Promo Banner */}
      <div className="top-promo-banner">
        <a href="#">Get 10% IN SAVINGS (5X pts) on products, services or donations thru 2/9 ›</a>
      </div>

      {/* Hero Banner */}
      <section className="hero-banner" style={{
        background: `linear-gradient(45deg, 
          rgba(255, 89, 94, 0.85), 
          rgba(255, 202, 58, 0.85),
          rgba(138, 201, 38, 0.85),
          rgba(25, 130, 196, 0.85))`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '600px',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="banner-content" style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 40px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%'
        }}>
          <div className="banner-text" style={{
            flex: '1',
            color: 'white',
            textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
          }}>
            <h1 style={{
              fontSize: '4rem',
              marginBottom: '1.5rem',
              fontWeight: 'bold',
              lineHeight: '1.2'
            }}>Everything You Need<br/>All in One Place</h1>
            <h2 style={{
              fontSize: '2rem',
              marginBottom: '1.5rem',
              fontWeight: '400',
              color: '#FFE5E5'
            }}>Pets • Fashion • Electronics</h2>
            <p style={{
              fontSize: '1.2rem',
              marginBottom: '2rem',
              maxWidth: '600px',
              lineHeight: '1.6'
            }}>Discover amazing deals across all categories with up to 50% off on selected items</p>
            <div style={{ display: 'flex', gap: '20px' }}>
              <button 
                onClick={() => navigate('/new-arrivals')}
                style={{
                  padding: '15px 40px',
                  fontSize: '1.1rem',
                  backgroundColor: '#FF595E',
                  color: 'white',
                  border: 'none',
                  borderRadius: '30px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textTransform: 'uppercase',
                  fontWeight: '600',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                }}
              >
                Shop Now
              </button>
              <button 
                onClick={() => navigate('/deals')}
                style={{
                  padding: '15px 40px',
                  fontSize: '1.1rem',
                  backgroundColor: 'transparent',
                  color: 'white',
                  border: '2px solid white',
                  borderRadius: '30px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textTransform: 'uppercase',
                  fontWeight: '600'
                }}
              >
                View Deals
              </button>
            </div>
          </div>
          <div className="banner-images" style={{
            flex: '1',
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '20px',
            padding: '20px'
          }}>
            <img 
              src="https://s7d2.scene7.com/is/image/PetSmart/WEB-2678953-Jan25_6TUS1_NewPet_DT" 
              alt="Pet Category"
              style={{
                width: '100%',
                height: '200px',
                objectFit: 'cover',
                borderRadius: '15px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                transform: 'rotate(-5deg)'
              }}
            />
            <img 
              src="https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6505/6505140_sd.jpg" 
              alt="Electronics Category"
              style={{
                width: '100%',
                height: '200px',
                objectFit: 'cover',
                borderRadius: '15px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                transform: 'rotate(5deg)'
              }}
            />
            <img 
              src="https://img.shopstyle-cdn.com/sim/96/81/9681c7c8db9e0e4e6e9e5c8c8c8c8c8c_best/gap-high-rise-vintage-slim-jeans.jpg" 
              alt="Fashion Category"
              style={{
                width: '100%',
                height: '200px',
                objectFit: 'cover',
                borderRadius: '15px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                transform: 'rotate(5deg)'
              }}
            />
            <img 
              src="https://img.shopstyle-cdn.com/sim/44/a0/44a0c8c8db9e0e4e6e9e5c8c8c8c8c8c_best/gap-spring-lookbook.jpg" 
              alt="Deals Category"
              style={{
                width: '100%',
                height: '200px',
                objectFit: 'cover',
                borderRadius: '15px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                transform: 'rotate(-5deg)'
              }}
            />
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
          {filteredProducts.map((item, index) => (
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
