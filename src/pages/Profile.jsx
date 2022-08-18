import { getAuth, updateProfile } from 'firebase/auth'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import {doc, updateDoc} from "firebase/firestore"
import {db} from "../firebase.config"


function Profile() {
  const auth = getAuth()
  const navigate = useNavigate()

  const [isChanged, setIsChanged] = useState(false)
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

  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        // Update display name in fb
        await updateProfile(auth.currentUser, {
          displayName: name,
        })

        // Update in firestore
        const userRef = doc(db, 'users', auth.currentUser.uid)
        await updateDoc(userRef, {
          name,
        })
      }
    } catch (error) {
      console.log(error)
      toast.error('Could not update profile details')
    }
  }

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id] : e.target.value
    }))
  }

  return (
    <div className="profile">
      <header className="profileHeader">
        <p className="pageHead">My Profile</p>
        <button type='button' className="logOut" onClick={logOut}>Log Out</button>
      </header>

      <main>
        <div className='profileDetailsHeader'>
          <p className='profileDetailsText'>Personal Details</p>
          <p
            className='changePersonalDetails'
            onClick={() => {
              isChanged && onSubmit()
              setIsChanged((prevState) => !prevState)
            }}
          >
            {isChanged ? 'done' : 'change'}
          </p>
        </div>

        <div className='profileCard'>
          <form disabled={!isChanged}>
            <input
              type='text'
              id='name'
              className={!isChanged ? 'profileName' : 'profileNameActive'}
              // disabled={!isChanged}
              value={name}
              onChange={onChange}
            />
            <input
              type='text'
              id='email'
              className={!isChanged ? 'profileEmail' : 'profileEmailActive'}
              // disabled={!isChanged}
              value={email}
              onChange={onChange}
            />
          </form>
        </div>

        {/* <Link to='/create-listing' className='createListing'>
          <img src={homeIcon} alt='home' />
          <p>Sell or rent your home</p>
          <img src={arrowRight} alt='arrow right' />
        </Link>

        {!loading && listings?.length > 0 && (
          <>
            <p className='listingText'>Your Listings</p>
            <ul className='listingsList'>
              {listings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  listing={listing.data}
                  id={listing.id}
                  onDelete={() => onDelete(listing.id)}
                  onEdit={() => onEdit(listing.id)}
                />
              ))}
            </ul>
          </>
        )} */}
      </main>
    </div>
  )
}

export default Profile