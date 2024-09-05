import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function Signup() {
    const [email,setEmail]=useState('');
    const [name,setName]=useState('');
    const [password,setPassword]=useState('');
    const [confirmpassword,setConfirmPassword]=useState('');
    const [phoneno,setPhoneno]=useState('');
    const [address,setAddress]=useState('');
    const [message, setMessage] = useState('');

    function handleSubmit(event){
        event.preventDefault();
        axios.post('http://localhost:8081/register',{email,name,password,confirmpassword,phoneno,address})
        .then(res=> console.log(res))
        .catch(err=>console.log(err));
    }
    const handleLogin = () => {
        setMessage('Successfully registered. Please login.');
      };

  return (
    <div className='d-flex vh-100 justify-content-center align-items-center bg-primary'>
        <div className='p-3 bg-white w-25 '>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
            <label htmlFor='email'>Email</label>
            <input type="email" placeholder='Enter Email' className='form-control'
            onChange={e=>setEmail(e.target.value)}/>
        </div>
        <div>
        <label htmlFor='name'>Name</label>
            <input type="text" placeholder='Enter Your Name' className='form-control'
            onChange={e=>setName(e.target.value)}/>
        </div>
        <div>
        <label htmlFor='password'>Password</label>
            <input type="password" placeholder='Enter Password' className='form-control'
            onChange={e=>setPassword(e.target.value)}/>
        </div>
        <div>
        <label htmlFor='confirmpassword'>Confirm password</label>
            <input type="password" placeholder='Retype Password' className='form-control'
            onChange={e=>setConfirmPassword(e.target.value)}/>
        </div>
        <div>
        <label htmlFor='phoneno'>Enter Phoneno</label>
            <input type="number" placeholder='Phone Number' className='form-control'
            onChange={e=>setPhoneno(e.target.value)}/>
        </div>
        <div>
        <label htmlFor='address'>Enter Address</label>
            <input type="text" placeholder='Address' className='form-control'
            onChange={e=>setAddress(e.target.value)}/>
        </div>
        <button className='btn btn-success' onClick={handleLogin}>Register</button>
        <p>{message}</p>
        
      </form>
      </div>
      </div>
  
  );
}

export default Signup