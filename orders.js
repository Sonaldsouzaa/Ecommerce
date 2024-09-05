import React, { useState } from 'react';
import axios from 'axios';

function OrderPage() {
  const [orderCompleted, setOrderCompleted] = useState(false);
  const tick ="C:\Users\Payal Edline\Desktop\project\frontend\my-react-app\public\images\tick.jpeg"
  const handleOrder = async (customer_id, grandTotal, paymentOption) => {
    try {
      const response = await axios.post('/addorder', {
        customer_id,
        grandTotal,
        paymentOption
      });
      if (response.data.success) {
        setOrderCompleted(true);
      } else {
        console.error('Error processing order:', response.data.error);
      }
    } catch (error) {
      console.error('Error processing order:', error);
    }
  };

  return (
    <div className="container mt-5">
      {!orderCompleted ? (
        <div>
          <h1>Order Complete</h1>
          <p>Your order has been successfully processed.</p>
        </div>
      ) : (
        <div>
          <h1>Order Completed</h1>
          <p>Your order has been successfully processed.</p>
          <img src={tick} alt="Tick" style={{ width: '100px', height: '100px' }} />
        </div>
      )}
    </div>
  );
}

export default OrderPage;
