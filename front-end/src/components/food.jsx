import { api } from "@/utilities"
import { useState, useEffect } from "react"
import { Button } from "./ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"


function Food({ food_obj, deleteFood, parent }) {
    const [food, setFood] = useState({});

    useEffect(() => {
        const handleGetFoodFromAPI = async () => {
            try {
                const resp = await api.post(`/foods/id/${food_obj.api_food_id}/`);
                console.log('Food API: ',resp.data);
                // Use the functional update form to update foods state
                setFood(resp.data);
            } catch (error) {
                console.error('Error fetching food:', error);
            }
        };

        console.log('Food Obj: ', food_obj);
        handleGetFoodFromAPI();
    }, [food_obj.api_food_id]); 





  return (
    <div className='border-black border-2'>
        {food && parent=='NewMealPage' ? (<div>
                <p>Food Name: {food.name}</p><p>Serving Size: {food.serving}</p><p>Servings: {food_obj.servings}</p><p>Calories: {food.calories * food_obj.servings}</p>
                </div>) 
            :null
        }
        
        {food && parent=='MealPage' ? 
            (<div>
                <p>Food Name: {food.name}</p><p>Serving Size: {food.serving}</p><p>Servings: {food_obj.servings}</p><p>Calories: {food.calories * food_obj.servings}</p>
                <Button>Edit Food</Button>
                <Button onClick={()=>{deleteFood(food_obj)}}>Delete Food</Button>
            </div>) 
            :null
        }

    </div>
  )
}

export default Food
