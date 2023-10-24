import { useEffect } from "react"
import FeedCard from "./FeedCard";
import { useDispatch, useSelector } from 'react-redux'
import { fetchTimeLinePostAsync } from "../reducer/postSlice";
import Loading from "./Loading";

const Feed = () => {
    const posts = useSelector(state => state.post.posts)
    const postStatus = useSelector(state => state.post.status)
    const postError = useSelector(state => state.post.error)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchTimeLinePostAsync())
    }, [dispatch])

    if (postStatus === "loading") {
        return (
            <div className="w-full h-screen flex justify-center">
                <Loading />
            </div>
        )
    }
    if (postStatus === "error") {
        return (
            <div>{postError}</div>
        )
    }
    return (
        <div className="w-full h-full lg:w-3/5 flex flex-col gap-4">
            {posts.length !== 0 && (
                <h1 className="text-xl sm:text-2xl font-sans">Posts</h1>
            )}
            {posts.length === 0 && (
                <div className="w-full flex justify-center items-center" style={{ height: "calc(100vh - 90px)" }}>
                    <h1 className="text-gray-500 text-center text-2xl">Create a post or follow others<br />to view their posts</h1>
                </div>
            )}
            <div className="w-full flex flex-col gap-6">
                {posts.map(post => (
                    <FeedCard key={post._id} post={post} />
                ))}
            </div>
        </div>
    )
}

export default Feed
