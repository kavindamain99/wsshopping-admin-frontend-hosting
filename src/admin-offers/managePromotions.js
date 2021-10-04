import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GoSearch } from "react-icons/go"

import { getPromotionsList, deletePromotion } from "../Auth/admin-offers/promotionList";
import ShowImage from "../core/admin-offers/ShowImage";
import Sidebar from "../core/sidebar";
import Swal from "sweetalert2";

const ManagePromotions = () => {
    const [promotions, setPromotions] = useState([]);

    const loadPromotions = () => {
        getPromotionsList().then(data => {
            if (data.error) {
                console.log(data.error);
            }
            else {
                setPromotions(data);
            }
        })
    };

    const remove = promotionId => {

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
                deletePromotion(promotionId).then(data => {
                    if (data.error) {
                        console.log(data.error);
                    } else {
                        loadPromotions();
                        Swal.fire(
                            'Deleted',
                            'Promotion Deleted Successfully',
                            'success'
                        )
                    }
                })
            }
            else {
                loadPromotions();
            }
        })
    };

    useEffect(() => {
        loadPromotions();
    }, []);

    const [searchPromotion, setSearchPromotion] = useState('');
    var length = promotions.length;

    return(
        <div style={{width : '100%'}}>
            <Sidebar>
                <h1 style={{textAlign : "center", fontWeight : 'bold'}}>Manage Promotions</h1>
                <hr />
                <table style={{width : '100%'}}>
                    <tr>
                        <td style={{width : '25%'}}>
                            <Link to='/admin/insertPromotion'>
                                <button className="btn btn-outline-success mt-2 mb-4">Insert New Promotion</button>
                            </Link></td>
                        <td style={{width : '50%'}}><h2 className="text-center" style={{fontWeight : "bold"}}>{ promotions.length } Promotions</h2></td>
                        <td style={{width : '25%'}}>
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="basic-addon1"><GoSearch /></span>
                                <input className="form-control" type="search" placeholder="Search By Product " name="searchForm" onChange={event => { setSearchPromotion(event.target.value) }}></input>
                            </div>
                        </td>
                    </tr>
                </table>
                <div className="row">
                    { promotions.filter((code) => {
                            if (searchPromotion === "") {
                                return code
                            } else if (code.promoPCode.toLowerCase().includes(searchPromotion.toLowerCase())) {
                                
                                return code
                            }
                    })
                    .map((promotion, i) => (
                    //<Card key={i} advertisement={ advertisement }/>
                        <div className="col-3 mb-3" >
                            <div className="card border-secondary" style={{ marginTop : "10px",height: "450px"}}>
                                <div className="card-header bg-transparent" style={{textAlign : "center", fontSize : 20,marginTop : "-20px"}}>{promotion.promoName}</div>
                                <div className="card-body">
                                    <ShowImage item={ promotion } url="promotion"/>
                                    <p>{ promotion.promoCode }</p>
                                    <Link to={ `/admin/promotion/${ promotion._id }` }>
                                        <button className="btn btn-outline-primary mt-2 mb-2 ml-2">View</button>
                                    </Link>
                                    <Link to={ `/admin/updatePromotion/${ promotion._id }` }>
                                        <button className="btn btn-outline-warning mt-2 mb-2 ml-2">Update</button>
                                    </Link>
                                    <button className="btn btn-outline-danger mt-2 mb-2 ml-2" onClick={ () => remove(promotion._id) }>Delete</button>
                                </div>
                            </div>
                        </div>)) 
                    }
                </div>
            </Sidebar>
        </div>
    );
};

export default ManagePromotions;