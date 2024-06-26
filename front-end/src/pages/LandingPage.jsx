import { Link } from "react-router-dom"
import {useState, useEffect} from 'react'
import {api} from '../utilities.jsx'
import { useOutletContext, useNavigate } from "react-router-dom"

/* eslint-disable react/no-unescaped-entities */
function LandingPage() {
  const [emailInput, setEmailInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')
  const {user, setUser} = useOutletContext()
  const navigate = useNavigate(); // Initialize navigate using useNavigate
  const [loginError, setLoginError] = useState('')
  
  useEffect(() => {
    if (user) {
      navigate('/feed/');
    }
    else {
      navigate('/')}
  }, [user])

  const handleLoginForm = async(e) => {
        e.preventDefault()
        try {
          const response = await api.post("users/login/",{email:emailInput, password:passwordInput})
          if (response.status === 200) {
            const { Token } = response.data
            console.log('successfully logged in, user info', response.data)
            api.defaults.headers.common["Authorization"] = `Token ${Token}`
            localStorage.setItem("token", Token)
            console.log('Added token to localstorage and auth header.')
            setUser({email:response.data.Email, display_name:response.data['Display Name']})
          } 
        } catch (error) {
            setLoginError(error.response.data.message)
      }
    }

  return (
    <div className='flex flex-col justify-center items-center h-full overflow-hidden mb-0 pb-0'>
      <div className='flex flex-col h-full w-full p-12 justify-center items-center '>
        <p className='text-center text-3xl font-bold'>Welcome to Munch Memo!</p>
        <div className='flex flex-col justify-center items-center text-center min-w-min sm:w-2/3 md:w-5/12 m-4'>
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
              <input type='submit' value='Log In' className='bg-red-900 border-2 border-black rounded p-1 text-white'/>
              <p className='italic'>{loginError}</p>
              <p>Don't have an account? Click <Link className='text-red-900 hover:underline' to='signup/'>here</Link> to sign up.</p>
            </div>
          </form>
        </div>
        <div className='w-1/2'>
          <br/><br/>
          <ul className='list-disc'>
          <li>Track Your Meals & Calories: Stay on top of your dietary goals effortlessly. Log your meals and monitor your caloric intake with ease.</li>
          <br/>
          <li>Share Your Culinary Adventures: Connect with friends and fellow foodies. Share your favorite meals and culinary discoveries, fostering a community of delicious inspiration.</li>
          <br/>
          <li>Get Meal Suggestions: Can't decide what to eat? Let Munch Memo generate meal ideas tailored to your preferences, ensuring every bite is enjoyable.</li>
          </ul>
          <br/>
          <p className='text-center text-2xl'>Join Munch Memo today and turn your eating habits into a delightful journey!</p>
        </div>


      </div>
      
    </div>
  )
}

export default LandingPage