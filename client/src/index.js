import React from 'react';
import ReactDOM from 'react-dom/client';
import store, { persistor } from './store.js';
import { Provider } from 'react-redux';
import App from './App';
//import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter as Router } from "react-router-dom"
import { PersistGate } from 'redux-persist/integration/react';
import axios from "axios";

//https://e-commerce-f1fr.onrender.com
//http://localhost:8000
console.log("gaa")
axios.interceptors.request.use(function (config){
  console.log(config)
  console.log(config.url)
  console.log("entro al gaaaa")
  if (!config.url.includes("cloudinary.com")){
    console.log("entro hasta aca")
    config.baseURL = "https://e-commerce-f1fr.onrender.com";
    console.log(config.baseURL)
    let token = localStorage.getItem("loggedTokenEcommerce"); 
    console.log(token)
    token &&
        (config.headers.Authorization =
          config.headers.Authorization || `Bearer ${token}`)
  }
  console.log("llego todo a config")
  return config
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <App />
        </Router>
      </PersistGate>
    </Provider>
);

