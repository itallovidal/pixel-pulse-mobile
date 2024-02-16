import axios from 'axios'

// const local = 'http://10.0.2.2:8080/'
const online = 'https://pixelpulseapi-adqu.onrender.com'
export const Api = axios.create({
  baseURL: online,
  validateStatus: () => true,
})
