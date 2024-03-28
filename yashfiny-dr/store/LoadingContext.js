import { createContext, useState } from "react";
export const LoadingContext = createContext({
isLoading: false,
changeState: (loading) => {}
})
const LoadingContextProvider = ({children}) => {
    const [loading, setLoading] = useState(false)
    const changeState = (load) => {
     setLoading(load)
    }
    const value = {
        isLoading: loading,
        changeState
    }
    return <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>

}
export default LoadingContextProvider;