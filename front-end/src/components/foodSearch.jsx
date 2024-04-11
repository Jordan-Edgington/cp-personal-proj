import { api } from "@/utilities"
import { useState, useEffect } from "react"
function FoodSearch({ food }) {

  return (
    <div>
        {food ? (<p>{food.food_name} | {food.food_description}</p>) :null}

    </div>
  )
}

export default FoodSearch
