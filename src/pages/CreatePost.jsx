import { useContext, useEffect, useState } from "react";
import newRequests from "../utils/newRequests";
import upload from "../utils/upload";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const CreatePost = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const { user } = useContext(UserContext);
    const [post, setPost] = useState({
        userId: null,
        image: "",
        title: "",
        content: ""
    });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (user) {
            setPost((prevPost) => ({
                ...prevPost,
                userId: user._id
            }));
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const url = await upload(selectedImage);
            const res = await newRequests.post("/api/post/createpost", {
                ...post,
                image: url
            });
            setSubmitting(false);
            if (res.status === 200) {
                navigate("/")
            }
        } catch (error) {
            setError(error)
            setSubmitting(false)
        }
    };
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setSelectedImage(file);
    };
    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value })
    }

    return (
        <div className="w-full flex flex-col">
            <div className="flex w-full xl:w-4/5 h-full">
                <div className="w-full">
                    <form className="5/6 flex flex-col gap-4" onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="title">Title</label>
                            <input className="text-black p-2 rounded-md" type="text" name="title" id="title" onChange={handleChange} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="content">Content</label>
                            <textarea className="text-black w-full p-2 rounded-md" type="text" name="content" id="content" rows="6" onChange={handleChange} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="file">
                                <span>Choose an image:</span>
                                <input type="file" id="file" className='hidden' onChange={handleImageChange} accept="image/*" />
                            </label>
                        </div>
                        {selectedImage && (
                            <img
                                src={URL.createObjectURL(selectedImage)}
                                alt="Selected"
                                className="object-cover w-72 h-48"
                            />
                        )}
                        {error && (<div>{error}</div>)}
                        <button className="max-w-max px-4 py-2 rounded-full bg-green-500">{submitting ? "Uploading..." : "Upload"}</button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default CreatePost
