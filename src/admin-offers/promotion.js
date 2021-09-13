import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';

import { getPromotion } from '../Auth/admin-offers/updatePromotion';
import ShowImage from '../core/admin-offers/ShowImage';
import Sidebar from '../core/sidebar';

const Promotion = (props) => {

    const [promotion, setPromotion] = useState({});
    const [error, setError] = useState(false);

    const loadSinglePromotion = promotionId => {
        getPromotion(promotionId).then(data => {
            if(data.error)  {
                setError(data.error);
            }
            else {
                setPromotion(data);
            }
        });
    };

    useEffect(() => {
        const promotionId = props.match.params.promotionId;
        loadSinglePromotion(promotionId);
    }, []);

    const showError = () => (
        <div className="alert alert-danger" style={{ display : error ? '' : 'none'}}>
            {error}
        </div>
    );

    // add promotion product category
    return (
        <Sidebar>
            { showError() }
            <div style={{marginLeft : '30%', marginRight : '30%'}}>
                <div className="card shadow-lg p-3 mb-5 bg-white rounded border-info">
                    <div className="card-header" style={{textAlign : 'center', fontSize : 30}}>{promotion.promoName}</div>
                    <div className="card-image-top">
                        <ShowImage item={ promotion } url="promotion"/>
                    </div>
                    <div className="card-text" style={{ textAlign : 'center' }}>
                        <p style={{fontSize : 20}}>Promotion Code : { promotion.promoCode }</p>
                        <p style={{fontSize : 20}}>Promotion Product Code : { promotion.promoPCode }</p>
                        <p style={{fontSize : 20}}>Promotion Product Category : { promotion.promoPCategory }</p>
                        <p style={{fontSize : 20}}>Promotion Type : { promotion.promoType }</p>
                        <p style={{fontSize : 20}}>Discount Amount : { promotion.promoDiscount }</p>
                        <p style={{fontSize : 20}}>Free Product Code : { promotion.promoFPCode }</p>
                        <p style={{fontSize : 20}}>Free Product Amount : { promotion.promoFPAmount }</p>
                        <p style={{fontSize : 20}}>Start Date : { promotion.promoStartDate }</p>
                        <p style={{fontSize : 20}}>End Date : { promotion.promoEndDate }</p>
                        <Link to='/admin/managePromotions'>
                            <button className="btn btn-outline-success mt-2 mb-2 ml-2">Go Back</button>
                        </Link>
                    </div>
                </div>
            </div>
        </Sidebar>    
    );
};

export default Promotion;