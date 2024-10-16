import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunks for fetching, adding, editing, and deleting students
export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async () => {
    const response = await axios.get(`http://localhost:5000/api/students`, { withCredentials: true }); // Ensure the URL is correct
    return response.data; // Adjust based on your API response structure
  }
);

export const addStudent = createAsyncThunk("students/addStudent", async (student) => {
  const response = await axios.post(
    "http://localhost:5000/api/students",
    student
  );
  return response.data;
});

export const editStudent = createAsyncThunk(
  "students/editStudent",
  async (student) => {
    const response = await axios.put(
      `http://localhost:5000/api/students/${student.id}`,
      student,
      { withCredentials: true }
    );
    return response.data;
  }
);

export const deleteStudent = createAsyncThunk(
  "students/deleteStudent",
  async (id) => {
    await axios.delete(`http://localhost:5000/api/students/${id}`);
    return id;
  }
);

const initialState = {
  students: [],
  status: "idle",
  error: null,
};

const studentSlice = createSlice({
  name: "students",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.students = action.payload;
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        state.students.push(action.payload);
      })
      .addCase(editStudent.fulfilled, (state, action) => {
        const index = state.students.findIndex((s) => s._id === action.payload._id); // Use _id instead of id
        state.students[index] = action.payload;
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.students = state.students.filter((s) => s._id !== action.payload); // Use _id instead of id
      });
  },
});

export default studentSlice.reducer;
