import {useState} from 'react'
import { api } from '@/utilities'
/* eslint-disable react/no-unescaped-entities */
function MealMakerPage() {
    const [calorieInput, setCalorieInput] = useState('')
    const [meal, setMeal] = useState('')
    const [load, setLoad] = useState(false)
    const handleMealGen = async (e) => {
      e.preventDefault()
      console.log(calorieInput)
      setLoad(true)
      const response = await api.post("ai/meal/", {calories:calorieInput})
      setMeal(response.data)
      setLoad(false)
    }

    const renderMeal = (meal) => {
      const lines = meal.split('\n')
      console.log(lines)
      return lines.map((line, index) => <li key={index}>{line.trim()}</li>)
    }

    return (
      <div className='flex flex-col w-3/4 h-full items-center text-center'>
        <p className='text-2xl font-bold'>The Meal Maker</p>
        <p>"Feeling like your taste buds are stuck in a flavor rut? Fear not, adventurous eater! Introducing 'Calorie Cruncher Cuisine' – your culinary sidekick in the quest for the perfect meal. When your brain's recipe Rolodex is on strike and you're craving something deliciously different, just tap into our whimsical kitchen wizardry. Simply input your caloric needs and let the gastronomic magic unfold! With a flick of the spatula, we'll whip up a random meal sure to tantalize your taste buds and rescue you from the monotony of mealtime. Embrace the unexpected, and let the foodie adventures begin!" 🍽️✨</p>
        <div className="p-8 bg-gradient-to-br from-white to-gray-200 rounded-lg shadow-md relative m-4">
          <form onSubmit={handleMealGen}>
            <div className='flex flex-row items-center'>
              <p className='m-2'>Input Desired Calories:</p>
              <input type='number' className='border-2 border-gray-400 rounded m-2 px-2 py-1 focus:outline-none focus:border-orange-700' onChange={(e)=>{setCalorieInput(e.target.value)}} />
              <button type='submit' className='bg-gradient-to-br from-orange-900 to-orange-500 border-2 border-black text-white rounded px-4 py-2 hover:bg-orange-700 focus:outline-none focus:bg-orange-700'>Generate a Meal</button>
            </div>
          </form>
          <ul className='list-none'>
            {load ? <li>Generating your meal...</li> : meal ? <p>{renderMeal(meal)}</p> : null}
          </ul>
        </div>
      </div>
    )
  }
  
  export default MealMakerPage