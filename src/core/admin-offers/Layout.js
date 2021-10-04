import React from 'react'

const Layout = ({ title = "title", className, children, }) => (
    <div>
        <div className="jumbotron" >
            <h2 style={{textAlign : 'center', fontSize : 50}}>{ title }</h2>
        </div>
        <div className={ className }>{ children }</div>
    </div>
);

export default Layout