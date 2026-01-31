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
console.log("gaa")
axios.interceptors.request.use(function (config){
  console.log(config)
  console.log("entro al gaaaa")
  if (config.url !== "https://api.cloudinary.com/v1_1/dmzcu0io9/image/upload"){
    console.log("entro hasta aca")
    config.baseURL = "http://localhost:8000";
    let token = localStorage.getItem("loggedTokenEcommerce");
    console.log(token)
    token &&
        (config.headers.Authorization =
          config.headers.Authorization || `Bearer ${token}`)
  }

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

