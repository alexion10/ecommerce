import { createSlice } from "@reduxjs/toolkit";

const userInfo = createSlice({
    name: 'user',
    initialState: {
        role: '',  
    },
    reducers: {
        getRole: (state, action) => {            
            state.role = action.payload;
        }
    }
})

export const {getRole} = userInfo.actions;

export default userInfo.reducer;