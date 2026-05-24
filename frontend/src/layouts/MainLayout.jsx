import React from 'react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import "./MainLayout.css"

const MainLayout = ({ children }) => {
    return (
        <div className="layout">

            <Navbar />

            <div className="main-content">
                {children}
            </div>

            <Footer />

        </div>
    )
}

export default MainLayout