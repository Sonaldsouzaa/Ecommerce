import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from './login';
import HomePage from './Homepage';
import Category from './Category';
import Product from './Product';
import About from './About';
import Signup from './Signup';
import Cart from './Cart';
import AdminLogin from './adminlogin';
import Dashboard from './dashboard';
//import App from './addproduct'
import AdminProduct from './adminproduct';
import Payment from './payment';
import Order from './orders';
import AddProduct from './addProduct';
import AdminOrders from './adminorders';

function App() {
  return (

    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/products">
          <Product />
        </Route>
        <Route path="/adminproduct">
          <AdminProduct />
        </Route>
        <Route path="/addproduct">
          <AddProduct />
        </Route>
        <Route path="/adminorders">
          <AdminOrders />
        </Route>
        <Route path="/adminlogin">
          <AdminLogin />
        </Route>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/category/:category">
          <Category />
          </Route>
          <Route path="/product/:productid">
          <Product />
        </Route>
        <Route path="/about">
            <About/>
            </Route>
            <Route path="/register">
          <Signup />
        </Route>
          <Route path="/cart">
            <Cart />
          </Route>
          <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="/payment">
          < Payment/>
          </Route>
        <Route path="/orders">
          <Order/>
        </Route>
      </Switch>
    </Router>
  
  );
}

export default App;
