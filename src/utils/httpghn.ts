import axios, { AxiosInstance } from 'axios'
import { API_URL } from '~/configs/api.config'

class HttpGhn {
    instance: AxiosInstance
    private token: string
    constructor() {
        this.token = 'a1a3a65f-39cc-11ef-8e53-0a00184fe694'
        this.instance = axios.create({
            baseURL: API_URL.BASE_API_GHN_URL,
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
                token: this.token
            }
        })
    }
}
const httpGhn = new HttpGhn().instance
export default httpGhn
