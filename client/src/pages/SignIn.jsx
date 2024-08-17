import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(data.success == false){
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false)
      navigate('/');
    }catch(err){
      setLoading(false);
      setError(err.message);
    }
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>

      <form className='flex flex-col gap-4 '>
        <input 
          type='email' 
          placeholder='Email' 
          id='email' 
          className='border p-3 rounded-lg' 
          onChange={handleChange}
        />
        <input 
          type='password' 
          placeholder='Password' 
          id='password' 
          className='border p-3 rounded-lg' 
          onChange={handleChange}
        />

        <button 
          disabled = {loading}
          className='max-w-lg bg-slate-700 p-3 uppercase rounded-lg text-white hover:opacity-90 disabled:opacity-80' 
          onClick={handleSubmit}
        >{loading ? 'Loading...' : 'Sign In'}</button>

        <button 
          className='max-w-lg bg-red-700 p-3 uppercase rounded-lg text-white hover:opacity-90 disabled:opacity-80'
        >Continue with Google</button>

        <div className='flex gap-2'>
          <p>Dont have an account?</p>
          <Link to={'/signup'}>
            <span className='text-blue-500'>Sign Up</span>
          </Link>
        </div>
        {error && <p className='text-red-500'>{error}</p>}
      </form>
    </div>
  )
}
