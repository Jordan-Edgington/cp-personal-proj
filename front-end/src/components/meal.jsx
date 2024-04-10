import { api } from "@/utilities"
import { useState, useEffect } from "react"
import Food from "./food"
import { Button } from "./ui/button"
function Meal({meal, deleteMeal}) {
    const foods = meal.food



  return (
    <div className='border-black border-2'>
        <p>Meal ID: {meal.id}</p>
        <p>Date/Time of Meal: {meal.meal_date_time}</p>
        <ul>
            {foods ? foods.map(food_item => <Food key={food_item.id} food_obj={food_item} />): null}
        </ul>
        <Button onClick={()=>{deleteMeal(meal.id)}}>delete</Button>
    </div>
  )
}

export default Meal
