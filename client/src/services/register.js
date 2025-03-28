import axios from 'axios'
const baseUrl = 'http://localhost:8000/api/users'  // https://ecommerce-moez.onrender.com - le quite esto porque trabajare desde mi entorno local
//http://localhost:8000
//https://e-commerce-f1fr.onrender.com/api/users
// const register = async (newObject) => {
//     const response = await axios.post(baseUrl, newObject)
//     return response.data
// }

// export default register 

export const register = async createObject => {
    const response = await axios.post(baseUrl, createObject)
    return response.data
}
  
