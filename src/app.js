import express from "express";
import aiRoutes from "./routes/ai.routes.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server running...");
});

app.use("/ai", aiRoutes);

export default app;
