// src/App.jsx

import { Routes, Route, useLocation } from "react-router-dom";
import AdminDashboard from "./components/Admin/AdminDashboard";
import LibrarianDashboard from "./components/Librarian/LibrarianDashboard";
import StaffDashboard from "./components/Staff/StaffDashboard";
import LoginPage from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Register from "./pages/Register";
import AddLibrarian from "./components/AddLibrarian";
import AddOfficeStaff from "./components/AddOfficeStaff";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import PrivateRoute from "./utils/PrivateRoute";
import AdminNav from "./components/AdminNav";
import StaffList from './components/StaffList';
import LibraryList from "./components/LibraryList";
import FeesList from "./components/FeesList";
import StudentEdit from "./components/StudentEdit";
import EditLibrary from "./components/EditLibrary";
import AddLibrary from "./components/AddLibrary";
import EditFees from "./components/EditFees";
import AddFees from "./components/AddFees";
import EditStaff from "./components/EditStaff";
import AdminSideBar from "./components/AdminSideBar";
import ViewStudent from "./components/ViewStudent";

function App() {
  const location = useLocation(); // Get the current route

  // Conditionally render AdminNav based on route
  const showNav = !["/", "/signup", "/home"].includes(location.pathname);
  const showSideBar = !["/", "/signup", "/home", '/add-staff', '/add-student'].includes(location.pathname);

  

  return (
    <>
      {showNav && <AdminNav />} {/* Show AdminNav only if it's not login, signup, or home page */}
      {showSideBar && <AdminSideBar />} {/* Show AdminSideBar only if it's not login, signup, or home page */}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<Register />} />

        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/librarian-dashboard"
          element={
            <PrivateRoute allowedRoles={["librarian"]}>
              <LibrarianDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/staff-dashboard"
          element={
            <PrivateRoute allowedRoles={["staff"]}>
              <StaffDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/student-list"
          element={
            <PrivateRoute allowedRoles={[ "staff", "admin", 'librarian']}>
              <StudentList />
            </PrivateRoute>
          }
        />
        <Route
          path="/staff-list"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <StaffList />
            </PrivateRoute>
          }
        />
      <Route
          path="/library-list"
          element={
            <PrivateRoute allowedRoles={["admin", 'staff', 'librarian']}>
              <LibraryList />
            </PrivateRoute>
          }
        />
      <Route
          path="/fees/edit/:id"
          element={
            <PrivateRoute allowedRoles={["admin", 'staff']}>
              <EditFees />
            </PrivateRoute>
          }
        />
      <Route
          path="/students/view/:id"
          element={
            <PrivateRoute allowedRoles={["admin", 'staff']}>
              <ViewStudent />
            </PrivateRoute>
          }
        />
      <Route
          path="/staff/edit/:id"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <EditStaff />
            </PrivateRoute>
          }
        />
      <Route
          path="/library/edit/:id"
          element={
            <PrivateRoute allowedRoles={["admin", 'librarian']}>
              <EditLibrary />
            </PrivateRoute>
          }
        />
      <Route
          path="students/edit/:id"
          element={
            <PrivateRoute allowedRoles={["admin", "staff"]}>
              <StudentEdit />
            </PrivateRoute>
          }
        />
        <Route
          path="/fees-list"
          element={
            <PrivateRoute allowedRoles={["admin", "staff"]}>
              <FeesList />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-student"
          element={
            <PrivateRoute allowedRoles={["admin", "staff"]}>
              <StudentForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-fees-record"
          element={
            <PrivateRoute allowedRoles={["admin", "staff"]}>
              <AddFees />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-librarian"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <AddLibrarian />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-staff"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <AddOfficeStaff />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-book"
          element={
            <PrivateRoute allowedRoles={["admin", "librarian"]}>
              <AddLibrary />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
