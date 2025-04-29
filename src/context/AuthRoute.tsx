import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export interface IAuthRouteProps { }

const AuthRoute = (props: { children: any; }) => {
    const { children } = props
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [sessionToken, setSessionToken] = useState('')

    useEffect(() => {
        const token = localStorage.getItem('session_token')

        if (token && token.length > 0) {
            setSessionToken(token)
            setLoading(false)
        } else {
            setLoading(true)
            navigate('/login')
        }
    }, [sessionToken])

    if (loading) return <p>Loading...</p>

    return <>{children}</>
}

export default AuthRoute