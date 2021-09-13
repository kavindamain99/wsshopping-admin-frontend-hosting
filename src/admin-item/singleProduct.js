import React, { useState, useEffect } from 'react';
//import Layout from '../core/layout';
import Sidebar from '../core/sidebar';
import { getSingleProduct } from "../Auth/admin-item/getSingleProduct";
import ShowImage from '../Auth/admin-item/ShowImage';
import "../core/singleitemStyle.css"
import {Link} from 'react-router-dom';

const SingleProduct = props => {
    const [product, setProduct] = useState({});

    const [error, setError] = useState(false);

    const loadSingleProduct = productId => {
        getSingleProduct(productId).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProduct(data);
                // fetch related products

            }
        });
    };

    useEffect(() => {
        const productId = props.match.params.productId;
        loadSingleProduct(productId);
    }, [props]);

    return (
        <Sidebar>
            <div className="row">
            <div className="center">
                <div class="single-item">
                    <div class="left-set">
                    <div className="item-img">   
                    <ShowImage item={product} url="product"></ShowImage></div> 
                    <li>Inserted : {product.createdAt}</li>
                    <li>Last Update : {product.updatedAt}</li>
                    </div>
                    <div class="right-set">
                        <div class="name">{product.item_name}</div>
                        <div class="subname">{product.item_code}</div>
                        <div class="price">RS.{product.item_price}</div>
                        <div class="description">
                            <p>
                                {product.item_description}
                            </p>
                        </div>
                        <div class="color">
                            <ul>
                                <li>{product.item_category}</li>
                                <li>{product.item_type}</li>
                                <li>{product.item_quantity}{product.item_weight}</li>
                                
                            </ul>
                        </div>
                        <button><Link to="/admin/manageProduct" style={{color: 'black'}}>Back to Menu</Link></button>
                    </div>
                </div>
            </div>
            </div>
        </Sidebar>
    );
};

export default SingleProduct;