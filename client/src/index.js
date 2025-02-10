import React from 'react';
import ReactDOM from 'react-dom/client';
import store, { persistor } from './store.js';
import { Provider } from 'react-redux';
import App from './App';
//import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter as Router } from "react-router-dom"
import { PersistGate } from 'redux-persist/integration/react';

// console.log("gaa")
// axios.interceptors.request.use(function (config){
//   console.log("entro al gaaaa")
//   if (config.url !== "https://gozus.com"){
//     config.baseURL = "http://localhost:8000";
//     let token = localStorage.getItem("loggedTokenEcommerce");
//     console.log(token)
//     token &&
//         (config.headers.Authorization =
//           config.headers.Authorization || `Bearer ${token}`)
//   }
// })

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

