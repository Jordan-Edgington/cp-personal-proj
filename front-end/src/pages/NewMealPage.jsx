import { useState, useCallback, useEffect } from "react"
import { api } from "@/utilities"
import debounce from 'lodash/debounce'
import FoodSearch from "@/components/foodSearch"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import Food from "@/components/food"
import { Button } from "@/components/ui/button"
  
/* eslint-disable react/no-unescaped-entities */
function NewMealPage() {
    const [searchResults, setSearchResults] = useState([])
    const [myFoods, setMyFoods] = useState([])
    const [servings, setServings] = useState()
   
    
   // below functions relate to the search function
//-------------------------------------------------------
    const timeout = 500
    const handleSearch = async(e)=> {
        if (e){
        try{
            const response = await api.post(`/foods/nutrition/${e}/`)
            setSearchResults(response.data.foods)}
        catch (error) {
            console.error('Error fetching food:', error);
        }
        }else{setSearchResults([])}
    }
    const debouncedHandleSearch = useCallback(debounce(handleSearch, timeout), [handleSearch, timeout]);

    useEffect(()=>{
        console.log('SEARCH RESULTS: ',searchResults)
    },[searchResults])

   // below functions relate to the addfood function
//-------------------------------------------------------

    //{api_food_id:num, servings:num}
    const handleAddFood = (e, food) => {
        e.preventDefault()
        setMyFoods([...myFoods, {api_food_id: food.food_id, servings: servings}])
        console.log({api_food_id: food.food_id, servings: servings})    
    }

   // below functions relate to the addMeal function
//-------------------------------------------------------
    // {
    //   "foods":[
    //     {
    //       "api_food_id":1402,
    //       "servings":6
    //     },
    //     {
    //       "api_food_id":40276,
    //       "servings":9
    //     }]
    // }
    const handleAddMeal = async() => {
        try{
            const response = api.post('/meals/', {foods: myFoods})}
        catch (error) {
            console.error('Error creating meal:', error);
        }
    }
    console.log('MY FOODS: ',myFoods)

    return (
    <div className='flex flex-col w-full items-center'>
       

        <div className="flex flex-col items-center p-8 bg-gradient-to-br from-white to-gray-200 rounded-lg shadow-md relative m-4 w-full">
        {myFoods.length ? <ul>{myFoods.map((food, idx)=><li key={idx}><Food key={food.id} food_obj={food} parent='NewMealPage' /></li>)}<Button onClick={handleAddMeal}>Add Meal</Button></ul> : <p>Search for foods...</p>}
        <div className='flex flex-col items-center'>
            <input type='text' className='border-2 rounded border-gray-300' onChange={(e)=>{debouncedHandleSearch(e.target.value)}}></input>
            <ul className='p-1'>
                {searchResults ? searchResults.map((foodFromSearch, idx) => 
                <li className='hover:bg-orange-200 mt-1'  key={searchResults.indexOf(foodFromSearch)}>
                     <Dialog>
                        <DialogTrigger><FoodSearch food={foodFromSearch[idx+1]}/></DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                            <DialogTitle>Add Food: {foodFromSearch[idx+1].food_name}</DialogTitle>
                            <DialogDescription>
                                How many servings?
                                <form onSubmit={(e) => { handleAddFood(e, foodFromSearch[idx+1]) }}>
                                    <input className='border-2 rounded border-gray-300 mr-1' onChange={(e)=>{setServings(e.target.value)}}type='number'></input>
                                    <input type='submit' value='add' className='border-2 rounded border-gray-700 bg-gradient-to-br from-orange-500 to-orange-900 text-white'></input>
                                </form>
                            </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog></li>) : null}
            </ul>
        </div>
        </div>
    </div>
    )
  }
  
  export default NewMealPage