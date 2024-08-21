import axios from 'axios'

export const api = axios.create({
  baseURL: "https://sheets.googleapis.com/v4/spreadsheets/"
})

axios.interceptors.request.use((config) => {
    return config
}, (error) => {
    return Promise.reject(error)
})

axios.interceptors.response.use((response) => {
    return response
}, (error) => {
    return Promise.reject(error)
}
)