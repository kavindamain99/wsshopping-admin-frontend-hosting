import { API } from "../../config";

export const insertPromotion = promotion => {
    return fetch(`${ API }/admin/promotion/insert`, {
        method : "POST",
        headers : {
            Accept : "application.json"
        },
        body : promotion
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    });
};