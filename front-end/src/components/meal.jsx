import { api } from "@/utilities"
import { useState, useEffect } from "react"
import Food from "./food"
import { Button } from "./ui/button"
function Meal({meal, deleteMeal, handleSave, setFoodServings}) {
    const [foods, setFoods] = useState(meal.food)
    console.log('MEALFOOD', meal.food)

    const deleteFood = async(food_obj)=>{
      console.log('trying to delete')
      try {
          const response = api.delete(`foods/myfood/${food_obj.id}/`)
          console.log(response.data)
          setFoods(foods.filter(food=> food.id !== food_obj.id))
      } catch (error) {
          console.error('Error fetching food:', error);
      }
  }



  return (
    <div className='border-black border-2'>
        <p>Meal ID: {meal.id}</p>
        <p>Date/Time of Meal: {meal.meal_date_time}</p>
        <ul>
            {foods ? foods.map(food_item => <Food key={food_item.id} food_obj={food_item} deleteFood={deleteFood} handleSave={handleSave} setFoodServings={setFoodServings} parent='MealPage' />): null}
        </ul>
        <Button onClick={()=>{deleteMeal(meal.id)}}>delete</Button>
    </div>
  )
}

export default Meal
