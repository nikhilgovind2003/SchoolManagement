import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunks for fetching, adding, editing, and deleting staff
export const fetchStaff = createAsyncThunk("staff/fetchStaff", async () => {
  const response = await axios.get(`https://schoolmanagement-backend-le5k.onrender.com/api/staff`, {
    withCredentials: true,
  });
  return response.data; // Expecting an array of staff objects
});

export const addStaff = createAsyncThunk("staff/addStaff", async (staff) => {
  const response = await axios.post("https://schoolmanagement-backend-le5k.onrender.com/api/staff", staff, {
    withCredentials: true,
  });
  return response.data; // Expecting the newly created staff object
});

export const editStaff = createAsyncThunk(
  "staff/editStaff",
  async ({ id, updatedData }, { rejectWithValue }) => {
    
    try {
      const response = await axios.put(
        `https://schoolmanagement-backend-le5k.onrender.com/api/staff/${id}`, // Use _id for update
        updatedData,
        { withCredentials: true }
      );
      return response.data; // Expecting the updated staff object
    }  catch (error) {
      return rejectWithValue(error.response.data);
    } 
  }
);

export const deleteStaff = createAsyncThunk(
  "staff/deleteStaff",
  async (_id) => {
    await axios.delete(`https://schoolmanagement-backend-le5k.onrender.com/api/staff/${_id}`, {
      withCredentials: true,
    });
    return _id; // Return the _id of the deleted staff member
  }
);

// Initial state setup
const initialState = {
  allStaffs: [], // Changed to allStaffs to match your structure
  status: "idle",
  error: null,
};

const staffSlice = createSlice({
  name: "staff",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchStaff.pending, (state) => {
        state.status = "loading"; // Fetching data
      })
      .addCase(fetchStaff.fulfilled, (state, action) => {
        state.status = "succeeded"; // Data fetching succeeded
        state.allStaffs = action.payload; // Assuming payload is an array
      })
      .addCase(fetchStaff.rejected, (state, action) => {
        state.status = "failed"; // Fetching data failed
        state.error = action.error.message; // Store error message
      })
      .addCase(addStaff.fulfilled, (state, action) =>
      {
        if (action.payload) {
          state.allStaffs.staffs.push(action.payload); // Add the new staff member to the allStaffs array
        } else {
          console.error("No payload received when adding staff.");
        }
      })

      // Edit staffs
      .addCase(editStaff.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editStaff.fulfilled, (state, action) => {

        state.status = "succeeded";
        const updatedStaff = action.payload;

        const index = state.allStaffs.staffs.findIndex(
          (record) => record._id === updatedStaff._id
        );

        if (index !== -1) {
          state.allStaffs[index] = updatedStaff; // Update the record in the array
        }
      })
      .addCase(editStaff.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(deleteStaff.fulfilled, (state, action) => {
        const deletedId = action.payload; // Assuming the backend returns the deleted ID
      
        state.allStaffs.staffs = state.allStaffs.staffs.filter(
          (staff) => staff._id !== deletedId
        );
      });
      
  },
});



export default staffSlice.reducer;
