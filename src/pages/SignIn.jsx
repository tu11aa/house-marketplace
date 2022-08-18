import React, { useState } from 'react'
import {Link, useNavigate} from "react-router-dom"
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import {signIn} from "../services/authService"
import { toast } from 'react-toastify'
import { async } from '@firebase/util'

function SignIn() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const {email, password} = FormData

  const navigate = useNavigate()

  const onChange = (e) => {
    setFormData((prevState)=>({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const user = await signIn(formData)
      navigate("/")
      toast.success(`You have signed in as ${user.email}`)
    }
    catch (error){
      toast.error(error.message)
    }
  }
  
  return (
    <>
      <div className="pageContainer">
        <header>
          <p className='pageHeader'>Welcome Back!</p>

          <form onSubmit={onSubmit}>
            <input
              type='email'
              className='emailInput'
              placeholder='Email'
              id='email'
              value={email}
              onChange={onChange}
            />

            <div className='passwordInputDiv'>
              <input
                type={showPassword ? 'text' : 'password'}
                className='passwordInput'
                placeholder='Password'
                id='password'
                value={password}
                onChange={onChange}
              />

              <img
                src={visibilityIcon}
                alt='show password'
                className='showPassword'
                onClick={() => setShowPassword((prevState) => !prevState)}
              />
            </div>

            <Link to='/forgot-password' className='forgotPasswordLink'>
              Forgot Password
            </Link>

            <div className='signInBar'>
              <p className='signInText'>Sign In</p>
              <button className='signInButton'>
                <ArrowRightIcon fill='#ffffff' width='34px' height='34px' />
              </button>
            </div>
          </form>

          <Link to='/sign-up' className='registerLink'>
            Sign Up Instead
          </Link>
        </header>
      </div>
    </>
  )
}

export default SignIn