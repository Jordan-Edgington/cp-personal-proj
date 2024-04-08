import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
/* eslint-disable react/no-unescaped-entities */
function MealTrackerPage() {

    return (
     <>
     My Meals
      <Link to='/meals/add/'><Button className='bg-gradient-to-br from-orange-900 to-orange-500 border-2 border-black text-white rounded px-4 py-2 hover:bg-orange-700 focus:outline-none focus:bg-orange-700'>Add a Meal</Button></Link>
     </>
    )
  }
  
  export default MealTrackerPage