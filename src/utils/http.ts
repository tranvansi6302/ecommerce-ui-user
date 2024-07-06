import axios, { AxiosError, AxiosInstance } from 'axios'
import { API_URL } from '~/configs/api.config'
import { ErrorMessage } from './../@types/common.type'
import { getTokenFromLS, saveProfileToLS, saveTokenToLS } from './auth'
import { LoginResponse } from '~/@types/auth.type'
import { User } from '~/@types/users.type'
import { toast } from 'react-toastify'

class Http {
    instance: AxiosInstance
    private token: string
    constructor() {
        this.token = getTokenFromLS()
        this.instance = axios.create({
            baseURL: API_URL.BASE_API_URL,
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        this.instance.interceptors.request.use((config) => {
            if (this.token) {
                config.headers.authorization = `Bearer ${this.token}`
                return config
            }
            return config
        })
        this.instance.interceptors.response.use(
            (response) => {
                const message = (response.data as ErrorMessage).message
                toast.success(message)
                const { url } = response.config
                switch (url) {
                    case API_URL.LOGIN: {
                        this.token = (response.data as LoginResponse).result?.token || ''
                        const profile = (response?.data as LoginResponse).result?.user
                        saveTokenToLS(this.token)
                        saveProfileToLS(profile as User)
                        break
                    }
                    default:
                }
                return response
            },
            (error) => {
                const errorResponse = (error as AxiosError<ErrorMessage>).response?.data.message
                toast.error(errorResponse as string)
                return Promise.reject(error)
            }
        )
    }
}
const http = new Http().instance
export default http
