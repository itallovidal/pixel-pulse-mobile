import axios from 'axios'


// const local = 'http://10.0.2.2:8080/'
const eduarda = 'https://pixelpulseeduarda.onrender.com/'
export const Api = axios.create({
    baseURL: 'http://10.0.2.2:8080/'
})