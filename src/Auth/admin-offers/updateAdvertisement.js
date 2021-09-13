import { API } from "../../config";

export const getAdvertisement = (advertisementId) => {
    return fetch(`${ API }/admin/advertisement/${ advertisementId }`, {
        method : "GET"
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    });
};

export const updateAdvertisement = (advertisementId, advertisement) => {
    return fetch(`${ API }/admin/advertisement/${ advertisementId }`, {
        method : "PUT",
        headers : {
            Accept : "application/json",
        },
        body : advertisement
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    });
};