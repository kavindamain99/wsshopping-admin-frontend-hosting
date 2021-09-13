import {API} from "../../config";


export const getProducts = () => {
    return fetch(`${API}/admin/products?limit=undefined`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getProductsList = () => {

    //if we say limit as undefined, we can get all the products
    return fetch(`${API}/admin/products?limit=100`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};



//delete Product
export const deleteProduct = (productId) => {


    return fetch(`${API}/admin/product/${productId}`,{
        method:"DELETE",
        headers:{
            Accept: "application/json",
            "Content-type":"application/json"
        },
        
    }).then(response=>{
        return response.json();
    }).catch(err => console.log(err));


}