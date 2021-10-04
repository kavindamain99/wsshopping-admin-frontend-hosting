import React, { useState } from "react";

import Sidebar from '../core/sidebar';
import {API}  from "../config.js"
import './admin.css';


class AdminPage extends React.Component{
    constructor(props){
      super(props);
      this.state = {apiResponse:[]};
    }
  
    callAPI(){
      fetch(`${API}/api/adminPage`,{
        method:"POST",
        headers:{
            Accept: "application/json",
            "Content-type":"application/json"
        },
        
    }).then(res=> res.json())
        .then(res => this.setState({apiResponse:res}));
    }

  
    handleSearch(e){
      var search = document.getElementById("search").value;
      fetch(`${API}/api/adminPage?search=`+search,{
        method:"POST",
        headers:{
            Accept: "application/json",
            "Content-type":"application/json"
        },
      }).then(res=> res.json())
        .then(res => this.setState({apiResponse:res}));
    }

    componentWillMount(){
      this.callAPI();
    }

    render(){
      var ResData = this.state.apiResponse;
      console.log(ResData);
      var countNum = 0;

      return(

        
        
        <Sidebar>
            <a href={`${API}/api/genReport`} target="_blank" rel="noreferrer" ><button type="button" className="btn btn-warning" style={{height: "100%"}}>Generate a Report</button></a><br/>

            <div className="card mb-5" style={{marginLeft: '0%', marginRight: '0%'}}>
              
                <h3 className="card-header"style={{textAlign: 'center'}}>All Users</h3>
                <br/>
                <br/>
                <br/>
                
                <div className="text-center p-2">
                  <input type="text" name="search" id="search" placeholder="Search by city..." class="form-control search-box" style={{width:"min-content"}}/>
                  <button className="btn btn-info search-btn" onClick={(e) => this.handleSearch(e)}>Search</button>
                </div>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Firstname</th>
                      <th>Lastname</th>
                      <th>Email</th>
                      <th>Address 01</th>
                      <th>Address 02</th>
                      <th>City</th>
                      <th>Post Code</th>
                      <th>Phone Number</th>
                      <th>Created At</th>
                    </tr>
                  </thead>
                  <tbody>


            {ResData.map((data) => {
                return(
                  <tr>
                    <td>{++countNum}</td>
                    <td>{data.firstname}</td>
                    <td>{data.lastname}</td>
                    <td>{data.email}</td>
                    <td>{data.addressl1}</td>
                    <td>{data.addressl2}</td>
                    <td>{data.city}</td>
                    <td>{data.postalcode}</td>
                    <td>{data.phoneno}</td>
                    <td>{data.createdAt}</td>
                  </tr>                
                )
            })}
            
            
                </tbody>
              </table>  
              </div>
        </Sidebar>

      )  
    }
    
}

export default AdminPage;