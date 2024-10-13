import { createBrowserRouter, Navigate } from 'react-router-dom'
import Layout from '@/pages/Layout'
import Login from '@/pages/Login'
import { AuthRoute } from '@/components/AuthRoute'
import { lazy, Suspense } from 'react'

const Home = lazy(() => import('@/pages/Home'))
const Publish = lazy(() => import('@/pages/Publish'))
const Article = lazy(() => import('@/pages/Article'))


const router = createBrowserRouter([
    {
        path: '/',
        element: <AuthRoute><Layout /></AuthRoute>,
        children: [
            {
                path: '/',
                element: <Navigate to={'home'} />
            },
            {
                path: 'home',
                element: <Suspense fallback={'loading...'}><Home /></Suspense>
            },
            {
                path: 'article',
                element: <Suspense fallback={'loading...'}><Article /></Suspense>
            },
            {
                path: 'publish',
                element: <Suspense fallback={'loading...'}><Publish /></Suspense>
            }
        ]
    },
    {
        path: '/login',
        element: <Login />
    }
])

export default router
