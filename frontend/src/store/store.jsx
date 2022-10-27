import {configureStore} from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query'
import { usersApi, usersTest } from './api';
import user  from './userCred';

export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    user
  },
  
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(usersApi.middleware),
    
});


setupListeners(store.dispatch)