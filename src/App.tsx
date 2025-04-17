import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home } from './pages/home'
import { Login } from './pages/login'
import AuthRoute from './context/AuthRoute'
import app from './firebase'
import { Register } from './pages/register'
import { Profile } from './pages/profile'


function App() {
  app
  const router = createBrowserRouter([
    { path: '/', element: <AuthRoute><Home /></AuthRoute>, },
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
    { path: '/profile', element: <AuthRoute><Profile /></AuthRoute> }
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
