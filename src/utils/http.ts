import axios, { AxiosError, AxiosInstance } from 'axios'
import { API_URL } from '~/configs/api.config'
import { ErrorMessage } from './../@types/common.type'
import { toast } from 'react-toastify'

class Http {
    instance: AxiosInstance
    constructor() {
        this.instance = axios.create({
            baseURL: API_URL.BASE,
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        this.instance.interceptors.response.use(
            (response) => {
                const message = (response.data as ErrorMessage).message
                toast.success(message)
                return response
            },
            (error) => {
                const errorResponse = (error as AxiosError<ErrorMessage>).response?.data.message
                toast.error(errorResponse)
                return Promise.reject(error)
            }
        )
    }
}
const http = new Http().instance
export default http
