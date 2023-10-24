import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
    useQuery
} from "@tanstack/react-query"
import newRequests from "../utils/newRequests";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import getCurrentUser from "../utils/getCurrentUser";

const Profile = () => {
    const user = getCurrentUser()
    const { username } = useParams();
    const [followed, setFollowed] = useState(false);
    const { isLoading, error, data } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            try {
                const res = await newRequests.get(`/api/user/getuser?username=${username}`);
                return res.data;
            } catch (error) {
                console.log(error);
            }
        }
    });

    useEffect(() => {
        if (data && user) {
            setFollowed(user.followings.includes(data._id));
        }
    }, [data, user]);

    const handleClick = async () => {
        try {
            if (followed) {
                await newRequests.put(`/api/user/unfollow/${data._id}`);
                setFollowed(false);
            } else {
                await newRequests.put(`/api/user/follow/${data._id}`);
                setFollowed(true);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="w-full flex flex-col">
            <div className="w-full flex flex-col gap-4">
                {isLoading ? (
                    <Loading />
                ) : error ? (
                    "Something went wrong"
                ) : data ? (
                    <div className="w-full flex flex-col sm:flex-row gap-4 items-start">
                        <div className="w-full sm:w-1/3 flex flex-col gap-2">
                            <div className="w-full flex">
                                <img className="w-44 h-44 rounded-full object-cover" src={data.profilePic} alt="" />
                            </div>
                            <div className="">
                                <h1 className="text-2xl">@{data.username}</h1>
                                <div className="flex gap-1">
                                    <p className="text-gray-500">Profession:</p>
                                    <span>{data.profession}</span>
                                </div>
                                <div className="flex gap-1">
                                    <p className="text-gray-500">Joined on:</p>
                                    <span>{new Date(data.createdAt).toDateString()}</span>
                                </div>
                            </div>
                        </div>
                        <div className="w-full sm:w-2/3 flex flex-col gap-2">
                            <div className="flex gap-2">
                                <Link to="/followers" className="flex gap-1">
                                    <p>Followers:</p>
                                    <span>{data.followers.length}</span>
                                </Link>
                                <span>.</span>
                                <Link to="/followings" className="flex gap-1">
                                    <p>Followings:</p>
                                    <span>{data.followings.length}</span>
                                </Link>
                            </div>
                            <div>
                                <h5>About</h5>
                                <span>{user.desc}</span>
                            </div>
                            <div className="flex gap-2">
                                {user.username !== username ? ( // Check if the current user is viewing their own profile
                                    <>
                                        <button onClick={handleClick} className="max-w-max border px-4 py-2 rounded-full">
                                            {followed ? "unfollow" : "follow"}
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        {/* Render different UI elements for the user's own profile */}
                                        <Link to={`/${user.username}/edit`} className="max-w-max border px-4 py-2 rounded-full">Edit profile</Link>
                                        <button className="max-w-max border px-4 py-2 rounded-full">Change password</button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
            <Footer />
        </div>
    );
};

export default Profile;
