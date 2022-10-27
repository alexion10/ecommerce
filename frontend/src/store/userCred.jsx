import { createSlice } from "@reduxjs/toolkit";

export const user = createSlice({
    name: 'userCredentials',
    initialState: {
        userInfo: {
            firstName: '',    
            lastName: '',
            email: '',
            role: ''
        },
    },
    reducers: {
        userCredentials: (state, action) => { 
            state.userInfo = JSON.parse(localStorage.getItem('userInfo'));
        }
    }
})

export const {userCredentials} = user.actions;

export default user.reducer;