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
    <div className='box-border border-t-red-900 p-0 rounded'>
        {reviewAuthor ? <p className='italic ml-1 underline'>{reviewAuthor.display_name} - {review['datetime_of_review']}</p> : null}
        <p className='ml-3'> - {review['message']}</p>
    </div>
  )
}

export default Review
