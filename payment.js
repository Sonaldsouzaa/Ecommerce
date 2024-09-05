import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import QRCode from 'qrcode.react';
import axios from 'axios';

function Payment() {
  const qrCodeData = 'C:\Users\Payal Edline\Desktop\project\frontend\my-react-app\public\images\qr.jpeg';
  const [orderData, setOrderData] = useState(null);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [cart, setCart] = useState('');
  const [totalAmount, settotalAmount] = useState('');

  const handleChange = (event) => {
    settotalAmount(event.target.value); 
  };

  useEffect(() => {
    const customer_id = localStorage.getItem('customer_id'); 
    axios.post('http://localhost:8081/getcart', { customer_id })
        .then(response => {
            setCart(response.data); 
        })
        .catch(error => {
            console.error('Error fetching cart:', error);
        });
}, []);

  const handlePaymentConfirmation = () => {
    const grandTotal = document.getElementById('totalAmountInput').value;

    const customer_id = localStorage.getItem('customer_id'); 
    const paymentOption = 'online';
    console.log(grandTotal);
    axios.post('http://localhost:8081/payment', {
      customer_id,
      grandTotal,
      paymentOption

  })
  .then(response => {
    const { data } = response;
    if (data.success) {
      window.location.href = '/orders';
    } else  {
      console.error('Something went wrong..!');
    }
  })
  .catch(error => {
    console.error('Error adding item to cart:', error);
});
  };

 
  const calculateTotalAmount = (cart) => {
    let total = 0;
    cart.forEach((item) => {
      total += parseFloat(item.price);
    });
    return total.toFixed(2); 
  };

  return (
    <Container>
     <Row className="justify-content-center">
  <Col xs={12} md={8}>
    <div className="text-center my-5">
      <h3>Scan the QRCode and Confirm Payment</h3>
    </div>
    {cart && cart.length > 0 && (
      <>
        <div className="text-center my-3">
          <QRCode value={qrCodeData} />
        </div>
        <div className="text-center my-3">
          <p>Total Amount: {calculateTotalAmount(cart)}</p>
          <input type="text"  id="totalAmountInput" 
 onChange={handleChange} value={calculateTotalAmount(cart)}></input>
        </div>
        <div className="text-center my-3">
          <Button onClick={handlePaymentConfirmation}>Confirm Payment</Button>
        </div>
      </>
    )}
  </Col>
</Row>
    </Container>
  );
}

export default Payment;
