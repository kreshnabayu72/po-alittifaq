import express from "express";
import prosesData from "./routes/prosesData.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/skripsi", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/order", prosesData);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("server in " + PORT));
