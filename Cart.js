import React, { useState, useEffect } from 'react';
import NavbarComp from './components/NavbarComp';
import { Table, Button } from "react-bootstrap";
import axios from 'axios';
import { Redirect } from 'react-router-dom'; 

const Cart = () => {
    const [cart, setCart] = useState('');
    const [paymentOption, setPaymentOption] = useState('online');
    let grandTotal = 0;

  if (Array.isArray(cart) && cart.length > 0) {
    grandTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }

    useEffect(() => {
        const customer_id = localStorage.getItem('customer_id'); // Get customer_id from localStorage session variable

        axios.post('http://localhost:8081/getcart', { customer_id })
            .then(response => {
                setCart(response.data); // Assuming the API returns cart data in the expected format
            })
            .catch(error => {
                console.error('Error fetching cart:', error);
                // Handle error
            });
    }, []);
 
    const handleCheckout = () => {
      const customer_id = localStorage.getItem('customer_id');
      
      console.log(paymentOption)
  if (paymentOption == "cash") {
    
    axios.post('http://localhost:8081/addorder', {
      customer_id,
      grandTotal,
      paymentOption

  })
  .then(response => {
    const { data } = response;
    // Redirect based on payment option
    if (data.success) {
      window.location.href = '/orders';
    } else  {
      console.error('Something went wrong..!');
      //alert('Payment failed. Please try again.');
    }
  })
  .catch(error => {
    console.error('Error adding item to cart:', error);
    //alert('Error adding item to cart. Please try again.');
});
  }  else if (paymentOption == 'online') {
    console.log('this is online');
    window.location.href = '/payment';
  } else {
    
  }

};
    


    
    const handleClearCart = () => {
        // Implement checkout functionality here
        console.log("clear clicked");
    };
    const handlePaymentOptionChange = (event) => {
      setPaymentOption(event.target.value);
    };


    return (
        <div className="container">
        <NavbarComp />
        <h1 className="m-4">Cart</h1>

        <div className="container">
          {cart.length > 0 ? (
            <Table striped bordered responsive>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => (
                   
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.product_name}</td>
                    <td>{item.quantity}</td>
                    <td>${item.price * item.quantity}</td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="3">Grand Total</td>
                  <td>${grandTotal}</td>
                </tr>
              </tbody>
            </Table>
          ) : (
            <p>Your cart is empty</p>
          )}
         
         <div className="payment-options">
          <h2>Payment Option</h2>
        <div className="form-check">
          <input
            type="radio"
            id="onlinePayment"
            name="paymentOption"
            value="online"
            className="form-check-input"
            onChange={handlePaymentOptionChange}
            checked={paymentOption === 'online'}
          />
          <label htmlFor="onlinePayment" className="form-check-label">Online Payment</label>
        </div>
        <div className="form-check">
          <input
            type="radio"
            id="cashOnDelivery"
            name="paymentOption"
            value="cash"
            className="form-check-input"
            onChange={handlePaymentOptionChange}
            checked={paymentOption === 'cash'}
          />
          <label htmlFor="cashOnDelivery" className="form-check-label">Cash on Delivery</label>
        </div>
      </div>
         
            <Button onClick={handleCheckout} className="mt-3 mr-2" variant="primary">
            Checkout
          </Button>
          {/* <Button onClick={handleClearCart} className="mt-3" variant="danger">
            Clear Cart
          </Button>   */}
        </div>
        </div>
      );
}

export default Cart;
