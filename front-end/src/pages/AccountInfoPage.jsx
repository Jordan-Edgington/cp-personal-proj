import {useOutletContext} from 'react-router-dom'
import { useState } from 'react'
import {api} from '../utilities.jsx'
/* eslint-disable react/no-unescaped-entities */
function AccountInfoPage() {
    const {user, setUser } = useOutletContext()
    const [oldPasswordInput, setOldPasswordInput] = useState('')
    const [newPasswordInput, setNewPasswordInput] = useState('')

    const handleUpdatePassword = async (e) => {
        e.preventDefault()
        console.log(oldPasswordInput, newPasswordInput)
        try {
            const response = await api.post('users/info/', {old_password:oldPasswordInput, new_password:newPasswordInput})
            if (response.status === 200) {
                console.log({"Success:":"Password Updated"})
            }
        } catch (error) {
            alert('Something went wrong.')
        }}

    return (
     <div className='flex flex-col justify-center items-center bg-gray-100 w-full h-full '>
        <div className='border-black rounded border-2 w-1/3 h-1/3 bg-white p-6'>
        <p className='text-2xl font-bold'>Account Information</p>
        <p><b>Display Name:</b> {user['display_name']}</p>
        <p><b>Email:</b> {user.email}</p>
        <form className='bg-white flex flex-col justify-end items-start' onSubmit={handleUpdatePassword}>
            <div className='grid grid-cols-3 justify-items-start'>
                <p className='font-bold'>Old Password:</p>
                <input type='password' label='Old Password' className='border-black border-2 rounded m-1' onChange={(e) => {setOldPasswordInput(e.target.value)}}></input>
            </div>
            <div className='grid grid-cols-3 justify-items-start'>
                <div><p className='font-bold'>New Password: </p></div>
                <input type='password' label='New Password' className='border-black border-2 rounded m-1' onChange={(e) => {setNewPasswordInput(e.target.value)}}></input>
            </div> 
            <input type='submit' value='Update Password' className='bg-orange-900 border-2 border-black rounded p-1 text-white'/>
        </form>
        </div>
     </div>
    )
  }
  
  export default AccountInfoPage