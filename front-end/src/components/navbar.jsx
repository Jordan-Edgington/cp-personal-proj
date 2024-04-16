import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "react-router-dom"
import { api } from "@/utilities"
import { useState } from "react"

function NavBar({user, setUser}) {
  const navigate = useNavigate()

  const handleLogOut = async() => {
    setUser(null)
    const response = await api.post('users/logout/')
    console.log('logging out')
    navigate('/')
  }

  return (
    <div className='flex flex-col bg-red-900 h-full pt-5 pb-5 border-black border-r-4 items-center'>

        {!user ? 
          <Link to='/' className='w-full'><Button className='text-2xl w-full bg-invisible hover:bg-invisible hover:text-black'>Munch Memo</Button></Link> : 
          <Link to='/feed/' className='w-full'><Button className='text-2xl w-full bg-invisible hover:bg-invisible hover:text-black'>Munch Memo</Button></Link>
        }
        {user ? <Link to='/meals/' className='w-full'><Button className='text-xl w-full bg-invisible hover:bg-invisible hover:text-black'>My Meals</Button></Link> : null}
        {user ? <Link to='/mealmaker/' className='w-full'><Button className='text-xl w-full bg-invisible hover:bg-invisible hover:text-black'>AI Meal Maker</Button></Link> : null}


        {console.log(user)}
        <div className='flex flex-col w-full mt-auto'>
        {user ? <Link to='/account/' className='w-full'><Button className='text-xl mt-auto w-full bg-invisible hover:bg-invisible hover:text-black'>{user['display_name']}</Button></Link> : null}
        {user ? <Button className='text-xl mt-2 w-full bg-invisible hover:bg-invisible hover:text-black' onClick={handleLogOut}>Log Out</Button> : null}
        </div>
    </div>
  )
}

export default NavBar
