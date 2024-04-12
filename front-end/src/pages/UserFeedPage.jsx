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
      const response = await api.get('meals/all/')
      console.log(response.data)
      setMeals(response.data)
      return response.data
    }

    // POST to 'review/'
    // {
    //    message: 'insert text',
    //    meal_id: 'insert meal id'
    // }

    const handleAddReview = async (e, message, meal_id) => {
      e.preventDefault()
      try{
        const response = api.post('reviews/', {message:message, meal_id:meal_id})
        console.log('Created: Review')
        getMeals()
      } catch (error) {
        console.error('Error creating review:', error);
      }
    }

    useEffect(()=>{
      getMeals()
    },[])
    return (
      <>
      <p>For You</p>
      <ul>
        {meals.map(meal => (<li key={meal.id}><Meal meal={meal} parent='feed' grandparent='feed' addReview={handleAddReview} /></li>))}
      </ul>
     </>
    )
  }
  
  export default MealTrackerPage