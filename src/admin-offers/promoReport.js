import React, { useState, useEffect } from 'react'
import { Doughnut } from 'react-chartjs-2';

import Pdf from "react-to-pdf"

import { getPromotionsList } from "../Auth/admin-offers/promotionList";
import Sidebar from "../core/sidebar";

const ref = React.createRef();

const current = new Date();
const date = `${ current.getDate() }-${ current.getMonth() + 1 }-${ current.getFullYear() }`

const PromoReport = () => {
    const [promotions, setPromotions] = useState([]);

    const loadPromotions = () => {
        getPromotionsList().then(data => {
            if (data.error) {
                console.log(data.error);
            }
            else {
                setPromotions(data);
            }
        })
    };

    const reportData = () => {
        var cat1 = 0,
        cat2 = 0,
        cat3 = 0,
        cat4 = 0,
        cat5 = 0,
        cat6 = 0,
        cat7 = 0,
        cat8 = 0,
        cat9 = 0,
        cat10 = 0,
        cat11 = 0,
        cat12 = 0;

        promotions.forEach((promotion, i) => {
            if(promotion.promoPCategory === "BEVERAGES") {
                cat1++;
            }
            else if(promotion.promoPCategory === "BREAD-BAKERY") {
                cat2++;
            }
            else if(promotion.promoPCategory === "BREAKFAST-CEREAL") {
                cat3++;
            }
            else if(promotion.promoPCategory === "CANNED_GOODS") {
                cat4++;
            }
            else if(promotion.promoPCategory === "CONDIMENTS") {
                cat5++;
            }
            else if(promotion.promoPCategory === "COOKIES-SNACKS-CANDY") {
                cat6++;
            }
            else if(promotion.promoPCategory === "DAIRY-EGG-CHEESE") {
                cat7++;
            }
            else if(promotion.promoPCategory === "FROZEN-FOODS") {
                cat8++;
            }
            else if(promotion.promoPCategory === "FRUITS-VEGETABLES") {
                cat9++;
            }
            else if(promotion.promoPCategory === "MEAT-SEAFOOD") {
                cat10++;
            }
            else if(promotion.promoPCategory === "MISCELLANEOUS") {
                cat11++;
            }
            else if(promotion.promoPCategory === "CLEANING_SUPPLIES") {
                cat12++;
            }
        })
        
        return {
            labels : ["Beverages", "Bread and Bakery", "Breakfast and Cereal", "Canned goods", "Condiments", "Cookies, Snacks and Candy", "Dairy, Egg and Cheese", "Frozen foods", "Fruits and Vegetables", "Meat and Seafood", "Miscellaneous", "Cleaning supplies"],
            datasets : [{
                lab : "Promo Report",
                data : [cat1, cat2, cat3, cat4, cat5, cat6, cat7, cat8, cat9, cat10, cat11, cat12],
                backgroundColor : [
                    'rgb(255, 51, 51)',
                    'rgb(51, 255, 255)',
                    'rgb(255, 153, 51)',
                    'rgb(51, 153, 255)',
                    'rgb(255, 255, 51)',
                    'rgb(153, 51, 255)',
                    'rgb(51, 255, 51)',
                    'rgb(255, 51, 255)',
                    'rgb(153, 255, 51)',
                    'rgb(255, 51, 153)',
                    'rgb(160, 160, 160)',
                    'rgb(51, 51, 255)',
                ],
                hoverOffset : 4,
            }]
        }
    };

    const reportTable = () => {
        var cat1 = 0,
            cat2 = 0,
            cat3 = 0,
            cat4 = 0,
            cat5 = 0,
            cat6 = 0,
            cat7 = 0,
            cat8 = 0,
            cat9 = 0,
            cat10 = 0,
            cat11 = 0,
            cat12 = 0;

        promotions.forEach((promotion, i) => {
            if(promotion.promoPCategory === "BEVERAGES") {
                cat1++;
            }
            else if(promotion.promoPCategory === "BREAD-BAKERY") {
                cat2++;
            }
            else if(promotion.promoPCategory === "BREAKFAST-CEREAL") {
                cat3++;
            }
            else if(promotion.promoPCategory === "CANNED_GOODS") {
                cat4++;
            }
            else if(promotion.promoPCategory === "CONDIMENTS") {
                cat5++;
            }
            else if(promotion.promoPCategory === "COOKIES-SNACKS-CANDY") {
                cat6++;
            }
            else if(promotion.promoPCategory === "DAIRY-EGG-CHEESE") {
                cat7++;
            }
            else if(promotion.promoPCategory === "FROZEN-FOODS") {
                cat8++;
            }
            else if(promotion.promoPCategory === "FRUITS-VEGETABLES") {
                cat9++;
            }
            else if(promotion.promoPCategory === "MEAT-SEAFOOD") {
                cat10++;
            }
            else if(promotion.promoPCategory === "MISCELLANEOUS") {
                cat11++;
            }
            else if(promotion.promoPCategory === "CLEANING_SUPPLIES") {
                cat12++;
            }
        })

        let catTotal = cat1 + cat2 + cat3 + cat4 + cat5 + cat6 + cat7 + cat8 + cat9 + cat10 + cat11 + cat12;

        return(
            <div style = {{ marginBottom : "60px" }}>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Category</th>
                            <th scope="col">Promotions</th>
                            <th scope="col">Percentage (%)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Beverages</td>
                            <td>{ cat1 }</td>
                            <td>{ (cat1 / catTotal) * 100 }</td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <th scope="row">2</th>
                            <td>Bread and Bakery</td>
                            <td>{ cat2 }</td>
                            <td>{ (cat2 / catTotal) * 100 }</td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <th scope="row">3</th>
                            <td>Breakfast and Cereal</td>
                            <td>{ cat3 }</td>
                            <td>{ (cat3 / catTotal) * 100 }</td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <th scope="row">4</th>
                            <td>Canned goods</td>
                            <td>{ cat4 }</td>
                            <td>{ (cat4 / catTotal) * 100 }</td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <th scope="row">5</th>
                            <td>Condiments</td>
                            <td>{ cat5 }</td>
                            <td>{ (cat5 / catTotal) * 100 }</td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <th scope="row">6</th>
                            <td>Cookies, Snacks and Candy</td>
                            <td>{ cat6 }</td>
                            <td>{ (cat6 / catTotal) * 100 }</td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <th scope="row">7</th>
                            <td>Dairy, Egg and Cheese</td>
                            <td>{ cat7 }</td>
                            <td>{ (cat7 / catTotal) * 100 }</td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <th scope="row">8</th>
                            <td>Frozen foods</td>
                            <td>{ cat8 }</td>
                            <td>{ (cat8 / catTotal) * 100 }</td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <th scope="row">9</th>
                            <td>Fruits and Vegetables</td>
                            <td>{ cat9 }</td>
                            <td>{ (cat9 / catTotal) * 100 }</td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <th scope="row">10</th>
                            <td>Meat and Seafood</td>
                            <td>{ cat10 }</td>
                            <td>{ (cat10 / catTotal) * 100 }</td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <th scope="row">11</th>
                            <td>Miscellaneous</td>
                            <td>{ cat11 }</td>
                            <td>{ (cat11 / catTotal) * 100 }</td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <th scope="row">12</th>
                            <td>Cleaning supplies</td>
                            <td>{ cat12 }</td>
                            <td>{ (cat12 / catTotal) * 100 }</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
            
    }

    useEffect(() => {
        loadPromotions();
        reportData();
        reportTable();
    }, []);

    return(
        <Sidebar>
            <div style = {{ marginLeft : "20%", marginRight : "20%" }}>
                <div style = {{ marginBottom : "40px" }}>
                    <Pdf targetRef = { ref } filename = { "PRM-RP" + date }>
                        {({ toPdf }) => <button className="btn btn-outline-success mt-2 mb-2" onClick={ toPdf }>Generate PDF</button>}
                    </Pdf>
                </div>
                <div ref={ ref }>
                    <h1 style = {{ marginBottom : "20px" }}>Promo Report</h1>
                    { reportTable() }
                    <div>
                        <Doughnut 
                            width = { 600 }
                            height = { 400 }

                            options={{ 
                                responsive : true,
                                maintainAspectRatio: false,
                                plugins : {
                                    legend : {
                                        display : true,
                                        position : "left",
                                        align : "center",
                                        labels : {
                                            font : {
                                                size : 18
                                            }
                                        }
                                    },
                                }
                            }}
                            data = { reportData }
                        /> 
                    </div>
                </div>
            </div>
        </Sidebar>
    )
}

export default PromoReport;