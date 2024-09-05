import React, { useState, useEffect , Component} from 'react';
import NavbarComp from './components/NavbarComp';
import {  Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import axios from 'axios';

//import Cart from './Cart'



function Product() {
    const { productid } = useParams();
    const history = useHistory();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1); 
    const [cart, setCart] = useState('');

    console.log("Product ID:", productid);

    useEffect(() => {
        fetch(`http://localhost:8081/viewproducts?productid=${productid}`)
          .then(response => response.json())
          .then(data => setProduct(data[0])) 
          .catch(error => console.error('Error fetching product:', error));
      }, [productid]);

   
    const handleAddToCart = () => {
    const customer_id = localStorage.getItem('customer_id');

        axios.post('http://localhost:8081/addtocart', {
            customer_id,
            product_id: product.product_id,
            quantity,
        })
        .then(response => {
            if (response.data === 'success') {
                window.location.href = '/cart';

            } else {
                console.error('Error adding item to cart:', response.data);
                alert('Please Login first to add items to cart');
            }
        })
        .catch(error => {
            console.error('Error adding item to cart:', error);
            alert('Error adding item to cart. Please try again.');
        });
    };

   
    return (
        <div className="container">
          <NavbarComp />
          <h1 className="mb-4">Product Details</h1>
          <div className="container">
            {product && (
                <div>
                    <h1 className="mb-4">{product.product_name}</h1>
                    <div className="row">
                        <div className="col-md-4">
                            <img src={`${process.env.PUBLIC_URL}/images/${product.product_img}`} alt={product.product_name} className="img-fluid" />
                        </div>
                        <div className="col-md-8">
                            <p><strong>Description:</strong> {product.description}</p>
                            <p><strong>Price:</strong> ${product.price}</p>
                            <label htmlFor="quantity">Quantity:</label>
                            <input type="number" id="quantity" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} min="1" />
                            <br></br>
                             <Button onClick={handleAddToCart} className="mt-3" variant="primary">Add to Cart</Button> 
                        </div>
                    </div>
                </div>
            )}
        </div>
        </div>
      );
}

export default Product;
