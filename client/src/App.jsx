// src/App.jsx

import { Routes, Route, Navigate } from "react-router-dom";
import AdminDashboard from "./components/AdminDashboard";
import LibrarianDashboard from "./components/LibrarianDashboard";
import StaffDashboard from "./components/StaffDashboard";
import LoginPage from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Register from "./pages/Register";
import AddNewBookForm from "./components/AddNewBookForm";
import Home from './pages/Home'
import AddLibrarian from "./components/AddLibrarian";
import AddOfficeStaff from "./components/AddOfficeStaff";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import AdminNav from "./components/AdminNav";

function App() {
  return (
    <>
    <AdminNav />
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Home />} />


      <Route path="/signup" element={<Register />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/staff-dashboard" element={<StaffDashboard />} />
      <Route path="/librarian-dashboard" element={<LibrarianDashboard />} />
      <Route path="/student-list" element={<StudentList />} />
      <Route path="/add-student" element={<StudentForm />} />
      <Route path="/add-librarian" element={<AddLibrarian />} />
      <Route path="/add-staff" element={<AddOfficeStaff />} />
      <Route path="/add-book" element={<AddNewBookForm />} />
      <Route path="/view-students" element={<StudentForm />} />

      <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>);
}

export default App;
