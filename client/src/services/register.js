import axios from 'axios'
const baseUrl = 'https://ecommerce-moez.onrender.com/api/users'  // https://ecommerce-moez.onrender.com - le quite esto porque trabajare desde mi entorno local

// const register = async (newObject) => {
//     const response = await axios.post(baseUrl, newObject)
//     return response.data
// }

// export default register 

export const register = async createObject => {
    const response = await axios.post(baseUrl, createObject)
    return response.data
}
  
