import { useEffect, useState } from 'react';
import './OrderPaymentConfirmation.scss';

interface OrderDetails {
  orderId: string;
  orderDate: string;
}

export const OrderPaymentConfirmation = () => {
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);

  useEffect(() => {
    // Generate order ID and date
    const orderId = `GAP${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    const orderDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    setOrderDetails({
      orderId,
      orderDate
    });

    // Clear storage
    localStorage.removeItem('orderDetails');
    localStorage.removeItem('cart');
  }, []);

  if (!orderDetails) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Loading your order confirmation...</p>
    </div>
  );

  return (
    <div className="order-confirmation-page">
      <div className="confirmation-container">
        <div className="confirmation-header">
          <span className="success-icon">✓</span>
          <h1>Thank you for your order!</h1>
          <p className="order-info">
            Order #{orderDetails.orderId} • {orderDetails.orderDate}
          </p>
        </div>
        <div className="action-buttons">
          <button className="primary-btn" onClick={() => window.location.href = '/'}>
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}; 