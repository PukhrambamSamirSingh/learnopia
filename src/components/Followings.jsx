import { useMutation, useQuery } from "@tanstack/react-query";
import newRequests from "../utils/newRequests";
import FollowingCard from "./FollowingCard";
import getCurrentUser from "../utils/getCurrentUser";

const Followings = () => {
    const user = getCurrentUser()
    const { isLoading, error, data, refetch } = useQuery({
        queryKey: ['followingData'],
        queryFn: async () => {
            const res = await newRequests.get(`/api/user/followingusers/${user?._id}`);
            return res.data;
        }
    });
    const unfollowMutation = useMutation(
        async (userId) => {
            await newRequests.put(`/api/user/unfollow/${userId}`);
        },
        {
            onSuccess: () => {
                refetch();
            },
        }
    );

    const handleClick = async (userId) => {
        try {
            await unfollowMutation.mutateAsync(userId);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="lg:w-2/5 hidden lg:flex flex-col gap-4">
            {data?.length === 0 && (
                <div>
                    <h1 className="text-2xl text-green-500">You had not followed anyone yet!</h1>
                </div>
            )}
            {isLoading ? "Loading..." : error ? "Some error occurred" : data && data.map((d) => (
                <FollowingCard key={d?._id} d={d} handleClick={handleClick} />
            ))}
        </div>
    )
}

export default Followings