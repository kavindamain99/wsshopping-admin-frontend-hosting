
import {API} from "../../config";

export const getSingleProduct = productId => {
    return fetch(`${API}/admin/product/${productId}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};