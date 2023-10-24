import { useContext, useState } from "react"
import { UserContext } from "../context/UserContext"
import { MdAddPhotoAlternate } from "react-icons/md"
import newRequests from "../utils/newRequests";
import { useNavigate } from "react-router-dom";
import upload from "../utils/upload";
import Footer from "../components/Footer";

const UpdateUser = () => {
    const { user } = useContext(UserContext)
    const [selectedImage, setSelectedImage] = useState(null);
    const [credentials, setCredentials] = useState({
        username: user && user.username || "",
        profession: user && user.profession || "",
        profilePic: user && user.profilePic || "",
        desc: user && user.desc || ""
    });
    const [updating, setUpdating] = useState(false)
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        setUpdating(true)
        try {
            const url = await upload(selectedImage)
            await newRequests.put("/api/user/updateuser", {
                ...credentials,
                profilePic: url
            })
            navigate(`/${user.username}`)
            setUpdating(false)
        } catch (error) {
            setUpdating(false)
            throw new Error(error)
        }
    }

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(file);
        } else {
            console.log("No image was uploaded")
        }
    };
    return (
        <div className="w-full h-full flex flex-col">
            {user && (
                <form className="w-full" onSubmit={handleSubmit}>
                    <div className="flex flex-col sm:flex-row gap-8 w-full">
                        <div className="w-2/5 lg:w-1/5 flex flex-col gap-2 relative">
                            <div className="w-36 h-36 relative">
                                {selectedImage ? (
                                    <img
                                        src={URL.createObjectURL(selectedImage)}
                                        alt="Selected"
                                        className="w-full h-full object-cover rounded-full"
                                    />
                                ) : (
                                    <img className="w-full h-full object-cover rounded-full" src={credentials.profilePic || ""} alt="" />
                                )}
                                <label htmlFor="file" className="absolute bottom-0 right-0">
                                    <MdAddPhotoAlternate className="text-3xl cursor-pointer text-gray-500" />
                                    <input type="file" id="file" className='hidden' onChange={handleImageChange} accept="image/*" />
                                </label>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 w-full lg:w-3/5">
                            <div className="flex flex-col gap-2 w-full">
                                <label className="text-xl" htmlFor="username">Username</label>
                                <input className="text-gray-500 outline-none p-1 bg-transparent border-b" name="username" id="username" type="text" value={credentials?.username} onChange={handleChange} />
                            </div>
                            <div className="flex flex-col gap-2 w-full">
                                <label className="text-xl" htmlFor="eprofession">Profession</label>
                                <input className="text-gray-500 outline-none p-1 bg-transparent border-b" name="profession" id="profession" type="text" value={credentials?.profession} onChange={handleChange} />
                            </div>
                            <div className="flex flex-col gap-2 w-full">
                                <label className="text-xl" htmlFor="desc">About</label>
                                <textarea className="text-gray-500 bg-white outline-none border rounded-md p-1 bg-transparent" name="desc" id="desc" type="text" value={credentials?.desc} onChange={handleChange} />
                            </div>
                        </div>
                    </div>
                    <button className="border rounded-full px-4 py-2 bg-green-500 mt-4">{updating ? "Saving..." : "Save"}</button>
                </form>
            )}
            <Footer />
        </div>
    )
}

export default UpdateUser
