import { useContext } from "react"
import { useParams } from "react-router-dom"
import Reviews from "../components/Reviews"
import { UserContext } from "../context/UserContext"
import PostUpdateDelete from "../components/PostUpdateDelete"
import newRequests from "../utils/newRequests"
import { useQuery } from "@tanstack/react-query"
import Loading from "../components/Loading"
import Footer from "../components/Footer"
import Login from "./Login"

const PostId = () => {
    const { user } = useContext(UserContext)
    const { id } = useParams()
    const { isLoading, error, data } = useQuery({
        queryKey: ['repoData'],
        queryFn: async () => {
            const res = await newRequests.get(`/api/post/getpost/${id}`)
            return res.data
        }
    })

    return (
        <>
            {user ? (
                <div className="w-full flex flex-col py-4">
                    {isLoading ? <Loading /> : error ? "Something went wrong..." : data && (
                        <div className="w-full flex flex-col gap-4">
                            <div className="w-full flex flex-col items-start sm:flex-row gap-4">
                                <h1 className="w-full sm:w-2/5 text-xl md:text-xl lg:text-4xl">{data.title}</h1>
                                <img className="w-full sm:w-3/5 lg:h-80 object-contain lg:object-cover" src={data.image} alt="" />
                            </div>
                            <div className="flex flex-col xm:flex-row gap-4 justify-between">
                                <div className="flex items-center gap-4">
                                    <img className="w-14 h-14 object-cover rounded-full" src={data.userId.profilePic} alt="" />
                                    <div className="flex flex-col gap-1">
                                        <div className="flex gap-2">
                                            <p>Uploader:</p>
                                            <span>{data.userId.username}</span>
                                        </div>
                                        <div className="flex gap-2">
                                            <p>Created At:</p>
                                            <span>{new Date(data.createdAt).toDateString()}</span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <PostUpdateDelete creator={data.userId?._id === user?._id} postId={data?._id} />
                                </div>
                            </div>
                            <hr />
                            <div>
                                <p>{data.content}</p>
                            </div>
                            <Reviews postId={data?._id} />
                        </div>
                    )}
                    <Footer />
                </div>
            ) : <Login />}
        </>
    )
}

export default PostId
