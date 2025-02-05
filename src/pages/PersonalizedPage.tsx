import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import './PersonalizedPage.scss';

interface Product {
  name: string;
  status?: string;
  colors: string;
  originalPrice: number;
  discountedPrice?: number;
  images: string[];
}

export const PersonalizedPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth0();
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [products] = useState<Product[]>([
    {
        name: "Modern Rib Half-Zip Pullover",
        colors: "3 colors",
        originalPrice: 44.95,
        discountedPrice: 17.00,
        status: "Really big deal",
        images: [
          "https://www.gap.com/webcontent/0056/909/974/cn56909974.jpg",
          "https://www.gap.com/webcontent/0056/746/603/cn56746603.jpg"
        ]
      },
      {
        name: "Straw Panama Hat",
        colors: "1 color",
        originalPrice: 49.95,
        discountedPrice: 44.00,
        images: [
          "https://www.gap.com/webcontent/0057/401/246/cn57401246.jpg",
          "https://www.gap.com/webcontent/0057/400/235/cn57400235.jpg"
        ]
      },
      {
        name: "Gap Logo Tote Bag",
        colors: "1 color",
        originalPrice: 49.95,
        images: [
          "https://www.gap.com/webcontent/0057/480/176/cn57480176.jpg",
          "https://www.gap.com/webcontent/0057/480/176/cn57480176.jpg"
        ]
      },
      {
        name: "Vegan Suede Belt",
        colors: "1 color",
        originalPrice: 64.95,
        discountedPrice: 58.00,
        images: [
          "https://www.gap.com/webcontent/0057/436/168/cn57436168.jpg",
          "https://www.gap.com/webcontent/0057/433/016/cn57433016.jpg"
        ]
      },
    {
      name: "Relaxed Crewneck Sweater",
      colors: "1 color",
      originalPrice: 89.95,
      images: [
        "https://www.gap.com/webcontent/0057/510/700/cn57510700.jpg",
        "https://www.gap.com/webcontent/0057/404/327/cn57404327.jpg"
      ]
    },
    {
      name: "Cropped Plaited Rib Cardigan",
      colors: "4 colors",
      originalPrice: 79.95,
      images: [
        "https://www.gap.com/webcontent/0057/180/297/cn57180297.jpg",
        "https://www.gap.com/webcontent/0057/180/311/cn57180311.jpg"
      ]
    },
    {
      name: "Cropped Pointelle Cardigan",
      colors: "1 color",
      originalPrice: 39.95,
      discountedPrice: 19.00,
      status: "50% off: limited time",
      images: [
        "https://www.gap.com/webcontent/0056/912/613/cn56912613.jpg",
        "https://www.gap.com/webcontent/0056/912/389/cn56912389.jpg"
      ]
    },
    {
      name: "Modern Rib Cropped T-Shirt",
      colors: "9 colors",
      originalPrice: 29.95,
      images: [
        "https://www.gap.com/webcontent/0057/230/854/cn57230854.jpg",
        "https://www.gap.com/webcontent/0057/229/188/cn57229188.jpg"
      ]
    },
    {
      name: "Lightweight Modern T-Shirt",
      colors: "1 color",
      originalPrice: 34.95,
      discountedPrice: 13.00,
      status: "Selling fast, Really big deal",
      images: [
        "https://www.gap.com/webcontent/0057/053/744/cn57053744.jpg",
        "https://www.gap.com/webcontent/0057/015/245/cn57015245.jpg"
      ]
    }
  ]);

  const [countdown, setCountdown] = useState(3600); // 1 hour in seconds
  const [isBooming, setIsBooming] = useState(false);

  useEffect(() => {
    // Boom animation every 5 seconds
    const boomInterval = setInterval(() => {
      setIsBooming(true);
      setTimeout(() => setIsBooming(false), 1000);
    }, 5000);

    // Countdown timer
    const timer = setInterval(() => {
      setCountdown(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      clearInterval(boomInterval);
      clearInterval(timer);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculate discounted prices
  const discountedProducts = products.map(product => ({
    ...product,
    discountedPrice: product.discountedPrice || (product.originalPrice * 0.9)
  }));

  const handleProductClick = (productName: string) => {
    const product = discountedProducts.find(p => p.name === productName);
    
    switch (productName) {
      case "Modern Rib Half-Zip Pullover":
        navigate('/modern-rib-pullover', { 
          state: { 
            originalPrice: product?.originalPrice,
            discountedPrice: product?.discountedPrice
          }
        });
        break;
      case "Straw Panama Hat":
        navigate('/straw-panama-hat', { 
          state: { 
            originalPrice: product?.originalPrice,
            discountedPrice: product?.discountedPrice
          }
        });
        break;
      case "Gap Logo Tote Bag":
        navigate('/gap-logo-tote', { 
          state: { 
            originalPrice: product?.originalPrice,
            discountedPrice: product?.discountedPrice
          }
        });
        break;
    }
  };

  return (
    <div className="store-layout">
      <div className={`promotion-banner ${isBooming ? 'boom' : ''}`}>
        <span className="promotion-text">🎉 SPECIAL OFFER! 10% OFF ALL PERSONALIZED ITEMS 🎉</span>
        <span className="countdown">Ends in: {formatTime(countdown)}</span>
      </div>
      <div className="breadcrumb">
        {user?.name} / Personalized Products
      </div>

      <h1 className="page-title">PERSONALIZED FOR {user?.name?.toUpperCase()}</h1>
      
      <div className="filter-bar">
        <button className="filter-btn">
          <span className="icon">≡</span> Your Preferences
        </button>
        <button className="filter-btn">Recent Views</button>
        <button className="filter-btn">Size (Your Fit)</button>
        <button className="filter-btn">Color</button>
        <span className="items-count">{products.length} Items</span>
        <button className="sort-btn">Sort ▾</button>
      </div>

      <div className="active-filters">
        <span className="filter-tag">
          Recently Viewed <button className="remove-filter">×</button>
        </span>
        <span className="filter-tag">
          Your Size <button className="remove-filter">×</button>
        </span>
      </div>

      <div className="products-grid">
        {discountedProducts.map((product) => (
          <div
            key={product.name}
            className="product-card"
            onMouseEnter={() => setHoveredProduct(product.name)}
            onMouseLeave={() => setHoveredProduct(null)}
            onClick={() => handleProductClick(product.name)}
            style={{ cursor: 'pointer' }}
          >
            <div className="product-image">
              <img
                src={hoveredProduct === product.name ? product.images[1] : product.images[0]}
                alt={product.name}
                className="product-img"
              />
              {product.status && <div className="product-status">{product.status}</div>}
            </div>
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-colors">{product.colors}</p>
              <div className="product-pricing">
                <span className="original-price">${product.originalPrice.toFixed(2)}</span>
                <span className="discounted-price">${product.discountedPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 