import { BsPlus } from "react-icons/bs"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import newRequests from "../utils/newRequests"
import { urls } from "../data"

const Sidebar = () => {
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const { user } = useContext(UserContext)
    const logout = async () => {
        localStorage.removeItem("currentUser")
        const res = await newRequests.post("/api/auth/logout")
        console.log(res.data)
        if (res.status === 200) {
            navigate("/login")
        } else {
            console.log("Logout failed")
        }
    }

    return (
        <>
            {user && (
                <div className="hidden md:flex flex-col gap-4 w-2/6 xl:w-1/5 sticky top-20 py-4" style={{ height: "calc(100vh - 80px)" }}>
                    <div className="flex flex-col gap-2">
                        <Link to={`/${user.username}`} className="max-w-max">
                            <img className="w-12 h-12 rounded-full object-cover" src={user.profilePic || "https://www.selectenglish.co.uk/wp-content/uploads/2022/11/no-user-image.gif"} alt="" />
                        </Link>
                        <Link to={`/${user.username}`} className="flex flex-col max-w-max">
                            <h1 className="font-bold">{user.username.replace(" ", "")}</h1>
                            <span className="text-gray-500">{user.email}</span>
                        </Link>
                    </div>
                    <Link to={"/createpost"} className="max-w-max flex gap-1 items-center bg-gray-800 px-4 py-1 rounded-md text-white">
                        <BsPlus className="text-xl" />
                        <span>Create</span>
                    </Link>
                    <hr className="w-full" />
                    <div className="w-full flex flex-col gap-4">
                        {urls.map(item => (
                            <Link key={item.id} to={item.url} className={`${pathname === item.url && "bg-orange-500"} w-4/5 flex gap-2 items-center px-3 xl:px-2 py-1.5 rounded-full`}>
                                <img className="w-6 h-6 object-contain" src={item?.icon} alt="" />
                                <span className="text-gray-500 text-sm xl:text-md">{item.name}</span>
                            </Link>
                        ))}
                        <Link to={`/${user?.username}`} className="w-4/5 flex gap-2 items-center px-2 py-1.5 rounded-full">
                            <img className="w-6 h-6 object-contain" src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="" />
                            <span className="text-gray-500 text-sm xl:text-md">Profile</span>
                        </Link>
                        <li className="w-4/5 flex gap-2 items-center cursor-pointer hover:bg-gray-600 hover:rounded-full px-2 py-1.5" onClick={logout}>
                            <img className="w-6 h-6 object-contain" src="https://cdn-icons-png.flaticon.com/512/3580/3580185.png" alt="" />
                            <span className="text-gray-500 text-sm xl:text-md">Signout</span>
                        </li>
                    </div>
                </div>
            )}
        </>
    )
}

export default Sidebar
