import { Link } from "react-router-dom"
import PropTypes from "prop-types";

const FollowerCard = ({ d, handleClick }) => {
    return (
        <div className="w-full flex justify-between shadow-xl p-2 rounded-md">
            <div className="flex items-center gap-2">
                <img className="h-10 w-10 rounded-full object-cover" src={d?.profilePic} alt="" />
                <div className="flex flex-col">
                    <span className="font-semibold">{d?.username}</span>
                    <Link to={`/${d?.username}`} className="text-blue-800 hover:underline cursor-pointer text-sm">View profile</Link>
                </div>
            </div>
            <div className="flex">
                <button onClick={() => handleClick(d?._id)} className="text-sm border px-2 py-1 rounded-full">Unfollow</button>
            </div>
        </div>
    )
}

export default FollowerCard
FollowerCard.propTypes = {
    d: PropTypes.object.isRequired,
    handleClick: PropTypes.func.isRequired
};
