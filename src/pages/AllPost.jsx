import { useContext, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { fetchPostAsync } from "../reducer/postSlice";
import FeedCard from "../components/FeedCard";
import { UserContext } from "../context/UserContext";
import Login from "./Login";
import Loading from "../components/Loading";

const Feed = () => {
    const { user } = useContext(UserContext)
    const posts = useSelector(state => state.post.posts)
    const postStatus = useSelector(state => state.post.status)
    const postError = useSelector(state => state.post.error)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchPostAsync())
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
        <>
            {user ? <div className="w-full flex flex-col gap-4">
                {posts.length !== 0 && (
                    <h1 className="text-xl sm:text-2xl font-sans">Posts</h1>
                )}
                {posts.length === 0 && (
                    <div className="w-full flex justify-center items-center" style={{ height: "calc(100vh - 90px)" }}>
                        <h1 className="text-gray-500 text-center text-2xl">No post yet!</h1>
                    </div>
                )}
                <div className="w-full grid grid-cols-1 xxs:grid-cols-2 sm:grid-cols-3 md:grid-cols-2 xl:grid-cols-3 gap-4 justify-between">
                    {posts.map(post => (
                        <FeedCard key={post._id} post={post} allpost />
                    ))}
                </div>
            </div> : <Login />}
        </>
    )
}

export default Feed
