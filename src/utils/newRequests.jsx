import axios from "axios";

const newRequests = axios.create({
    baseURL: "https://learnopia-api.onrender.com",
    withCredentials: true
})

export default newRequests