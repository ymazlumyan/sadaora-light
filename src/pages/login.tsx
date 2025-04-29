import { useState } from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'

export function Login() {
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const onSubmit = async (data: any) => {
        let result = await axios.post(`${import.meta.env.VITE_REACT_APP_BASE_URI}/auth/login`, {
            'email': data.email,
            'password': data.password
        })

        if (result && result.status === 200) {
            console.log(result.data.authentication.sessionToken)

            const token = result.data.authentication.sessionToken as string

            if (token && token.length > 0) {
                localStorage.setItem('session_token', token)

                navigate('/')
            }
        } else {
            // ERror Handling
        }
    }

    return (
        <>
            <div className='flex justify-center place-items-center w-screen bg-neutral-800 h-screen'>
                <div className='bg-white min-w-1/4 min-h-1/4 rounded p-3 text-center text-neutral-800'>
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