import { useState } from 'react';

interface Product {
  name: string;
  status?: string;
  colors: string;
  originalPrice: number;
  discountedPrice: number;
  images: string[];
}

export const All = () => {
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [products] = useState<Product[]>([
    {
      name: "Wool Boyfriend Shirt Jacket",
      status: "Best seller",
      colors: "2 colors",
      originalPrice: 188.00,
      discountedPrice: 37.00,
      images: [
        "https://www.gap.com/webcontent/0056/179/974/cn56179974.jpg",
        "https://www.gap.com/webcontent/0056/180/123/cn56180123.jpg",
        "https://www.gap.com/webcontent/0056/182/361/cn56182361.jpg",
        "https://www.gap.com/webcontent/0056/180/145/cn56180145.jpg"
      ]
    },
    {
      name: "Modern Rib Cropped T-Shirt",
      status: "Selling fast",
      colors: "15 colors",
      originalPrice: 29.95,
      discountedPrice: 19.99,
      images: [
        "https://www.gap.com/webcontent/0056/257/750/cn56257750.jpg",
        "https://www.gap.com/webcontent/0056/257/806/cn56257806.jpg",
        "https://www.gap.com/webcontent/0056/257/808/cn56257808.jpg",
        "https://www.gap.com/webcontent/0056/109/980/cn56109980.jpg"
      ]
    },
    {
      name: "High Rise Vintage Slim Jeans",
      status: "Best seller",
      colors: "2 colors",
      originalPrice: 79.95,
      discountedPrice: 31.00,
      images: [
        "https://www.gap.com/webcontent/0055/238/350/cn55238350.jpg",
        "https://www.gap.com/webcontent/0055/237/806/cn55237806.jpg",
        "https://www.gap.com/webcontent/0055/237/807/cn55237807.jpg",
        "https://www.gap.com/webcontent/0055/237/982/cn55237982.jpg"
      ]
    },
    {
      name: "Big Puff Coat",
      status: "Selling fast",
      colors: "1 color",
      originalPrice: 248.00,
      discountedPrice: 169.99,
      images: [
        "https://www.gap.com/webcontent/0056/671/389/cn56671389.jpg",
        "https://www.gap.com/webcontent/0056/668/444/cn56668444.jpg",
        "https://www.gap.com/webcontent/0056/671/434/cn56671434.jpg",
        "https://www.gap.com/webcontent/0056/671/447/cn56671447.jpg"
      ]
    },
    {
      name: "Cropped Duvet Wrap Puffer Jacket",
      status: "Really big deal",
      colors: "3 colors",
      originalPrice: 168.00,
      discountedPrice: 67.00,
      images: [
        "https://www.gap.com/webcontent/0056/840/860/cn56840860.jpg",
        "https://www.gap.com/webcontent/0056/840/875/cn56840875.jpg",
        "https://www.gap.com/webcontent/0056/840/881/cn56840881.jpg",
        "https://www.gap.com/webcontent/0056/840/890/cn56840890.jpg"
      ]
    },
    {
      name: "High Rise BiStretch Flare Pants",
      status: "Best seller",
      colors: "2 colors",
      originalPrice: 79.95,
      discountedPrice: 39.00,
      images: [
        "https://www.gap.com/webcontent/0055/285/967/cn55285967.jpg",
        "https://www.gap.com/webcontent/0055/285/974/cn55285974.jpg",
        "https://www.gap.com/webcontent/0055/286/119/cn55286119.jpg",
        "https://www.gap.com/webcontent/0055/286/114/cn55286114.jpg"
      ]
    },
    {
      name: "Modern Rib Cropped T-Shirt",
      status: "Really big deal",
      colors: "15 colors",
      originalPrice: 29.95,
      discountedPrice: 14.00,
      images: [
        "https://www.gap.com/webcontent/0056/223/918/cn56223918.jpg",
        "https://www.gap.com/webcontent/0056/189/594/cn56189594.jpg",
        "https://www.gap.com/webcontent/0056/189/609/cn56189609.jpg",
        "https://www.gap.com/webcontent/0056/105/781/cn56105781.jpg"
      ]
    },
    {
      name: "Modern Rib Cropped Boatneck T-Shirt",
      status: "50% off: limited time",
      colors: "5 colors",
      originalPrice: 34.95,
      discountedPrice: 24.99,
      images: [
        "https://www.gap.com/webcontent/0056/090/989/cn56090989.jpg",
        "https://www.gap.com/webcontent/0056/090/976/cn56090976.jpg",
        "https://www.gap.com/webcontent/0056/090/981/cn56090981.jpg",
        "https://www.gap.com/webcontent/0056/014/810/cn56014810.jpg"
      ]
    },
    {
      name: "Icon Denim Jacket",
      status: "Selling fast",
      colors: "2 colors",
      originalPrice: 79.95,
      discountedPrice: 31.00,
      images: [
        "https://www.gap.com/webcontent/0055/905/252/cn55905252.jpg",
        "https://www.gap.com/webcontent/0055/905/270/cn55905270.jpg",
        "https://www.gap.com/webcontent/0055/905/276/cn55905276.jpg",
        "https://www.gap.com/webcontent/0055/905/285/cn55905285.jpg"
      ]
    },
    {
      name: "Lightweight Modern T-Shirt",
      status: "Really big deal",
      colors: "4 colors",
      originalPrice: 34.95,
      discountedPrice: 13.00,
      images: [
        "https://www.gap.com/webcontent/0057/053/744/cn57053744.jpg",
        "https://www.gap.com/webcontent/0057/053/710/cn57053710.jpg",
        "https://www.gap.com/webcontent/0057/053/711/cn57053711.jpg",
        "https://www.gap.com/webcontent/0057/015/245/cn57015245.jpg"
      ]
    },
    {
      name: "Denim Mini Skort",
      status: "Really big deal",
      colors: "2 colors",
      originalPrice: 59.95,
      discountedPrice: 17.00,
      images: [
        "https://www.gap.com/webcontent/0057/220/125/cn57220125.jpg",
        "https://www.gap.com/webcontent/0057/219/764/cn57219764.jpg",
        "https://www.gap.com/webcontent/0057/220/602/cn57220602.jpg",
        "https://www.gap.com/webcontent/0057/220/616/cn57220616.jpg"
      ]
    },
    {
      name: "Modern T-Shirt Thong Bodysuit",
      status: "Extra 50% off at checkout",
      colors: "2 colors",
      originalPrice: 44.95,
      discountedPrice: 34.99,
      images: [
        "https://www.gap.com/webcontent/0056/301/497/cn56301497.jpg",
        "https://www.gap.com/webcontent/0056/299/326/cn56299326.jpg",
        "https://www.gap.com/webcontent/0056/299/342/cn56299342.jpg",
        "https://www.gap.com/webcontent/0056/167/900/cn56167900.jpg"
      ]
    },
    {
      name: "Featherweight Turtleneck",
      status: "Really big deal",
      colors: "13 colors",
      originalPrice: 34.95,
      discountedPrice: 13.00,
      images: [
        "https://www.gap.com/webcontent/0056/708/579/cn56708579.jpg",
        "https://www.gap.com/webcontent/0056/708/086/cn56708086.jpg",
        "https://www.gap.com/webcontent/0056/708/092/cn56708092.jpg",
        "https://www.gap.com/webcontent/0056/722/416/cn56722416.jpg"
      ]
    },
    {
      name: "Oversized Icon Denim Jacket",
      status: "Really big deal",
      colors: "2 colors",
      originalPrice: 99.95,
      discountedPrice: 39.00,
      images: [
        "https://www.gap.com/webcontent/0055/978/091/cn55978091.jpg",
        "https://www.gap.com/webcontent/0055/977/982/cn55977982.jpg",
        "https://www.gap.com/webcontent/0055/977/987/cn55977987.jpg",
        "https://www.gap.com/webcontent/0055/978/011/cn55978011.jpg"
      ]
    },
    {
      name: "High Rise Stride Wide-Leg Cargo Jeans",
      status: "Really big deal",
      colors: "11 colors",
      originalPrice: 89.95,
      discountedPrice: 35.00,
      images: [
        "https://www.gap.com/webcontent/0055/151/900/cn55151900.jpg",
        "https://www.gap.com/webcontent/0055/149/999/cn55149999.jpg",
        "https://www.gap.com/webcontent/0055/150/057/cn55150057.jpg",
        "https://www.gap.com/webcontent/0055/150/054/cn55150054.jpg"
      ]
    },
    {
      name: "Modern Rib Cropped T-Shirt",
      status: "Really big deal",
      colors: "15 colors",
      originalPrice: 29.95,
      discountedPrice: 11.00,
      images: [
        "https://www.gap.com/webcontent/0056/970/628/cn56970628.jpg",
        "https://www.gap.com/webcontent/0056/970/183/cn56970183.jpg",
        "https://www.gap.com/webcontent/0056/970/198/cn56970198.jpg",
        "https://www.gap.com/webcontent/0056/974/432/cn56974432.jpg"
      ]
    }
  ]);

  return (
    <div className="store-layout">
      <h1 className="page-title">NEW ARRIVALS</h1>
      
      <div className="filter-bar">
        <button className="filter-btn">
          <span className="icon">≡</span> All Filters (1)
        </button>
        <button className="filter-btn">Department (1)</button>
        <button className="filter-btn">Category</button>
        <button className="filter-btn">Size</button>
        <button className="filter-btn">Color</button>
        <span className="items-count">{products.length} Items</span>
        <button className="sort-btn">Sort ▾</button>
      </div>

      <div className="active-filters">
        <span className="filter-tag">
          Women <button className="remove-filter">×</button>
        </span>
      </div>

      <div className="products-grid">
        {products.map((product) => (
          <div
            key={product.name}
            className="product-card"
            onMouseEnter={() => setHoveredProduct(product.name)}
            onMouseLeave={() => setHoveredProduct(null)}
          >
            <div className="product-image">
              <img
                src={hoveredProduct === product.name ? product.images[1] : product.images[0]}
                alt={product.name}
                className="product-img"
              />
              {product.status && (
                <div className="product-status">
                  {product.status}
                </div>
              )}
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