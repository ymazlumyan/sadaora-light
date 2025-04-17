import { createUserWithEmailAndPassword } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { fireDb, firebaseAuth } from "../firebase"

export function Register() {
    const { register, handleSubmit } = useForm()
    const navigate = useNavigate()

    const onSubmit = async (data: any) => {
        createUserWithEmailAndPassword(firebaseAuth, data.email, data.password)
        const userId = firebaseAuth.currentUser?.uid as string
        console.log(userId)
        await setDoc(doc(fireDb, 'users', data.email), {
            userId: userId,
            username: data.username,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email
        })

        navigate('/')
    }

    return (
        <>
            <div className='flex justify-center place-items-center w-screen bg-neutral-800 h-screen'>
                <div className='bg-white min-w-1/4 min-h-1/4 rounded p-3 text-center'>
                    <p className="text-xl mb-2">Sadaora Profiles</p>
                    <p className="text-sm italic mb-5">Fill out the registration form to enter the lightweight Member Profiles + Feed app</p>
                    <form onSubmit={handleSubmit(onSubmit)} className='pl-5 pr-5'>
                        <div className='grid grid-cols-2 gap-2'>
                            <input type='text' {...register('firstName')} placeholder="First Name" className="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            <input type='text' {...register('lastName')} placeholder="Last Name" className="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            <input type='text' {...register('email')} placeholder="Email Address" className="col-span-2 mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            <input type='text' {...register('username')} placeholder="Username" className="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            <input type='password' {...register('password')} placeholder="Password" className='mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                            <button type='submit' className='bg-green-800! text-white mt-4 col-span-2'>Sign Up</button>
                            <hr className='mt-3 text-neutral-200' />
                        </div>
                    </form>
                    <div className='flex justify-center ml-5 mr-5'>
                        <Link to='/login' type='button' className='bg-neutral-600! text-white! mt-4 w-full rounded-lg p-2.5'>Back</Link>
                    </div>
                </div>
            </div>
        </>
    )
}