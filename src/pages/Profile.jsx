import { async } from '@firebase/util'
import { getAuth } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'


function Profile() {
  const auth = getAuth()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  })
  const { name, email } = formData

  const logOut = async () => {
    auth.signOut()
    navigate("/")
    toast.success("Log out success")
  }

  return (
    <div className="profile">
      <header className="profileHeader">
        <p className="pageHead">My Profile</p>
        <button type='button' className="logOut" onClick={logOut}>Log Out</button>
      </header>
    </div>
  )
}

export default Profile