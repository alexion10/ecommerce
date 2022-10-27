import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const usersApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/api'
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
    logIn: builder.mutation({
      query: (user) => ({
          url:'/auth',
          method: 'POST',
          body: user
      }),
    }),
    signUp: builder.mutation({
      query: (user) => ({
          url:'/users',
          method: 'POST',
          body: user
      }),
    }),
    updateUserRole: builder.mutation({
      query: ({ email, role }) => ({
          url:`/role/${email}`,
          method: 'PATCH',
          body: role
      })
    }),
    favorites: builder.query({
      query: (email) => `/favorite/${email}`,
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
      query: ({email, product}) => ({
          url:`/favorite/${email}`,
          method: 'PATCH',
          body: product
      }),
      invalidatesTags: ['Favorites']
    }),
    cart: builder.query({
      query: (email) => `/cart/${email}`,
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
      query: ({email, productAndAction}) => ({
          url:`/cart/${email}`,
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
  useLogInMutation, 
  useSignUpMutation,
  useUpdateUserRoleMutation,
  useFavoritesQuery,
  useCreateFaoriteListMutation,
  useUpdateFavoriteListMutation,
  useCartQuery,
  useCreateCartListMutation,
  useUpdateCartListMutation
} = usersApi;
