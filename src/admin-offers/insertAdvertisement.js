import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle'

// - import { Redirect } from 'react-router';

import { insertAdvertisement } from '../Auth/admin-offers/insertAdvertisement';
import Sidebar from '../core/sidebar';
import emptyImage from '../Images/blank-img.jpg';
import '../styles.css';

const InsertAdvertisement = () => {
    const current = new Date();
    const date = `${ current.getDate() }/${ current.getMonth() }/${ current.getFullYear() }`;

    const [values, setValues] = useState({
        adCode : '',
        adName : '',
        adStartDate : '',
        adEndDate : '',
        adImage : '',
        loading : false,
        success : false,
        error : '',
        insertedAdvertisement : '',
        formData : new FormData()
    });

    const {
        adCode,
        adName,
        adStartDate,
        adEndDate,
        loading,
        success,
        error,
        insertedAdvertisement,
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
        console.log("sdate" + adStartDate)
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
                    loading : false,
                    success : true,
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
                        <input onChange={ handleChange('adCode') }  type="text" className="form-control" value={ adCode }/>
                        <small className="form-text text-muted">Enter the unique six character advertisement code</small>
                    </div>

                    <div className="form-group" style={{ marginLeft : "15%" }}>
                        <label className="text-muted">Name</label>
                        <input onChange={ handleChange('adName') } type="text" className="form-control" value={ adName }/>
                    </div>

                    <div className="form-group" style={{ marginLeft : "15%" }}>
                        <label className="text-muted">Start Date</label>
                        <input onChange={ handleChange('adStartDate') } type="date" className="form-control" value={ adStartDate }/>
                    </div>

                    <div className="form-group" style={{ marginLeft : "15%" }}>
                        <label className="text-muted">End Date</label>
                        <input onChange={ handleChange('adEndDate') }  type="date" className="form-control" value={ adEndDate }/>
                    </div>

                    <div className="form-group" style={{ marginLeft : "15%" }}>
                        <img src={emptyImage} alt={"empty"} style={{ height: "250px" }} />
                    </div>

                    <div className="form-group" style={{ marginLeft : "15%" }}>
                        <label className="text-muted">Upload</label><br></br>
                        <label className="btn btn-secondary">
                            <input onChange={ handleChange('adImage') } type="file" name="adImage" accept="image/*" />
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

    const showLoading = () => loading && (
        <Alert severity="info">Loading</Alert>
    );

    const showSuccess = () => success && (
        <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            Advertisement succesfully Inserted — <strong><Link to="/admin/manageAds">Go back</Link></strong>
        </Alert>
    );

    const showError = () => error && (
        <Alert severity="error">Important fields are missing</Alert>
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
                        { newAdvertisementForm() }
                        { showLoading() }
                        { showSuccess() }
                        { showError() }
                    </div>
                </Sidebar>
            </div> 
        </div>
    );
};

export default InsertAdvertisement;