import {configureStore} from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query'
import { usersApi } from './api';
import userInfo from './userInfo';

export const store = configureStore({
  reducer: {
    userInfo,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(usersApi.middleware),
    
});


setupListeners(store.dispatch)