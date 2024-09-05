import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function AdminLogin() {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    function handleSubmit(event){
        event.preventDefault();
        axios.post('http://localhost:8081/adminlogin',{email, password})
        .then(res => {
          if (res.data.redirect) {
              localStorage.setItem('admin_id', res.data.admin_id);
              localStorage.setItem('email', res.data.email);

              window.location.href = res.data.redirect;

          } else {
              // Handle error response
              console.error(res.data.error);
          }
      })
        .catch(error => console.error('Error:', error));
    }
  return (
    <div className='d-flex vh-100 justify-content-center align-items-center bg-primary'>
        <div className='p-3 bg-white w-25 '>
      <form onSubmit={handleSubmit}>
        <h1>Admin Login</h1>
        <div className='mb-3'>
            <label htmlFor='email'>Email</label>
            <input type="email" placeholder='Enter Email' className='form-control'
            onChange={e=>setEmail(e.target.value)}/>
        </div>
        <div>
        <label htmlFor='password'>Password</label>
            <input type="password" placeholder='Enter Password' className='form-control'
            onChange={e=>setPassword(e.target.value)}/>
        </div>
        <button className='btn btn-success'>Login</button>
      </form>
    </div>
    </div>
  )
}

export default AdminLogin