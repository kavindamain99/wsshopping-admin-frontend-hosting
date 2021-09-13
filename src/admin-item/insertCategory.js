import React,{useState,useEffect} from 'react';
//import Layout from '../core/layout';
import Sidebar from '../core/sidebar';
//Insert product API
import { Link } from 'react-router-dom';
import {insertCategory} from "../Auth/admin-item/insertCategory";
import {getCategories,deleteCategory} from "../Auth/admin-item/getCategory";
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
};

useEffect(() => {
    init();
}, []);

//deleteCategory
const destroy = categoryId=> {
    var x = window.confirm("Are you sure you want to delete this post ? ");


    if (x === true) {
        deleteCategory(categoryId).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {

               init();
            }
        });

    } else {
        init();
    }

};

useEffect(() => {
    getCategories();
}, []);



    const [values,setValues] = useState({
        category : '',
        error:"",
        categories: [],
        success:false
       
    });

    const {category,success,error,categories} = values;

    const handleChange = name => event => {

       
        setValues({...values,error:false,success:false,[name]:event.target.value});
        
    };

    const clickSubmit=event =>{

        event.preventDefault();
        setValues({ ...values, error: false,success:false });

        if(category!==""){

        insertCategory({category}).then(data=>{
            if(data.error){
                setValues({...values,error:data.error,success:false});
            }
            else{
                setValues({
                    ...values,
                    category:'',
                    error:"",
                    success:true
                    



                });
                init();
            }
        });
    
    }};


    const categoryForm=()=>(
    

        <form>
            <br/>
                    <br/>
            <div className="form-group">
            <label className="" style={{fontSize:"20px"}}>Category Name </label>
            <input onChange={handleChange('category')} type="text" className="form-control" value={category} />
        </div>
        <button onClick={clickSubmit} className="btn btn-outline-primary btn-block" >Insert Category</button>
        
        <div>
                        
                    <br/>
                    <br/>
                    <br/>
                    
                    <br/>
                    <h2>Existing Categories</h2>
                    <br/>
                    
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
    <div className="alert alert-info" style={{display: success ? "" :'none'}}>
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