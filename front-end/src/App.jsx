import { useState } from 'react'
import './App.css'
import { Button } from "@/components/ui/button"
import { Outlet } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <Button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </Button>
        <Outlet />

    </>
  )
}

export default App
