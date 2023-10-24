import { BsHeart, BsHeartFill } from "react-icons/bs";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import newRequests from "../utils/newRequests";
import { format } from "timeago.js"
import Login from "../pages/Login";

const FeedCard = ({ post, allpost }) => {
    const { user } = useContext(UserContext)
    const [like, setLike] = useState(post.likes.length)
    const [isLiked, setIsLiked] = useState(false)
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        if (post && user) {
            setIsLiked(post.likes.includes(user._id))
        }
    }, [post, user])
    const handleLike = async () => {
        try {
            await newRequests.put(`/api/post/like/${post._id}`)
            setLike(isLiked ? like - 1 : like + 1)
            setIsLiked(prevState => !prevState)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        try {
            const fetchReviews = async () => {
                const res = await newRequests.get(`/api/review/getreviews/${post._id}`)
                setReviews(res.data)
            }
            fetchReviews()
        } catch (error) {
            console.log(error)
        }
    }, [post._id])

    return (
        <>
            {user ? (
                <div className={allpost ? "w-full flex flex-col gap-2 shadow-lg p-2" : "flex flex-col shadow-md gap-2 p-2"}>
                    <div className="w-full flex gap-4">
                        <Link to={`/${post.userId.username}`} className="flex gap-2 items-center">
                            <img
                                className="w-9 h-9 rounded-full object-cover"
                                src={post.userId.profilePic}
                                alt=""
                            />
                            <div className="leading-4">
                                <h1 className={allpost ? "block text-sm md:block md:text-sm" : "font-semibold"}>{post.userId.username}</h1>
                                <span className={allpost ? "block text-xs md:block md:text-xs" : "text-xs"}>{post.userId.profession}</span>
                            </div>
                        </Link>
                        <div className="flex justify-start">
                            <span className="text-xs">{format(post.createdAt)}</span>
                        </div>
                    </div>
                    <div className={allpost ? "w-full flex flex-col" : "w-full flex flex-col xs:flex-row lg:flex-col xl:flex-row gap-4"}>
                        <div className={allpost ? "w-full" : "w-full md:w-1/2 lg:w-full h-full mt-2"}>
                            <Link to={`/post/${post._id}`}>
                                <img
                                    className={allpost ? "w-full object-contain" : "w-full object-contain xl:h-48 xl:object-cover"}
                                    src={post.image}
                                    alt=""
                                />
                            </Link>
                        </div>
                        <div className={allpost ? "w-full" : "w-full md:w-1/2 lg:w-full flex flex-col gap-1"}>
                            <Link to={`/post/${post._id}`}>
                                <h1 className={allpost ? "text-lg text-blue-600" : "text-lg md:text-lg lg:text-xl text-blue-600"}>{post.title.length <= 100 ? post.title : `${post.title.substring(0, 100)}...`}</h1>
                                <p className="text-gray-600 text-sm">{post.content.substring(0, 150)}...</p>
                            </Link>
                            {!allpost && (
                                <div className="flex items-center gap-4">
                                    <div className="flex gap-1 items-center">
                                        {isLiked ? <BsHeartFill className="text-red-500 mt-1 cursor-pointer" onClick={handleLike} /> : <BsHeart className="mt-1 cursor-pointer" onClick={handleLike} />}
                                        <span>{like}</span>
                                        <span>likes</span>
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        <span>{reviews && reviews.length}</span>
                                        <p>reviews</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div >
            ) : <Login />}
        </>
    );
};

export default FeedCard;
FeedCard.propTypes = {
    post: PropTypes.object.isRequired,
    allpost: PropTypes.bool.isRequired
};
