import { API } from "../../config";

export const getPromotion = (promotionId) => {
    return fetch(`${ API }/admin/promotion/${ promotionId }`, {
        method : "GET"
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    });
};

export const updatePromotion = (promotionId, promotion) => {
    return fetch(`${ API }/admin/promotion/${ promotionId }`, {
        method : "PUT",
        headers : {
            Accept : "application/json",
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