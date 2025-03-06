import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async Thunk: Fetch Fees Records
export const fetchFeesRecords = createAsyncThunk(
  "fees/fetchFeesRecords",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://schoolmanagement-backend-le5k.onrender.com/api/fees",
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async Thunk: Add a New Fees Record
export const addFeesRecord = createAsyncThunk(
  "fees/addFeesRecord",
  async (newRecord, { rejectWithValue }) => {
  console.log("newRecord", newRecord);
    try {
      const response = await axios.post(
        "https://schoolmanagement-backend-le5k.onrender.com/api/fees",
        newRecord,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async Thunk: Edit an Existing Fees Record
export const editFeesRecord = createAsyncThunk(
  "fees/editFeesRecord",
  async ({ id, updatedData }, { rejectWithValue }) => {

    
    try {
      const response = await axios.put(
        `https://schoolmanagement-backend-le5k.onrender.com/api/fees/${id}`,
        updatedData,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async Thunk: Delete a Fees Record
export const deleteFeesRecord = createAsyncThunk(
  "fees/deleteFeesRecord",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(
        `https://schoolmanagement-backend-le5k.onrender.com/api/fees/${id}`,
        { withCredentials: true }
      );
      return id; // Return the ID to filter it out in the state
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create the Fees Slice
const feesSlice = createSlice({
  name: "fees",
  initialState: {
    feesRecords: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Fees Records
      .addCase(fetchFeesRecords.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeesRecords.fulfilled, (state, action) => {
        state.loading = false;
        state.feesRecords = action.payload;
      })
      .addCase(fetchFeesRecords.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add Fees Record
      .addCase(addFeesRecord.pending, (state) => {
        state.loading = true;
      })
      .addCase(addFeesRecord.fulfilled, (state, action) => {
        state.loading = false;
        state.feesRecords.fees.push(action.payload);
      })
      .addCase(addFeesRecord.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Edit Fees Record
      .addCase(editFeesRecord.pending, (state) => {
        state.loading = true;
      })
      .addCase(editFeesRecord.fulfilled, (state, action) => {
        state.loading = false;
      
        if (!Array.isArray(state.feesRecords)) {
          console.error("feesRecords is not an array:", state.feesRecords);
          return;
        }
      
        const index = state.feesRecords.findIndex(
          (record) => record._id === action.payload._id
        );
      
        if (index !== -1) {
          state.feesRecords[index] = action.payload;
        }
      })      
      .addCase(editFeesRecord.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Fees Record
      .addCase(deleteFeesRecord.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteFeesRecord.fulfilled, (state, action) => {
        state.loading = false;
      
        // Filter out the deleted record from the state
        state.feesRecords = state.feesRecords.filter(
          (record) => record._id !== action.payload.id
        );
      
        console.log("Updated fees records:", state.feesRecords); // Optional: Debug log
      })
      .addCase(deleteFeesRecord.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default feesSlice.reducer;
