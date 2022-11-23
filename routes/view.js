import express from "express";
import multer from "multer";
import XLSX from "xlsx";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

router.get("/", (req, res) => {
  try {
    res.sendFile(path.join(__dirname + "/pages/index.html"));
  } catch (error) {
    res.send(error);
  }
});

router.get("/hilanginnol", (req, res) => {
  try {
    res.sendFile(path.join(__dirname + "/pages/hilanginnol.html"));
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

router.get("/gantiformat", (req, res) => {
  try {
    res.sendFile(path.join(__dirname + "/pages/gantiformat.html"));
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

export default router;
