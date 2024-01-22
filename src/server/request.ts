import axios from 'axios'
import { ENDPOINT, TOKEN } from '../const/index'
import Cookies from 'js-cookie'
const token = Cookies.get(TOKEN)

const defaultHeader = {
    'Authorization': `Bearer ${token}`,
    'Content-type': 'application/json'
}

export const request = axios.create({
    baseURL: ENDPOINT,
    timeout: 10000,
    headers: defaultHeader
})