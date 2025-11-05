import express from 'express'
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from "./routes/authRoute.js"; 
import issueRoutes from "./routes/issueRoute.js";

dotenv.config();
connectDB();

const app = express()
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/issues", issueRoutes);
app.use("/uploads", express.static("uploads"));

app.get('/', (req, res) => {
  res.send('GovConnect backend is running');
});


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));