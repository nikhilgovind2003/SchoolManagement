import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunks for fetching, adding, editing, and deleting library records
export const fetchLibraryRecords = createAsyncThunk(
  "library/fetchLibraryRecords",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/library`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching records");
    }
  }
);

export const addLibraryRecord = createAsyncThunk(
  "library/addLibraryRecord",
  async (record, { rejectWithValue }) => {
    
    try {
      const response = await axios.post(
        "http://localhost:5000/api/library",
        record,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error adding record");
    }
  }
);

export const editLibraryRecord = createAsyncThunk(
  "library/editLibraryRecord",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/library/${id}`, // Correct endpoint
        updatedData, // Send only the updated data
        { withCredentials: true }
      );

      return response.data; // Return the response data on success
    } catch (error) {
      console.error("Error editing record:", error);
      // Handle both network and server errors
      const errorMessage =
        error.response?.data?.message || "Error editing record";
      return rejectWithValue(errorMessage);
    }
  }
);

export const deleteLibraryRecord = createAsyncThunk(
  "library/deleteLibraryRecord",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:5000/api/library/${id}`, {
        withCredentials: true,
      });
      return id; // Return the ID to be used for removing the record from the state
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error deleting record");
    }
  }
);

// Initial state
const initialState = {
  records: [],
  status: "idle",
  error: null,
};

const librarySlice = createSlice({
  name: "library",
  initialState,
  extraReducers: (builder) => {
    builder
      // Fetch records
      .addCase(fetchLibraryRecords.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLibraryRecords.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.records = action.payload;
      })
      .addCase(fetchLibraryRecords.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Add new record
      .addCase(addLibraryRecord.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addLibraryRecord.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.records.books.push(action.payload);
      })
      .addCase(addLibraryRecord.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Edit a record
      .addCase(editLibraryRecord.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editLibraryRecord.fulfilled, (state, action) => {
        console.log("Payload:", action.payload); // Debugging line

        state.status = "succeeded";
        const updatedRecord = action.payload;

        const index = state.records.books.findIndex(
          (record) => record._id === updatedRecord._id
        );

        if (index !== -1) {
          state.records[index] = updatedRecord; // Update the record in the array
        }
      })
      .addCase(editLibraryRecord.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Delete a record
      .addCase(deleteLibraryRecord.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteLibraryRecord.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.records = state.records.filter(
          (record) => record._id !== action.payload
        ); // Remove the deleted record from the state
      })
      .addCase(deleteLibraryRecord.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default librarySlice.reducer;
