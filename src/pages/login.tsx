import { FirebaseError } from "firebase/app"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"

export function Login() {
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const auth = getAuth()

    const onSubmit = (data: any) => {
        signInWithEmailAndPassword(auth, data.email, data.password)
            .then((result) => {
                console.log(`User: ${result.user.email}`)

                if (result.user) {
                    navigate('/')
                }
            })
            .catch((error: FirebaseError) => {
                console.log(error)
                if (error.code === 'auth/invalid-email' || error.code === 'auth/invalid-credential') {
                    setError('Email/Password combination is incorrect')
                }
            })
    }

    return (
        <>
            <div className='flex justify-center place-items-center w-screen bg-neutral-800 h-screen'>
                <div className='bg-white min-w-1/4 min-h-1/4 rounded p-3 text-center'>
                    <p className="text-xl mb-2">Sadaora Profiles</p>
                    <p className="text-sm italic mb-5">Log in to enter the lightweight Member Profiles + Feed app</p>
                    {error.length > 0 && <div className='bg-red-100 p-2 pl-3 m-4 rounded-lg text-start text-sm font-sans'>
                        <p>{error}</p>
                    </div>}
                    <form onSubmit={handleSubmit(onSubmit)} className='pl-5 pr-5'>
                        <input type='text' {...register('email')} placeholder="Email Address" className="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        <input type='password' {...register('password')} placeholder="Password" className='mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                        <button type='submit' className='bg-green-800! text-white mt-4 w-full rounded!'>Log In</button>
                        <hr className='mt-3 text-neutral-200' />
                    </form>
                    <div className='flex justify-center ml-5 mr-5'>
                        <Link to='/register' type='button' className='bg-indigo-600! text-white! rounded mt-4 w-full pt-2.5 pb-2.5'>Sign Up</Link>
                    </div>
                </div>
            </div>
        </>
    )
}