import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define API endpoints
const API_URL = "https://school-management-nine-iota.vercel.app/api/students";

// Async Thunks for handling API calls

// Fetch all students
export const fetchStudents = createAsyncThunk("students/fetchAll", async () => {
  try {
    const response = await axios.get(`https://school-management-nine-iota.vercel.app/api/students`, {
      withCredentials: true,
    });
    return response.data.students;
  } catch (error) {
    return error.response.data;
  }
});

// Add a new student
export const addStudent = createAsyncThunk(
  "students/add",
  async (studentData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `https://school-management-nine-iota.vercel.app/api/students`,
        studentData,
        { withCredentials: true }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Update student by ID
export const updateStudent = createAsyncThunk(
  "students/update",
  async ({ id, studentData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `https://school-management-nine-iota.vercel.app/api/students/${id}`,
        studentData,
        { withCredentials: true }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete student by ID
export const deleteStudent = createAsyncThunk(
  "students/delete",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.delete(
        `https://school-management-nine-iota.vercel.app/api/students/${id}`,
        { withCredentials: true }
      );
      console.log(res.data);

      return id; // Return the ID of the deleted student
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create the student slice
const studentSlice = createSlice({
  name: "students",
  initialState: {
    students: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all students
      .addCase(fetchStudents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.students = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Add a new student
      .addCase(addStudent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.students.push(action.payload); // Add the new student to the state
      })
      .addCase(addStudent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Update student
      .addCase(updateStudent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.students.findIndex(
          (student) => student._id === action.payload._id
        );
        if (index !== -1) {
          state.students[index] = action.payload; // Update the student in the state
        }
      })
      .addCase(updateStudent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Delete student
      .addCase(deleteStudent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.students = state.students.filter(
          (student) => student._id !== action.payload
        ); // Remove the deleted student from the state
      })
      .addCase(deleteStudent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

// Export the reducer to be added to the store
export default studentSlice.reducer;
