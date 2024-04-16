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
          const response = await api.delete(`foods/myfood/${food_obj.id}/`)
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
    <div className='flex flex-col items-center w-full'>
      <div className='border-black border-2 w-2/3 rounded bg-white bg-opacity-50'>
        {parent==='feed' ? <p className='italic font-bold ml-1'>{mealUser['display_name']}</p> : null }
        <div className='flex flex-row items-center'>
          <p className='ml-1'>{meal.meal_date_time}</p>
          {parent==='feed' ? null : <Button className='bg-invisible m-1 text-black hover:bg-red-700 ml-auto' onClick={()=>{deleteMeal(meal.id)}}>x</Button>}
        </div>
        <ul>
            {foods ? foods.map(food_item => <Food key={food_item.id} food_obj={food_item} deleteFood={deleteFood} handleSave={handleSave} setFoodServings={setFoodServings} parent='MealPage' grandparent={grandparent} />): null}
        </ul>
        
        {parent==='feed' ? 
          <form className='flex justify-center' onSubmit={(e)=>{addReview(e, message, meal.id)}}>
              <input className='border-red-900 border-2 m-1 rounded w-2/3 pl-1' placeholder="Add a Comment" type='text' onChange={(e)=>{setMessage(e.target.value)}}></input>
              <input type='submit' value='>>'  className='m-1 p-1 border-2 rounded border-black bg-gradient-to-r from-red-900 to-red-800 text-white'></input>
          </form>
        : null}
        {reviews && parent==='feed' ? reviews.map((review_item, idx) => <Review key={idx} review={review_item}/>) : null }
        </div>
    </div>
  )
}

export default Meal
