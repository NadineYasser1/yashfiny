import originalAxios from 'axios'


export const axios = originalAxios.create({
    baseURL: process.env.EXPO_PUBLIC_ROUTE
})

