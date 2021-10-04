import React, { useState, useEffect } from 'react';
//import Layout from '../core/layout';
import { Link } from 'react-router-dom';
//Insert product API
import { FaSearch } from 'react-icons/fa';

import Sidebar from '../core/sidebar';
import { FiLink } from 'react-icons/fi';
import { getProductsList, deleteProduct } from "../Auth/admin-item/listProduct";
import Swal from 'sweetalert2';
import "./style.css";

const ManageProductList = () => {
    const [products, setProducts] = useState([]);

    const loadProducts = () => {
        getProductsList().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setProducts(data);
            }
        });
    };


    const destroy = productId => {
          
        
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      })
      .then((result) => {
        if (result.isConfirmed) {
            deleteProduct(productId).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                Swal.fire(
                    'Deleted',
                    'Category Deleted Successfully',
                    'success'
                  )
                  loadProducts();
            }
        });

    } else {
        loadProducts();
    }
      })
};

    useEffect(() => {
        loadProducts();
    }, []);




    //searching products
    /*
        const searchForm = () => (
            /*
            const searchSubmit = () => { }
    
        const handleChange = () => {
    
        }
    
            <form onSubmit={searchSubmit}>
                
                <input type="search" className="form-control" placeholder="Search By Name" onChange={handleChange("search")}></input>
    
            <div className="d-flex justify-content-center ">
                    <button className="btn btn-primary btn-lg  input-group-text " style={{width:"30%"}}><FaSearch/><span>Search </span></button>
    
                    </div>
            </form>
            
    
    
            <div className="row">
    
                <div className="col-lg-12 mt-2 mb-2">
                    <input className="form-control" type="search" placeholder="search" name="searchForm"
                        onChange={event => { setSearchTerm(event.target.value) }}
                    ></input>
    
                </div>
            </div>
    
            
        );
    */
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <Sidebar>
            <div className="row">
                <div className="container mb-3">


                    <div className="row">

                        <div className="col-lg-12 mt-2 mb-2">

                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="basic-addon1"><FaSearch /></span>
                                </div>
                                <input className="form-control" type="search" placeholder="Search By Name " name="searchForm"
                                    onChange={event => { setSearchTerm(event.target.value) }}
                                ></input>

                            </div>
                        </div>
                    </div>



                </div>

                <div className="col-12">
                    <h2 className="text-center">Total Products : {products.length}</h2>
                    <Link to="./insertCategory" className="btn btn-success"> New Category <FiLink /></Link>
                    
                    <hr />
                    <ul className="list-group">
                        {products.filter((val) => {
                            if (searchTerm === "") {
                                return val
                            } else if (val.item_name.toLowerCase().includes(searchTerm.toLowerCase())) {
                                return val
                            }
                        })
                            .map((p, i) => (

                                <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
                                    <strong className="p-2" >{p.item_code}</strong>
                                    <strong className="p-2 flex-fill" >{p.item_name}</strong>
                                    <Link to={`/getSingleProduct/${p._id}`}>
                                        <span className="badge badge-success p-2 flex-fill" id="listBtn" >View</span>
                                    </Link>
                                    <Link to={`/updateProduct/${p._id}`}>
                                        <span className="badge badge-warning p-2 flex-fill" id="listBtn">Update</span>
                                    </Link>


                                    <span onClick={() => destroy(p._id)} className="badge badge-danger badge=pill p-2" style={{ cursor: "pointer" }} id="listBtn">Delete</span>

                                </li>
                            ))}


                    </ul>
                </div>


            </div>

                            


            </Sidebar>





    )



}


export default ManageProductList;