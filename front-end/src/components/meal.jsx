import { api } from "@/utilities"
import { useState, useEffect } from "react"
import Food from "./food"
import { Button } from "./ui/button"
function Meal({meal, deleteMeal, parent, grandparent}) {
    const [foods, setFoods] = useState(meal.food)
    const [foodServings, setFoodServings]=useState(null)
    console.log('MEALFOOD', meal.food)
    console.log("MEAL", meal)

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

    // moved this up 2 levels so that i could get the meals to re-render when servings are updated
    const handleSave = async(e, food_obj) => {
      e.preventDefault()
      try{
          console.log(food_obj.id)
          const response = await api.post(`foods/myfood/${food_obj.id}/`, {servings: foodServings})
          console.log('Saved: Servings')

          setFoods(foods => foods.map(food => {
            if (food.id === food_obj.id) {
              return { ...food, servings: foodServings }
            }
            return food
          }))
      } catch (error) {
          console.error('Error saving servings:', error);
  }
  }

  return (
    <div className='border-black border-2'>
        <p>Meal ID: {meal.id}</p>
        <p>Date/Time of Meal: {meal.meal_date_time}</p>
        <ul>
            {foods ? foods.map(food_item => <Food key={food_item.id} food_obj={food_item} deleteFood={deleteFood} handleSave={handleSave} setFoodServings={setFoodServings} parent='MealPage' grandparent={grandparent} />): null}
        </ul>
        {parent==='feed' ? null : <Button onClick={()=>{deleteMeal(meal.id)}}>delete</Button>}
    </div>
  )
}

export default Meal
