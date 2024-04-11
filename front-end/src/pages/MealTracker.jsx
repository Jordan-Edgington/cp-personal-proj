import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { api } from "@/utilities"
import { useState, useEffect } from "react"
import Meal from "@/components/meal"
/* eslint-disable react/no-unescaped-entities */
function MealTrackerPage() {
    const [meals, setMeals] = useState([])
    const [foodServings, setFoodServings] = useState(null)
    const getMeals = async() => {
      console.log("Grabbing meals")
      const response = await api.get('meals/')
      console.log(response.data)
      setMeals(response.data)
      return response.data
    }

    // moved this up 2 levels so that i could get the meals to re-render when servings are updated
    const handleSave = async(e, food_obj) => {
      e.preventDefault()
      try{
          console.log(food_obj.id)
          const response = await api.post(`foods/myfood/${food_obj.id}/`, {servings: foodServings})
          console.log('Saved: Servings')
          await getMeals()
          console.log('moved on')
      } catch (error) {
          console.error('Error saving servings:', error);
  }
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
      <ul>{meals.map(meal => (<li key={meal.id}><Meal meal={meal} deleteMeal={handleDeleteMeal} handleSave={handleSave} setFoodServings={setFoodServings}/></li>))}
      </ul>
      
        <Link to='/meals/add/'><Button className='bg-gradient-to-br from-orange-900 to-orange-500 border-2 border-black text-white rounded px-4 py-2 hover:bg-orange-700 focus:outline-none focus:bg-orange-700'>Add a Meal</Button></Link>
     </>
    )
  }
  
  export default MealTrackerPage