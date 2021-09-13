import React, { useState, useEffect } from "react"
import { Redirect } from "react-router"
import { Link } from "react-router-dom"

import { API } from "../config"
import Sidebar from '../core/sidebar';
import { getAdvertisement, updateAdvertisement } from '../Auth/admin-offers/updateAdvertisement'
import './styles.css'
import emptyImage from '../Images/blank-img.jpg'

const UpdateAdvertisement = ({ match }) => {

    const [values, setValues] = useState({
        adCode : '',
        adName : '',
        adStartDate : '',
        adEndDate : '',
        adImage : '',
        loading : false,
        error : '',
        updatedAdvertisement : '',
        redirectToHome : '',
        formData : new FormData()
    });

    const {
        adCode,
        adName,
        adStartDate,
        adEndDate,
        loading,
        error,
        updatedAdvertisement,
        redirectToHome,
        formData
    } = values;

    useEffect(() => {
        init(match.params.advertisementId);
    }, []);

    const init = (advertisementId) => {
        getAdvertisement(advertisementId).then((advertisement) => {
            if(advertisement.error) {
                setValues({...values, error : advertisement.error})
            }
            else {
                setValues({...values,
                    adCode : advertisement.adCode,
                    adName : advertisement.adName,
                    adStartDate : advertisement.adStartDate,
                    adEndDate : advertisement.adEndDate    
                });
            }
        })
    };

    const handleChange = name => event => {
        const value = name === 'adImage' ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({...values, [name] : value});
    };

    const updateAd = event => {
        event.preventDefault();
        
        setValues({...values, error : '', loading : true});

        var confirm = window.confirm("Updete Advertisement");

        if(confirm === true) {
            updateAdvertisement(match.params.advertisementId, formData)
            .then(data => {
                if(data.error) {
                    setValues({...values, error : data.error});
                }
                else {
                    setValues({...values, 
                        adCode : '',
                        adName : '',
                        adStartDate : '',
                        adEndDate : '',
                        adImage : '',
                        loading : false,
                        error : false, 
                        redirectToHome : true,
                        updatedAdvertisement : data.adName    
                    });
                }
            });
        }
    };

    const updateAdvertisementForm = () => (
        <form className="mb-4 shadow" onSubmit={ updateAd }>
            <h1 style={{fontSize : 40, marginLeft : "7%", paddingTop : "5%"}}>Update Advertisement</h1>
            <div className="row mt-4" style={{fontSize : 20}}>
                <div className="form-group col-sm-6">
                    <div className="form-group" style={{ marginLeft : "15%", marginTop : "5%" }}>
                        <label className="text-muted" style={{fontSize : '20px'}}>Advertisement Code</label>
                        <input onChange={handleChange('adCode')}  type="text" className="form-control" value={ adCode }/>
                    </div>

                    <div className="form-group" style={{ marginLeft : "15%" }}>
                        <label className="text-muted" style={{fontSize : '20px'}}>Name</label>
                        <input onChange={handleChange('adName')} type="text" className="form-control" value={ adName }/>
                    </div>
                
                    <div className="form-group" style={{ marginLeft : "15%" }}>
                        <label className="text-muted" style={{fontSize : '20px'}}>Start Date</label>
                        <input onChange={handleChange('adStartDate')} type="text" className="form-control" value={ adStartDate }/>
                    </div>

                    <div className="form-group" style={{ marginLeft : "15%" }}>
                        <label className="text-muted" style={{fontSize : '20px'}}>End Date</label>
                        <input onChange={handleChange('adEndDate')}  type="text" className="form-control" value={ adEndDate }/>
                    </div>

                    <div className="form-group" style={{ marginLeft : "15%" }}>
                        <img src={ `${ API }/admin/advertisement/image/${ match.params.advertisementId }` } alt={ emptyImage } style={{ height: "254px" }} />
                    </div>

                    <div className="form-group" style={{ marginLeft : "15%" }}>
                        <label className="text-muted" style={{fontSize : '20px'}}>Upload</label><br></br>
                        <label className="btn btn-secondary">
                            <input onChange={handleChange('adImage')} type="file" name="adImage" accept="image/*" />
                        </label>
                    </div>

                    <button className="btn btn-outline-primary col-sm-6" style={{ marginLeft : "15%", marginBottom : "10%" }}>UPDATE</button>
                </div>
                <div className="vl-advertisement"></div>
                <div style={{ marginTop : '5%', marginLeft : '7%', marginBottom : "15%"}}>
                    <Link to='/admin/manageAds'>
                        <button className="btn btn-outline-primary btn-lg">Manage Advertisements</button>
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
        <div className="alert alert-info" style={{ display : updatedAdvertisement ? '' : 'none'}}>
            <h2>{ `${updatedAdvertisement}` } is updated</h2>
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
                return <Redirect to="/admin/manageAds" />
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
                        { updateAdvertisementForm() } 
                        { redirectUser() }
                    </div>
                </Sidebar>
            </div>
        </div>  
    );
};

export default UpdateAdvertisement;


