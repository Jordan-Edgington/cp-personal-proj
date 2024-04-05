import './App.css'
import { Outlet } from 'react-router-dom'
import NavBar from './components/navbar'

function App() {

  return (
    <div className='flex flex-col items-center h-screen w-screen'>
      <NavBar />
      <Outlet />
    </div>
  )
}

export default App
