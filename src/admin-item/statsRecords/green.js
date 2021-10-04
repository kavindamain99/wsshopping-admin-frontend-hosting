import React, { useState, useEffect } from 'react';
//import Layout from '../core/layout';
import Sidebar from '../../core/sidebar';
import { FaSearch } from 'react-icons/fa';
//import { getstats } from "../../Auth/admin-item/stat";
import { getstatsFilteredGreen } from "../../Auth/admin-item/stat";

//import { Link } from 'react-router-dom';
//import Swal from 'sweetalert2';

import Pdf from "react-to-pdf";

//pdf references
const ref = React.createRef();
const newDate = new Date();
let date = newDate.getDate();
let month = newDate.getMonth() + 1;
let year = newDate.getFullYear();

const rate = 30;
//green stats record 
const Greenstats = () => {
    const [orderStats, setStats] = useState([]);

    const loadStats = () => {
        getstatsFilteredGreen().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setStats(data);
            }
        });
    };




    useEffect(() => {
        loadStats();
    }, []);
    const [searchTerm, setSearchTerm] = useState('');
    return (
        <Sidebar>


<div className="row">

<div className="col-lg-12 mt-2 mb-2">

    <div class="input-group mb-3">
        <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1"><FaSearch /></span>
        </div>
        <input className="form-control" style={{ maxWidth: "540px", marginRight: "20px" }} type="search" placeholder="Search By Name " name="searchForm"
            onChange={event => { setSearchTerm(event.target.value) }}
        ></input>
        <Pdf targetRef={ref} filename={date + "_" + month + "_" + year + "_" + "yellow"}>
            {({ toPdf }) => <button onClick={toPdf}>Download as PDF</button>}
        </Pdf>
    </div>
</div>
</div>
            <div className="col-8">

                <div className="Post" ref={ref}>
                    <table class="table table-hover">
                        <thead>
                            <tr style={{ color: 'red' }}>
                                <th>Customer</th>
                                <th>Cancel rate</th>
                                <th>Complete rate</th>
                            </tr>
                        </thead>
                        {orderStats.filter((val) => {
                            if (searchTerm === "") {
                                return val
                            } else if (val.userName.toLowerCase().includes(searchTerm.toLowerCase())) {
                                return val
                            }
                        }).map((p, i) => (
                            <tbody>
                                <tr>
                                    <td>

                                        <h4>
                                            {p.userName}


                                        </h4>
                                    </td>
                                    <td>
                                        <h4>

                                            {(p.cancel * 100).toFixed(2)} %


                                        </h4>
                                    </td>
                                    <td>
                                        <h4>

                                            {(p.complete * 100).toFixed(2)} %


                                        </h4>

                                    </td>



                                </tr>
                            </tbody>



                        ))}
                    </table></div>


            </div>

        </Sidebar>
    )



}

export default Greenstats;