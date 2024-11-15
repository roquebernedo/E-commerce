import { combineReducers, configureStore } from "@reduxjs/toolkit"
import authReducer from './slices/authSlice'
import { apiSlice } from "./slices/apiSlice"
import cartReducer from "./redux/cartReducer"

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
  import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}

//const persistedReducer = persistReducer(persistConfig, cartReducer)
const persistedReducer = persistReducer(persistConfig, combineReducers({
  auth: authReducer, 
  [apiSlice.reducerPath]: apiSlice.reducer,
  cart: cartReducer
}))

export const store = configureStore({
  reducer: persistedReducer,
  middlewaree: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: true,
})
// export const store = configureStore({
//     reducer: {
//         auth: authReducer, 
//         [apiSlice.reducerPath]: apiSlice.reducer,
//         cart: cartReducer
//     },
//     //middlewaree: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
//     // middleware: (getDefaultMiddleware) =>
//     // getDefaultMiddleware({
//     //   serializableCheck: {
//     //     ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//     //   },
//     // }),
//     // devTools: true,
    
// })

export let persistor = persistStore(store)

export default store





