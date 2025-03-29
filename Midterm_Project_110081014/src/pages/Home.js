import React from 'react'
import Sidebar from '../jsx/Sidebar'
import SidebarUsers from '../jsx/SidebarUsers'

const Home = () => {
  return (
    <div className='HOME'>
      <div className="homecontainer">
        <Sidebar/>
        <SidebarUsers/>
      </div>
    </div>
  )
}

export default Home