import { api } from "@/utilities"
import { useState, useEffect } from "react"
import Food from "./food"
import { Button } from "./ui/button"
import Review from "./review"
function Meal({meal, deleteMeal, parent, grandparent, addReview}) {
    const [foods, setFoods] = useState(meal.food)
    const [foodServings, setFoodServings] = useState(null)
    const [message, setMessage] = useState('')
    const [mealUser, setMealUser] = useState({})
    const reviews = meal['review']
    console.log('REVIEWS', reviews)
    console.log('MEALFOOD', meal.food)
    console.log("MEAL", meal)

    // delete a food
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

    // moved this up 2 levels so that i could get the meals to re-render when servings are updated - saves food servings
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
    const getMealUser = async() => {
      const response = await api.get(`users/info/${meal.user}/`)
      console.log('MEALUSER: ', response.data)
      setMealUser(response.data)
    }
    useEffect(()=>{
      getMealUser()
    },[])
    
    // POST to 'review/'
    // {
    //    message: 'insert text',
    //    meal_id: 'insert meal id'
    // }



  return (
    <div className='border-black border-2'>
        <p>Meal ID: {meal.id}</p>
        {parent==='feed' ? <p>User: {mealUser['display_name']}</p> : null }
        <p>Date/Time of Meal: {meal.meal_date_time}</p>
        <ul>
            {foods ? foods.map(food_item => <Food key={food_item.id} food_obj={food_item} deleteFood={deleteFood} handleSave={handleSave} setFoodServings={setFoodServings} parent='MealPage' grandparent={grandparent} />): null}
        </ul>
        {parent==='feed' ? null : <Button onClick={()=>{deleteMeal(meal.id)}}>delete</Button>}
        {parent==='feed' ? <form onSubmit={(e)=>{addReview(e, message, meal.id)}}><input type='text' onChange={(e)=>{setMessage(e.target.value)}}></input><input type='submit' value='>>' className='m-1 p-1 border-2 rounded border-gray-700 bg-gradient-to-br from-orange-500 to-orange-900 text-white'></input></form>: null}
        {reviews && parent==='feed' ? reviews.map((review_item, idx) => <Review key={idx} review={review_item}/>) : null }

    </div>
  )
}

export default Meal
