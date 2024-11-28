import axios from "axios";

const instance = axios.create({
    baseURL: 'https://sea-turtle-app-l3p77.ondigitalocean.app/api/users',
    withCredentials: true
})

export default instance