import React,{ useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComp from './components/NavbarComp';
import Carousel from 'react-bootstrap/Carousel';
import { Card, Button } from 'react-bootstrap';
import sliderImage from './s17.jpg';
import sliderImage1 from './s13.jpg';
import sliderImage2 from './a2.jpg';


function HomePage() {
    const [products, setProducts] = useState([]);
  

  useEffect(() => {
    fetch('http://localhost:8081/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

    const handleTitleClick = (productId) => {
      console.log('clicked');
      window.location.href = `/product/${productId}`;
    };
  
  return (
    <div className='App'>
      <NavbarComp/>
      <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
           src={sliderImage1} 
          alt="First slide"
          style={{ width: '650px', height: '440px' }}
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={sliderImage}
          alt="Second slide"
           style={{ width: '800px', height: '440px' }}
        />
      </Carousel.Item>
      <Carousel.Item>
         <img
           className="d-block w-100"
          src={sliderImage2}
         alt="Third slide"
             style={{ width: '800px', height: '440px' }}
         />
       </Carousel.Item>
    </Carousel>
    <br></br>
    <div className="container" >
    <div style={{textAlign: 'center', marginTop: '20px',fontFamily: 'Arial, sans-serif', fontSize: '1rem'}} >
    <h1 className="mb-4">Browse Collection</h1>
</div>
      <div className="row row-cols-1 row-cols-md-5 g-4">
        {products.map(product => (
          <div key={product.product_id} className="col">
       <Card className="h-100 position-relative">
  <Card.Img variant="top" src={`${process.env.PUBLIC_URL}/images/${product.product_img}`} />
  <Card.Body>
    <Card.Title>
  <span onClick={() => handleTitleClick(product.product_id)} style={{ cursor: 'pointer' }}>{product.product_name}</span>
</Card.Title>

    <Card.Text>
      {product.description.slice(0, 20)}
      {product.description.length > 20 && '...'}
    </Card.Text>
    <Card.Text className="fw-bold">Price: ${product.price}</Card.Text>
  </Card.Body>
</Card>

          </div>
        ))}
      </div>
    </div>
    </div>
  );
}

export default HomePage;
