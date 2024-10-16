import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: sessionStorage.getItem('isAuthenticated') === 'true', // Ensure it's a boolean
    userInfo: sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : null, // Fixed key
    token: sessionStorage.getItem('token'),
    tokenExpiry: sessionStorage.getItem('tokenExpiry')
};


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signup: (state, action) => {
            const { userInfo, token, tokenExpiry } = action.payload; // Removed isAuthenticated
            sessionStorage.setItem('isAuthenticated', 'true'); // Set as a string "true"
            sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('tokenExpiry', tokenExpiry);
            state.isAuthenticated = true;
            state.userInfo = userInfo;
            state.token = token;
            state.tokenExpiry = tokenExpiry;
        },
        login: (state, action) => {
            const { userInfo, token, tokenExpiry } = action.payload; // Removed isAuthenticated
            sessionStorage.setItem('isAuthenticated', 'true'); // Set as a string "true"
            sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('tokenExpiry', tokenExpiry);
            state.isAuthenticated = true;
            state.userInfo = userInfo;
            state.token = token;
            state.tokenExpiry = tokenExpiry;
        },
        logout: (state) => {
            sessionStorage.removeItem('isAuthenticated');
            sessionStorage.removeItem('userInfo');
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('tokenExpiry');
            state.isAuthenticated = false;
            state.userInfo = null;
            state.token = null;
            state.tokenExpiry = null;
            console.log("Logout success");
        }
    }
    
});

export const { signup, login, logout } = authSlice.actions;

export default authSlice.reducer;
