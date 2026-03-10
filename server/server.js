// Importing datas
import express from "express";

// extesions
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

// verifications and protections
import { verifyToken } from "./middlewares/verifyToken.js";
import { authorizedRoles } from "./middlewares/roleMiddleware.js";

// role routers
import {
  staffRoutes,
  libraryRoutes,
  authRoutes,
  userRoutes,
  studentRoutes,
  feesRoutes,
} from "./routes/index.js";
const app = new express();
dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const allowedOrigins = [
  "http://localhost:5173",
  "https://school-management-admin-indol.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true
  })
);
app.use(cookieParser());
app.use("/api/auth", authRoutes);

app.use("/api/staff", verifyToken, authorizedRoles("admin"), staffRoutes);
app.use("/api/library", verifyToken, libraryRoutes);
app.use("/api/students", verifyToken, studentRoutes);

app.use(
  "/api/fees",
  verifyToken,
  authorizedRoles("admin", "staff"),
  feesRoutes
);

app.listen(4000, () => {
  console.log("Server run at port 4000!");
});
