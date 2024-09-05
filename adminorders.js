import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8081/adminorders')
      .then(response => {
        setOrders(response.data);
      })
      .catch(error => {
        console.error('Error fetching products: ', error);
      });
  }, []);

  
  return (
    <div>
    <h1>Orders</h1>
    <ul>
      {orders.map(order => (
        <li key={order.order_id}>{order.customer_id}-{order.order_date} - ${order.total_amount}</li> // Add key prop here
      ))}
    </ul>
    
   
  </div>
  );
}

export default AdminOrders;
