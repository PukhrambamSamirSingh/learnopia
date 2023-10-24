import { Link } from "react-router-dom"
import Footer from "../components/Footer"

const About = () => {
    return (
        <div className="flex flex-col w-full h-full">
            <div className="w-full flex justify-between items-center gap-2 py-4 px-6 md:px-16 sticky top-0">
                <div className="flex items-center gap-2 sm:gap-4">
                    <Link to="/" className="flex items-center gap-2">
                        <img className="h-12 w-12 object-cover" src="https://www.picng.com/upload/brain/png_brain_36222.png" alt="" />
                        <span className="text-xl hidden md:flex font-bold gradient_text">Learnopia</span>
                    </Link>
                    <Link to="/about" className="mt-1">About</Link>
                    <Link to="/blogs" className="mt-1">Blogs</Link>
                </div>
                <div className="flex gap-2">
                    <Link to="/login" className="px-2 py-1 sm:px-4 sm:py-2 rounded-md bg-blue-500">Login</Link>
                    <Link to="/register" className="px-2 py-1 sm:px-4 sm:py-2 rounded-md bg-blue-500">Sign up</Link>
                </div>
            </div>
            <div className="mx-16">
                About
            </div>
            <Footer />
        </div>
    )
}

export default About
