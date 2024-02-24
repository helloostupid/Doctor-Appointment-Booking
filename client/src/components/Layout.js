import React from 'react'
import Navbar from './Navbar'
import './Layout.css'

function Layout({children}) {
  
  return (
    <div className='main'>
        <div className="navbar">
            <Navbar />
        </div>
        <div className="hero-image">
          <img src="/doctor-hero.jpg" alt="doctors"></img>
        </div>

    </div>
  )
}

export default Layout