import {API} from "../../config";

export const getstats = () => {

    //if we say limit as undefined, we can get all the products
    return fetch(`${API}/admin/orderstats`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export const getstatsFilteredGreen = () => {

    //if we say limit as undefined, we can get all the products
    return fetch(`${API}/admin/orderStatsFiltered/green`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getstatsFilteredYellow = () => {

    //if we say limit as undefined, we can get all the products
    return fetch(`${API}/admin/orderStatsFiltered/yellow`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getstatsFilteredRed = () => {

    //if we say limit as undefined, we can get all the products
    return fetch(`${API}/admin/orderStatsFiltered/red`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};