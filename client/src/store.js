import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { apiSlice } from "./slices/apiSlice";

import storage from "redux-persist/lib/storage"; // Almacenamiento local
import { persistReducer, persistStore } from "redux-persist";

// Configuración del persist
const persistConfig = {
  key: "root", // Clave base para el almacenamiento
  storage,     // Define el tipo de almacenamiento (localStorage)
};

// Combinar reducers
const rootReducer = combineReducers({
  authReducer: authReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

// Reducer persistente
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configurar el store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Desactiva chequeo de serialización para persistencia
    }).concat(apiSlice.middleware),
});

// Persistor para manejar el almacenamiento
export const persistor = persistStore(store);

export default store;
