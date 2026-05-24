// About.jsx

import React from 'react'
import "./About.css"

const About = () => {
    return (
        <div className='about-container'>

            {/* Left Side Image */}
            <div className='about-image'>

                <img
                    src="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
                    alt="About"
                />

            </div>

            {/* Right Side Content */}
            <div className='about-content'>

                <h1>About Our Company</h1>

                <p>
                    Welcome to MyStore — your trusted destination
                    for modern web experiences and innovative digital solutions.
                </p>

                <p>
                    We build fast, scalable and responsive applications
                    using React JS and modern technologies that help
                    businesses grow online.
                </p>

                <p>
                    Our goal is to create beautiful user interfaces,
                    smooth user experiences and high-quality products
                    for clients around the world.
                </p>

                <button>
                    Learn More
                </button>

            </div>

        </div>
    )
}

export default About