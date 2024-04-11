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
      setMeals(...meals, response.data)
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
      <>
      <p>My Meals</p>
      <ul>{meals.map(meal => (<li key={meal.id}><Meal meal={meal} deleteMeal={handleDeleteMeal}/></li>))}
      </ul>
      
        <Link to='/meals/add/'><Button className='bg-gradient-to-br from-orange-900 to-orange-500 border-2 border-black text-white rounded px-4 py-2 hover:bg-orange-700 focus:outline-none focus:bg-orange-700'>Add a Meal</Button></Link>
     </>
    )
  }
  
  export default MealTrackerPage