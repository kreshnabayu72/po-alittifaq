import express from "express";
import ubahformat from "./routes/ubahformat.js";
import hilanginnol from "./routes/hilanginnol.js";
import view from "./routes/view.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", view);
app.use("/", ubahformat);
app.use("/", hilanginnol);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("server in " + PORT));
