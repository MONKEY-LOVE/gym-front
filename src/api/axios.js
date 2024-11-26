import axios from "./api";



export const loginRequest = user => axios.post(`/login`, user)
export const verifyTokenRequest = () => axios.get(`/verify`)
export const getUsersRequest = () => axios.get(`/`)
export const getTotalUsersRequest = () => axios.get(`/total`)

