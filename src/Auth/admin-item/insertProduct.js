import {API} from "../../config";



export const insertProduct = product =>{



    return fetch(`${API}/admin/product/insert`,{
        method: "POST",

        headers:{
            Accept: 'application/json'
        },
        body:product


    })
    .then(response =>{
        return response.json();
    })
    .catch(err =>{
        console.log(err);
    });


};