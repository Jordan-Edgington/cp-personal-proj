import { useState } from 'react'
import { api } from '../utilities.jsx'
/* eslint-disable react/no-unescaped-entities */
function SignupPage() {
      const [emailInput, setEmailInput] = useState('')
      const [displayNameInput, setDisplayNameInput] = useState('')
      const [passwordInput, setPasswordInput] = useState('')

      const handleSignupForm = async(e) => {
            e.preventDefault()
            const response = await api.post("users/signup/",{email:emailInput, display_name:displayNameInput, password:passwordInput})
            if (response.status === 201) {
                  console.log('successfully signed up, user info', response.data)
      }}
  return (
   <>
   <div className='flex flex-col justify-center items-center text-center w-1/2 m-24'>
        <p className='text-2xl mb-4'>Create your Account</p>
        <form className='flex flex-col w-1/2' onSubmit={handleSignupForm}>
            <div className='flex flex-row justify-end mr-10'>
                <p>Display Name</p>
                <input type='text' className='border-2 rounded border-black m-1' onChange={(e)=>setDisplayNameInput(e.target.value)}></input>
            </div>
          <div className='flex flex-row justify-end mr-10'>
                <p>Email</p>
                <input type='text' className='border-2 rounded border-black m-1' onChange={(e)=>setEmailInput(e.target.value)}></input>
          </div>
          <div className='flex flex-row justify-end mr-10'>
                <p>Password</p>
                <input type='text' className='border-2 rounded border-black m-1' onChange={(e)=>setPasswordInput(e.target.value)}></input>
          </div>
          <div>
                <input type='submit' value='Sign Up' className='bg-orange-900 border-2 border-black rounded p-1 text-white'/>
          </div>
        </form>
      </div>
   </>
  )
}

export default SignupPage