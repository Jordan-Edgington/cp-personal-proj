import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
/* eslint-disable react/no-unescaped-entities */
function LandingPage() {

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
        <form className='flex flex-col w-1/2'>
          <div className='flex flex-row justify-end mr-10'>
            <p>Email</p>
            <input type='text' className='border-2 rounded border-black m-1'></input>
          </div>
          <div className='flex flex-row justify-end mr-10'>
            <p>Password</p>
            <input type='text' className='border-2 rounded border-black m-1'></input>
          </div>
          <div>
            <Button>Log In</Button>
            <p>Don't have an account? Click <Link className='text-orange-900' to='signup/'>here</Link> to sign up.</p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LandingPage