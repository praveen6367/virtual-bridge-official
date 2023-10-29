import React from 'react'
import './user_sidebar.css'
import { Link } from 'react-router-dom';

const User_sidebar = () => {
  return (
    <>
      <div className="sidebar">
        {/* user image */}
        <div className="sidebar-user-profile">
          <img src="/IMAGE/ava-2.jpg" alt="img.." />
        </div>

        {/* user name  */}
        <p className="user-name">SHREYA</p>

        <div className="menubar-ul">
          <ul className='m-0 p-0'>
            <li><Link to="/userpanel">Dashboard</Link></li>
            <li><Link to="/join" >Call</Link></li>
          
          </ul>
        </div>
      </div>
    </>
  )
}

export default User_sidebar
