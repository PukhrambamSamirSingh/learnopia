import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import newRequests from '../utils/newRequests';
import upload from '../utils/upload';

const Register = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [credentials, setCredentials] = useState({ username: "", email: "", password: "", profession: "", profilePic: "" })
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const url = await upload(selectedImage)
        await newRequests.post("/api/auth/register", {
            ...credentials,
            profilePic: url
        })
        navigate("/login")
    }

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setSelectedImage(file);
    };

    return (
        <div className="h-screen w-full flex flex-col pt-8 items-center bg-orange-50">
            <img className="w-20 h-20 mb-4" src="https://www.picng.com/upload/brain/png_brain_36222.png" alt="" />
            <div className="text-gray-600 p-4 flex flex-col gap-6 shadow-lg lg:w-1/5 rounded-md">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center">
                        <h1 className="text-2xl">Create account</h1>
                    </div>
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="username" className="text-sm">
                                Username
                            </label>
                            <input name='username' id='username' type="text" className="bg-transparent border px-4 py-1 rounded-md" onChange={handleChange} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="email" className="text-sm">
                                Email
                            </label>
                            <input name='email' id='email' type="email" className="bg-transparent border px-4 py-1 rounded-md" onChange={handleChange} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="profession" className="text-sm">
                                Profession
                            </label>
                            <input name='profession' id='profession' type="text" className="bg-transparent border px-4 py-1 rounded-md" onChange={handleChange} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="password" className="text-sm">
                                Password
                            </label>
                            <input name='password' id='password' type="password" className="bg-transparent border px-4 py-1 rounded-md" onChange={handleChange} />
                        </div>
                        <div>
                            <label htmlFor="file">
                                <span>Choose an image:</span>
                                <input type="file" id="file" className='hidden' onChange={handleImageChange} accept="image/*" />
                            </label>
                        </div>
                        {selectedImage && (
                            <div>
                                <img
                                    src={URL.createObjectURL(selectedImage)}
                                    alt="Selected"
                                    className="w-16 h-16 rounded-full object-cover"
                                />
                            </div>
                        )}
                        <button className="bg-green-600 px-4 py-1 rounded-md">Continue</button>
                    </form>
                </div>
                <div className="flex gap-1">
                    <span className="text-sm">Already have an account?</span>
                    <Link to="/login" className="text-sm text-blue-500">
                        Sign in
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
