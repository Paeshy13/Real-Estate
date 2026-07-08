import "dotenv/config";
import express from "express";
import cors from "cors";
import authRouter from "./routes/auth";
import listingsRouter from "./routes/listings";
import inquiriesRouter from "./routes/inquiries";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
  })
);
app.use(express.json());

app.get("/health", (_req, res) => res.send("OK"));

app.use("/api/auth", authRouter);
app.use("/api/listings", listingsRouter);
app.use("/api/inquiries", inquiriesRouter);

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
