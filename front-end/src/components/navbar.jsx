import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "react-router-dom"
import { api } from "@/utilities"
import { useState } from "react"

function NavBar({user, setUser}) {
  const navigate = useNavigate()

  const handleLogOut = () => {
    setUser(null)
    localStorage.removeItem('token')
    delete api.defaults.headers.common['Authorization']
    console.log('logging out')
    navigate('/')

  }

  return (
    <div className='flex flex-col bg-gradient-to-br from-orange-500 to-orange-900 h-full pt-5 pb-5 border-black border-b-2'>

        {!user ? <Link to='/'><Button className='bg-invisible hover:text-red-900 hover:bg-invisible ml-2m lg:ml-6 lg:mr-6 text-sm sm:text-base md:text-2xl'>Munch Memo</Button></Link> : <Link to='/feed/'><Button className='bg-invisible hover:text-red-900 hover:bg-invisible ml-2m lg:ml-6 lg:mr-6 text-sm sm:text-base md:text-2xl'>Munch Memo</Button></Link>}
        {user ? <Link to='/meals/'><Button className='bg-invisible hover:text-red-900 hover:bg-invisible lg:ml-6 lg:mr-6 text-sm sm:text-base md:text-xl'>Meal Tracker</Button></Link> : null}
        {user ? <Link to='/mealmaker/'><Button className='bg-invisible hover:text-red-900 hover:bg-invisible lg:ml-6 lg:mr-6 text-sm sm:text-base md:text-xl'>Meal Maker</Button></Link> : null}


        {/* If Logged In, show these (need to add show the display_name of the user logged in)*/}
        {console.log(user)}
        {user ? <Link to='/account/'><Button className='bg-invisible hover:text-red-900 hover:bg-invisible md:ml-6 md:mr-6 text-xl'>{user['display_name']}</Button></Link> : null}
        {user ? <Button className='bg-invisible hover:text-red-900 hover:bg-invisible md:ml-6 md:mr-6 text-xl' onClick={handleLogOut}>Log Out</Button> : null}

    </div>
  )
}

export default NavBar
