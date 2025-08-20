import { createSlice } from "@reduxjs/toolkit";
import productService from "../services/product";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
      userInfo: null,
      products: []
    },
    reducers: {
        setCredentials: (state, action) => {
            console.log(action)
            state.userInfo = action.payload
            console.log(state.userInfo)
            
            
            // localStorage.setItem('userInfo', JSON.stringify(action.payload))
            // if(state.userInfo){
            //   console.log("entro al userinfo")
            //   //productService.setToken(state.userInfo.token); // Establece el token aquí
            //   localStorage.setItem('userInfo', JSON.stringify(state.userInfo));
            // }
            //localStorage.setItem('userInfo', JSON.stringify(state.userInfo));
        },
        logout: (state, action) => {
            state.userInfo = null;
            
        },
        addToCart: (state, action) => {
          //console.log("hola")
          const existingItemIndex = state.userInfo.productsOnCart.findIndex(item => item.id === action.payload.id)
          //console.log(action)
          //console.log(existingItemIndex)
            
          if(existingItemIndex >= 0){
            //console.log("entra al item existente")
            state.userInfo.productsOnCart[existingItemIndex].quantity += 1;
          
          }else{
            //console.log(action.payload)
            state.userInfo.productsOnCart.push(action.payload)
            //console.log("no entra al item existente")
           
          }   
        },
        addToCartt: (state, action) => {
          console.log("hola")
          const existingItemIndex = state.userInfo.productsOnCart.findIndex(item => item.id === action.payload.id)
          console.log(action)
          //console.log(existingItemIndex)
          //console.log(item)
            
          if(existingItemIndex >= 0){
            //console.log("entra al item existente")
            state.userInfo.productsOnCart[existingItemIndex].quantity += action.payload.quantity;
          }else{
            //console.log(action.payload)
            state.userInfo.productsOnCart.push(action.payload)
            //console.log("no entra al item existente")
          }   
        },
        appendProduct(state, action) {
            //console.log(state)
            //console.log(action)
            //console.log(JSON.parse(JSON.stringify(state)))
            state.userInfo.products.push(action.payload)
            //console.log(state)
        },
        increaseItem: (state, action) => {
            const item = state.userInfo.productsOnCart.find(item => item.id === action.payload.id)
            //console.log(action)
            if(item){
              item.quantity += 1
            }
          },
        decreaseItem: (state, action) => {
            const item = state.userInfo.productsOnCart.find(item => item.id === action.payload.id)
      
            if(item){
              item.quantity -= 1
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
          console.log(action.payload)
          state.userInfo.wishlist.push(action.payload)
        },
        addToListUser: (state, action) => {
          console.log(action)
          console.log(action.payload)
          console.log("gaaa")
          if(action.payload.list){
            const item = state.userInfo.wishlist.find(item => item._id === action.payload.list._id)
            console.log(item)
            if(item){
              console.log(action.payload)
              item.products.push(action.payload.product)
            }else{
              console.log("no existe el wishlist")
              console.log(action.payload)
              if(!state.userInfo.wishlist){
                state.userInfo.wishlist = []
              } 
              state.userInfo.wishlist.push(action.payload.list)
            }
          }else{
            console.log(action.payload.message)
          }
        },

        removeFavoriteProduct: (state, action) => {
          console.log("entra al authslice aqui p")
          console.log(action)
          const item = state.userInfo.wishlist.find(item => item._id === action.payload.wishlist)
          console.log(item)
          if(item){
            item.products = item.products.filter(item => item._id !== action.payload.product._id)
          }else{
            console.log("producto no estaba en favoritos")
          }
        },

        setEntryNoty: (state, action) => {
          console.log(action)
          console.log(action.payload)
          const item = state.userInfo.notifications.find(item => item._id === action.payload._id)
          console.log("acaba de entrar")
          if(!item){
            console.log("entro al item")
            if(!state.userInfo.notifications){
              console.log("entra aca")
              state.userInfo.notifications = []
              
            }
            console.log("haciendo el push")
            state.userInfo.notifications = [action.payload]
          }
        },

        getOnlyNoti: (state, action) => {
          console.log(action)
          console.log(action.payload)
          // return (state = {
          //   ...state.userInfo.notifications
          // })
        },

        removeNoti: (state, action) => {
          console.log(action)
          console.log(action.payload)
          const item = state.userInfo.notifications.find(item => item._id === action.payload.notification._id)
          console.log("ya entro ya")
          if(item){
            console.log("entro mrd")
            item.notif_list = action.payload.notif_list
          }
        },
       
        updatingUserCart: (state, action) => {
          console.log("entra al redux a updatingUserCart")
          console.log(action)
          console.log(action.payload)
          console.log(action.payload.notifications)
          //state.products = action.payload
          //const item = state.userInfo.notifications.find(item => item._id === action.payload.notifications._id)
          //console.log(item)
          if(state.userInfo.productsOnCart){
            state.userInfo.productsOnCart = []
            if(action.payload.orders){
              state.userInfo.orders.push(action.payload.orders) 
            }
            if(action.payload.notifications){
              state.userInfo.notifications = [action.payload.notifications]   
            }
            // state.userInfo.orders = [action.payload.orders]
            // state.userInfo.notifications = [action.payload.notifications]   
            console.log("entro creo")
            //state.userInfo.orders.push(action.payload.orders)
            console.log("entra repetidamente")
          }
        },

        updateProductsOnCart: (state, action) => {
          console.log("esta en el redoxon")
        },

        clinandoProducts: (state, action) => {
          console.log("al fin entro en cancelito")
        },

        gettingAllProducts: (state, action) => {
          //console.log(action)
          //console.log("hola")
          state.products = action.payload
          //console.log(state.userInfo)
          //console.log(state.products)
          
        },

        setAddressSlice: (state, action) => {
          console.log(action)
          console.log("holiwi gasito")
          const foundDefault = state.userInfo.address.address.find(item => item.isDefault === true)
          console.log(foundDefault)
          
          const foundNewDefault = state.userInfo.address.address.find(item => item._id === action.payload.address._id)
          console.log(foundNewDefault)
          if(foundNewDefault.isDefault === false){
            console.log("entro aca")
            foundDefault.isDefault = false
            foundNewDefault.isDefault = true
          }else{
            console.log("no hara nadin")
          }
        },

        setRemoveAddress: (state, action) => {
          console.log("entro al removin")
          console.log(action)
          state.userInfo.addresses.address = action.payload.address
          if(!state.userInfo.addresses.address.some(e => e.isDefault) && state.userInfo.addresses.address.length > 0){
            state.userInfo.addresses.address[0].isDefault = true
          }
        },

        addAddress: (state, action) => {
          console.log("aca esta el agregado")
          console.log(action)
          if(state.userInfo.addresses){
            console.log("entro al address existente")
            if(state.userInfo.addresses.address.length > 0){
              console.log("entro al mayor a 0")
              state.userInfo.addresses.address = action.payload.addresses.address
            }else{
              console.log("entro al menor a 0")
              state.userInfo.addresses.address = action.payload.addresses.address
            }
          }else{
            console.log("entro al que no existe")
            state.userInfo.addresses = action.payload.addresses
          }
        },

        putAddress: (state, action) => {
          console.log("aca es el put address")
          console.log(action)
          const foundAddress = state.userInfo.address.address.find(item => item._id === action.payload.address._id)
          if(foundAddress){
            console.log("entro aca en el found add")
            foundAddress.street_name = action.payload.address.street_name;
            foundAddress.street_number = action.payload.address.street_number;
            foundAddress.city = action.payload.address.city;
            foundAddress.zip_code = action.payload.address.zip_code;
            foundAddress.state = action.payload.address.state;
          }
        },
        updateInfo: (state, action) => {
          console.log("entro a este update")
          console.log(action)
          if(action.payload.isGoogleUser){
            state.userInfo.firstName = action.payload.userInfoDetailsGoogle.firstName || state.userInfo.firstName
            state.userInfo.username = action.payload.userInfoDetailsGoogle.username || state.userInfo.username
          }else{
            state.userInfo.name = action.payload.name || state.userInfo.name
            state.userInfo.username = action.payload.username || state.userInfo.username
          }
          
        },
        
        emailVerified: (state, action) => {
          console.log("entro en este email verificando")
          console.log(action)
          state.userInfo.emailVerified = true
        },

        setFreeShipping: (state, action) => {
          console.log("entro aca")
          console.log(action)
          //console.log(action.id)
          //console.log(state.userInfo.products.find(item => item._id === action.id))
          const foundFree = state.userInfo.products.find(item => item._id === action.payload.id)
          console.log(foundFree)
          if(!foundFree.freeShipping){
            console.log("Entro aca en el free")
            foundFree.freeShipping = true
          }else{
            foundFree.freeShipping = false
          }
        },
        
        setActivePublication: (state, action) => {
          console.log("aca llego")
          console.log(action)
          const foundActive = state.userInfo.products.find(item => item._id === action.payload.id)
          console.log(foundActive)
          if(!foundActive.active){
            console.log("Entro aca en el free")
            foundActive.active = true
          }else{
            foundActive.active = false
          }
        },

        setAddingDiscountToProduct: (state, action) => {
          console.log("entro al adding")
          console.log(action)
          const foundDiscount = state.userInfo.products.find(item => item._id === action.payload.id)
          console.log(foundDiscount)
          if(foundDiscount.discount){
            console.log("Entro aca en el disc")
            foundDiscount.discount = action.payload.discount
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
    console.log("initilize")
    const anecdotes = await productService.getAllList()
    console.log(anecdotes)
    dispatch(setNotes(anecdotes))
  }
}

export const addingToList = (id, content) => {
  return async dispatch => {
    console.log(content)
    console.log("aca arriba esta el content de addingtolist")
    console.log(id)
    const anecdotes = await productService.addToList(id, content)
    console.log(anecdotes)
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

export const getNotification = () => {
  return async dispatch => {
    const anecdotes = await productService.getEntryNoty()
    dispatch(setEntryNoty(anecdotes))
  }
}

// export const showNotifications = () => {
//   return async dispatch => {
//     const anecdotes = await productService.setNotifications()
//     dispatch(setUserNoti(anecdotes))
//   }
// }

export const getUniqueNotification = (id) => {
  return async dispatch => {
    console.log("aca va el id de unique notifi ", id)
    const anecdotes = await productService.getUniqueNoti(id)
    dispatch(getOnlyNoti(anecdotes))
  }
}

export const removeNotification = (id) => {
  console.log("aca esta desde el authSlice para el removeNoti")
  console.log(id)
 
  return async dispatch => {
    //console.log("aca entra")
    const deleting = await productService.deleteUniqueNoti(id)
    //console.log(deleting)
    dispatch(removeNoti(deleting))
  }
}

export const updatingCart = () => {
  console.log("aca esta el Stripe denuevo")
 
  return async dispatch => {
    try {
      console.log("Intentando actualizar el carrito...");
      const anecdotes = await productService.cleaningProducts();
      console.log("Anecdotes recibidos:", anecdotes);
      dispatch(updatingUserCart(anecdotes));
    } catch (error) {
      console.error("Error al actualizar el carrito:", error);
    }
  };
}

export const cleanCart = () => {
  return async dispatch => {
    try{
      console.log("Intentando actualizar el carrito")
      const anecdotes = await productService.cleaningProducts();
      console.log(anecdotes)
      dispatch(updatingUserCart(anecdotes))
    } catch(error){
      console.error("Error al actualziar el carrito:", error)
    }
  }
}

export const cancelando = () => {
  return async dispatch => {
    try{
      console.log("Intentando actualizar el carrito")
      const anecdotes = await productService.cancelito();
      console.log(anecdotes)
      dispatch(clinandoProducts(anecdotes))
    } catch(error){
      console.error("Error al actualziar el carrito:", error)
    }
  }
}

export const getAllProducts = () => {
  //console.log("getting everything")

  return async dispatch => {
    //console.log("aca esta el getting todo")
    const anecdotes = await productService.getAll()
    dispatch(gettingAllProducts(anecdotes))
  }
}

export const setAddress = (id) => {
  console.log("aquisito es andres")
  console.log(id)
  return async dispatch => {
    console.log("aca esta el addresin pe")
    const anecdotes = await productService.setDefaultAddress(id)
    console.log(anecdotes)
    dispatch(setAddressSlice(anecdotes))
  }
}

export const removeAddress = (id) => {
  console.log("aquisito es andresito removing")
  console.log(id)
  return async dispatch => {
    console.log("aca esta el addresin papeto")
    const anecdotes = await productService.removeAddress(id)
    console.log(anecdotes)
    dispatch(setRemoveAddress(anecdotes))
  }
}

export const addingAddress = (content) => {
  return async dispatch => {
    console.log("aca esta el addresin agregadito")
    console.log(content)
    const anecdotes = await productService.addAddress(content)
    console.log(anecdotes)
    dispatch(addAddress(anecdotes))
  }
}

export const updatingAddress = (id, content) => {
  return async dispatch => {
    console.log("aca esta el addresin agregadito")
    console.log(content)
    const anecdotes = await productService.updateAddress(id, content)
    console.log(anecdotes)
    dispatch(putAddress(anecdotes))
  }
}

export const updatingShipping = (id, content) => {
  return async dispatch => {
    console.log("aca esta el free agregadito")
    console.log(content)
    const anecdotes = await productService.setFreeShipping(id)
    console.log(anecdotes)
    dispatch(setFreeShipping(anecdotes))
  }
}

export const updatingActivePublication = (id, content) => {
  return async dispatch => {
    console.log("aca esta el active agregadito")
    console.log(content)
    const anecdotes = await productService.activePublication(id)
    console.log(anecdotes)
    dispatch(setActivePublication(anecdotes))
  }
}

export const setAddingDiscount = (id, content) => {
  return async dispatch => {
    console.log("aca esta el active agregadito")
    console.log(content)
    const anecdotes = await productService.addingDiscount(id, content)
    console.log(anecdotes)
    dispatch(setAddingDiscountToProduct(anecdotes))
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
  removeFavoriteProduct,
  setEntryNoty,
  getOnlyNoti,
  removeNoti,
  updatingUserCart,
  updateProductsOnCart,
  gettingAllProducts,
  clinandoProducts,
  setAddressSlice,
  setRemoveAddress,
  addAddress,
  putAddress,
  updateInfo,
  emailVerified,
  setFreeShipping,
  setActivePublication,
  setAddingDiscountToProduct
} = authSlice.actions

export default authSlice.reducer        