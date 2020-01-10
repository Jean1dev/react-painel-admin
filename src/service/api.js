import axios from 'axios'
import { baseUrl } from '../constants/url'

const api = axios.create({
    baseURL: baseUrl
})

export default api