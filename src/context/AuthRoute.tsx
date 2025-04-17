import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export interface IAuthRouteProps { }

const AuthRoute = (props: { children: any; }) => {
    const { children } = props
    const auth = getAuth()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    useEffect(() => { AuthCheck() }, [auth])

    const AuthCheck = onAuthStateChanged(auth, (user) => {
        if (user) {
            setLoading(false)
        } else {
            console.log('UnAuthorized')
            navigate('/login')
        }
    })

    if (loading) return <p>Loading...</p>

    return <>{children}</>
}

export default AuthRoute