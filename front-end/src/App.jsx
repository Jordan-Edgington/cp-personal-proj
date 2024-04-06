import './App.css'
import { Outlet } from 'react-router-dom'
import NavBar from './components/navbar'
import { useState, useEffect } from 'react'

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    console.log('User updated:', user);
  }, [user])
  return (
    <div className='flex flex-col items-center h-screen w-screen'>
      <NavBar user={user} setUser={setUser}/>
      <Outlet context={{user, setUser}}/>
    </div>
  )
}

export default App
