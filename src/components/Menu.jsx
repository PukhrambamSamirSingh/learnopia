import 'animate.css';
import { useContext } from 'react';
import { BsPlus } from 'react-icons/bs';
import { UserContext } from '../context/UserContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { urls } from '../data';
import newRequests from '../utils/newRequests';

const Menu = () => {
    const { user } = useContext(UserContext)
    const navigate = useNavigate()
    const { pathname } = useLocation()
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
        <div className={`w-full bg-orange-50 px-6 py-2 shadow duration-500 animate__animated animate__backInRight`} style={{ height: 'calc(100vh - 80px)' }}>
            <div className='flex flex-col justify-center gap-4'>
                {user && <div className="flex lg:hidden flex-col md:flex-row gap-2">
                    <Link to={`/${user.username}`} className="w-12 h-12 rounded-full border-2 border-gray-400 overflow-hidden">
                        <img className="object-cover" src={user.profilePic} alt="" />
                    </Link>
                    <Link to={`/${user.username}`} className="flex flex-col">
                        <h1 className="font-bold">{user.username}</h1>
                        <span className="text-gray-500 truncate">{user.email}</span>
                    </Link>
                </div>}
                <Link to={"/createpost"} className="max-w-max flex gap-1 items-center border px-4 py-1 rounded-md">
                    <BsPlus className="text-xl" />
                    <span>Create</span>
                </Link>
                <hr className='text-gray-900' />
                <div className="w-full flex flex-col gap-4">
                    {urls.map(item => (
                        <Link key={item.id} to={item.url} className={`${pathname === item.url && "bg-orange-500"} w-4/5 flex gap-2 items-center px-3 xl:px-2 py-1.5 rounded-full`}>
                            <img className="w-6 h-6 object-contain" src={item?.icon} alt="" />
                            <span className="text-sm xl:text-md">{item.name}</span>
                        </Link>
                    ))}
                    <Link to={`/${user?.username}`} className="w-4/5 flex gap-2 items-center px-3 xl:px-2 py-1.5 rounded-full">
                        <img className="w-6 h-6 object-contain" src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="" />
                        <span className="text-sm xl:text-md">Profile</span>
                    </Link>
                    <li className="w-4/5 flex gap-2 items-center cursor-pointer hover:bg-gray-600 hover:rounded-full px-3 xl:px-2 py-1.5" onClick={logout}>
                        <img className="w-6 h-6 object-contain" src="https://cdn-icons-png.flaticon.com/512/3580/3580185.png" alt="" />
                        <span className="text-sm xl:text-md">Signout</span>
                    </li>
                </div>
            </div>
        </div>
    )
};

export default Menu;
