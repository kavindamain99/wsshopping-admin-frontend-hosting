
import {API} from "../../config";

export const getCategory = categoryId => {
    return fetch(`${API}/admin/category/${categoryId}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getCategories = () => {
    return fetch(`${API}/admin/categories`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

//delete Product
export const deleteCategory= (categoryId) => {


    return fetch(`${API}/admin/category/${categoryId}`,{
        method:"DELETE",
        headers:{
            Accept: "application/json",
            "Content-type":"application/json"
        },
        
    }).then(response=>{
        return response.json();
    }).catch(err => console.log(err));


}