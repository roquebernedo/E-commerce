import axios from 'axios'
const baseUrl = 'http://localhost:8000' //http://localhost:8000
// https://e-commerce-f1fr.onrender.com

let token = null
//console.log(token)

const setToken = newToken => {
  token = `Bearer ${newToken}`
}  

const getAll = () => {
  const config = {
    headers: { Authorization: token },
  }
  console.log(config)
  const request = axios.get(`${baseUrl}/wishlist`, config)
  return request.then(response => response.data)
}

const wishlistService = {
    setToken, 
    getAll,
  }
  
  export default wishlistService