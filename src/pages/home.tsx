import { useEffect, useState } from "react"
import { firebaseAuth, fireDb } from "../firebase"
import { collection, getDocs } from "firebase/firestore"
import { Link } from "react-router-dom"

export function Home() {
    const [users, setUsers] = useState<any[]>([])

    const userList = async () => {
        await getDocs(collection(fireDb, 'users'))
            .then((snapshot) => {
                const data = snapshot.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id }))

                setUsers(data)
            })
    }

    useEffect(() => {
        userList()
    }, [])


    const onSignOut = () => {
        firebaseAuth.signOut()
    }

    return (
        <>
            <div className='flex justify-center place-items-center w-screen bg-neutral-800 h-screen'>
                <div className='min-w-4xl h-full pt-6 pb-6'>
                    <div className='bg-white w-full h-full rounded-lg p-3'>
                        <div className='grid grid-cols-3'>
                            <div className=''>
                                <button type='button' className='bg-red-100!' onClick={onSignOut}>Log out</button>
                            </div>
                            <div className=''>
                                <h1 className='text-3xl! font-sans'>Sadaora Profile+Feed</h1>
                            </div>
                            <div className='justify-end content-end place-items-end flex'>
                                <button type='button' className='bg-neutral-200!'>
                                    <Link to='/profile'>Update Profile</Link>
                                </button>
                            </div>
                        </div>


                        <table className="mt-10 w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 px-6">
                            <thead className='text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                                <tr>
                                    <th>Display Name</th>
                                    <th>Email Address</th>
                                    <th>Username</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user: any, i) => (
                                    <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 text-lg' key={i}>
                                        <td>{user.firstName} {user.lastName}</td>
                                        <td>{user.email}</td>
                                        <td>{user.username}</td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}