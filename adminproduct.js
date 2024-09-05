import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminProduct() {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8081/adminproduct')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products: ', error);
      });
  }, []);

  const addProduct = () => {
    axios.post('http://localhost:8081/addproduct', { name: productName, price: productPrice })
      .then(response => {
        console.log(response.data.message);
        // Refresh the list of products after adding
        axios.get('/products')
          .then(response => {
            setProducts(response.data);
          })
          .catch(error => {
            console.error('Error fetching products: ', error);
          });
      })
      .catch(error => {
        console.error('Error adding product: ', error);
      });
  };

  return (
    <div>
    <h1>Available Products</h1>
    <ul>
      {products.map(product => (
        <li key={product.product_id}>{product.product_name} - ${product.price}</li> // Add key prop here
      ))}
    </ul>
    
   
  </div>
  );
}

export default AdminProduct;
