import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import salesRoutes from "./routes/salesRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// All sales APIs will live here:
app.use("/api/sales", salesRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
