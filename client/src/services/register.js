import axios from 'axios'
const baseUrl = 'https://ecommerce-moez.onrender.com/api/users'

// const register = async (newObject) => {
//     const response = await axios.post(baseUrl, newObject)
//     return response.data
// }

// export default register 

export async function register(newObject) {
    const response = await axios.post(baseUrl, newObject);
    return response.data;
  }