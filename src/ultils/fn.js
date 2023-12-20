export const createSlug = string => string.toLowerCase().normalize("NFD").replace(/[\u0300-\u035f]/g,"").split(' ').join('-')
export const formathMoney = number => Number(number.toFixed(1)).toLocaleString()



export const fotmatPrice = number => Math.round(number / 1000) *1000