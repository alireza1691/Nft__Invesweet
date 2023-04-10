import React, { Children } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

const Layout = ({ children }) =>{

// export default function Layout({ children }) {
  return (
    <div className='content'>
        <Navbar/>
        { children }
        <Footer/>
    </div>
  )
}

export default Layout