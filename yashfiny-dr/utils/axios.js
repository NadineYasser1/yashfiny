import originalAxios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const axios = originalAxios.create({
    baseURL: process.env.EXPO_PUBLIC_ROUTE
})

export const setupInterceptor = (store) => {
    axios.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error?.response?.status === 401) {
                store.logout()
            }
            return Promise.reject(error);
        }
    )
    axios.interceptors.response.use(
        (config) => {
            if (store.isAuthenticated)
                config.headers['Authorization'] = `Bearer ${store.token
                    }`
            return config;
        },
        (error) => {
            return Promise.reject(error)
        }
    )
}

