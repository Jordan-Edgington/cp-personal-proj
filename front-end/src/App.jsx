import './App.css'
import { Outlet, useLoaderData } from 'react-router-dom'
import NavBar from './components/navbar'
import { useState, useEffect } from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"


function App() {
  // const [user, setUser] = useState(useLoaderData)
  const [user, setUser] = useState({})

  useEffect(() => {
    console.log('User updated:', user);
  }, [user])
  return (
    <div className='grid grid-cols-8 items-center min-h-screen h-full w-full bg-gradient-to-tr from-red-200 to-yellow-200 rounded-lg shadow-md relative'>
      <NavBar className='col-span-1' user={user} setUser={setUser}/>
      <ScrollArea className="h-screen col-span-7 rounded-md border p-4">
        <Outlet className=''context={{user, setUser}}/>
      </ScrollArea>

    </div>
  )
}

export default App
