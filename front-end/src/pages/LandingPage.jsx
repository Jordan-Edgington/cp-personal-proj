import { Link } from "react-router-dom"
import {useState} from 'react'
import {api} from '../utilities.jsx'
/* eslint-disable react/no-unescaped-entities */
function LandingPage() {
  const [emailInput, setEmailInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')

  const handleLoginForm = async(e) => {
        e.preventDefault()
        try {
          const response = await api.post("users/login/",{email:emailInput, password:passwordInput})
          console.log('heelo')
          if (response.status === 200) {
                console.log('successfully logged in, user info', response.data)
          } 
        } catch (error) {
            console.error('Unable to log in. Improper credentials provided', error)
            alert('Unable to log in. Improper credentials provided')
      }
    }

  return (
    <div className='grid grid-cols-2'>
      <div className='h-full w-full p-12 justify-center items-center'>
        <p className='text-center text-2xl'>Welcome to Munch Memo!
          <br/><br/>
          
          Track Your Meals & Calories: Stay on top of your dietary goals effortlessly. Log your meals and monitor your caloric intake with ease.
          <br/>
          Share Your Culinary Adventures: Connect with friends and fellow foodies. Share your favorite meals and culinary discoveries, fostering a community of delicious inspiration.
          <br/>
          Get Meal Suggestions: Can't decide what to eat? Let Munch Memo generate meal ideas tailored to your preferences, ensuring every bite is enjoyable.
          <br/>
          Join Munch Memo today and turn your eating habits into a delightful journey!
        </p>
      </div>
      <div className='flex flex-col justify-center items-center text-center'>
        <p className='text-2xl mb-4'>Enter your information to log in</p>
        <form className='flex flex-col w-1/2' onSubmit={handleLoginForm}>
          <div className='flex flex-row justify-end mr-10'>
            <p>Email</p>
            <input type='text' className='border-2 rounded border-black m-1' onChange={(e)=>setEmailInput(e.target.value)}></input>
          </div>
          <div className='flex flex-row justify-end mr-10'>
            <p>Password</p>
            <input type='password' className='border-2 rounded border-black m-1' onChange={(e)=>setPasswordInput(e.target.value)}></input>
          </div>
          <div>
          <input type='submit' value='Log In' className='bg-orange-900 border-2 border-black rounded p-1 text-white'/>
            <p>Don't have an account? Click <Link className='text-orange-900 hover:underline' to='signup/'>here</Link> to sign up.</p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LandingPage