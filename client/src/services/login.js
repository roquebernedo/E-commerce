import axios from 'axios'
const baseUrl = 'https://e-commerce-f1fr.onrender.com/api/users/auth' //https://ecommerce-moez.onrender.com
//http://localhost:8000
//https://e-commerce-f1fr.onrender.com
// const login = async credentials => {
//   const response = await axios.post(baseUrl, credentials)
//   return response.data
// }

// const loginService = {
//   login
// }
// export default loginService

export const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}