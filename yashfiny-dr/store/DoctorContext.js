import { createContext, useEffect, useState } from "react";

export const DoctorContext = createContext({
    avatarUri: '',
    doctorData: {},
    updateAvatar: (newUri) => { },
    updateData: (newData) => { },
    setNewData: (newData) => { }
});

const DoctorContextProvider = ({ children }) => {

    const [avatar, setAvatar] = useState('');
    const [data, setData] = useState({})

    const updateAvatar = (newUri) => {
        setAvatar(newUri)
    }
    const updateData = (newData) => {
        setData((prev) => ({
            ...prev,
            ...newData
        }))
    }

    const setNewData = (newData) => {
        setData(newData)
    }


    const value = {
        avatarUri: avatar,
        doctorData: data,
        updateData,
        updateAvatar,
        setNewData
    }

    return <DoctorContext.Provider value={value}>{children}</DoctorContext.Provider>
}

export default DoctorContextProvider;