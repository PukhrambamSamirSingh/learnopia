import { Link, useNavigate } from "react-router-dom"
import newRequests from "../utils/newRequests"
import PropTypes from "prop-types"

const PostUpdateDelete = ({ creator, postId }) => {
    const navigate = useNavigate()
    const handleDelete = async () => {
        try {
            const res = await newRequests.delete(`/api/post/delete/${postId}`)
            if (res.status === 200) {
                navigate("/")
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            {creator && (
                <div className="flex gap-2">
                    <Link to={`/updatepost/${postId}/edit`} className="border border-gray-500 rounded-full px-2 py-1 sm:px-3 sm:py-1.5 md:sm-4 md:py-2">Update</Link>
                    <button className="border border-gray-500 rounded-full px-2 py-1 sm:px-3 sm:py-1.5 md:sm-4 md:py-2" onClick={handleDelete}>Delete</button>
                </div>
            )}
        </>
    )
}

export default PostUpdateDelete
PostUpdateDelete.propTypes = {
    creator: PropTypes.string.isRequired,
    postId: PropTypes.string.isRequired
}

