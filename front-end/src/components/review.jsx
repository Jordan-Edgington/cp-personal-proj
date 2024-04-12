import { api } from "@/utilities"
import { useState, useEffect } from "react"
function Review({review}) {
    const [reviewAuthor, setReviewAuthor] = useState({})

    const getReviewAuthor = async() => {
        const response = await api.get(`users/info/${review.author}/`)
        setReviewAuthor(response.data)
    }

    useEffect(()=>{
        getReviewAuthor()
    },[])
  return (
    <div>
        {reviewAuthor ? <p className='italic'>{reviewAuthor.display_name}</p> : null}
        <p>{review['message']}</p>
    </div>
  )
}

export default Review
