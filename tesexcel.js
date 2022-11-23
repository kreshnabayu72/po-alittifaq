import express from "express";
import mime from "mime";
import path from "path";
import xl from "excel4node";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const router = express.Router();

const headerColumns = ["Name", "Email", "Phone"];

const data = [
  { name: "Yasin", email: "aaaa@gmail.com", phone: "055555" },
  { name: "Ali", email: "bbb@gmail.com", phone: "0552232" },
];

const createExcelFile = () => {
  const wb = new xl.Workbook();
  const ws = wb.addWorksheet("Kullanicilar");
  let colIndex = 1;
  headerColumns.forEach((item) => {
    ws.cell(1, colIndex++).string(item);
  });
  let rowIndex = 2;
  data.forEach((item) => {
    let columnIndex = 1;
    Object.keys(item).forEach((colName) => {
      ws.cell(rowIndex, columnIndex++).string(item[colName]);
    });
    rowIndex++;
  });
  wb.write("kullanicilar.xlsx");
};

router.get("/kullaniciExcel", (req, res, next) => {
  createExcelFile();
  const file = __dirname + "/kullanicilar.xlsx";
  const fileName = path.basename(file);
  const mimeType = mime.getType(file);
  res.setHeader("Content-Disposition", "attachment;filename=" + fileName);
  res.setHeader("Content-Type", mimeType);

  setTimeout(() => {
    res.download(file);
  }, 2000);
});

app.use("/", router);
app.listen(5020, () => console.log(5020));
