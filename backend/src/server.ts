import express from "express";
import cors from "cors";
import todoRoutes from "./routes/todoRoutes";
import dotenv from "dotenv";
import { connectDB } from "./db";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1/todos", todoRoutes);

const PORT = process.env.PORT || 4000;

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log("Server running on Port:" + PORT);
  });
};

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
