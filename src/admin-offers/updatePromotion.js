import React, { useState, useEffect } from "react"
import { Redirect } from "react-router"
import { Link } from "react-router-dom"

import { API } from "../config"
import Sidebar from '../core/sidebar';
import { getPromotion, updatePromotion } from "../Auth/admin-offers/updatePromotion"
import emptyImage from '../Images/blank-img.jpg'

const UpdatePromotion = ({ match }) => {

    const [values, setValues] = useState({
        promoCode : '',
        promoName : '',
        promoPCode : '',
        promoPCategory : '',
        promoType : '',
        promoDiscount : '',
        promoFPCode : '',
        promoFPAmount : '',
        promoStartDate : '',
        promoEndDate : '',
        promoImage : '',
        loading: false,
        error : '',
        insertedPromotion : '',
        redisectToHome : false,
        formData : new FormData()
    });

    const {
        promoCode,
        promoName,
        promoPCode,
        promoPCategory,
        promoType,
        promoDiscount,
        promoFPCode,
        promoFPAmount,
        promoStartDate,
        promoEndDate,
        loading,
        error,
        updatedPromotion,
        redirectToHome,
        formData
    } = values;

    useEffect(() => {
        init(match.params.promotionId);
    }, []);

    const init = (promotionId) => {
        getPromotion(promotionId).then((promotion) => {
            if(promotion.error) {
                setValues({...values, error : promotion.error})
            }
            else {
                setValues({...values,
                    promoCode : promotion.promoCode,
                    promoName : promotion.promoName,
                    promoPCode : promotion.promoPCode,
                    promoPCategory : promotion.promoPCategory,
                    promoType : promotion.promoType,
                    promoDiscount : promotion.promoDiscount,
                    promoFPCode : promotion.promoFPCode,
                    promoFPAmount : promotion.promoFPAmount,
                    promoStartDate : promotion.promoStartDate,
                    promoEndDate : promotion.promoEndDate
                });
            }
        })
    };

    const handleChange = name => event => {
        const value = name === 'promoImage' ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({...values, [name] : value});
    };

    const updatePromo = event => {
        event.preventDefault();
        
        setValues({...values, error : '', loading : true});

        var confirm = window.confirm("Updete Promotion");

        if(confirm === true) {
            updatePromotion(match.params.promotionId, formData)
            .then(data => {
                if(data.error) {
                    setValues({...values, error : data.error});
                }
                else {
                    setValues({...values, 
                        promoCode : '',
                        promoName : '',
                        promoPCode : '',
                        promoPCategory : '',
                        promoType: '',
                        promoDiscount : '',
                        promoFPCode : '',
                        promoFPAmount : '',
                        promoStartDate : '',
                        promoEndDate : '',
                        redirectToHome : true,
                        loading : false,
                        updatedPromotion : data.promoName
                    });
                }
            });
        }
    };

    // add promo product category down here
    const updatePromotionForm = () => (
        <form onSubmit={ updatePromo } className="mb-4 shadow">
            <h2 style={{fontSize : 40, marginLeft : "7%", paddingTop : "5%"}}>Update Promotion</h2>
            <div className="row mt-4" style={{fontSize : 20}}>
                <div className="form-group col-sm-6">
                    <div className="form-group" style={{ marginLeft : "15%", marginTop : "5%" }}>
                        <label className="text-muted">Promotion Code</label>
                        <input onChange={ handleChange('promoCode') } type="text" className="form-control" value = { promoCode } required/>
                    </div>

                    <div className="form-group" style={{ marginLeft : "15%" }}>
                        <label className="text-muted">Promotion Name</label>
                        <input onChange={ handleChange('promoName') } type="text" className="form-control" value = { promoName } required/>
                    </div>

                    <div className="form-group" style={{ marginLeft : "15%" }}>
                        <label className="text-muted">Promotion Product Code</label>
                        <input onChange={ handleChange('promoPCode') } type="text" className="form-control" value = { promoPCode } required/>
                    </div>

                    <div className="form-group" style={{ marginLeft : "15%" }}>
                        <label className="text-muted">Promotion Product Category</label>
                        <select onChange={ handleChange('promoPCategory') } className="form-control"  required>
                            <option selected>Please select promotion product category</option>
                            <option value="BEVERAGES">Beverages</option>
                            <option value="BREAD-BAKERY">Bread and Bakery</option>
                            <option value="BREAKFAST-CEREAL">Breakfast and Cereal</option>
                            <option value="CANNED_GOODS">Canned Goods and Soup</option>
                            <option value="CONDIMENTS">Condiments</option>
                            <option value="COOKIES-SNACKS-CANDY">Cookies, Snacks and Candy</option>
                            <option value="DAIRY-EGG-CHEESE">Dairy, Egg and Cheese</option>
                            <option value="FROZEN_FOODS">Frozen Foods</option>
                            <option value="FRUITS-VEGETABLES">Fruits and Vegetables</option>
                            <option value="MEAT-SEAFOOD">Meat and Seafood</option>
                            <option value="MISCELLANEOUS">Miscellaneous</option>
                            <option value="CLEANING_SUPPLIES">Cleaning Supplies</option>
                        </select>
                    </div>

                    <div className="form-group" style={{ marginLeft : "15%" }}>
                        <label className="text-muted">Promotion Type</label>
                        <select onChange={ handleChange('promoType') } className="form-control" required>
                            <option selected>Pleses select promotion type</option>
                            <option value="DISCOUNT">Discount</option>
                            <option value="FREE PRODUCTS">Free Products</option>
                        </select>
                    </div>

                    <div className="form-group" style={{ marginLeft : "15%" }}>
                        <label className="text-muted">Discount Amount</label>
                        <input onChange={ handleChange('promoDiscount') } type="text" className="form-control" value = { promoDiscount }/>
                    </div>

                    <div className="form-group" style={{ marginLeft : "15%" }}>
                        <label className="text-muted">Free Product Code</label>
                        <input onChange={ handleChange('promoFPCode') } type="text" className="form-control" value = { promoFPCode }/>
                    </div>

                    <div className="form-group" style={{ marginLeft : "15%" }}>
                        <label className="text-muted">Free Product Amount</label>
                        <input onChange={ handleChange('promoFPAmount') } type="text" className="form-control" value = { promoFPAmount }/>
                    </div>

                    <div className="form-group" style={{ marginLeft : "15%" }}>
                        <label className="text-muted">Start Date</label>
                        <input onChange={ handleChange('promoStartDate') } type="text" className="form-control" value = { promoStartDate } required/>
                    </div>

                    <div className="form-group" style={{ marginLeft : "15%" }}>
                        <label className="text-muted">End Date</label>
                        <input onChange={ handleChange('promoEndDate') } type="text" className="form-control" value = { promoEndDate } required/>
                    </div>

                    <div className="form-group" style={{ marginLeft : "15%" }}>
                        <img src={ `${ API }/admin/promotion/image/${ match.params.promotionId }` } alt={ emptyImage } style={{ height: "250px" }}/>
                    </div>

                    <div className="form-group" style={{ marginLeft : "15%" }}>
                        <label className="text-muted">Upload</label><br></br>
                        <label className="btn btn-secondary">
                            <input onChange={handleChange('promoImage')} type="file" name="promoImage" accept="image/*" />
                        </label>
                    </div>

                    <button className="btn btn-outline-primary col-sm-6" style={{ marginLeft : "15%", marginBottom : "10%" }}>UPDATE</button>
                </div>
                <div className="vl-promotion"></div>
                <div style={{ marginTop : '5%', marginLeft : '10%', marginBottom : "15%"}}>
                    <Link to={'/admin/managePromotions'}>
                        <button className="btn btn-outline-primary btn-lg">Manage Promotions</button>
                    </Link>
                </div>
            </div>
        </form>
    );

    const showLoading = () => loading && (
        <div className="alert alert-success">
            <h2>Loading...</h2>
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display : updatedPromotion ? '' : 'none'}}>
            <h2>{ `${updatedPromotion}` } is updated</h2>
        </div>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{ display : error ? '' : 'none'}}>
            {error}
        </div>
    );

    const redirectUser = () => {
        if(redirectToHome) {
            if(!error) {
                return <Redirect to="/admin/managePromotions" />
            }
        }
    };

    return (
        <div className="row">
            <div style={{width : '100%',}}>
                <Sidebar>
                    <div style={{marginLeft : "15%", marginRight : "15%"}}>
                        { showLoading() }
                        { showSuccess() }
                        { showError() }
                        { updatePromotionForm() } 
                        { redirectUser() }
                    </div>
                </Sidebar>
            </div>
        </div>  
    );
};

export default UpdatePromotion;