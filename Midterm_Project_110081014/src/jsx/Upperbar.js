import React, { useContext } from 'react'
import {signOut} from "firebase/auth"
import { auth } from '../firebase'
import { AuthContext } from '../context/AuthContext'

const Upperbar = () => {
  const {loginUser} = useContext(AuthContext)

  return (
    <div className='Upperbar'>
      <span className="logoname"> Sakura Chat</span>
      <div className="user">
        <img src={loginUser.photoURL} alt="" />
        <span>{loginUser.displayUser}</span>
        <button onClick={()=>signOut(auth)}>log out</button>
      </div>
    </div>
  )
}

export default Upperbar