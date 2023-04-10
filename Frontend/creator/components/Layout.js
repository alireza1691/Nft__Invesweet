import React, { Children } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

const Layout = ({ children ,setUser ,setSigner , setProvider ,setIsConnected}) =>{

// export default function Layout({ children }) {
  return (
    <div className='content'>
        <Navbar  setUser={setUser} setSigner={setSigner} setProvider={setProvider} setIsConnected={setIsConnected}  />
        { children }
        <Footer/>
    </div>
  )
}

export default Layout