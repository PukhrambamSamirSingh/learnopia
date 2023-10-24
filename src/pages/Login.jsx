import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"

import newRequests from "../utils/newRequests"

const Login = () => {
    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    })
    const [error, setError] = useState(null)

    const navigate = useNavigate()
    const [submitting, setSubmitting] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmitting(true)
        try {
            const res = await newRequests.post("/api/auth/login", {
                username: credentials.username,
                password: credentials.password
            })
            setSubmitting(false)
            if (res.status === 200) {
                navigate("/")
                localStorage.setItem("currentUser", JSON.stringify(res.data))
            } else {
                console.log("Login failed")
            }
        } catch (error) {
            setError(error.response.data)
            setSubmitting(false)
        }
    }

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className="h-screen w-full flex flex-col pt-8 items-center bg-orange-50">
            <img className="w-20 h-20 mb-4" src="https://www.picng.com/upload/brain/png_brain_36222.png" alt="" />
            <div className="text-gray-600 p-4 flex flex-col gap-6 shadow-lg lg:w-1/5 rounded-md">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center">
                        <h1 className="text-2xl">Login to Learnopia</h1>
                    </div>
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-1">
                            {error && (
                                <div className="text-sm italic text-red-400">{error}</div>
                            )}
                            <label htmlFor="username" className="text-sm">Username</label>
                            <input name="username" id="username" type="text" className="bg-transparent border px-4 py-1 rounded-md" onChange={handleChange} required minLength={5} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="flex justify-between">
                                <label htmlFor="password" className="text-sm">Password</label>
                                <Link to={"/forgot"} className="text-sm text-blue-500">Forgot password?</Link>
                            </div>
                            <input name="password" id="password" type="password" className="bg-transparent border px-4 py-1 rounded-md" onChange={handleChange} required minLength={5} />
                        </div>
                        <button className="bg-green-600 px-4 py-1 rounded-md">{submitting ? "Logging..." : "Continue"}</button>
                    </form>
                </div>
                <div className="flex gap-1">
                    <span className="text-sm">New to Learnopia?</span>
                    <Link to={"/register"} className="text-sm text-blue-500">Create an account</Link>
                </div>
            </div>
        </div>
    )
}

export default Login
