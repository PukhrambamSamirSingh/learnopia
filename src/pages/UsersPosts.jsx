import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom";
import newRequests from "../utils/newRequests";
import { format } from "timeago.js"

const UsersPosts = () => {
    const [posts, setPosts] = useState([])
    const { search } = useLocation()
    useEffect(() => {
        const getPosts = async () => {
            try {
                const res = await newRequests.get(`/api/post/posts${search}`)
                setPosts(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        getPosts()
    }, [posts, search])

    return (
        <div className="w-full flex flex-col gap-4">
            <h1>Recent Posts</h1>
            <div className="w-full grid grid-cols-1 xxs:grid-cols-2 sm:grid-cols-3 md:grid-cols-2 xl:grid-cols-3 gap-4 justify-between">
                {posts && posts.map((post) => (
                    <div className="flex flex-col shadow-sm" key={post._id}>
                        <div className="flex gap-4 m-2">
                            <Link to={`/${post.userId.username}`} className="flex gap-2 items-center">
                                <img
                                    className="w-9 h-9 rounded-full object-cover"
                                    src={post.userId.profilePic}
                                    alt=""
                                />
                                <div className="leading-4">
                                    <h1 className="font-semibold">{post.userId.username}</h1>
                                    <span className="text-xs">{post.userId.profession}</span>
                                </div>
                            </Link>
                            <div className="flex justify-start">
                                <span className="text-xs">{format(post.createdAt)}</span>
                            </div>
                        </div>
                        <div className="w-full">
                            <Link to={`/post/${post._id}`}>
                                <img
                                    className="w-full h-48 object-cover"
                                    src={post.image}
                                    alt=""
                                />
                            </Link>
                        </div>
                        <div className="m-2 flex flex-col gap-1">
                            <Link to={`/post/${post._id}`}>
                                <h1 className="text-lg text-blue-600">{post.title.substring(0, 100)}...</h1>
                                <p className="text-gray-600 text-sm">{post.content.substring(0, 150)}...</p>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default UsersPosts
