import { useEffect, useState } from "react";
import newRequests from "../utils/newRequests";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Footer from "../components/Footer";

const UpdatePost = () => {
    const { postId } = useParams()

    const { data } = useQuery({
        queryKey: ['repoData'],
        queryFn: async () => {
            const res = await newRequests.get(`/api/post/getpost/${postId}`)
            return res.data
        }
    })
    useEffect(() => {
        if (data) {
            setPost({
                title: data.title,
                content: data.content
            });
        }
    }, [data]);
    const [post, setPost] = useState({
        title: "",
        content: ""
    });

    const navigate = useNavigate()

    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const res = await newRequests.put(`/api/post/update/${postId}`, {
                title: post.title,
                content: post.content
            });
            setPost(res.data)
            if (res.status === 200) {
                navigate(`/post/${postId}`)
            }
            setSubmitting(false);
        } catch (error) {
            setSubmitting(false)
        }
    };
    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value })
    }

    return (
        <div className="w-full flex flex-col">
            <div className="w-full h-full flex flex-col sm:flex-row gap-2">
                <h1 className="text-2xl font-bold">Update</h1>
                <div className="w-full">
                    <form className="5/6 flex flex-col gap-4" onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="title">Title</label>
                            <input className="text-black p-2 rounded-md" value={post.title} type="text" name="title" id="title" onChange={handleChange} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="content">Content</label>
                            <textarea className="text-black w-full p-2 rounded-md" value={post.content} type="text" name="content" id="content" rows="6" onChange={handleChange} />
                        </div>
                        <button className="max-w-max px-4 py-2 rounded-full bg-green-500">{submitting ? "Saving..." : "Save"}</button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default UpdatePost
