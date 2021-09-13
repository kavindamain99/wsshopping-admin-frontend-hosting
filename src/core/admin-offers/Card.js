import React from 'react'
import { Link } from 'react-router-dom'
import ShowImage from './ShowImage';

const Card = ({ advertisement }) => {
    return (
        <div className="col-4 mb-3">
            <div className="card">
                <div className="card-header">{advertisement.adName}</div>
                <div className="card-body">
                    <ShowImage item={ advertisement } url="advertisement"/>
                    <p>{ advertisement.adCode }</p>
                    <Link>
                        <button className="btn btn-outline-primary mt-2 mb-2 ml-2">View</button>
                    </Link>
                    <Link>
                        <button className="btn btn-outline-warning mt-2 mb-2 ml-2">Update</button>
                    </Link>
                    <button className="btn btn-outline-danger mt-2 mb-2 ml-2">Delete</button>
                </div>
            </div>
        </div>
    );
};

export default Card;