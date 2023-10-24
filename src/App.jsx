import React from 'react'
import "./App.css"
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import {
    createBrowserRouter,
    Outlet,
    RouterProvider,
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import PostId from './pages/PostId';
import CreatePost from './pages/CreatePost';
import { UserProvider } from './context/UserContext';
import UpdateUser from './pages/UpdateUser';
import AllPost from "./pages/AllPost"
import UpdatePost from './pages/UpdatePost';
import UsersPosts from './pages/UsersPosts';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import Blogs from './pages/Blogs';
import FollowingPage from './pages/FollowingPage';
import Followers from './pages/Followers';

const queryClient = new QueryClient()

const App = () => {

    const Layout = () => {
        return (
            <UserProvider>
                <QueryClientProvider client={queryClient}>
                    <div className='flex flex-col justify-between h-min-screen'>
                        <div className="bg-orange-50 h-full">
                            <Navbar />
                            <div className='flex h-full mx-4 sm:mx-6 md:mx-16 gap-8'>
                                <Sidebar />
                                <Outlet />
                            </div>
                        </div>
                    </div>
                </QueryClientProvider>
            </UserProvider>
        )
    }
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            children: [
                {
                    path: "/allpost",
                    element: <AllPost />
                },
                {
                    path: "/",
                    element: <Home />,
                },
                {
                    path: "/:username",
                    element: <Profile />
                },
                {
                    path: "/post/:id",
                    element: <PostId />
                },
                {
                    path: "/createpost",
                    element: <CreatePost />
                },
                {
                    path: "/:username/edit",
                    element: <UpdateUser />
                },
                {
                    path: "/updatepost/:postId/edit",
                    element: <UpdatePost />
                },
                {
                    path: "/analytics",
                    element: <Analytics />
                },
                {
                    path: "/posts",
                    element: <UsersPosts />
                },
                {
                    path: "/settings",
                    element: <Settings />
                },
                {
                    path: "/followings",
                    element: <FollowingPage />
                },
                {
                    path: "/followers",
                    element: <Followers />
                }
            ],
        },
        {
            path: "/blogs",
            element: <Blogs />
        },
        {
            path: "/about",
            element: <About />
        },
        {
            path: "/login",
            element: <Login />
        },
        {
            path: "/register",
            element: <Register />
        }
    ]);
    return (
        <React.Fragment>
            <RouterProvider router={router} />
        </React.Fragment>
    )
}

export default App
