const menu = [
  {
    id: 1,
    displayName: "Staff Dashboard",                         // staff dashboard
    path: "staff-dashboard",
    role: ["staff"],
  },
  {
    id: 2,
    displayName: "Admin Dashboard",                         // Admin Dashboard
    path: "admin-dashboard",
    role: ["admin"],
  },
  {
    id: 3,
    displayName: "Librarian Dashboard",                     // Librarian Dashboard
    path: "librarian-dashboard",
    role: ["librarian"],
  },
  {
    id: 4,
    displayName: "Fees History",                            // Fees History
    path: "fees-list",
    role: ["admin", "staff"],
  },
  {
    id: 5,
    displayName: "Library History",                           // Library History
    path: "library-list",
    role: ["admin", "staff",'librarian'],
  },
  {
    id: 6,
    displayName: "Students",                                   // Student details
    path: "student-list",
    role: ["admin", "staff", "librarian"],
  },
  {
    id: 7,
    displayName: "Staff",                                     // Staff details
    path: "staff-list",
    role: ["admin"],
  },
 
];

export const getMenu = (userRole) => {
  return menu.filter((item) => item.role.includes(userRole));
};
