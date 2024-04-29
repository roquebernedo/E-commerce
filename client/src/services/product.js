import axios from 'axios'
const baseUrl = 'https://e-commerce-f1fr.onrender.com' //http://localhost:8000

let token = null
//console.log(token)

const setToken = newToken => {
  token = `Bearer ${newToken}`
}  

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  console.log("este es el objeto nuevo")
  console.log(newObject)

  const response = await axios.post(`${baseUrl}/add`, newObject, config)
  return response.data
}

const productsOnCart = async newObject => {
  //console.log("el id del service: " + id)
  const config = {
    headers: { Authorization: token },
  }
  //console.log("este es el objeto nuevo")
  //console.log(newObject)

  const response = await axios.post(`${baseUrl}/adding`, newObject, config)
  return response.data
}

const updateQuantityProduct = async (id, quantity) => {
  const config = {
    headers: { Authorization: token },
  }
  //const newObject = { quantity }
  console.log("aqui va el quantity")
  console.log(id)
  console.log(quantity)
  //console.log(newObject)
  const request = await axios.put(`${baseUrl}/update/${id}`, {quantity}, config)
  console.log(request)
  return request.data
}
// tratando de resolver el actual problema - quantity
const updateQuantityProductt = async (id, content) => {
  const config = {
    headers: { Authorization: token },
  }
  //const newObject = { quantity }
  //console.log("aqui va el quantity")
  //console.log(id)
  //console.log(content)
  //console.log(quantity)
  //console.log(newObject)
  const request = await axios.put(`${baseUrl}/update/${id}`, content, config)
  //console.log(request)
  return request.data
}

const deleteCart = async (id) => {
  //console.log("hola")
  //console.log(id)
  const config = {
    headers: { Authorization: token },
  }

  //console.log("entra al try")
  const request = await axios.put(`${baseUrl}/deleteCart`, id, config)
  //console.log(request)
  return request.data
}

const removeSingleProduct = async (id, content) => {
  //console.log("hola")
  //console.log(id)
  const config = {
    headers: { Authorization: token },
  }

  //console.log("entra al try")
  const request = await axios.put(`${baseUrl}/remove/${id}`, content, config)
  //console.log(request)
  return request.data
}

const increaseQuantity = async (id, content) => {
  const config = {
    headers: { Authorization: token },
  }
  //const newObject = { quantity }
  //console.log("aqui va el quantity")
  //console.log(id)
  //console.log(content)
  //console.log(quantity)
  //console.log(newObject)
  const request = await axios.put(`${baseUrl}/increaseProduct/${id}`, content, config)
  //console.log(request)
  return request.data
}

const decreaseQuantity = async (id, content) => {
  const config = {
    headers: { Authorization: token },
  }
  //const newObject = { quantity }
  //console.log("aqui va el quantity")
  //console.log(id)
  //console.log(content)
  //console.log(quantity)
  //console.log(newObject)
  const request = await axios.put(`${baseUrl}/decreaseProduct/${id}`, content, config)
  //console.log(request)
  return request.data
}

const productService = {
  create, 
  setToken, 
  getAll, 
  productsOnCart, 
  updateQuantityProduct, 
  updateQuantityProductt, 
  deleteCart, 
  removeSingleProduct,
  increaseQuantity,
  decreaseQuantity
}

export default productService