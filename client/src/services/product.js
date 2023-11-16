//import axios from 'axios'
//const baseUrl = 'http://localhost:3000/'

let token = null
console.log(token)

const setToken = newToken => {
  token = `bearer ${newToken}`
}  

const productService = {
    setToken
  }
  
export default productService