import { createContext, useEffect, useState } from "react";

export const DoctorContext = createContext({
    avatarUri: '',
    doctorData: {},
    updateAvatar: (newUri) => { },
    updateData: (newData) => { }
});

const DoctorContextProvider = ({ children }) => {

    const [avatar, setAvatar] = useState('https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250');
    const [data, setData] = useState({
        fname: 'Nadine',
        lname: 'Yasser',
        title: 'Dr',
        date: new Date(),
        phone: '0122345678',
        email: 'Nadineyasser92@gmail.com',
        address: 'st 701, road x, apt 4',
        city: 'Alexandria',
        country: 'Egypt',
        payment_method: 3,
        payment: '12345679',
        subspeciality: 'disease3',
        price: [
            { type: 'Examination', method: 'Clinic', price: '200' },
            { type: 'Consultation', method: 'Video', price: '200' },

        ],
    })

    const updateAvatar = (newUri) => {
        setAvatar(newUri)
    }
    const updateData = (newData) => {
        setData((prev) => ({
            ...prev,
            ...newData
        }))
    }


    const value = {
        avatarUri: avatar,
        doctorData: data,
        updateData,
        updateAvatar
    }

    return <DoctorContext.Provider value={value}>{children}</DoctorContext.Provider>
}

export default DoctorContextProvider;