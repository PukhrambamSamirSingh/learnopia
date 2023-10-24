import { useMutation, useQuery } from "@tanstack/react-query";
import newRequests from "../utils/newRequests";
import FollowingCard from "../components/FollowingCard";
import getCurrentUser from "../utils/getCurrentUser";
import Footer from "../components/Footer";

const FollowingPage = () => {
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
        <div className="flex flex-col">
            <div className="w-full flex-col gap-4">
                {data?.length === 0 && (
                    <div className="shadow p-2">
                        <h1 className="italic">Start following others so that they will follow you back!</h1>
                    </div>
                )}
                {isLoading ? "Loading..." : error ? "Some error occurred" : data && data.map((d) => (
                    <FollowingCard key={d?._id} d={d} handleClick={handleClick} />
                ))}
            </div>
            <Footer />
        </div>
    )
}

export default FollowingPage
