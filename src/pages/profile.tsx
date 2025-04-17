import { Link } from "react-router-dom";
import { firebaseAuth, fireDb } from "../firebase";
import { useForm } from "react-hook-form";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

export function Profile() {
    const { register, handleSubmit, setValue } = useForm()
    const [user, setUser] = useState<any>({})

    async function getUser() {
        const docRef = doc(fireDb, 'users', firebaseAuth.currentUser?.email as string)
        const snapshot = await getDoc(docRef)
        const user: any = snapshot.data()
        setUser(user)

        setValue('firstName', user.firstName)
        setValue('lastName', user.lastName)
        setValue('email', user.email)
        setValue('username', user.username)
    }

    useEffect(() => {
        getUser()
    }, [])

    const onSignOut = () => {
        firebaseAuth.signOut()
    }

    const onSubmit = async (data) => {
        await setDoc(doc(fireDb, 'users', data.email), {
            userId: user.userId,
            username: data.username,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email
        })
    }

    return (
        <>
            <div className='flex justify-center place-items-center w-screen bg-neutral-800 h-screen'>
                <div className='bg-white min-w-1/4 min-h-1/4 rounded p-3 text-center'>
                    <div className='grid grid-cols-3 px-4'>
                        <div className='flex place-items-start'>
                            <button type='button' className='bg-red-100!' onClick={onSignOut}>Log out</button>
                        </div>
                        <div className='row-span-2'>
                            <p className="text-xl mb-2">Sadaora Profile</p>
                            <p className="text-sm italic mb-5">Update your Member Profile</p>
                        </div>
                        <div className='justify-end content-end place-items-end flex'>
                            <button type='button' className='bg-neutral-200!'>
                                <Link to='/profile'>Update Profile</Link>
                            </button>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className='pl-5 pr-5'>
                        <div className='grid grid-cols-2 gap-2'>
                            <input type='text' {...register('firstName')} placeholder="First Name" className="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            <input type='text' {...register('lastName')} placeholder="Last Name" className="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            <input type='text' {...register('email')} placeholder="Email Address" className="col-span-2 mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            <input type='text' {...register('username')} placeholder="Username" className="col-span-2 mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            <button type='submit' className='bg-green-800! text-white mt-4 col-span-2'>Update Profile</button>
                            <hr className='mt-3 text-neutral-200' />
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}