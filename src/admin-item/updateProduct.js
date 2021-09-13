import React,{useState,useEffect} from 'react';
//import Layout from '../core/layout';
import Sidebar from '../core/sidebar';
//Insert product API

import {getProduct,updateProduct} from "../Auth/admin-item/updateProduct";

import { Redirect } from 'react-router-dom';


import ShowImage from '../Auth/admin-item/ShowImageUpdate';

const UpdateProduct = ({match}) => {

    
    

    const [values,setValues] = useState({
        item_code : '',
        item_name : '',
        ite_category : '',
        item_type : '',
        item_quantity : '',
        item_image : '',
        item_weight : '',
        item_price : '',
        item_shipping:'',
        item_description : '',
        loading : false,
        error:'',
        insertedProduct:'',
        redirectToHome:false,
        formData : new FormData()
    });
    
    const {item_code,item_name,item_quantity,item_weight,item_price,item_category,item_shipping,item_description,redirectToHome,formData,error,insertedProduct,loading} = values;

    useEffect(() => {
        init(match.params.productId);
    },[]);
    
    const init = (productId) => {
        getProduct(productId).then((product) => {
            if(product.error) {
                setValues({...values,error:product.error})
            }else {
                //populate the state 
                setValues({...values,item_name:product.item_name,item_description:product.item_description,item_code:product.item_code,
                item_quantity:product.item_quantity,item_weight:product.item_weight,item_price:product.item_price,
                item_shipping:product.item_shipping,item_category:product.item_category,item_image:product.item_image

                
                
                });
    
    
            }
        })
        
    }
    



    const handleChange = name => event => {

        const value=name==='item_image' ? event.target.files[0] :event.target.value;
        formData.set(name,value);
        setValues({...values,[name]:value});

    };






    const clickSubmit = event => {

        event.preventDefault();

        setValues({...values,error:'',loading:true});
        
        var x = window.confirm("Are you sure you want to update this product ?");
        if(x===true) {
        // eslint-disable-next-line no-undef
        updateProduct(match.params.productId,formData).then(data =>{
            
            if(data.error){
                setValues({...values,error:data.error});
            }else{
                setValues({...values,
                    item_code : '',
                    item_name : '',
                    ite_category : '',
                    item_type : '',
                    item_quantity : '',
                    item_image : '',
                    item_weight : '',
                    item_price : '',
                    item_shipping:'',
                    item_description : '',
                    
                    loading:false,
                error:false,
                success:true,
                redirectToHome:true,
                    insertedProduct:data.item_name

                
                });

            }


        })};

    };


    const newPostForm = () => (

//<div className="container col-md-8 offset-md-2">
        <form className="mb-3" onSubmit={clickSubmit}>
            <h4>Update Product</h4>


            <div className="row">
                <div className="form-group col-sm-6">

                    <div className="form-group">
                        
                        <ShowImage item={match.params.productId} url="product" style={{ maxHeight: "252px" }} ></ShowImage> 
                    </div>
                    

                    <div className="form-group">
                        <label className="text-muted">Product Image</label><br></br>
                        <label className="btn btn-secondary">
                            <input onChange={handleChange('item_image')} type="file" name="item_image" accept="image/*" />
                       
                        </label>
                        
                    </div>

                    
                    <div className="form-group">
                        <label className="text-muted">Quantity</label>
                        <input onChange={handleChange('item_quantity')} type="text" className="form-control" value={item_quantity} />
                    </div>

                    <div className="form-group">
                        <label className="text-muted">Shipping</label>
                        <select onChange={handleChange('item_shipping')} className="form-control" value={item_shipping} >
                            <option value={item_shipping} defaultValue>{item_shipping}</option>
                            <option value="0">No</option>
                            <option value="1">Yes</option>
                        </select>
                    </div>
                </div>

                <div className="form-group col-sm-6">
                    <div className="form-group">
                        <label className="text-muted">Product Code</label>
                        <input onChange={handleChange('item_code')} type="text" className="form-control" value={item_code} readOnly />
                    </div>

                    <div className="form-group">
                        <label className="text-muted">Product Name</label>
                        <input onChange={handleChange('item_name')} type="text" className="form-control" value={item_name}  />
                    </div>


                    <div className="form-group">
                        <label className="text-muted">Product Category</label>
                        <select onChange={handleChange('item_category')} className="form-control">
                            <option value={item_category} defaultValue>{item_category}</option>
                            <option value="Stationary">Stationary</option>
                            <option value="Beverages">Beverages</option>
                            <option value="Fruits">Fruits</option>
                            <option value="Vegetable">Vegetable</option>

                        </select>
                    </div>

                       
                    <div className="form-group ">
                        <label className="text-muted">Packing Type</label><br></br>
                        <input onChange={handleChange('item_type')} type="radio" id="repack" name="item_type" value="Prepack" required/>
                        <label >&nbsp;Prepack</label>
                        <br></br>
                        <input onChange={handleChange('item_type')} type="radio" id="loosePack" name="item_type" value="Loose Pack" />
                        <label>&nbsp;Loose Pack</label><br></br>
                    </div>
    
                    <div className="form-group">
                        <label className="text-muted">Unit</label>
                        
                        <select onChange={handleChange('item_weight')} className="form-control" value={item_weight} >
                        <option value=".00">Please select</option>
                            <option value=".00">.00</option>
                            <option value="Kg">Kilogram</option>
                            <option value="g">gram</option>
                            <option value="L">Liter</option>
                            <option value="ml">Milliliter</option>
                        </select>

                    </div>
                   
                    <div className="form-group">
                        <label className="text-muted">Product Price</label>
                        <input onChange={handleChange('item_price')} type="text" className="form-control" value={item_price}/>
                    </div>

                </div>


                <div className="form-group col-sm-12">
                <div className="form-group">
                    <label className="text-muted">Product Description</label>
                    <textarea onChange={handleChange('item_description')} type="text" className="form-control"
                        rows="5" cols="500" placeholder="Description"
                        value={item_description}
                    />
                </div>

               </div>
            </div>





            <button className="btn btn-outline-primary btn-block">Update</button>
        </form>
  //      </div>
    );

    

    //show success or failure
const showError = () => (
    <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
        {error}
    </div>
);

const showSuccess = () => (
    <div className="alert alert-info" style={{ display: insertedProduct ? '' : 'none' }}>
        <h2>"{`${insertedProduct}`}" Product Updated Successfully!</h2>
    </div>
);

const showLoading = () =>
        loading && (
            <div className="alert alert-success">
                <h2>Loading...</h2>
            </div>
        );
        const redirectUser =()=>{
            if(redirectToHome){
                if(!error){
                    return <Redirect to="/admin/manageProduct" />
                }
            }
        }
    return (
        <Sidebar>

            
            {showError()}
            {showSuccess()}
            {showLoading()}
            {newPostForm()}
            {redirectUser()}
            </Sidebar>
    );
};

export default UpdateProduct;