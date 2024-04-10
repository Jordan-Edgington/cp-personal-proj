import { api } from "@/utilities"
import { useState, useEffect } from "react"
import Food from "./food"
function Meal(meal) {
    const foods = meal.meal.food

  return (
    <div className='border-black border-2'>
        <p>Meal ID: {meal.meal.id}</p>
        <p>Date/Time of Meal: {meal.meal.meal_date_time}</p>
        <ul>
            {foods ? foods.map(food_item => <Food key={food_item.id} food_obj={food_item} />): null}
        </ul>
    </div>
  )
}

export default Meal
