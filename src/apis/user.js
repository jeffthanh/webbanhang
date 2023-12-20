import axios from "../axios";


export const apiRegister = (data) => axios({
    url: '/user',
    method: 'post',
    data
})

export const apiLogin = (data) => axios({
    url: '/user/login',
    method: 'post',
    data
})

export const apiGetCurrent = () => axios({
    url: '/user',
    method: 'get',
    
})
