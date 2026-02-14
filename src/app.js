import express from "express";
import cors from "cors";
import aiRoutes from "./routes/ai.routes.js";

const app = express();

app.use(cors({
  origin: [
    "http://localhost:3001",
    "https://review-buddy1.onrender.com"
  ],
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server running...");
});

app.use("/ai", aiRoutes);

export default app;
