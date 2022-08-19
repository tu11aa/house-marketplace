import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { _getAuth, signOut, updateUser } from '../services/authService'


function Profile() {
  const auth = _getAuth()
  const navigate = useNavigate()

  const [isChanged, setIsChanged] = useState(false)
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  })
  const { name, email } = formData

  const logOut = async () => {
    signOut()
    toast.success("Log out success")
    navigate("/")
  }

  const onSubmit = async () => {
    try {
      updateUser(name)
    } catch (error) {
      toast.error(error.message)
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