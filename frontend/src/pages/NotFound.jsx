// NotFound.jsx

import React from 'react'
import { Link } from 'react-router-dom'
import "./NotFound.css"

const NotFound = () => {
    return (
        <div className='notfound-container'>

            <h1>404</h1>

            <p>Oops! Page Not Found</p>

            <button className='notfound-btn' >
                <Link to="/" className='notfound-btn'>Go to Home</Link>
            </button>

        </div>
    )
}

export default NotFound