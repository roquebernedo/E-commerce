import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({ baseUrl: 'http://localhost:8000' }) //'https://ecommerce-moez.onrender.com'
//http://localhost:8000
export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['User'],
    endpoints: (builder) => ({})
})

// const baseQuery = fetchBaseQuery({
//     baseUrl: 'https://ecommerce-moez.onrender.com',
//     prepareHeaders: (headers, { getState }) => {
//       headers.set('Content-Type', 'application/json');
//       // Añade aquí cualquier otro header que necesites
//       return headers;
//     }
// });

// export const apiSlice = createApi({
//     baseQuery,
//     tagTypes: ['User'],
//     endpoints: (builder) => ({})
// })