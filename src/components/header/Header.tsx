import { Link, useLocation, useNavigate } from 'react-router-dom';
import './header.scss';
import { useAuth0 } from '@auth0/auth0-react';
import { useCart } from '../../contexts/CartContext';
import { useState } from 'react';

interface CartItem {
  quantity: number;
  // Add other cart item properties as needed
}

export const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, loginWithPopup, logout } = useAuth0();
  const { items } = useCart();
  const [showSearch, setShowSearch] = useState(false);
  const cartItemsCount = items.reduce((total: number, item: CartItem) => total + item.quantity, 0);

  const handleSearch = () => {
    setShowSearch(true);
    navigate('/search');
  };

  return (
    <header className="main-header">
      <nav>
        <ul>
          <li>
            <Link 
              to="/" 
              className={location.pathname === '/' ? 'active' : ''}
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              to="/dog"
              className={location.pathname === '/dog' ? 'active' : ''}
            >
              Dog
            </Link>
          </li>
          <li>
            <Link 
              to="/womens"
              className={location.pathname.startsWith('/womens') ? 'active' : ''}
            >
              Women's Clothing
            </Link>
          </li>
          <li>
            <Link 
              to="/tv"
              className={location.pathname === '/tv' ? 'active' : ''}
            >
              TVs & Electronics
            </Link>
          </li>
          <li>
            <Link to="/instore" className={location.pathname === '/instore' ? 'active' : ''}>
              InStore
            </Link>
          </li>
          <li>
            <Link 
              to="/cart"
              className={location.pathname === '/cart' ? 'active' : ''}
            >
              Cart {cartItemsCount > 0 && <span className="cart-count">{cartItemsCount}</span>}
            </Link>
          </li>
          {isAuthenticated && (
            <>
              <li>
                <Link 
                  to="/profile"
                  className={location.pathname === '/profile' ? 'active' : ''}
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link 
                  to="/personalized"
                  className={location.pathname === '/personalized' ? 'active' : ''}
                >
                  Personalized
                </Link>
              </li>
              <li>
                <button 
                  className="auth-button"
                  onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                >
                  Sign Out
                </button>
              </li>
            </>
          )}
          {!isAuthenticated && (
            <li>
              <button 
                className="auth-button"
                onClick={() => loginWithPopup()}
              >
                Sign In
              </button>
            </li>
          )}
        </ul>
      </nav>
      <div className="header-right">
        <button className="header-link" onClick={handleSearch}>
          <span className="material-symbols-outlined">search</span>
        </button>
      </div>
    </header>
  );
};