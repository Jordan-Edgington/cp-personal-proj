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
import { useNavigate } from 'react-router-dom'
  
/* eslint-disable react/no-unescaped-entities */
function NewMealPage() {
    const [searchResults, setSearchResults] = useState([])
    const [myFoods, setMyFoods] = useState([])
    const [servings, setServings] = useState()
    const navigate = useNavigate()
   
    
   // below functions relate to the search function
//-------------------------------------------------------
    const timeout = 500
    const handleSearch = async(e)=> {
        if (e){
        try{
            const response = await api.post(`foods/nutrition/${e}/`)
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
        e.target.reset()
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
            console.log(myFoods)
            const response = api.post('meals/', {foods: myFoods})
            setMyFoods([])
            navigate('/meals/')}
        catch (error) {
            console.error('Error creating meal:', error);
        }
    }
    console.log('MY FOODS: ',myFoods)

    return (
    <div className='flex flex-col h-full w-full items-center'>
        <p className='mb-auto ml-auto'>Data provided by the <a className='text-red-900 underline' href='https://www.fatsecret.com/'>FatSecret Platform</a>.</p>
        <div className="flex flex-col items-center p-8 bg-gradient-to-br from-white to-gray-200 rounded-lg shadow-md relative m-4 w-full">
            {myFoods.length ? <ul className='flex flex-row items-center justify-center'>{myFoods.map((food, idx)=><li key={idx}><Food key={food.id} food_obj={food} parent='NewMealPage' /></li>)}<Button className='bg-gradient-to-r from-red-700 to-red-900 border-2 border-black' onClick={handleAddMeal}>Add Meal</Button></ul> 
            :   <div className='flex flex-col items-center justify-center text-center'>
                    <p className='text-2xl italic font-bold'>The Store</p><p>Search for foods...</p>
                </div>}
            <div className='flex flex-col items-center'>
                <input type='text' className='border-2 rounded border-gray-300 focus:border-red-700' onChange={(e)=>{debouncedHandleSearch(e.target.value)}}></input>
                <ul className='p-1'>
                    {searchResults ? searchResults.map((foodFromSearch, idx) => 
                    <li className='hover:bg-yellow-100 mt-1'  key={searchResults.indexOf(foodFromSearch)}>
                        <Dialog>
                            <DialogTrigger><FoodSearch food={foodFromSearch[idx+1]}/></DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                <DialogTitle>Add Food: {foodFromSearch[idx+1].food_name}</DialogTitle>
                                <DialogDescription>
                                    How many servings?
                                    <form onSubmit={(e) => { handleAddFood(e, foodFromSearch[idx+1]) }}>
                                        <input className='border-2 rounded border-gray-300 mr-1 focus:border-red-700' onChange={(e)=>{setServings(e.target.value)}}type='number' min='0'></input>
                                        <input type='submit' value='add' className='border-2 rounded border-gray-700 bg-gradient-to-br from-red-500 to-red-900 text-white'></input>
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