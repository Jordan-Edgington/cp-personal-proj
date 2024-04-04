import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

function NavBar() {

  return (
    <div className='bg-gradient-to-br from-orange-500 to-orange-900 w-full pt-5 pb-5 grid grid-cols-3 border-green-900 border-b-2'>
      <div className='col-span-2'>
        <Link to='/'><Button className='bg-invisible hover:text-red-900 hover:bg-invisible ml-2m lg:ml-6 lg:mr-6 text-sm sm:text-base md:text-2xl'>Munch Memo</Button></Link>
        <Link to='/meals/'><Button className='bg-invisible hover:text-red-900 hover:bg-invisible lg:ml-6 lg:mr-6 text-sm sm:text-base md:text-xl'>Meal Tracker</Button></Link>
        <Link to='/mealmaker/'><Button className='bg-invisible hover:text-red-900 hover:bg-invisible lg:ml-6 lg:mr-6 text-sm sm:text-base md:text-xl'>Meal Maker</Button></Link>
      </div>
      <div className='flex justify-end mr-8' >
        {/* If Logged In, show these (need to add show the display_name of the user logged in)*/}
        <Button className='bg-invisible hover:text-red-900 hover:bg-invisible md:ml-6 md:mr-6 text-xl'>Log Out</Button>
      </div>
    </div>
  )
}

export default NavBar
