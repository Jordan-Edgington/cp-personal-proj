import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { api } from "@/utilities"
import { useState, useEffect } from "react"
import Meal from "@/components/meal"
/* eslint-disable react/no-unescaped-entities */
function MealTrackerPage() {
    const [meals, setMeals] = useState([])
    const getMeals = async() => {
      console.log("Grabbing meals")
      const response = await api.get('meals/')
      console.log(response.data)
      setMeals(response.data)
      return response.data
    }



    const handleDeleteMeal = (id) => {
      const resp = api.delete(`/meals/${id}`)
      const updatedMeals = meals.filter(meal => meal.id !== id);
      setMeals(updatedMeals)
      console.log("meal deleted")
  }

    useEffect(()=>{
      getMeals()
    },[])
    return (
      <div className='flex flex-col items-center'>
          <p className='italic font-bold text-2xl'>My Meals</p>
          <Link to='/meals/add/'><Button className='mb-2 mt-2 bg-gradient-to-br from-red-900 to-red-700 border-2 border-black text-white rounded px-4 py-2 hover:bg-orange-700 focus:outline-none focus:bg-orange-700'>Add a Meal</Button></Link>
          <div className='w-full grid grid-cols-1'>
          <ul>
            {meals.map(meal => (<li key={meal.id}><Meal meal={meal} deleteMeal={handleDeleteMeal} grandparent='MealTracker'/></li>))}
          </ul>
          
        </div>
      </div>
    )
  }
  
  export default MealTrackerPage