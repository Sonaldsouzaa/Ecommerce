import React from 'react';

const About = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="card">
            <div className="card-body">
              <h1 className="card-title text-center">Welcome to Shopper! 🛍️</h1>
              <p className="card-text text-center">
                At Shopper, we're all about making your shopping experience delightful and hassle-free.
                Whether you're a trendsetter, a savvy shopper, or just looking to treat yourself, we've got you covered.
              </p>
              <p className="card-text text-center">
              Explore our curated selection of Clothes, Accessories, and Footwear for both men and women.
              </p>
              <h2 className="card-title">Why shop with us?</h2>
              <ul className="list-group">
                <li className="list-group-item">Wide Selection: From fashion-forward clothing to cutting-edge electronics, we've got something for everyone.</li>
                <li className="list-group-item">Immerse yourself in the latest trends and styles, from chic attire to stylish accessories and comfortable footwear.!</li>
                <li className="list-group-item">Our user-friendly interface ensures a seamless shopping experience, with easy navigation and secure transactions. </li>
                <li className="list-group-item">Amazing Deals: Who doesn't love a good deal? Keep an eye out for our regular promotions, discounts, and exclusive offers. Saving money while shopping? Yes, please!</li>
                <li className="list-group-item">Friendly Customer Support: Have a question or need assistance? Our customer support team is here to help. Reach out via chat, email, or phone – we're just a message away.</li>
                <li className="list-group-item">Fast and Reliable Shipping: We know waiting for your goodies can be tough. That's why we strive to get your orders to you as quickly as possible, without compromising on quality.</li>
              </ul>
              <p className="card-text text-center"> For inquiries, reach us at info@shopper.com or call us at +1 (123) 456-7890.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
