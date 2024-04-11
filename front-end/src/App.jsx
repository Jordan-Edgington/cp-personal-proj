import './App.css'
import { Outlet, useLoaderData } from 'react-router-dom'
import NavBar from './components/navbar'
import { useState, useEffect } from 'react'

function App() {
  const [user, setUser] = useState(useLoaderData)

  useEffect(() => {
    console.log('User updated:', user);
  }, [user])
  return (
    <div className='flex flex-col items-center h-screen w-screen bg-gradient-to-br from-white to-gray-400 rounded-lg shadow-md relative'>
      <NavBar user={user} setUser={setUser}/>
      <Outlet context={{user, setUser}}/>
    </div>
  )
}

export default App
