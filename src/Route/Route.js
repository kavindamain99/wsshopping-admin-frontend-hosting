import React  from 'react';

import{BrowserRouter,Switch,Route} from 'react-router-dom';


//It20226046 Item routes
import InsertProduct from '../admin-item/insertProduct';

import manageProductList from '../admin-item/listProduct';
import updateProduct from '../admin-item/updateProduct';
import getSingleProduct from '../admin-item/singleProduct';
import insertCategory from '../admin-item/insertCategory';


//it20227036 Offer routes
import InsertAdvertisement from "../admin-offers/insertAdvertisement"
import ManageAdvertisements from "../admin-offers/manageAdvertisements"
import updateAdvertisement from '../admin-offers/updateAdvertisement'
import Advertisement from '../admin-offers/advertisement'

import InsertPromotion from '../admin-offers/insertPromotion'
import ManagePromotions from '../admin-offers/managePromotions'
import UpdatePromotion from '../admin-offers/updatePromotion'
import Promotion from '../admin-offers/promotion'


//it20236564 user routes

import Signin from '../user/Signin';
import PrivateRoute from "../Auth/user/PrivateRoute";


const Routes =()=>{
    return (
        <BrowserRouter>

            
            <Switch>

                {/*}it20226046 Offer routes{*/}
                <Route path="/admin/insertProduct" exact component={InsertProduct}/>
                <Route path="/admin/manageProduct" exact component={manageProductList}/>
                <Route path="/updateProduct/:productId" exact component={updateProduct}/>
                <Route path="/getSingleProduct/:productId" exact component={getSingleProduct}/>
                <Route path="/admin/insertCategory" exact component={insertCategory}/>

                {/*}it20227036 Offer routes{*/}
                <Route exact path="/admin/managePromotions" component = { ManagePromotions }></Route>
                <Route path="/admin/manageAds" component = { ManageAdvertisements }></Route>
                <Route path="/admin/insertPromotion" component = { InsertPromotion }></Route>
                <Route path="/admin/insertAd" component = { InsertAdvertisement }></Route>
                <Route path="/admin/updatePromotion/:promotionId" component = { UpdatePromotion }></Route>
                <Route path="/admin/updateAd/:advertisementId" component = {updateAdvertisement }></Route>
                <Route path="/admin/promotion/:promotionId" component = { Promotion }></Route>
                <Route path="/admin/advertisement/:advertisementId" component = { Advertisement }></Route>
                
                <Route path="/Signin" exact component={Signin} /> 
                <Route path="/" exact component={Signin} /> 
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;