import React from 'react'
import "./Hero.css"

const Hero = () => {
    return (
        <section className='hero'>

            <div className='hero-content'>

                <h1>
                    Discover The Future Of Shopping
                </h1>

                <p>
                    Explore premium products with modern design,
                    fast delivery, and amazing offers.
                </p>

                <div className='hero-buttons'>

                    <button className='shop-btn'>
                        Shop Now
                    </button>

                    <button className='explore-btn'>
                        Explore
                    </button>

                </div>

            </div>

        </section>
    )
}

export default Hero