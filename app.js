// File: index.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import { initDb } from "./config/initDb.js"; // optional: if you created it
import bookingRoutes from "./routes/booking.js";
import newsletterRoutes from "./routes/newsletter.js";
import userRoutes from "./routes/user.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: "http://localhost:5173", // allow your frontend
  credentials: true,               // allow cookies if needed
}));

app.use(express.json());

// Optional: ensure tables exist
await initDb?.();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", bookingRoutes); // must exist!
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
  res.send("✅ BerryGo API is running");
});

app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
