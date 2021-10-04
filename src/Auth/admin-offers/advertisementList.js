import { API } from "../../config"

export const getAdvertisementsList = () => {
    return fetch(`${ API }/admin/advertisements?sortBy=createdAt&order=desc`, {
        method : "GET"
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    });
};

export const deleteAdvertisement = (advertisementId) => {
    return fetch(`${ API }/admin/advertisement/${ advertisementId }`, {
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