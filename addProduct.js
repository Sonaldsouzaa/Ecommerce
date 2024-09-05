import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import AdminNavbar from './components/AdminNavbar';

function AddProduct() {
    const [ProductName, setProductName] = useState('');
    const [Category, setCategory] = useState('');
    const [Price, setPrice] = useState('');
    const [Description, setDescription] = useState('');
    const [Image, setImage] = useState('');
    const [responseMessage, setResponseMessage] = useState('');

    function handleSubmit(event) {
        event.preventDefault();
        axios.post('http://localhost:8081/addproduct', { ProductName, Category, Price, Description, Image })
            .then(res => {
                console.log(res);
                setResponseMessage('Product added successfully.');
            })
            .catch(err => {
                console.log(err);
                setResponseMessage('Failed to add product.');
            });
    }

    return (
        <div className='App'>
            <AdminNavbar />
            <div className="container mt-5">
                <h1>Add Products</h1>

                <div className='d-flex justify-content-center align-items-center '>
                    <div className='p-3 bg-white w-25 '>
                        {responseMessage && <div className="alert alert-success" role="alert">{responseMessage}</div>}
                        <form onSubmit={handleSubmit}>
                            <div className='mb-3'>
                                <label htmlFor='ProductName'>Enter Product Name</label>
                                <input type="text" placeholder='Product Name' className='form-control'
                                    onChange={e => setProductName(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor='category'>Enter Category</label>
                                <input type="text" placeholder='Category' className='form-control'
                                    onChange={e => setCategory(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor='price'>Enter price</label>
                                <input type="text" placeholder='Price' className='form-control'
                                    onChange={e => setPrice(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor='description'>Enter description</label>
                                <input type="text" placeholder='Description' className='form-control'
                                    onChange={e => setDescription(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor='image'>Image</label>
                                <input type="text" placeholder='Image' className='form-control'
                                    onChange={e => setImage(e.target.value)} />
                            </div>
                            <button className='btn btn-success'>Add Product</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddProduct;
