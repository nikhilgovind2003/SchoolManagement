import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from './features/auth/authSlice.js';
import studentReducer from './features/student/studentSlice'; // Import the student slice

const store = configureStore({
    reducer: {
        userAuth: AuthReducer,
        students: studentReducer
    },
});


export default store;
