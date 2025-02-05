import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './cart.scss';

interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  color: string;
  size: string;
  fit: string;
  quantity: number;
  image: string;
}

export const Cart = () => {
  const { isAuthenticated } = useAuth0();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [error, setError] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [activeSection, setActiveSection] = useState('cart');
  const [paymentLink, setPaymentLink] = useState('');
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    fullName: '',
    street: '',
    apt: '',
    city: '',
    state: '',
    zipCode: '',
    phone: ''
  });
  const [isAddressComplete, setIsAddressComplete] = useState(false);
  const [selectedShipping, setSelectedShipping] = useState<{
    method: string;
    cost: number;
    time: string;
  } | null>(null);
  const [taxRate] = useState(0.0825); // 8.25% tax rate example
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showRewardsDiscount, setShowRewardsDiscount] = useState(false);

  // Pre-saved data for authenticated users
  const savedUserData = {
    shippingAddress: {
      fullName: 'Venu Alla',
      street: '525 Lakehill Way',
      apt: '525',
      city: 'Alpharetta',
      state: 'GA',
      zipCode: '30022',
      phone: '+16172012157'
    },
    shipping: {
      method: 'Standard Shipping',
      cost: 9.99,
      time: '3-5 business days'
    },
    verificationData: {
      phoneNumber: '+16172012157',
      isVerified: true,
      verificationCode: '0'
    }
  };

  // Load pre-saved data when user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      // Set shipping address
      setShippingAddress(savedUserData.shippingAddress);
      
      // Set shipping method
      setSelectedShipping(savedUserData.shipping);
      
      // Set phone verification status
      setPhoneNumber(savedUserData.verificationData.phoneNumber);
      setVerificationCode(savedUserData.verificationData.verificationCode);
      setIsCodeSent(true);
      setIsVerified(true);
      setIsAddressComplete(true);
      
      // Skip to payment section
      setActiveSection('payment');
    }
  }, [isAuthenticated]);

  useEffect(() => {
    // Load cart items from localStorage
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(savedCart);
  }, []);

  const shippingOptions = [
    { method: 'No-Rush Shipping', cost: 0.00, time: '7-9 business days' },
    { method: 'Basic Shipping', cost: 5.99, time: '5-7 business days' },
    { method: 'Standard Shipping', cost: 9.99, time: '3-5 business days' },
    { method: 'Express Shipping', cost: 19.99, time: '2 business days' },
    { method: 'Priority Shipping', cost: 29.99, time: 'Next business day' }
  ];

  // Comment out the US states array
  /*
  const usStates = [
    { code: 'AL', name: 'Alabama' },
    { code: 'AK', name: 'Alaska' },
    // ... rest of states ...
  ];
  */

  // Update handleAddressSubmit to remove state requirement
  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const requiredFields = ['fullName', 'street', 'city', 'zipCode']; // removed 'state'
    const isValid = requiredFields.every(field => 
      shippingAddress[field as keyof typeof shippingAddress].trim() !== ''
    );

    if (isValid) {
      setIsAddressComplete(true);
    } else {
      setError('Please fill in all required fields');
    }
  };

  const handleShippingSelect = (option: typeof shippingOptions[0]) => {
    setSelectedShipping(option);
  };

  // Simplified handleSendCode
  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      if (!phoneNumber) throw new Error('Please enter a phone number');
      
      // Simulate code sending delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Always succeed
      setIsCodeSent(true);
      setVerificationId('fake-verification-id');
      setError('Verification code sent!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  // Simplified handleVerifyCode
  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      if (!verificationCode) throw new Error('Please enter verification code');
      
      // Simulate verification delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Always succeed
      setIsVerified(true);
      setError('');
      
      // Show rewards discount animation
      setShowRewardsDiscount(true);
      
      // Hide rewards popup after 1 second
      setTimeout(() => {
        setShowRewardsDiscount(false);
      }, 1000);
      
      setTimeout(() => {
        setActiveSection('payment');
      }, 1500);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid verification code');
    }
  };

  // Simulate sending payment link via SMS
  const sendPaymentLink = async () => {
    setError('');
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate fake payment link
      const fakePaymentLink = `https://payment.example.com/${Math.random().toString(36).substring(7)}`;
      setPaymentLink(fakePaymentLink);
      
      // Show success message
      setError('Payment link has been sent to your phone. Click the link below to simulate payment.');
    } catch (err) {
      setError('Failed to send payment link. Please try again.');
    }
  };

  // Save all order details before payment completion
  const saveOrderDetails = () => {
    const totals = calculateTotal();
    const orderDetails = {
      cartItems,
      shippingAddress,
      totals,
      isVerified,
      selectedShipping
    };
    localStorage.setItem('orderDetails', JSON.stringify(orderDetails));
  };

  // Simulate payment completion
  const handlePaymentCompletion = async () => {
    try {
      // Save all order details before payment completion
      saveOrderDetails();
      
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsPaymentComplete(true);
      
      // Redirect to Order Confirmation page after payment
      setTimeout(() => {
        window.location.href = '/order-payment-confirmation';
      }, 2000);
    } catch (err) {
      setError('Payment failed. Please try again.');
    }
  };

  // Calculate total with rewards discount
  const calculateTotal = () => {
    const subtotal = cartItems.reduce((sum, item) => {
      return sum + (item.originalPrice * item.quantity);
    }, 0);

    const savings = cartItems.reduce((sum, item) => {
      const savingsPerItem = item.originalPrice - item.price;
      return sum + (savingsPerItem * item.quantity);
    }, 0);

    // Add 5% rewards discount if verified
    const rewardsDiscount = isVerified ? (subtotal - savings) * 0.05 : 0;
    
    const shippingCost = selectedShipping?.cost || 0;
    const subtotalAfterSavings = subtotal - savings - rewardsDiscount;
    const tax = (subtotalAfterSavings + shippingCost) * taxRate;

    return {
      subtotal,
      savings,
      rewardsDiscount,
      shipping: shippingCost,
      tax: tax.toFixed(2),
      total: (subtotalAfterSavings + shippingCost + tax).toFixed(2)
    };
  };

  const totals = calculateTotal();

  return (
    <div className="cart-page">
      <div className="cart-container">
        <div className="cart-left">
          <h1>My Bag</h1>
          <p className="shipping-info">Shipping: {cartItems.length} item(s)</p>
          
          {/* <div className="alert-box">
            <span className="info-icon">ⓘ</span>
            <p>Selling FAST: these popular items in your bag can only be saved for 30 minutes.</p>
            <button className="close-alert">×</button>
          </div> */}

          {cartItems.map((item, index) => (
            <div key={index} className="cart-item">
              <div className="stock-warning">Almost sold out - this item is low in stock.</div>
              <div className="item-details">
                <img src={item.image} alt={item.name} />
                <div className="item-info">
                  <h3>{item.name}</h3>
                  <p className="item-id">#{item.id}</p>
                  <p className="item-color">Color: {item.color}</p>
                  <p className="item-size">Size: {item.size} ({item.fit})</p>
                  <div className="item-price">
                    <span className="original-price">${item.originalPrice.toFixed(2)}</span>
                    <span className="sale-price">${item.price.toFixed(2)}</span>
                  </div>
                  <div className="quantity-select">
                    <select 
                      defaultValue={item.quantity}
                      onChange={(e) => {
                        const newCart = [...cartItems];
                        newCart[index].quantity = Number(e.target.value);
                        setCartItems(newCart);
                        localStorage.setItem('cart', JSON.stringify(newCart));
                      }}
                    >
                      {[1,2,3,4,5].map(num => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <button 
                  className="remove-item"
                  onClick={() => {
                    const newCart = cartItems.filter((_, i) => i !== index);
                    setCartItems(newCart);
                    localStorage.setItem('cart', JSON.stringify(newCart));
                  }}
                >×</button>
              </div>
            </div>
          ))}

          <div className="shipping-address-container">
            <h2>Ship To</h2>
            {!isAddressComplete ? (
              <form onSubmit={handleAddressSubmit}>
                <div className="input-row">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={shippingAddress.fullName}
                    onChange={(e) => setShippingAddress({
                      ...shippingAddress,
                      fullName: e.target.value
                    })}
                  />
                </div>
                <div className="input-row">
                  <input
                    type="text"
                    placeholder="Street Address"
                    value={shippingAddress.street}
                    onChange={(e) => setShippingAddress({
                      ...shippingAddress,
                      street: e.target.value
                    })}
                  />
                  <input
                    type="text"
                    placeholder="Apt #"
                    value={shippingAddress.apt}
                    onChange={(e) => setShippingAddress({
                      ...shippingAddress,
                      apt: e.target.value
                    })}
                  />
                </div>
                <div className="input-row">
                  <input
                    type="text"
                    placeholder="Town/City"
                    value={shippingAddress.city}
                    onChange={(e) => setShippingAddress({
                      ...shippingAddress,
                      city: e.target.value
                    })}
                  />
                </div>
                <div className="input-row">
                  <input
                    type="text"
                    placeholder="Zip Code"
                    value={shippingAddress.zipCode}
                    onChange={(e) => setShippingAddress({
                      ...shippingAddress,
                      zipCode: e.target.value
                    })}
                  />
                </div>
                <button type="submit" className="continue-btn">Continue</button>
              </form>
            ) : (
              <div className="shipping-options">
                <div className="address-summary">
                  <h3>Shipping Address</h3>
                  <p>{shippingAddress.fullName}</p>
                  <p>{shippingAddress.street} {shippingAddress.apt}</p>
                  <p>{shippingAddress.city} {shippingAddress.zipCode}</p>
                  <button 
                    className="edit-address"
                    onClick={() => setIsAddressComplete(false)}
                  >
                    Edit
                  </button>
                </div>
                <h3>Choose Your Shipping Method</h3>
                {shippingOptions.map((option, index) => (
                  <div 
                    key={index}
                    className={`shipping-option ${selectedShipping?.method === option.method ? 'selected' : ''}`}
                    onClick={() => handleShippingSelect(option)}
                  >
                    <div className="option-details">
                      <span className="method">{option.method}</span>
                      <span className="time">{option.time}</span>
                    </div>
                    <span className="cost">
                      {option.cost === 0 ? 'FREE' : `$${option.cost.toFixed(2)}`}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="cart-right">
          <div className="order-summary">
            <h2>Order Summary</h2>
            {showRewardsDiscount && (
              <div className="rewards-popup">
                <div className="popup-content">
                  <div className="confetti-animation">🎉</div>
                  <h3>Welcome Rewards Member!</h3>
                  <p>You've unlocked an extra 5% discount</p>
                </div>
              </div>
            )}
            
            <div className="summary-details">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${totals.subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Savings</span>
                <span className="savings">-${totals.savings.toFixed(2)}</span>
              </div>
              {isVerified && (
                <div className="summary-row">
                  <span>Rewards Discount (5%)</span>
                  <span className="rewards-discount">-${totals.rewardsDiscount.toFixed(2)}</span>
                </div>
              )}
              <div className="summary-row">
                <span>Shipping</span>
                <span>{selectedShipping ? 
                  (totals.subtotal >= 50 || selectedShipping.cost === 0 ? 'FREE' : `$${totals.shipping.toFixed(2)}`) 
                  : 'TBD'}</span>
              </div>
              <div className="summary-row">
                <span>Est. Tax</span>
                <span>{selectedShipping ? `$${totals.tax}` : 'TBD'}</span>
              </div>
              <div className="summary-row total">
                <span>Est. Total</span>
                <span>{selectedShipping ? `$${totals.total}` : 'TBD'}</span>
              </div>
            </div>
          </div>

          <div className="auth-payment-container">
            <h2>Quick Pay</h2>
            {!isVerified ? (
              <div className="signin-section">
                {error && <div className="error">{error}</div>}
                <form onSubmit={handleSendCode}>
                  <div className="phone-input-row">
                    <div className="input-group">
                      <label htmlFor="phone">Ph No.  </label>
                      <input
                        type="tel"
                        id="phone"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="+1234567890"
                      />
                    </div>
                    <button type="submit">Send Code</button>
                  </div>
                </form>
                {isCodeSent && (
                  <form onSubmit={handleVerifyCode}>
                    <div className="verification-code-row">
                      <div className="input-group">
                        <label htmlFor="code">Verification Code </label>
                        <input
                          type="text"
                          id="code"
                          value={verificationCode}
                          onChange={(e) => setVerificationCode(e.target.value)}
                          placeholder="Enter code"
                        />
                      </div>
                      <button type="submit">Verify</button>
                    </div>
                  </form>
                )}
              </div>
            ) : !isPaymentComplete ? (
              <div className="payment-section">
                <div className="payment-content">
                  {!paymentLink ? (
                    <button onClick={sendPaymentLink} className="send-link-btn">
                      Send Payment Link via SMS
                    </button>
                  ) : (
                    <div className="payment-link-section">
                      <p>Payment link sent!</p>
                      <button 
                        onClick={handlePaymentCompletion}
                        className="wallet-pay-btn"
                      >
                        Complete Payment with Wallet
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="payment-success">
                <span className="success-tick">✓</span>
                <p>Payment Successful! Redirecting to Order Confirmation...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Add this to your global.d.ts or similar type declaration file
declare global {
  interface Window {
    recaptchaVerifier: any;
  }
} 