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

    useEffect(()=>{
      getMeals()
    },[])
    return (
      <>
      <p>For You</p>
      <ul>
        {meals.map(meal => (<li key={meal.id}><Meal meal={meal} parent='feed' grandparent='feed' /></li>))}
      </ul>
     </>
    )
  }
  
  export default MealTrackerPage