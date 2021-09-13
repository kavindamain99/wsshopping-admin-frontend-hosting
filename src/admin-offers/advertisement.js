import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';

import { getAdvertisement } from '../Auth/admin-offers/updateAdvertisement';
import ShowImage from '../core/admin-offers/ShowImage';
import Sidebar from '../core/sidebar';

const Advertisement = (props) => {

    const [advertisement, setAdvertisement] = useState({});
    const [error, setError] = useState(false);

    const loadSingleAdvertisement = advertisementId => {
        getAdvertisement(advertisementId).then(data => {
            if(data.error)  {
                setError(data.error);
            }
            else {
                setAdvertisement(data);
            }
        });
    };

    useEffect(() => {
        const advertisementId = props.match.params.advertisementId;
        loadSingleAdvertisement(advertisementId);
    }, []);

    return (
        <Sidebar>
            <div style={{marginLeft : '30%', marginRight : '30%'}}>
                <div className="card shadow-lg p-3 mb-5 bg-white rounded border-info">
                    <div className="card-header" style={{textAlign : 'center', fontSize : 30}}>{advertisement.adName}</div>
                    <div className="card-image-top">
                        <ShowImage item={ advertisement } url="advertisement"/>
                    </div>
                    <div className="card-text" style={{ textAlign : 'center' }}>
                        <p style={{fontSize : 20}}>Advertisement Code : { advertisement.adCode }</p>
                        <p style={{fontSize : 20}}>Start Date : { advertisement.adStartDate }</p>
                        <p style={{fontSize : 20}}>End Date : { advertisement.adEndDate }</p>
                        <Link to='/admin/manageAds'>
                            <button className="btn btn-outline-success mt-2 mb-2 ml-2">Go Back</button>
                        </Link>
                    </div>
                </div>
            </div>
        </Sidebar>    
    );
};

export default Advertisement;