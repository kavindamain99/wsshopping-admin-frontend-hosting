import React from 'react'
import { API } from '../../config'
import emptyImage from '../../Images/blank-img.jpg';

const ShowImage = ({ item, url }) => (
    <div className="offer-image">
        <img src={`${ API }/admin/${ url }/image/${ item._id }`} alt={ emptyImage } className="mb-3" style={{ maxHeight : '100%', maxWidth : '100%'}}/>
    </div>
);

export default ShowImage;

