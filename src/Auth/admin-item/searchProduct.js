import queryString from 'query-string';
import {API} from "../../config";
//for the searching
export const list = params =>{

    const query =queryString.stringify(params);
    console.log('query',query);
    
        return fetch (`${API}/products/search?${query}`,{
            method: "GET"
        }).then(response =>{
            return response.json();
        }).catch(err =>console.log(err));
    };