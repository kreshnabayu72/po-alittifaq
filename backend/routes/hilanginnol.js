import express from "express";
import multer from "multer";
import XLSX from "xlsx";
import mime from "mime";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const upload = multer();
const router = express.Router();

const writeExcelFile = (json) => {
  const filePath = path.join(__dirname, "/hilanginNilaiNol.xlsx");
  const workSheet = XLSX.utils.json_to_sheet(json);
  const workBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workBook, workSheet, "Remove empty");
  XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
  XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
  XLSX.writeFile(workBook, filePath);
};

router.post("/removezero", upload.single("file"), async (req, res) => {
  try {
    var workbook = XLSX.read(req.file.buffer, { type: "buffer" });
    var sheet_name_list = workbook.SheetNames;
    var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

    const filtered = xlData.filter((item) => {
      return item.QTY > 0;
    });

    writeExcelFile(filtered);

    const file = __dirname + "/hilanginNilaiNol.xlsx";
    const fileName = path.basename(file);
    const mimeType = mime.getType(file);

    res.setHeader("Content-Disposition", "attachment;filename=" + fileName);
    res.setHeader("Content-Type", mimeType);
    res.download(file);
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});

export default router;
