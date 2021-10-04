import { API } from "../../config"

export const getPromotionsList = () => {
    return fetch(`${ API }/admin/promotions?sortBy=promoStartDate&order=desc`, {
        method : "GET"
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    });
};

export const deletePromotion = (promotionId) => {
    return fetch(`${ API }/admin/promotion/${ promotionId }`, {
        method : "DELETE",
        headers : {
            Accept : "application/json",
            "Content-type":"application/json"
        }
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    });
};