import React from 'react'
import Navbar from './components/Navbar/Navbar'
import { Outlet} from 'react-router-dom'

function Layout() {

  return (
    <>

    <Navbar />
    <Outlet />
    {/* <Footer /> */}
    
    </>
  )
}

export default Layout