import { useNavigate } from 'react-router-dom';
import './Womens.scss';

const Womens = () => {
  const navigate = useNavigate();

  const categories = [
    {
      name: "New Arrivals",
      image: "https://img.shopstyle-cdn.com/sim/73/d3/73d3d9f4aa5e5c3cc1982cb9ce2c0fba_best/gap-womens-spring-collection.jpg",
      link: "/womens/new-arrivals"
    },
    {
      name: "Jeans & Denim",
      image: "https://img.shopstyle-cdn.com/sim/96/81/9681c7c8db9e0e4e6e9e5c8c8c8c8c8c_best/gap-high-rise-vintage-slim-jeans.jpg",
      link: "/womens/jeans"
    },
    {
      name: "Tops & T-Shirts",
      image: "https://img.shopstyle-cdn.com/sim/c4/d2/c4d2f8b8db9e0e4e6e9e5c8c8c8c8c8c_best/gap-vintage-soft-classic-t-shirt.jpg",
      link: "/womens/tops"
    },
    {
      name: "Dresses & Jumpsuits",
      image: "https://img.shopstyle-cdn.com/sim/e5/f3/e5f3a9c8db9e0e4e6e9e5c8c8c8c8c8c_best/gap-sleeveless-midi-dress.jpg",
      link: "/womens/dresses"
    },
    {
      name: "Activewear",
      image: "https://img.shopstyle-cdn.com/sim/b7/c1/b7c1d8c8db9e0e4e6e9e5c8c8c8c8c8c_best/gap-fit-breathe-racerback-tank.jpg",
      link: "/womens/activewear"
    },
    {
      name: "Sweaters & Cardigans",
      image: "https://img.shopstyle-cdn.com/sim/a8/b2/a8b2e8c8db9e0e4e6e9e5c8c8c8c8c8c_best/gap-cable-knit-cardigan-sweater.jpg",
      link: "/womens/sweaters"
    }
  ];

  const featuredProducts = [
    {
      name: "Mid Rise Baby Boot Jean",
      price: "$31.00",
      originalPrice: "$79.95",
      image: "https://img.shopstyle-cdn.com/sim/84/f5/84f5b8c8db9e0e4e6e9e5c8c8c8c8c8c_best/gap-mid-rise-baby-boot-jeans.jpg",
      link: "/baby-boot-jean",
      badge: "Best Seller"
    },
    {
      name: "Modern Rib Pullover",
      price: "$45.00",
      originalPrice: "$89.95",
      image: "https://img.shopstyle-cdn.com/sim/93/e4/93e4c8c8db9e0e4e6e9e5c8c8c8c8c8c_best/gap-modern-rib-pullover-sweater.jpg",
      link: "/modern-rib-pullover",
      badge: "New Arrival"
    },
    {
      name: "Straw Panama Hat",
      price: "$29.95",
      originalPrice: "$49.95",
      image: "https://img.shopstyle-cdn.com/sim/72/d3/72d3d8c8db9e0e4e6e9e5c8c8c8c8c8c_best/gap-straw-panama-hat.jpg",
      link: "/straw-panama-hat",
      badge: "Sale"
    },
    {
      name: "Gap Logo Tote",
      price: "$35.00",
      originalPrice: "$59.95",
      image: "https://img.shopstyle-cdn.com/sim/61/c2/61c2c8c8db9e0e4e6e9e5c8c8c8c8c8c_best/gap-logo-canvas-tote.jpg",
      link: "/gap-logo-tote",
      badge: "Trending"
    }
  ];

  return (
    <div className="womens-page">
      <div className="hero-section" style={{
        background: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)),
                    url('https://gapprod.a.bigcontent.io/v1/static/SP258101_Denim_copy_DESK')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <h1>Women's New Arrivals</h1>
        <p>Discover the latest styles for Spring 2024</p>
        <button onClick={() => navigate('/womens/new-arrivals')}>Shop Now</button>
      </div>

      <section className="categories-section">
        <h2>Shop by Category</h2>
        <div className="categories-grid">
          {categories.map((category, index) => (
            <div 
              key={index} 
              className="category-card" 
              onClick={() => navigate(category.link)}
            >
              <img src={category.image} alt={category.name} />
              <h3>{category.name}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="featured-products">
        <h2>Featured Styles</h2>
        <div className="products-grid">
          {featuredProducts.map((product, index) => (
            <div 
              key={index} 
              className="product-card" 
              onClick={() => navigate(product.link)}
            >
              {product.badge && <span className="badge">{product.badge}</span>}
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

      <section className="trending-section">
        <h2>Trending Now</h2>
        <div className="trend-cards">
          <div 
            className="trend-card" 
            onClick={() => navigate('/womens/denim-guide')}
            style={{
              background: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)),
                          url('https://img.shopstyle-cdn.com/sim/55/b1/55b1c8c8db9e0e4e6e9e5c8c8c8c8c8c_best/gap-denim-fit-guide.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <h3>Denim Fit Guide</h3>
            <p>Find your perfect pair</p>
          </div>
          <div 
            className="trend-card" 
            onClick={() => navigate('/womens/spring-lookbook')}
            style={{
              background: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)),
                          url('https://img.shopstyle-cdn.com/sim/44/a0/44a0c8c8db9e0e4e6e9e5c8c8c8c8c8c_best/gap-spring-lookbook.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <h3>Spring Lookbook</h3>
            <p>Style inspiration for the season</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Womens; 