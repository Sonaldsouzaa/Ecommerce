import React,{ useState, useEffect } from 'react';
import NavbarComp from './components/NavbarComp';
import { Card, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';


function Category() {
    const { category } = useParams();

    const [products, setProducts] = useState([]);

    console.log("Category:", category);

    useEffect(() => {
        fetch(`http://localhost:8081/products?category=${category}`)
          .then(response => response.json())
          .then(data => setProducts(data))
          .catch(error => console.error('Error fetching products:', error));
      }, [category]);
  
    return (
      <div className='App'>
        <NavbarComp/>
       
      <div className="container">
        <h1 className="mb-4">Category  </h1>
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {products.map(product => (
            <div key={product.product_id} className="col">
              <Card className="h-100 position-relative">
                <Card.Img variant="top" src={`${process.env.PUBLIC_URL}/images/${product.product_img}`} />
                <Card.Body>
                  {/* Make the title a link */}
                  <Card.Title>
                    <Link to={`/product/${product.product_id}`}>{product.product_name}</Link>
                  </Card.Title>
                  <Card.Text>
                    {product.description.slice(0, 20)}
                    {product.description.length > 20 && '...'}
                  </Card.Text>
                  <Card.Text className="fw-bold">Price: ${product.price}</Card.Text>
                  {/* <Button className="position-absolute bottom-0 end-0 mb-2 me-2" variant="primary">Add to Cart</Button> */}
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
        {/* Add your home page content here */}
      </div>
    );
  }

export default Category



