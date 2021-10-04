import React, { useState, useEffect } from 'react';
//import Layout from '../core/layout';
import Sidebar from '../core/sidebar';
//Insert product API
import { Link } from 'react-router-dom';
import { insertCategory } from "../Auth/admin-item/insertCategory";
import { getCategories, deleteCategory, categoryStats } from "../Auth/admin-item/getCategory";

import Chart from "react-google-charts";
import Swal from 'sweetalert2';



const InsertCategory = () => {



    //display Categories

    // load categories and set form data
    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    categories: data,
                    formData: new FormData()
                });
            }
        });

        categoryStats().then(data => {
            if (data.error) {
                setStats({ ...values, error: data.error });
            } else {
                setStats({
                    ...values,
                    categorystats: data,
                });
            }
        });
    };

    useEffect(() => {
        init();
    }, []);

    //deleteCategory
    const destroy = categoryId => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        })
            .then((result) => {
                if (result.isConfirmed) {
                    deleteCategory(categoryId).then(data => {
                        if (data.error) {
                            console.log(data.error);
                        } else {
                            Swal.fire(
                                'Deleted',
                                'Category Deleted Successfully',
                                'success'
                            )
                            init();
                        }
                    });

                } else {
                    init();
                }
            })
    };

    useEffect(() => {
        getCategories();
    }, []);



    const [values, setValues] = useState({
        category: '',
        error: "",
        categories: [],
        success: false

    });

    const [stats, setStats] = useState({
        _id: "",
        count: "",
        categorystats: [],

    });

    const { category, success, error, categories } = values;
    const { _id, count, categorystats } = stats;

    const handleChange = name => event => {


        setValues({ ...values, error: false, success: false, [name]: event.target.value });

    };

    const clickSubmit = event => {

        event.preventDefault();
        setValues({ ...values, error: false, success: false });

        if (category !== "") {

            insertCategory({ category }).then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, success: false });
                }
                else {
                    setValues({
                        ...values,
                        category: '',
                        error: "",
                        success: true




                    });
                    init();
                }
            });

        }
    };

    const new_stats = [];
    const new_stats_value = [];

//category insert 
    const categoryForm = () => (


        <form>
            <br />
            <br />
            <div className="form-group">
                <label className="" style={{ fontSize: "20px" }}>Category Name </label>
                <input onChange={handleChange('category')} type="text" className="form-control" value={category} />
            </div>
            <button onClick={clickSubmit} className="btn btn-outline-primary btn-block" >Insert Category</button>

            <div>
                <div style={{ display: "none" }}>
                    {categorystats.map((obj, i) => (


                        new_stats.push(obj._id),
                        new_stats_value.push(obj.count)

                    ))}
                </div>

                <br />

                <br />
                <br />
                <h2>Category Stats</h2>
                <div className="d-flex justify-content-center">
                
                <Chart
                    width={'500px'}
                    height={'300px'}
                    chartType="Bar"
                    loader={<div>Loading Chart</div>}
                    
                    data={[

                        ['Category', 'Products'],
                        [new_stats[0], new_stats_value[0]],
                        [new_stats[1], new_stats_value[1]],
                        [new_stats[2], new_stats_value[2]],
                        [new_stats[3], new_stats_value[3]],
                        [new_stats[4], new_stats_value[4]],

                       
                        

                    ]}
                    options={{
                        colors: ['#1E3F66'],
                        // Material design options
                        chart: {
                           
                        },
                    }}
                    // For tests
                    rootProps={{ 'data-testid': '2' }}
                />

</div>
                <br />
                <br />
                <br />
                <h2>Existing Categories</h2>
                <br />


                {categories &&
                    categories.map((c, i) => (

                        <ul key={i} className="list-group  ">
                            <li className="list-group-item bg-light d-flex justify-content-between align-items-center ">{c.category} <span onClick={() => destroy(c._id)} className="badge badge-danger badge=pill p-2" style={{ cursor: "pointer" }} id="listBtn">Delete</span></li>
                        </ul>


                    ))}


            </div>
        </form>


    )



    //show success or failure
    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: success ? "" : 'none' }}>
            <h2>"New Category Inserted Successfully!</h2>
        </div>
    );

    return (

        <Sidebar>
            {showError()}
            {showSuccess()}
            {categoryForm()}



        </Sidebar>

    )


}
export default InsertCategory;