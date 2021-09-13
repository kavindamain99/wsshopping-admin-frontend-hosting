import { API } from "../../config"

export const insertAdvertisement = advertisement => {
    return fetch(`${ API }/admin/advertisement/insert`, {
        method : "POST",
        headers : {
            Accept : "application/json"
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
