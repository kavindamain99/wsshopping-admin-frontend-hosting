import React, { useState, useEffect } from 'react';
//import Layout from '../core/layout';
import { Link } from 'react-router-dom';
import Chart from "react-google-charts";

import Sidebar from '../core/sidebar';

import { getstats } from "../Auth/admin-item/stat";
import StatsCards from '../core/statsCards';
//import Swal from 'sweetalert2';


const ManageOrderstats = () => {
    const [orderStats, setStats] = useState([]);

    const loadStats = () => {
        getstats().then(data => {
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


    const cancel = [];
    const complete = [];
    const progress = [];


    return (
        <Sidebar>
            
            <div className="row">
                <div style={{display : "none"}}>
            {orderStats.map((p, i) => (cancel.push(p.cancel)))}
            {orderStats.map((p, i) => (complete.push(p.completed)))}
            {orderStats.map((p, i) => (progress.push(p.progressing)))}
            </div>

                <div className="d-flex justify-content-center" style={{marginBottom:"-100px"}}>
                    <h1>Order Stats</h1>
                    
                    <Chart
                        width={'1000px'}
                        height={'600px'}
                        chartType="PieChart"
                        loader={<div>Loading Chart</div>}
                        data={[
                            ['Status', 'Rate'],
                            ['Completed', complete.reduce((a,b)=>a+b,0)],
                            ['Cancelled', cancel.reduce((a,b)=>a+b,0)],
                            ['Progressing',  progress.reduce((a,b)=>a+b,0)],

                        ]}
                        
                        options={{
                            colors: ['green','red','blue'],
                            // Just add this option
                            is3D: true,
                        }}
                        rootProps={{ 'data-testid': '2' }}
                    />
                </div>
            </div>

            <StatsCards></StatsCards>


        </Sidebar>





    )



}


export default ManageOrderstats;