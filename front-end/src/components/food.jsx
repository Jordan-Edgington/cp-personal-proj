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


function Food({ food_obj, deleteFood, parent, handleSave, setFoodServings, grandparent }) {
    const [food, setFood] = useState({});
    const [servings, setServings] = useState(null)

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
    <div className='m-1 rounded border-red-900 border-2 p-1 bg-white'>
        {food && parent=='NewMealPage' || grandparent=='feed' ? (<div>
                <p className='ml-1'>{food.name}<br/> - {food.serving}<br/> - {food_obj.servings} servings<br/> - {food.calories * food_obj.servings} calories</p>
                </div>) 
            :null
        }
        


        {food && parent=='MealPage' && grandparent=='MealTracker' ? 
            (<div className='grid grid-cols-12'>
                <div className='flex flex-col col-span-11'>
                    <p>Food Name: {food.name}</p>
                    <p>Serving Size: {food.serving}</p>
                    <p>Servings: {food_obj.servings}</p>
                    <p>Calories: {food.calories * food_obj.servings}</p>
                </div> 
                <div className='flex flex-col ml-auto'>
                <Button className='bg-invisible m-1 text-black hover:bg-red-700 ml-auto'onClick={()=>{deleteFood(food_obj)}}>x</Button>
                <Dialog>
                    <DialogTrigger><Button className='bg-invisible m-1 text-black hover:bg-red-700'>Edit</Button></DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                        <DialogTitle>Edit Servings:</DialogTitle>
                        <DialogDescription>
                            How many servings?
                            <form onSubmit={(e) => { handleSave(e, food_obj) }}>
                                <input className='border-2 rounded border-gray-300 mr-1' onChange={(e)=>{setFoodServings(e.target.value)}}type='number'></input>
                                <input type='submit' value='Save' className='border-2 rounded border-gray-700 bg-gradient-to-br from-orange-500 to-orange-900 text-white'></input>
                            </form>
                        </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                    </Dialog>
                </div>
                
                
            </div>) 
            :null
        }

    </div>
  )
}

export default Food
