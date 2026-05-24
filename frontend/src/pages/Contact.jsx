// Contact.jsx

import React from 'react'
import "./Contact.css"

const Contact = () => {
    return (
        <div className='contact-container'>

            {/* Left Side Image */}
            <div className='contact-image'>

                <img
                    src="https://images.unsplash.com/photo-1521791136064-7986c2920216"
                    alt="Contact"
                />

            </div>

            {/* Right Side Form */}
            <div className='contact-form-container'>

                <form className='contact-form'>

                    <h1>Contact Us</h1>

                    <p>
                        Feel free to contact us anytime.
                        We would love to hear from you.
                    </p>

                    <input
                        type="text"
                        placeholder='Enter your name'
                    />

                    <input
                        type="email"
                        placeholder='Enter your email'
                    />

                    <textarea
                        rows="5"
                        placeholder='Enter your message'
                    ></textarea>

                    <button type='submit'>
                        Send Message
                    </button>

                </form>

            </div>

        </div>
    )
}

export default Contact