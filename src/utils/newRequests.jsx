import axios from "axios";

const newRequests = axios.create({
    baseURL: "https://learnopia-api.onrender.com:3000",
    withCredentials: true
})

export default newRequests