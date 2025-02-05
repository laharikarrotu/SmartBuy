import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Product {
  name: string;
  status?: string;
  colors: string;
  originalPrice: number;
  discountedPrice: number;
  images: string[];
}

export const WomenCasualJeans = () => {
  const navigate = useNavigate();
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [products] = useState<Product[]>([
    {
      name: "High Rise Vintage Slim Jeans",
      colors: "2 colors",
      originalPrice: 69.95,
      discountedPrice: 27.00,
      images: [
        "https://www.gap.com/webcontent/0055/261/404/cn55261404.jpg",
        "https://www.gap.com/webcontent/0055/260/713/cn55260713.jpg"
      ]
    },
    {
      name: "Easy Denim Cargo Joggers",
      colors: "1 color",
      originalPrice: 79.95,
      discountedPrice: 31.00,
      images: [
        "https://www.gap.com/webcontent/0054/409/390/cn54409390.jpg",
        "https://www.gap.com/webcontent/0054/408/668/cn54408668.jpg"
      ]
    },
    {
      name: "Mid Rise Baby Boot Jean",
      colors: "5 colors",
      originalPrice: 79.95,
      discountedPrice: 31.00,
      images: [
        "https://www.gap.com/webcontent/0054/884/978/cn54884978.jpg",
        "https://www.gap.com/webcontent/0054/884/047/cn54884047.jpg"
      ]
    },
    {
      name: "High Rise Cheeky Straight Jeans",
      colors: "2 colors",
      originalPrice: 89.95,
      discountedPrice: 35.00,
      images: [
        "https://www.gap.com/webcontent/0054/884/047/cn54884047.jpg",
        "https://www.gap.com/webcontent/0055/299/962/cn55299962.jpg"
      ]
    },
    {
      name: "Mid Rise '90s Loose Cargo Jeans",
      colors: "1 color",
      originalPrice: 89.95,
      discountedPrice: 26.00,
      images: [
        "https://www.gap.com/webcontent/0057/122/707/cn57122707.jpg",
        "https://www.gap.com/webcontent/0057/122/716/cn57122716.jpg"
      ]
    },
    {
      name: "High Rise Vintage Slim Jeans",
      colors: "2 colors",
      originalPrice: 69.95,
      discountedPrice: 20.00,
      images: [
        "https://www.gap.com/webcontent/0054/321/182/cn54321182.jpg",
        "https://www.gap.com/webcontent/0054/320/724/cn54320724.jpg"
      ]
    },
    {
      name: "Wide-Leg Denim Pull-On Pants",
      colors: "1 color",
      originalPrice: 69.95,
      discountedPrice: 20.00,
      images: [
        "https://www.gap.com/webcontent/0055/428/198/cn55428198.jpg",
        "https://www.gap.com/webcontent/0055/428/075/cn55428075.jpg"
      ]
    }
  ]);

  const handleProductClick = (productName: string) => {
    if (productName === "Mid Rise Baby Boot Jean") {
      navigate('/baby-boot-jean');
    }
  };

  return (
    <div className="store-layout">
      <h1 className="page-title">WOMEN CASUAL JEANS</h1>
      
      <div className="filter-bar">
        <button className="filter-btn">
          <span className="icon">≡</span> All Filters (2)
        </button>
        <button className="filter-btn">Department (1)</button>
        <button className="filter-btn">Category</button>
        <button className="filter-btn">Size</button>
        <button className="filter-btn">Color</button>
        <span className="items-count">7 Items</span>
        <button className="sort-btn">Sort ▾</button>
      </div>

      <div className="active-filters">
        <span className="filter-tag">
          Casual <button className="remove-filter">×</button>
        </span>
        <span className="filter-tag">
          Jeans <button className="remove-filter">×</button>
        </span>
      </div>

      <div className="products-grid">
        {products.map((product) => (
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
  
