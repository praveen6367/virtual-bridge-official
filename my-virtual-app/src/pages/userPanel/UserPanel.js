import React from 'react'
import './userpanel.css';

import User_sidebar from '../../components/user_sidebar/User_sidebar'

const UserPanel = () => {
  return (
   <>
   {/* user dash board */}
    <div className="user-panel">
        <div className="sidebar-menu">
           <User_sidebar/>
        </div>
        <div className="user-content">
            user content menu
        </div>
    </div>
   </>
  )
}

export default UserPanel
