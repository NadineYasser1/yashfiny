import { createContext, useEffect, useState } from "react";

export const HideTabContext = createContext({
    hidden: false,
    hideTab: (state) => { },
});

const HideTabContextProvider = ({ children }) => {

    const [hide, setHide] = useState();

    const hideTab = (state) => {
        setHide(state)
    }



    const value = {
        hidden: hide,
        hideTab,

    }

    return <HideTabContext.Provider value={value}>{children}</HideTabContext.Provider>
}

export default HideTabContextProvider;