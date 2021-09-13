import {API}  from "../../config.js"


export const signup = (user) => {
    // i changed below as the above
   //const Signup = (firstname, lastname, email, phoneno, addressl1, addressl2, city, postalcode, password, confirmpassword) => {
       //console.log(firstname, lastname, email, phoneno, addressl1, addressl2, city, postalcode, password, confirmpassword);
       
       //in the fetch signup should be user_signup
       return fetch(`${API}/api/user_signup`, {
           method: "POST",
           headers: {
               Accept: "application/json",
               "Content-Type": "application/json"
           },
           // in here i did not give confirm password
           //body: JSON.stringify(firstname, lastname, email, phoneno, addressl1, addressl2, city, postalcode, password)
           //above syntax changed as below
           body: JSON.stringify(user)
       })
       .then(response => {
           return response.json();
       })
       .catch(err => {
           console.log(err);
       });
   };

   export const signin = (user) => {
    // i changed below as the above
   //const Signup = (firstname, lastname, email, phoneno, addressl1, addressl2, city, postalcode, password, confirmpassword) => {
       //console.log(firstname, lastname, email, phoneno, addressl1, addressl2, city, postalcode, password, confirmpassword);
       
       //in the fetch signup should be user_signup
       return fetch(`${API}/api/user_signin`, {
           method: "POST",
           headers: {
               Accept: "application/json",
               "Content-Type": "application/json"
           },
           // in here i did not give confirm password
           //body: JSON.stringify(firstname, lastname, email, phoneno, addressl1, addressl2, city, postalcode, password)
           //above syntax changed as below
           body: JSON.stringify(user)
       })
       .then(response => {
           return response.json();
       })
       .catch(err => {
           console.log(err);
       });
   };

   export const authenticate = (data, next) => {
       if(typeof window !== 'undefined') {
           localStorage.setItem('jwt', JSON.stringify(data));
           next();
       }
   };

   export const signout = (next) => {
    if(typeof window !== 'undefined') {
        localStorage.removeItem('jwt');
        next();
        return fetch(`${API}/user_signout`, {
            method: "GET",
        })
            .then(response => {
                console.log('Signout', response);
            })
            .catch(err => console.log(err));
    }

   };

  export const isAuthenticated = () => {
    if(typeof window == 'undefined') {
        return false
    }
    if (localStorage.getItem('jwt')) {
        return JSON.parse(localStorage.getItem('jwt'))
    } else {
        return false;
    }
  }; 

  //delete User
export const deleteUser = (userId) => {


    return fetch(`${API}/api/delete/${userId}`,{
        method:"DELETE",
        headers:{
            Accept: "application/json",
            "Content-type":"application/json"
        },
        
    }).then(response=>{
        return response.json();
    }).catch(err => console.log(err));


}