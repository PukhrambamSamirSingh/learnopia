import { useMutation, useQuery } from "@tanstack/react-query";
import newRequests from "../utils/newRequests";
import FollowerCard from "../components/FollowerCard";
import getCurrentUser from "../utils/getCurrentUser";
import Footer from "../components/Footer";


const Followers = () => {
    const user = getCurrentUser()

    const { isLoading, error, data, refetch } = useQuery({
        queryKey: ['followingData'],
        queryFn: async () => {
            const res = await newRequests.get(`/api/user/followers/${user?._id}`);
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
                    <div className="shadow">
                        <h1 className="italic">You had not followed anyone yet!</h1>
                    </div>
                )}
                {isLoading ? "Loading..." : error ? "Some error occurred" : data && data.map((d) => (
                    <FollowerCard key={d?._id} d={d} handleClick={handleClick} />
                ))}
            </div>
            <Footer />
        </div>
    )
}

export default Followers
