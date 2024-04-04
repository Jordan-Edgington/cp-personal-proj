import { Button } from "@/components/ui/button"
/* eslint-disable react/no-unescaped-entities */
function SignupPage() {

  return (
   <>
   <div className='flex flex-col justify-center items-center text-center w-1/2 m-24'>
        <p className='text-2xl mb-4'>Create your Account</p>
        <form className='flex flex-col w-1/2'>
            <div className='flex flex-row justify-end mr-10'>
                <p>Display Name</p>
                <input type='text' className='border-2 rounded border-black m-1'></input>
            </div>
          <div className='flex flex-row justify-end mr-10'>
                <p>Email</p>
                <input type='text' className='border-2 rounded border-black m-1'></input>
          </div>
          <div className='flex flex-row justify-end mr-10'>
                <p>Password</p>
                <input type='text' className='border-2 rounded border-black m-1'></input>
          </div>
          <div>
                <Button className='bg-orange-900 border-2 border-black'>Log In</Button>
          </div>
        </form>
      </div>
   </>
  )
}

export default SignupPage