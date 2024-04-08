import { useOutletContext, useNavigate } from "react-router-dom"
import {useEffect} from 'react'
/* eslint-disable react/no-unescaped-entities */
function UserFeedPage() {
    const { user, setUser } = useOutletContext()

    const navigate = useNavigate()
    
    useEffect(() => {
    if (!user) {
      navigate('/')
    }}, [user])
    
    return (
     <>Feed</>
    )
  }
  
  export default UserFeedPage