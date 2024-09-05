import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminProduct() {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8081/vieworders')
      .then(response => {
        setProducts(response.data);
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

export default AdminProduct;
