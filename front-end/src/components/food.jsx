import { api } from "@/utilities"
import { useState, useEffect } from "react"
function Food({ food_obj }) {
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
    }, [food_obj.api_food_id]); // Add food_obj.api_food_id as dependency
  return (
    <div className='border-black border-2'>
        {food ? (<div><p>Food Name: {food.name}</p><p>Serving Size: {food.serving}</p><p>Servings: {food_obj.servings}</p><p>Calories: {food.calories * food_obj.servings}</p></div>) :null}

    </div>
  )
}

export default Food
