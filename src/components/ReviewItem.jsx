import PropTypes from "prop-types";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai"
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns';

const ReviewItem = ({ review }) => {
    const calculateDaysAgo = (date) => {
        const currentDate = new Date();
        const createdAtDate = new Date(date);

        const daysDiff = differenceInDays(currentDate, createdAtDate);
        if (daysDiff >= 1) {
            return `${daysDiff} ${daysDiff === 1 ? 'day' : 'days'} ago`;
        }
        const hoursDiff = differenceInHours(currentDate, createdAtDate);
        if (hoursDiff >= 1) {
            return `${hoursDiff} ${hoursDiff === 1 ? 'hour' : 'hours'} ago`;
        }

        const minutesDiff = differenceInMinutes(currentDate, createdAtDate);
        if (minutesDiff >= 1) {
            return `${minutesDiff} ${minutesDiff === 1 ? 'minute' : 'minutes'} ago`;
        }

        const secondsDiff = differenceInSeconds(currentDate, createdAtDate);
        return `${secondsDiff} ${secondsDiff === 1 ? 'second' : 'seconds'} ago`;
    };

    return (
        <div className="shadow-lg p-2 rounded-md flex flex-col gap-2">
            <div className="flex">
                <div className="flex gap-2 items-center">
                    <img className="w-8 h-8 object-cover rounded-full" src={review.userId.profilePic} alt="" />
                    <div className="flex flex-col">
                        <span>{review.userId.username}</span>
                        <span className="text-gray-500 text-sm">{review.userId.email}</span>
                    </div>
                </div>
                <span>{calculateDaysAgo(review.createdAt)}</span>
            </div>
            <span>
                {review.description}
            </span>
            <div className="flex gap-2">
                <div className="flex gap-1 items-center">
                    <AiOutlineLike />
                    <span>2</span>
                </div>
                <div className="flex gap-1 items-center">
                    <AiOutlineDislike />
                    <span>4</span>
                </div>
            </div>
        </div>
    )
}

export default ReviewItem
ReviewItem.propTypes = {
    review: PropTypes.object.isRequired,
}