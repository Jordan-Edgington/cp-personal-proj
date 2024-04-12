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
    <div className='grid grid-cols-8 items-center min-h-screen h-full w-full bg-gradient-to-br from-white to-gray-400 rounded-lg shadow-md relative'>
      <NavBar className='cols-span-1' user={user} setUser={setUser}/>
      <Outlet className='cols-span-7'context={{user, setUser}}/>
    </div>
  )
}

export default App
