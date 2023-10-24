import Feed from "../components/Feed"
import Followings from "../components/Followings"
import { Link } from "react-router-dom"
import getCurrentUser from "../utils/getCurrentUser"
import { useContext } from "react"
import { UserContext } from "../context/UserContext"

const Home = () => {
    const currentUser = getCurrentUser()
    const { user } = useContext(UserContext)
    return (
        <>
            {currentUser && (
                <div className="w-full h-min-screen flex gap-12 py-4">
                    <Feed />
                    <Followings />
                </div>
            )}
            {!user && (
                <div className="w-full h-screen absolute bg-orange-50 -mx-6 md:-mx-16 z-20 flex flex-col items-center justify-center">
                    <div className="w-full flex justify-between items-center gap-2 py-4 px-6 md:px-16 fixed top-0">
                        <div className="flex items-center gap-2 sm:gap-4">
                            <Link to="/" className="flex items-center gap-2">
                                <img className="h-12 w-12 object-cover" src="https://www.picng.com/upload/brain/png_brain_36222.png" alt="" />
                                <span className="text-xl hidden md:flex font-bold gradient_text">Learnopia</span>
                            </Link>
                            <Link to="/about" className="mt-1">About</Link>
                            <Link to="/blogs" className="mt-1">Blogs</Link>
                        </div>
                        <div className="flex gap-2">
                            <Link to="/login" className="px-2 py-1 sm:px-4 sm:py-2 rounded-md bg-blue-500 text-white">Login</Link>
                            <Link to="/register" className="px-2 py-1 sm:px-4 sm:py-2 rounded-md bg-blue-500 text-white">Sign up</Link>
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-4 px-6 md:px-16">
                        <h1 className="text-3xl lg:text-4xl font-bold text-center">{"Let's"} make something great<br />with Learnopia</h1>
                        <div className="flex gap-2">
                            <img className="w-36 h-36 object-contain" src="https://cdn.pixabay.com/photo/2020/02/19/22/13/brain-4863428_1280.png" alt="" />
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Home
