import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GoSearch } from "react-icons/go"
import Swal from "sweetalert2";

import { getAdvertisementsList, deleteAdvertisement } from "../Auth/admin-offers/advertisementList";
import ShowImage from "../core/admin-offers/ShowImage";
import Sidebar from "../core/sidebar";



const ManageAdvertisements = () => {
    const [advertisements, setAdvertisements] = useState([]);
    const [error, setError] = useState(false);

    const loadAdvertisements = () => {
        getAdvertisementsList().then(data => {
            if (data.error) {
                setError(data.error);
            }
            else {
                setAdvertisements(data);
            }
        })
    };

    const remove = advertisementId => {

        Swal.fire({
            title: 'Are you sure?',
            text: "Delete",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Delete!',
            confirmButtonColor : '#df4759'
        })
        .then((result) => {
            if(result.isConfirmed) {
                deleteAdvertisement(advertisementId).then(data => {
                    if (data.error) {
                        setError(data.error);
                    } else {
                        loadAdvertisements();
                        Swal.fire(
                            'Deleted',
                            'Advertisement Deleted Successfully',
                            'Success'
                        )
                    }
                })
            }
            else {
                loadAdvertisements();
            }
        })
    };

    useEffect(() => {
        loadAdvertisements()
    }, []);

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const [searchAd, setSearchAd] = useState('');

    return(
        <div style={{width : '100%'}}>
            <Sidebar>
                { showError() }
                <h1 style={{textAlign : "center", fontWeight : 'bold'}}>Manage Advertisements</h1>
                <hr />
                <table style={{width : '100%'}}>
                    <tr>
                        <td style={{width : '25%'}}>
                            <Link to='/admin/insertAd'>
                                <button className="btn btn-outline-success mt-2 mb-4">Insert New Advertisement</button>
                            </Link></td>
                        <td style={{width : '50%'}}><h2 className="text-center" style={{fontWeight : "bold"}}>{ advertisements.length } Advertisements</h2></td>
                        <td style={{width : '25%'}}>
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="basic-addon1"><GoSearch /></span>
                                <input className="form-control" type="search" placeholder="Search By Name " name="searchForm" onChange={event => { setSearchAd(event.target.value) }}></input>
                            </div>
                        </td>
                    </tr>
                </table>
                <div className="row">
                    { advertisements.filter((name) => {
                            if (searchAd === "") {
                                return name
                            } else if (name.adName.toLowerCase().includes(searchAd.toLowerCase())) {
                                return name
                            }
                    })
                    .map((advertisement, i) => (
                    //<Card key={i} advertisement={ advertisement }/>
                        <div className="col-3 mb-3">
                            <div className="card border-secondary" style={{ marginTop : "10px",height: "400px"}}>
                                <div className="card-header bg-transparent" style={{textAlign : "center", fontSize : 20,marginTop : "-20px"}}>{advertisement.adName}</div>
                                <div className="card-body">
                                    <ShowImage item={ advertisement } url="advertisement"/>
                                    <p>{ advertisement.adCode }</p>
                                    <Link to={ `/admin/advertisement/${ advertisement._id }` }>
                                        <button className="btn btn-outline-primary mt-2 mb-2 ml-2">View</button>
                                    </Link>
                                    <Link to={ `/admin/updateAd/${ advertisement._id }` }>
                                        <button className="btn btn-outline-warning mt-2 mb-2 ml-2">Update</button>
                                    </Link>
                                    <button className="btn btn-outline-danger mt-2 mb-2 ml-2" onClick={ () => remove(advertisement._id) }>Delete</button>
                                </div>
                            </div>
                        </div>)) 
                    }
                </div>
            </Sidebar>
        </div>
    );
};

export default ManageAdvertisements;