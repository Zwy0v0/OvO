import {createBrowserRouter,Navigate} from 'react-router-dom'
import Layout from '@/pages/Layout'
import Login from '@/pages/Login'
import Article from '@/pages/Article'
import Home from '@/pages/Home'
import Publish from '@/pages/Publish'
import { AuthRoute } from '@/components/AuthRoute'

const router = createBrowserRouter([
    {
        path:'/',
        element: <AuthRoute><Layout/></AuthRoute>,
        children:[
            {
                path:'/',
                element:<Navigate to = {'home'}/>
            },
            {
                path:'home',
                element:<Home/>
            },
            {
                path:'article',
                element:<Article/>
            },
            {
                path:'publish',
                element:<Publish/>
            }
        ]
    },
    {
        path:'/login',
        element: <Login/>
    }
])

export default router
