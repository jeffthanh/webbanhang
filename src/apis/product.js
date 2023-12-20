import axios from "../axios";


export const apiGetProducts = (params) => axios({
    url: '/product',
    method: 'get',
    params
})


export const apiGetProduct = (pid) => axios({
    url: '/category/'+pid,
    method: 'get',
    
})

export const apiGetProductid = (pid) => axios({
    url: '/product/'+pid,
    method: 'get',
    
})