import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// - import { Redirect } from 'react-router';

import { insertAdvertisement } from '../Auth/admin-offers/insertAdvertisement';
import Sidebar from '../core/sidebar';
import emptyImage from '../Images/blank-img.jpg';
import './styles.css'

const InsertAdvertisement = () => {

    const [values, setValues] = useState({
        adCode : '',
        adName : '',
        adStartDate : '',
        adEndDate : '',
        adImage : '',
        loading : false,
        error : '',
        insertedAdvertisement : '',
        redirectToHome : false,
        formData : new FormData()
    });

    const {
        adCode,
        adName,
        adStartDate,
        adEndDate,
        loading,
        error,
        insertedAdvertisement,
        redirectToHome,
        formData
    } = values;

    /* -- useEffect(() => {
        setValues({...values, formData : new FormData()});
    }, []);*/

    const handleChange = name => event => {
        const value = name === 'adImage' ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({...values, [name] : value});
    };

    const insertAd = event => {
        event.preventDefault();
        setValues({...values, error : '', loading : true});

        insertAdvertisement(formData)
        .then(data => {
            if (data.error) {
                setValues({...values, error : data.error});
            }
            else {
                setValues({...values,
                    adCode : '',
                    adName : '',
                    adStartDate : '',
                    adEndDate : '',
                    adImage : '',
                    loading : '',
                    redirectToHome : true,
                    insertedAdvertisement : data.adName
                });
            }
        })
        .catch(err => {
            console.log(err);
        });
    };

    const newAdvertisementForm = () => (
        <form className="mb-4 shadow" onSubmit={ insertAd }>
            <h2 style={{fontSize : 40, marginLeft : "7%", paddingTop : "5%"}}>Insert Advertisement</h2>
            <div className="row mt-4" style={{fontSize : 20}}>
                <div className="form-group col-sm-6">
                    <div className="form-group" style={{ marginLeft : "15%", marginTop : "5%" }}>
                        <label className="text-muted">Advertisement Code</label>
                        <input onChange={handleChange('adCode')}  type="text" className="form-control" value={ adCode }/>
                        <small className="form-text text-muted">Enter the unique six character advertisement code</small>
                    </div>

                    <div className="form-group" style={{ marginLeft : "15%" }}>
                        <label className="text-muted">Name</label>
                        <input onChange={handleChange('adName')} type="text" className="form-control" value={ adName }/>
                    </div>

                    <div className="form-group" style={{ marginLeft : "15%" }}>
                        <label className="text-muted">Start Date</label>
                        <input onChange={handleChange('adStartDate')} type="text" className="form-control" value={ adStartDate }/>
                    </div>

                    <div className="form-group" style={{ marginLeft : "15%" }}>
                        <label className="text-muted">End Date</label>
                        <input onChange={handleChange('adEndDate')}  type="text" className="form-control" value={ adEndDate }/>
                    </div>

                    <div className="form-group" style={{ marginLeft : "15%" }}>
                        <img src={emptyImage} alt={"empty"} style={{ height: "250px" }} />
                    </div>

                    <div className="form-group" style={{ marginLeft : "15%" }}>
                        <label className="text-muted">Upload</label><br></br>
                        <label className="btn btn-secondary">
                            <input onChange={handleChange('adImage')} type="file" name="adImage" accept="image/*" />
                        </label>
                    </div>
                    
                    <button className="btn btn-outline-primary col-sm-6 mb" style={{ marginLeft : "15%", marginBottom : "10%" }}>INSERT</button>
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

    const showError = () => (
        <div className="alert alert-danger" style={{ display : error ? '' : 'none'}}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display : insertedAdvertisement ? '' : 'none'}}>
            <h2>{ `${insertedAdvertisement}` } is inserted</h2>
        </div>
    );

    const showLoading = () => loading && (
        <div className="alert alert-success">
            <h2>Loading...</h2>
        </div>
    );

    /* --const redirectUser = () => {
        if(redirectToHome) {
            if(!error) {
                return <Redirect to="/admin/manageAds" />
            }
        }
    } */

    return (
        <div className="row">
            <div style={{width : '100%'}}>
                <Sidebar>
                    <div style={{marginLeft : "15%", marginRight : "15%"}}>
                        { showLoading() }
                        { showSuccess() }
                        { showError() }
                        { newAdvertisementForm() }
                        { /*redirectUser() */}
                    </div>
                </Sidebar>
            </div> 
        </div>
    );
};

export default InsertAdvertisement;