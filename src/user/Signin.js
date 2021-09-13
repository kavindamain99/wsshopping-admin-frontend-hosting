import React, {useState} from "react";
import { Redirect, Link } from "react-router-dom";

import Sidebar from '../core/navbar/navbarSign';
import { signin, authenticate } from "../Auth/user/user";

const Signin = () => {

    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        loading: false,
        redirectToReferrer: false,
    });

    const {email, password, loading, error, redirectToReferrer} = values;
   // const {user} = isAuthenticated();

    const handleChange = firstname => event => {
        setValues({...values, error: false, [firstname]: event.target.value})
    };
 

    const clickSubmit = (event) => {
        event.preventDefault()
        
        setValues({...values, error: false, loading: true });

        signin({ email, password })
        .then(data => {
            if(data.error) {
                setValues({...values, error: data.error, loading: false});
            } else {
                authenticate(
                    data,
                    () => {
                        setValues({
                            ...values,
                            redirectToReferrer: true
                        });
                    }
                );
            }
        });
    };

    const signupForm = () => (
        <form>
           
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={handleChange('email')} type="email" className="form-control" value={email} />
            </div>

            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={handleChange('password')} type="password" className="form-control" value={password} />
            </div>

            <button onClick={clickSubmit} className="btn btn-primary" style={{ marginLeft : '35%' }}>Click to the Signin</button>

        </form>
    );

    const showError = () => (
        
            <div className="alert alert-danger" style={{display: error ? '' : 'none', marginTop: '10px', marginBottom: '10px'}}>
                
                <Link to="/Signup">{error}</Link>
            </div>
        
    );


    const showLoading = () => 
        loading && (<div className="alert alert-into"><h2>Loading...</h2></div>);

    const redirectUser = () => {
        if(redirectToReferrer) {
            return <Redirect to="/admin/manageProduct" />
        }
    }

    //confirm password section I not implement still yet
return (
   
<Sidebar>
<div className="container col-4 offset-md-4" style={{ marginLeft:"250px"}}>
        {showLoading()}
        {showError()}
        {signupForm()}
        {redirectUser()}
        </div>
        </Sidebar> 
       
    );

};

export default Signin;

