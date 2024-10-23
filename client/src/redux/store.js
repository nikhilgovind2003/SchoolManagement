import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from './features/auth/authSlice.js';
import studentReducer from './features/student/studentSlice'; // Import the student slice
import libraryReducer from './features/library/LibrarySlice';
import staffSlice from './features/staff/staffSlice';
import feesSlice from './features/fees/feesSlice';

const store = configureStore({
    reducer: {
        userAuth: AuthReducer,
        students: studentReducer,
        library: libraryReducer,
        staff: staffSlice,
        fees: feesSlice
    },
});


export default store;
