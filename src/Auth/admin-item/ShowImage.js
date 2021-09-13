import React from 'react'
import {API} from "../../config";

const ShowImage = ({item,url})=>(
    <div className="product-image">
        <img src={`${API}/admin/product/image/${item._id}`} alt={item.item_name} className="mb-3" 
         style={{ maxHeight: "200px", maxWidth: "200px",minWidth: "200px",minheight: "200px"}}></img>
    </div>
)

export default ShowImage;