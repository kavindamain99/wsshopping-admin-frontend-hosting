import {API} from "../../config";

export const getProduct = (productId) => {
    return fetch(`${API}/admin/product/${productId}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};




export const updateProduct = (productId,product) => {


    return fetch(`${API}/admin/product/${productId}`,{
        method:"PUT",
        headers:{
            Accept: "application/json",
            
        },
        body:product
        
    }).then(response=>{
        return response.json();
    }).catch(err => console.log(err));


}