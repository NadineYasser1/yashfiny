import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({
    token: '',
    isAuthenticated: false,
    authenticate: (token) => { },
    logout: () => { },
});

const AuthContextProvider = ({ children }) => {

    const [authToken, setAuthToken] = useState();

    const authenticate = (token) => {
        setAuthToken(token);
        AsyncStorage.setItem('token', token) //has to be a string or JSON string
    }

    const logout = () => {
        setAuthToken(null)
        AsyncStorage.removeItem('token');
    }

    const value = {
        token: authToken,
        isAuthenticated: !!authToken,
        authenticate,
        logout
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContextProvider;