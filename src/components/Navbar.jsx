import { useContext, useState } from "react"
import Menu from "./Menu"
import { GiHamburgerMenu, GiCrossedSlashes } from "react-icons/gi"
import { RxCross2 } from "react-icons/rx"
import { MdSearch } from "react-icons/md"
import { Link, useNavigate } from "react-router-dom"
import newRequests from "../utils/newRequests"
import { UserContext } from "../context/UserContext"

const Navbar = () => {
    const { user } = useContext(UserContext)
    const [toggle, setToggle] = useState(false)
    const [toggleSearch, setToggleSearch] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await newRequests.get(`/api/user/getuser?username=${searchQuery}`)
            if (res.status === 200) {
                navigate(`/posts?search=${searchQuery}`)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            {user && (
                <div className={`w-full bg-orange-50 flex flex-col items-center sticky top-0 py-4 z-10`}>
                    <div className="w-full flex justify-between items-center gap-2 px-4 sm:px-6 md:px-16">
                        <div className="flex items-center gap-2">
                            <Link to="/" className="flex items-center gap-2">
                                <img className="h-12 w-12 object-cover" src="https://www.picng.com/upload/brain/png_brain_36222.png" alt="" />
                                <span className="text-xl hidden md:flex font-bold gradient_text">Learnopia</span>
                            </Link>
                            {toggleSearch ? <RxCross2 className="flex sm:hidden text-2xl" onClick={() => setToggleSearch(false)} /> : <MdSearch className="flex sm:hidden text-2xl" onClick={() => setToggleSearch(true)} />}
                        </div>
                        <div className="w-3/5 md:w-1/3 hidden sm:block">
                            <form onSubmit={handleSubmit} className="flex gap-2 items-center border rounded-full w-full p-2">
                                <MdSearch className="text-xl" />
                                <input className="border-none outline-none w-full bg-transparent" type="text" placeholder="Search posts by username..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                            </form>
                        </div>
                        <div className="flex items-center">
                            <div className="flex gap-2 md:hidden items-center">
                                {toggle ? <GiCrossedSlashes className="mb-2 text-2xl" onClick={() => setToggle(false)} /> : <GiHamburgerMenu className="mb-2 text-2xl" onClick={() => setToggle(true)} />}
                            </div>
                        </div>
                    </div>
                    {toggleSearch && (
                        <div className="w-full px-6 block sm:hidden">
                            <form onSubmit={handleSubmit} className="w-full flex gap-1 items-center border rounded-md p-1">
                                <MdSearch className="text-lg" />
                                <input className="border-none outline-none w-full bg-transparent" type="text" placeholder="Search posts by username..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                            </form>
                        </div>
                    )}
                </div>
            )}
            {toggle && (
                <div className="w-4/5 flex md:hidden fixed right-0 z-10">
                    <Menu />
                </div>
            )}
        </>
    )
}

export default Navbar
