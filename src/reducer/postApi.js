import newRequests from "../utils/newRequests"

export const fetchPosts = () => {
    return newRequests.get("/api/post/getallposts")
}

export const timelinePost = () => {
    return newRequests.get("/api/post/timelineposts")
}
