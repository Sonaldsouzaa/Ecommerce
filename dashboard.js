import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminNavbar from './components/AdminNavbar';
import axios from 'axios';

function Dashboard() {
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    // Fetch data when component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch total number of orders
      const ordersResponse = await axios.get('http://localhost:8081/totalOrders');
      setTotalOrders(ordersResponse.data.totalOrders);

      // Fetch total number of customers
      const customersResponse = await axios.get('http://localhost:8081/totalCustomers');
      setTotalCustomers(customersResponse.data.totalCustomers);

      // Fetch total number of products
      const productsResponse = await axios.get('http://localhost:8081/totalProducts');
      setTotalProducts(productsResponse.data.totalProducts);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    // Check if admin_id exists in local session variable
    const adminId = localStorage.getItem('admin_id');
    if (!adminId) {
      // Redirect to admin login page
      window.location.href = '/adminlogin';
    }
  }, []);

  return (
    <div className='App'>
      <AdminNavbar />
      <div className="container mt-5">
        <h1>Admin Dashboard</h1>
        <div className="row">
          <div className="col-sm-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Total Orders</h5>
                <p className="card-text">{totalOrders}</p>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Total Customers</h5>
                <p className="card-text">{totalCustomers}</p>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Total Products</h5>
                <p className="card-text">{totalProducts}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
