import {API} from "../../config";



export const insertCategory = category =>{



    return fetch(`${API}/admin/category/categoryAdd`,{
        method: "POST",

        headers:{
            Accept: "application/json",
           "Content-Type": "application/json"
        },
        body:JSON.stringify(category),


    })
    .then(response =>{
        return response.json();
    })
    .catch(err =>{
        console.log(err);
    });


};