import React from 'react'
import { Link } from 'react-router-dom'

export default function SignUp() {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>

      <form className='flex flex-col gap-4 '>
        <input type='text' placeholder='Username' id='username' className='border p-3 rounded-lg'/>
        <input type='email' placeholder='Email' id='email' className='border p-3 rounded-lg'/>
        <input type='password' placeholder='Password' id='password' className='border p-3 rounded-lg'/>

        <button className='max-w-lg bg-slate-700 p-3 uppercase rounded-lg text-white hover:opacity-90 disabled:opacity-80'>Sign Up</button>

        <button className='max-w-lg bg-red-700 p-3 uppercase rounded-lg text-white hover:opacity-90 disabled:opacity-80'>Continue with Google</button>

        <div className='flex gap-2'>
          <p>Have an account?</p>
          <Link to={'/signin'}>
            <span className='text-blue-500'>Sign In</span>
          </Link>
        </div>
      </form>
    </div>
  )
}
