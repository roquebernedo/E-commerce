import axios from 'axios'
const baseUrl = 'http://localhost:8000/api/users'

let token = null
//console.log(token)

const setToken = newToken => {
  token = `Bearer ${newToken}`
}  

const updatingUser = async content => {
    const config = {
      headers: { Authorization: token },
    }
    console.log(content)
    console.log(config)
    //console.log(newObject)
    const request = await axios.put(`${baseUrl}/update`, content, config)
    console.log(request)
    return request.data
}
// export const login = async credentials => {
//     const response = await axios.post(baseUrl, credentials)
//     return response.data
//   }

const userService = {
    setToken,
    updatingUser
}
  
export default userService