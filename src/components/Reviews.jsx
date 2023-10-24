import { useContext, useEffect, useState } from "react"
import PropTypes from "prop-types";
import ReviewItem from "./ReviewItem"
import newRequests from "../utils/newRequests"
import { UserContext } from "../context/UserContext"
import {
    useQuery,
} from '@tanstack/react-query'

const Reviews = ({ postId }) => {
    const { user } = useContext(UserContext)
    const [sending, setSending] = useState(false)

    const [item, setItem] = useState({
        postId: postId,
        userId: null,
        description: ""
    })
    useEffect(() => {
        if (user) {
            setItem((prevItem) => ({
                ...prevItem,
                userId: user._id
            }))
        }
    }, [user])
    const { isLoading, error, data } = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            try {
                const res = await newRequests.get(`/api/review/getreviews/${postId}`)
                return res.data
            } catch (error) {
                console.log(error)
            }
        }
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSending(true)
        try {
            const res = new newRequests.post("/api/review/createreview", {
                ...item,
                description: item.description
            })
            setItem(res.data)
            setSending(false)
        } catch (error) {
            setSending(false)
            throw new Error(error)
        }
    }

    return (
        <div className="w-full flex flex-col gap-4">
            <hr />
            <div className="flex gap-2 w-full">
                <div className="w-14 flex justify-center items-center">
                    <img className="w-10 h-10 rounded-full object-cover" src={user?.profilePic} alt="" />
                </div>
                <form onSubmit={handleSubmit} className="flex gap-2 items-center w-full">
                    <input placeholder="Write a review" className="text-gray-400 border-b p-2 outline-none bg-transparent w-4/5" type="text" onChange={(e) => setItem({ ...item, description: e.target.value })} />
                    <button className="border px-2 py-1 sm:px-6 sm:py-2 flex items-center rounded-md">{sending ? "Sending..." : "Send"}</button>
                </form>
            </div>
            <div className="flex flex-col gap-6">
                {isLoading ? "Loading..." : error ? "Something went wrong" : data.map((review) => (
                    <ReviewItem key={review._id} review={review} />
                ))}
            </div>
        </div>
    )
}

export default Reviews
Reviews.propTypes = {
    postId: PropTypes.object.isRequired,
};