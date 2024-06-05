import { createSlice } from "@reduxjs/toolkit";
import productService from "../services/product";
import userService from "../services/user";

export const initialState = {
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem
        ('userInfo')) : null
}
console.log(initialState)
// const ids = initialState.userInfo.productsOnCart.map(pro => pro.id)
// console.log(ids)
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            console.log(action)
            state.userInfo = action.payload
            console.log(state.userInfo)
            localStorage.setItem('userInfo', JSON.stringify(action.payload))
            if(state.userInfo){
              console.log("entro al userinfo")
              //productService.setToken(state.userInfo.token); // Establece el token aquí
              localStorage.setItem('userInfo', JSON.stringify(state.userInfo));
            }
            //localStorage.setItem('userInfo', JSON.stringify(state.userInfo));
        },
        logout: (state, action) => {
            state.userInfo = null;
            localStorage.removeItem('userInfo')
        },
        addToCart: (state, action) => {
          //console.log("hola")
          const existingItemIndex = state.userInfo.productsOnCart.findIndex(item => item.id === action.payload.id)
          //console.log(action)
          //console.log(existingItemIndex)
            
          if(existingItemIndex >= 0){
            //console.log("entra al item existente")
            state.userInfo.productsOnCart[existingItemIndex].quantity += 1;
            localStorage.setItem('userInfo', JSON.stringify(state.userInfo));  
          }else{
            //console.log(action.payload)
            state.userInfo.productsOnCart.push(action.payload)
            //console.log("no entra al item existente")
            localStorage.setItem('userInfo', JSON.stringify(state.userInfo));
          }   
        },
        addToCartt: (state, action) => {
          //console.log("hola")
          const existingItemIndex = state.userInfo.productsOnCart.findIndex(item => item.id === action.payload.id)
          //console.log(action)
          //console.log(existingItemIndex)
          //console.log(item)
            
          if(existingItemIndex >= 0){
            //console.log("entra al item existente")
            state.userInfo.productsOnCart[existingItemIndex].quantity += action.payload.quantity;
            localStorage.setItem('userInfo', JSON.stringify(state.userInfo));  
          }else{
            //console.log(action.payload)
            state.userInfo.productsOnCart.push(action.payload)
            //console.log("no entra al item existente")
            localStorage.setItem('userInfo', JSON.stringify(state.userInfo));
          }   
        },
        appendProduct(state, action) {
            //console.log(state)
            //console.log(action)
            //console.log(JSON.parse(JSON.stringify(state)))
            state.userInfo.products.push(action.payload)
            localStorage.setItem('userInfo', JSON.stringify(state.userInfo));
            //console.log(state)
        },
        increaseItem: (state, action) => {
            const item = state.userInfo.productsOnCart.find(item => item.id === action.payload.id)
            //console.log(action)
            if(item){
              item.quantity += 1
              localStorage.setItem('userInfo', JSON.stringify(state.userInfo));
            }
          },
        decreaseItem: (state, action) => {
            const item = state.userInfo.productsOnCart.find(item => item.id === action.payload.id)
      
            if(item){
              item.quantity -= 1
              localStorage.setItem('userInfo', JSON.stringify(state.userInfo));
            }
        },
        resetCart: (state, action) => {
          //console.log("hola estoy en el reset")
          state.userInfo.productsOnCart = []
        },
        removeSingleProduct: (state, action) => {
          //console.log("hola estoy en el removeSingleProduct gaaa")
          //console.log(action)
          state.userInfo.productsOnCart = state.userInfo.productsOnCart.filter(item => item.id !== action.payload)
        },
        setNotes: (state, action) => {
          //console.log(state)
          //console.log("between")
          console.log(action)
          console.log(state.userInfo.wishlist.length)
          if(!state.userInfo.wishlist){
            state.userInfo.wishlist = []
          }  
          state.userInfo.wishlist.push(action.payload)
          localStorage.setItem('userInfo', JSON.stringify(state.userInfo))
        },
        addToListUser: (state, action) => {
          console.log(action)
          console.log(action.payload)
          console.log("gaaa")
          if(action.payload.list){
            const item = state.userInfo.wishlist.find(item => item._id === action.payload.list._id)
            console.log(item)
            if(item){
              item.products.push(action.payload.product)
              localStorage.setItem('userInfo', JSON.stringify(state.userInfo))
            }
          }else{
            console.log(action.payload.message)
          }
          // const item = state.userInfo.wishlist.find(item => item._id === action.payload.list._id)
          // console.log(item)
          // if(item){
          //   item.products.push(action.payload.product)
          //   localStorage.setItem('userInfo', JSON.stringify(state.userInfo))
          // }else{
          //   console.log("item no existe")
          // }
          //state.userInfo.wishlist[0].products = state.userInfo.wishlist[0].products.push(action.payload)
        },
        removeFavoriteProduct: (state, action) => {
          console.log("entra al authslice aqui p")
          console.log(action)
          const item = state.userInfo.wishlist.find(item => item._id === action.payload.wishlist)
          console.log(item)
          if(item){
            item.products = item.products.filter(item => item._id !== action.payload.product._id)
            localStorage.setItem('userInfo', JSON.stringify(state.userInfo))
          }else{
            console.log("producto no estaba en favoritos")
          }
        }
    }
})

export const createProduct = content => {
    return async dispatch => {
      const newProduct = await productService.create(content)
      dispatch(appendProduct(newProduct))
    }
  }

export const createProductCart = (content) => {
    return async dispatch => {
      //console.log("entro aca en el createProductCart")
      //console.log("este es el id del producto: " + productid)
      //console.log(content)
      //const ids = initialState.userInfo.productsOnCart.find(pro => pro.id === productid)
      const newProduct = await productService.productsOnCart(content)
      //console.log(newProduct)
      dispatch(addToCart(newProduct))
      //dispatch(addToCart(newProduct))
    }
}

export const updateQuantity = (id, quantity) => {
  //console.log("aca va el productid")
  //console.log(productid)
  //console.log(quantity)
  //console.log(quantity)
  return async dispatch => {
    //const ids = initialState.userInfo.productsOnCart.find(pro => pro.id === productid)
    //console.log(ids)
    //console.log(id)
    const newQuantity = await productService.updateQuantityProduct(id, quantity)
    //console.log(newQuantity)
    dispatch(addToCart(id, newQuantity))
    
  }
}

export const updateQuantityy = (content) => {
  //console.log("aca va el productid")
  //console.log(productid)
  //console.log(content)
  //console.log(quantity)
  return async dispatch => {
    //const ids = initialState.userInfo.productsOnCart.find(pro => pro.id === productid)
    //console.log(ids)
    //console.log(content.id)
    const newQuantity = await productService.updateQuantityProductt(content.id, content)
    //console.log(newQuantity)
    dispatch(addToCartt(newQuantity))
  }
}

export const deletingCart = (user) => {
  //console.log("aca esta desde el authSlice")
  //console.log(user)
  return async dispatch => {
    //console.log("aca entra")
    const deleting = await productService.deleteCart(user)
    //console.log(deleting)
    dispatch(resetCart(deleting))
  }
}

export const removeSingleProductUser = (user) => {
  //console.log("aca esta desde el authSlice")
  //console.log(user)
  return async dispatch => {
    //console.log("aca entra")
    const deleting = await productService.removeSingleProduct(user)
    //console.log(deleting)
    dispatch(removeSingleProduct(deleting))
  }
}

export const increaseQuantityProduct = (content) => {
  //console.log("aca va el productid")
  //console.log(productid)
  //console.log(content)
  //console.log(quantity)
  return async dispatch => {
    //const ids = initialState.userInfo.productsOnCart.find(pro => pro.id === productid)
    //console.log(ids)
    //console.log(content.id)
    const newQuantity = await productService.increaseQuantity(content.id, content)
    //console.log(newQuantity)
    dispatch(increaseItem(newQuantity))
  }
}

export const decreaseQuantityProduct = (content) => {
  //console.log("aca va el productid")
  //console.log(productid)
  //console.log(content)
  //console.log(quantity)
  return async dispatch => {
    //const ids = initialState.userInfo.productsOnCart.find(pro => pro.id === productid)
    //console.log(ids)
    //console.log(content.id)
    const newQuantity = await productService.decreaseQuantity(content.id, content)
    //console.log(newQuantity)
    dispatch(decreaseItem(newQuantity))
  }
}

export const updatingUserInfo = (content) => {
  return async dispatch => {
    console.log(content)
    const newUserInfo = await productService.updatingUser(content)
    dispatch(setCredentials(newUserInfo))
  }
}

export const initializeUsers = () => {
  return async dispatch => {
    const anecdotes = await productService.getAllList()
    dispatch(setNotes(anecdotes))
  }
}

export const addingToList = (id, content) => {
  return async dispatch => {
    console.log(content)
    console.log("aca arriba esta el content de addingtolist")
    console.log(id)
    const anecdotes = await productService.addToList(id, content)
    dispatch(addToListUser(anecdotes))
  }
}

export const removeFavorite = (id, user) => {
  console.log("aca esta desde el authSlice")
  console.log(id)
  console.log(user)
  return async dispatch => {
    //console.log("aca entra")
    const deleting = await productService.removeFavorite(id, user)
    //console.log(deleting)
    dispatch(removeFavoriteProduct(deleting))
  }
}

export const loginUser = (content) => {
  return async dispatch => {
    console.log(content)
    const anecdotes = await productService.login(content)
    dispatch(setCredentials(anecdotes))
  }
}

export const { 
  appendProduct, 
  addToCart, 
  addToCartt, 
  setCredentials, 
  logout, 
  increaseItem, 
  decreaseItem, 
  resetCart,
  removeSingleProduct,
  setNotes,
  addToListUser,
  removeFavoriteProduct
} = authSlice.actions

export default authSlice.reducer        