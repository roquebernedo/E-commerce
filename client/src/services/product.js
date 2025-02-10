import axios from 'axios'
const baseUrl = 'https://e-commerce-f1fr.onrender.com' //http://localhost:8000
// https://e-commerce-f1fr.onrender.com

let token = null
//console.log(token)

const setToken = newToken => {
  token = `Bearer ${newToken}`
}    
console.log(token)
const getAll = () => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.get(baseUrl, config)
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
  console.log(token)
  console.log(config)

  const response = await axios.post(`${baseUrl}/adding`, newObject, config)
  return response.data
}

const changePassword = async (info) => {
  const config = {
    headers: { Authorization: token },
  }
  //const newObject = { quantity }
  console.log(config)
  console.log("aqui va el change")
  console.log(info)
  //console.log(newObject)
  const request = await axios.put(`${baseUrl}/api/users/profile`, info, config)
  console.log(request)
  return request.data
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
  console.log(config)
  const request = await axios.put(`${baseUrl}/decreaseProduct/${id}`, content, config)
  return request.data
}

// Usuario - tiene que ir en user.js pero el token no se reconoce

const updatingUser = async content => {
  const config = {
    headers: { Authorization: token },
  }
  console.log(content)
  console.log(config)
  //console.log(newObject)
  const request = await axios.put(`${baseUrl}/api/users/update`, content, config)
  console.log(request)
  return request.data
}

// Wishlist - tiene que ir en wishlist.js pero el token no se reconoce

const getAllList = async () => {
  try{
    const config = {
      headers: { Authorization: token },
    }
    console.log("entra al getalllist")
    console.log(config)
    const response = await axios.get(`${baseUrl}/api/wishlist`, config)
    console.log(response)
    return response.data
  } catch(error){
    if (error.response) {
      console.error('Error en el servidor:', error.response.data);
    } else if (error.request) {
      console.error('No se recibió respuesta del servidor.');
    } else {
      console.error('Error desconocido:', error.message);
    }
    throw error; // Opcional, para manejarlo en otro lugar
  }
}

const addToList = async (id, content) => {
  const config = {
    headers: { Authorization: token },
  }
  console.log(config)
  console.log(content)
  const response = await axios.post(`${baseUrl}/api/wishlist/${id}`, content, config)
  console.log("agregado")
  console.log(response)
  return response.data
}

const removeFavorite = async (id) => {
  console.log("hola")
  console.log(id)
  const config = {
    headers: { Authorization: token },
  }
  console.log(config)

  //console.log("entra al try")
  const request = await axios.delete(`${baseUrl}/api/wishlist/remove/${id}`, config)
  console.log(request)
  //console.log(request)
  return request.data
}

const login = async credentials => {
  console.log(credentials)
  const response = await axios.post(`${baseUrl}/api/users/auth`, credentials)
  console.log(response.data)
  setToken(response.data.token);
  console.log(token)
  console.log(setToken)
  console.log(setToken())
  return response.data
}

const getAllWishList = () => {
  const request = axios.get(`${baseUrl}/api/wishlist/list`)
  return request.then(response => response.data)
}

// notifications 

const getEntryNoty = async () => {
  const config = {
    headers: { Authorization: token },
  }
  console.log(config)
  const response = await axios.get(`${baseUrl}/api/noti`, config)
  return response.data
}

const setNotifications = () => {
  const request = axios.get(`${baseUrl}/api/noti/setNotis/notification`)
  console.log(request)
  return request.then(response => response.data)
}

const getUniqueNoti = (id) => {
  const config = {
    headers: { Authorization: token },
  }
  console.log("aca esta el uniqueNoti")
  console.log(config)

  console.log(id)
  const request = axios.get(`${baseUrl}/api/noti/unique/${id}`, config)
  console.log(request)
  return request.then(response => response.data)
}

const deleteUniqueNoti = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  console.log("aca esta el delete uniqueNoti")
  console.log(config)

  console.log(id)
  const request = await axios.delete(`${baseUrl}/api/noti/${id}`, config)
  console.log(request)
  return request.data
}

const updateCart = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  console.log("esto es un id vacio:" + id)
  console.log("aca es Stripe")
  console.log(config)
  const response = await axios.post(`${baseUrl}/api/stripe/checkout-success`, id, config)
  console.log(response)
  console.log("entro a este response")
  return response.data
}

const cleaningProducts = async () => {
  const config = {
    headers: { Authorization: token },
  }

  console.log("aca llego tu hype")
  console.log(config)
  const response = await axios.put(`${baseUrl}/api/stripe/checkout-success`, {}, config)
  console.log(response)
  console.log("entro a este response clean")
  return response.data
}

const cancelito = async (id) => {
  const config = {
    headers: { Authorization: token },
  }

  console.log("aca llego tu hype")
  console.log(config)
  const response = await axios.put(`${baseUrl}/cancelito`, id, config)
  console.log(response)
  console.log("entro a este response clean")
  return response.data
}

const setDefaultAddress = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  
  console.log(id)
  console.log("aca llego tu hype de address")
  console.log(config)

  const response = await axios.put(`${baseUrl}/api/address/default/${id}`, {}, config)
  console.log(response)
  console.log("entro a este response del addresito")
  return response.data
}

const removeAddress = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  console.log("aca esta el delete addresito")
  console.log(config)

  console.log(id)
  const request = await axios.delete(`${baseUrl}/api/address/${id}`, config)
  console.log(request)
  return request.data
}

const addAddress = async (content) => {
  const config = {
    headers: { Authorization: token },
  }
  console.log(config)
  console.log(content)
  const response = await axios.post(`${baseUrl}/api/address`, content, config)
  console.log(response)
  return response.data
}

const updateAddress = async (id, content) => {
  const config = {
    headers: { Authorization: token },
  }
  
  console.log(id)
  console.log("acasito noma")
  console.log(config)


  const response = await axios.put(`${baseUrl}/api/address/${id}`, content, config)
  console.log(response)
  console.log("entro a este response del addresito")
  return response.data
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
  decreaseQuantity,
  updatingUser,
  getAllList,
  addToList,
  removeFavorite,
  login,
  getAllWishList,
  getEntryNoty,
  setNotifications,
  getUniqueNoti,
  deleteUniqueNoti,
  updateCart,
  cleaningProducts,
  cancelito,
  setDefaultAddress,
  removeAddress,
  addAddress,
  updateAddress,
  changePassword
}

export default productService