import originalAxios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const axios = originalAxios.create({
    baseURL: process.env.EXPO_PUBLIC_ROUTE
})

export const setupInterceptor = () => {

    axios.interceptors.request.use(
        async config => {
            const token = await AsyncStorage.getItem('token')
            if (token) {
                config.headers.Authorization = "Bearer " + token
            }
            return config
        },
        error => {
            return Promise.reject(error)
        }
    );
}