import { createContext, useEffect, useState } from "react";
import newRequests from "../utils/newRequests";
import PropTypes from "prop-types";

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        try {
            const fetchCurrentUser = async () => {
                const res = await newRequests.get("/api/auth/getuser")
                setUser(res.data)
            }
            fetchCurrentUser()
        } catch (error) {
            console.log(error)
        }
    }, [])

    return (
        <UserContext.Provider value={{ user }}>
            {children}
        </UserContext.Provider>
    )
}

UserProvider.propTypes = {
    children: PropTypes.object.isRequired,
};