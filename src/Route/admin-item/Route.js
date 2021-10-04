/* import React  from 'react';

import{BrowserRouter,Switch,Route} from 'react-router-dom';

import InsertProduct from '../../admin-item/insertProduct';

import manageProductList from '../../admin-item/listProduct';
import manageOrderstats from '../../admin-item/stat';
import updateProduct from '../../admin-item/updateProduct';
import getSingleProduct from '../../admin-item/singleProduct';
import insertCategory from '../../admin-item/insertCategory';

import redstats from '../../admin-item/statsRecords/red';
import greenstats from '../../admin-item/statsRecords/green';
import yellowstats from '../../admin-item/statsRecords/yellow';




const Routes =()=>{
    return (
        <BrowserRouter>

            
            <Switch>
                
                <Route path="/admin/insertProduct" exact component={InsertProduct}/>
                <Route path="/admin/manageProduct" exact component={manageProductList}/>
                <Route path="/updateProduct/:productId" exact component={updateProduct}/>
                <Route path="/getSingleProduct/:productId" exact component={getSingleProduct}/>
                <Route path="/admin/insertCategory" exact component={insertCategory}/>
                <Route path="/admin/stats" exact component={manageOrderstats}/>
                <Route path="/admin/redstats" exact component={redstats}/>
                <Route path="/admin/yellowstats" exact component={yellowstats}/>
                <Route path="/admin/greenstats" exact component={greenstats}/>
                
               
            </Switch>
        </BrowserRouter>
    );
}

export default Routes; */