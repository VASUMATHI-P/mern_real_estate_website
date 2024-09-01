import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import {getStorage, ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage';
import { app } from '../firebase';


export default function Profile() {
  const {currentUser} = useSelector((state) => state.user)
  const fileRef = useRef(null);
  const [file, setFile] = useState(null);
  const [fileProgress, setFileProgress] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  
  

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setFileProgress(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({...formData, avatar: downloadURL})
        );
      }
    );
  }

  useEffect(() => {
    if(file){
      handleFileUpload(file);
    }
  }, [file])

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold my-7 text-center' >Profile</h1>

      <form className='flex flex-col gap-4'>
        <input 
          onChange={(e) => setFile(e.target.files[0])}
          type='file' 
          ref={fileRef} 
          hidden 
          accept='image/*'
        />
        <img 
          onClick={() => fileRef.current.click()} 
          src={formData.avatar || currentUser.avatar} 
          alt='Profile' 
          className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2 '
        />
        <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-red-700'>
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : fileProgress > 0 && fileProgress < 100 ? (
            <span className='text-slate-700'>{`Uploading ${fileProgress}%`}</span>
          ) : fileProgress === 100 ? (
            <span className='text-green-700'>Image successfully uploaded!</span>
          ) : (
            ''
          )}
        </p>
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
