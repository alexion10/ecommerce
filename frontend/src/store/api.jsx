import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const usersApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/api',
    prepareHeaders: (headers) =>{
      const token = localStorage.getItem('token');
      if(token){
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    }
  }),
  tagTypes: ['Products', 'Favorite', 'Cart'],
  endpoints: (builder) => ({
    users: builder.query({
      query: () => '/products',
      providesTags: ['Products']
    }),
    addProducts: builder.mutation({
        query: (product) => ({
            url:'/products',
            method: 'POST',
            body: product
        }),
        invalidatesTags: ['Products']
    }),
    deleteProducts: builder.mutation({
      query: ({ id }) => ({
          url:`/products/${id}`,
          method: 'DELETE',
          body: id
      }),
      invalidatesTags: ['Products']
    }),
    updateProducts: builder.mutation({
      query: ({ productCode, product }) => ({
          url:`/products/${productCode}`,
          method: 'PATCH',
          body: product
      }),
      invalidatesTags: ['Products']
    }),
    userRole: builder.query({
      query: (email) => `/users`,
    }),   
    updateUserRole: builder.mutation({
      query: ({ role }) => ({
          url:`/role`,
          method: 'PATCH',
          body: role
      })
    }),
    favorites: builder.query({
      query: () => `/favorite`,
      providesTags: ['Favorites']
    }),    
    createFaoriteList: builder.mutation({
      query: (email) => ({
          url:'/favorite',
          method: 'POST',
          body: email
      }),
    }),
    updateFavoriteList: builder.mutation({
      query: ({product}) => ({
          url:`/favorite`,
          method: 'PATCH',
          body: product
      }),
      invalidatesTags: ['Favorites']
    }),
    cart: builder.query({
      query: () => `/cart`,
      providesTags: ['Cart']
    }),
    createCartList: builder.mutation({
      query: (email) => ({
          url:'/cart',
          method: 'POST',
          body: email
      }),
    }),
    updateCartList: builder.mutation({
      query: ({productAndAction}) => ({
          url:`/cart`,
          method: 'PATCH',
          body: productAndAction
      }),
      invalidatesTags: ['Cart']
    }),
  })
})

export const { 
  useUsersQuery,
  useAddProductsMutation,
  useDeleteProductsMutation, 
  useUpdateProductsMutation, 
  useUserRoleQuery,
  useUpdateUserRoleMutation,
  useFavoritesQuery,
  useCreateFaoriteListMutation,
  useUpdateFavoriteListMutation,
  useCartQuery,
  useCreateCartListMutation,
  useUpdateCartListMutation
} = usersApi;
