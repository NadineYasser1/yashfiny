import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({
    token: '',
    isAuthenticated: false,
    authenticate: (token) => {},
    logout: () => {},
});

function AuthContextProvider({children}) {

    const [authToken, setAuthToken] = useState();
    
    function authenticate(token) {
        setAuthToken(token);
        AsyncStorage.setItem('token', token) //has to be a string or JSON string
    }

    function logout() {
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