import React from 'react';
import { useCart } from '../contexts/CartContext';
import styles from './Cart.module.scss';

interface Product {
  id: string;
  name: string;
  quantity: number;
  image: string;
  sizes?: string;
  price: number;
}

export const Cart: React.FC = () => {
  const { items, removeFromCart, updateQuantity, getCartTotal } = useCart();

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  if (items.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Your cart is empty</h2>
        <p>Add some products to your cart to see them here!</p>
      </div>
    );
  }

  return (
    <div className={styles['cart-page']}>
      <div className="promo-banner">
        <a href="#">Get 10% IN SAVINGS (5X pts) on products, services or donations thru 2/9* ›</a>
      </div>

      <div className="cart-header">
        <h1>my cart</h1>
        <div className="treats-rewards">
          <span className="rewards-text">Sign in or join Treats Rewards to earn points on this purchase.</span>
          <a href="#" className="sign-in">Sign in</a>
          <button className="continue-btn">continue to checkout</button>
        </div>
      </div>

      <div className="cart-content">
        <div className="cart-items">
          <table className="cart-table">
            <thead>
              <tr>
                <th>item</th>
                <th>how to get it</th>
                <th>unit price</th>
                <th>qty</th>
                <th>item total</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item: Product) => (
                <tr key={item.id}>
                  <td>
                    <div className="item-details">
                      <img src={item.image} alt={item.name} />
                      <div className="item-info">
                        <h3>{item.name}</h3>
                        <div className="delivery-options">
                          <label>
                            <input type="radio" name={`delivery-${item.id}`} defaultChecked />
                            Pick up in store
                          </label>
                          <label>
                            <input type="radio" name={`delivery-${item.id}`} />
                            Ship to me
                          </label>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>Pick up in store</td>
                  <td className="price">${item.price}</td>
                  <td>
                    <select 
                      className="quantity"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                    >
                      {[...Array(10)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                      ))}
                    </select>
                  </td>
                  <td className="price">${(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <a className="remove" onClick={() => removeFromCart(item.id)}>Remove</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="cart-summary">
          <div className="subtotal">
            <span className="label">Merchandise total:</span>
            <span className="amount">
              ${getCartTotal().toFixed(2)}
            </span>
          </div>
          <div className="estimated-total">
            <span>Estimated Total</span>
            <span className="amount">
              ${getCartTotal().toFixed(2)}
            </span>
          </div>
          <button className="checkout-btn">continue to checkout</button>
          <div className="points-earned">
            <span className="points">Earn {Math.floor(getCartTotal() * 10)} points</span>
            <span> on this purchase</span>
          </div>
        </div>
      </div>

      <div className="promo-code">
        <h3>Add a Promo Code</h3>
        <div className="promo-input">
          <input type="text" placeholder="Enter Promo Code" />
          <button>Apply</button>
        </div>
      </div>

      <div className="charity-donation">
        <h3>PetSmart Charities® Donation</h3>
        <p>Earn 2X points on every donation. Your donation helps pets in need & all while you shop.</p>
        <div className="donation-input">
          <input type="number" placeholder="$1" min="1" />
          <button>Apply</button>
        </div>
      </div>
    </div>
  );
}; 