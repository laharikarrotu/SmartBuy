import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import './Cart.scss';

interface Product {
  id: string;
  name: string;
  quantity: number;
  image: string;
  sizes?: string;
  price: number;
}

export const Cart: React.FC = () => {
  const { items, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();
  const [isAddressComplete, setIsAddressComplete] = useState(false);
  const [selectedShipping, setSelectedShipping] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState('');
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState('pickup'); // 'pickup' or 'ship'
  const [showShippingForm, setShowShippingForm] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    fullName: '',
    street: '',
    apt: '',
    city: '',
    state: '',
    zipCode: '',
    phone: ''
  });

  const shippingOptions = [
    { method: 'Same-Day Delivery', cost: 9.99, time: 'Today' },
    { method: 'Curbside Pickup', cost: 0.00, time: 'Ready in 2 hours' },
    { method: 'In-Store Pickup', cost: 0.00, time: 'Ready in 1 hour' },
    { method: 'Standard Shipping', cost: 5.99, time: '2-4 business days' }
  ];

  const calculateSubtotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getShippingCost = () => {
    const selectedOption = shippingOptions.find(option => option.method === selectedShipping);
    return selectedOption ? selectedOption.cost : 0;
  };

  const subtotal = calculateSubtotal();
  const shipping = getShippingCost();
  const tax = subtotal * 0.0825; // 8.25% tax
  const total = subtotal + shipping + tax;

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAddressComplete(true);
  };

  const handleEditAddress = () => {
    setIsAddressComplete(false);
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleShippingSelect = (option: typeof shippingOptions[0]) => {
    setSelectedShipping(option.method);
  };

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      if (!phoneNumber) throw new Error('Please enter a phone number');
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsCodeSent(true);
      setError('Verification code sent!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!verificationCode) throw new Error('Please enter verification code');
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsVerified(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid verification code');
    }
  };

  const handlePaymentCompletion = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsPaymentComplete(true);
      setTimeout(() => {
        navigate('/order-confirmation');
      }, 2000);
    } catch (err) {
      setError('Payment failed. Please try again.');
    }
  };

  return (
    <div className="cart-page">
      <h1>my cart</h1>

      <div className="cart-container">
        <div className="cart-items-section">
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
              {items.map((item) => (
                <tr key={item.id} className="cart-item">
                  <td className="item-info">
                    <img src={item.image} alt={item.name} />
                    <div className="item-details">
                      <h3>{item.name}</h3>
                    </div>
                  </td>
                  <td>{deliveryMethod === 'pickup' ? 'Pick up in store' : 'Ship to address'}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>
                    <select
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                    >
                      {[1,2,3,4,5,6,7,8,9,10].map(num => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    ${(item.price * item.quantity).toFixed(2)}
                    <button 
                      className="remove-btn"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="shipping-section">
            <h2>Shipping Address</h2>
            {!isAddressComplete ? (
              <div className="shipping-address-form">
                <form onSubmit={handleSaveAddress}>
                  <div className="form-group">
                    <label htmlFor="fullName">Full Name*</label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={shippingAddress.fullName}
                      onChange={handleAddressChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="street">Street Address*</label>
                    <input
                      type="text"
                      id="street"
                      name="street"
                      value={shippingAddress.street}
                      onChange={handleAddressChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="apt">Apt/Suite (optional)</label>
                    <input
                      type="text"
                      id="apt"
                      name="apt"
                      value={shippingAddress.apt}
                      onChange={handleAddressChange}
                    />
                  </div>

                  <div className="form-row three-columns">
                    <div className="form-group">
                      <label htmlFor="city">City*</label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={shippingAddress.city}
                        onChange={handleAddressChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="state">State*</label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={shippingAddress.state}
                        onChange={handleAddressChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="zipCode">ZIP Code*</label>
                      <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={shippingAddress.zipCode}
                        onChange={handleAddressChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone Number*</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={shippingAddress.phone}
                      onChange={handleAddressChange}
                      required
                    />
                  </div>

                  <div className="form-actions">
                    <button type="submit" className="save-address-btn">
                      Save & Continue
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="address-summary">
                <div className="summary-content">
                  <h3>Shipping to:</h3>
                  <p>{shippingAddress.fullName}</p>
                  <p>{shippingAddress.street} {shippingAddress.apt}</p>
                  <p>{shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}</p>
                  <p>{shippingAddress.phone}</p>
                  <button className="edit-address-btn" onClick={handleEditAddress}>
                    Edit
                  </button>
                </div>
              </div>
            )}

            {/* Shipping Options - only show when address is complete */}
            {isAddressComplete && (
              <div className="shipping-options">
                <h2>Choose Delivery Method</h2>
                <div className="shipping-options-list">
                  {shippingOptions.map((option, index) => (
                    <div 
                      key={index}
                      className={`shipping-option ${selectedShipping === option.method ? 'selected' : ''}`}
                      onClick={() => setSelectedShipping(option.method)}
                    >
                      <div className="option-details">
                        <div className="option-main">
                          <input
                            type="radio"
                            name="shipping"
                            checked={selectedShipping === option.method}
                            onChange={() => setSelectedShipping(option.method)}
                          />
                          <span className="method">{option.method}</span>
                        </div>
                        <div className="option-info">
                          <span className="time">{option.time}</span>
                          <span className="cost">
                            {option.cost === 0 ? 'FREE' : `$${option.cost.toFixed(2)}`}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className={`order-summary ${isAddressComplete ? 'active' : ''}`}>
          <h2>Order Summary</h2>
          <div className="summary-details">
            <div className="summary-row">
              <span>Merchandise total:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            {selectedShipping && (
              <div className="summary-row">
                <span>Shipping:</span>
                <span>
                  {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
            )}
            <div className="summary-row">
              <span>Estimated tax:</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="summary-row total">
              <span>Estimated Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <div className="rewards-points">
            <p>Earn {Math.floor(total * 10)} points on this purchase</p>
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
              <input type="number" defaultValue={1} min={1} />
              <button>Apply</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 