import { createSlice } from '@reduxjs/toolkit'
import productService from '../services/product'

//const storedUserInfo = localStorage.getItem('userInfo');
//const initialUserInfo = storedUserInfo ? JSON.parse(storedUserInfo).productsOnCart : [];
//const initialPro = storedUserInfo ? JSON.parse(storedUserInfo).products : [];
// const savedCart = JSON.parse(localStorage.getItem('cart'));
const initialState = {
  products: [],
  //userInfo: initialUserInfo
}
// authR
//console.log(initialState)
//console.log(initialState.userInfo)
//console.log(JSON.parse(localStorage.getItem('userInfo')).productsOnCart)
//const { userInfo } = useSelector((state) => state.auth)

//NO OLVIDAR CAMIAR LOS STATE.PRODUCTS POR STATE.USERINFO O LOS QUE VENGAN
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    appendProduct(state, action) {
      console.log(state)
      console.log(action)
      
      console.log(JSON.parse(JSON.stringify(state)))
      state.products.push(action.payload)
      console.log(state)
    },
    addToCart: (state, action) => {
      const item = state.products.find(item => item.id === action.payload.id)
      
      if(item){
        item.quantity += action.payload.quantity
      }else{
        state.products.push(action.payload)
      }
      
    },
    // addToCart: (state, action) => {
    //   const item = state.userInfo.find(item => item.id === action.payload.id)
      
    //   if(item){
    //     item.quantity += action.payload.quantity
    //   }else{
    //     state.userInfo.push(action.payload)
    //   }
    // },
    increaseItem: (state, action) => {
      const item = state.products.find(item => item.id === action.payload.id)
      console.log(action.payload)
      if(item){
        item.quantity += 1
      }
    },
    decreaseItem: (state, action) => {
      const item = state.products.find(item => item.id === action.payload.id)

      if(item){
        item.quantity -= 1
      }
    },
    removeItem: (state, action) => {
      state.products = state.products.filter(item => item.id !== action.payload)
    },
    resetCart: (state) => {
      state.products = []
    },
  },
})

export const createProduct = content => {
  return async dispatch => {
    const newProduct = await productService.create(content)
    dispatch(appendProduct(newProduct))
  }
}

// export const createProductCart = content => {
//   return async dispatch => {
//     const newProduct = await productService.create(content)
//     dispatch(addToCart(newProduct))
//   }
// }

export const createProductCart = (id, content) => {
  console.log("este es el id: " + id)
  return async dispatch => {
    const newProduct = await productService.productsOnCart(id, content)
    console.log(newProduct)
    dispatch(addToCart(newProduct))
  }
}

export const { appendProduct, addToCart, removeItem, resetCart, decreaseItem, increaseItem } = cartSlice.actions

export default cartSlice.reducer