import React from 'react'
import { useSelector } from 'react-redux'

export default function Profile() {
  const {currentUser} = useSelector((state) => state.user)
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold my-7 text-center' >Profile</h1>

      <form className='flex flex-col gap-4'>
        <img src={currentUser.avatar} alt='Profile' className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2 '/>
        <input
          type='text' 
          name='username' 
          id='username' 
          placeholder='Username'
          className='p-3 border rounded-lg'
        />

        <input
          type='text' 
          name='email' 
          id='email' 
          placeholder='Email'
          className='p-3 border rounded-lg'
        />

        <input
          type='text' 
          name='password' 
          id='password' 
          placeholder='Password'
          className='p-3 border rounded-lg'
        />

        <button type='button' className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
          UPDATE
        </button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-500 cursor-pointer'>Delete Account</span>
        <span className='text-red-500 cursor-pointer'>Sign out</span>
      </div>
    </div>
  )
}
