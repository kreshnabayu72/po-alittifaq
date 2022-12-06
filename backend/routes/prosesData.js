import express from "express";
import multer from "multer";
import XLSX from "xlsx";
import fs from "fs";
import path from "path";
import parser from "xml2json";
import { fileURLToPath } from "url";
import { dirname } from "path";
import mime from "mime";
import { ItemModel } from "../model/Order.js";

const upload = multer();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

const objectToXslx = (object) => {
  const workSheet = XLSX.utils.json_to_sheet(object);
  const workBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workBook, workSheet, "Format Al Ittifaq");
  XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
  XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
  XLSX.writeFile(workBook, "xmlKeAlif.xlsx");
};

const DeleteKeys = (order) => {
  delete order["barcode"];
  delete order["bonus1"];
  delete order["bonus2"];
  delete order["discount"];
  delete order["ppn"];
  delete order["ppnbm"];
  delete order["package"];
};

const writeExcelFile = (json) => {
  const filePath = path.join(__dirname, "/xmlToXlsx.xlsx");
  const workSheet = XLSX.utils.json_to_sheet(json);
  const workBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workBook, workSheet, "Remove empty");
  XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
  XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
  XLSX.writeFile(workBook, filePath);
};

router.get("/", async (req, res) => {
  try {
    const result = await ItemModel.find();
    res.send(result);
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});

router.post("/add-data", upload.single("file"), async (req, res) => {
  try {
    var json = parser.toJson(req.file.buffer);
    json = JSON.parse(json);
    res.send(json);
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});

router.post("/ubah-format-download", upload.single("file"), (req, res) => {
  try {
    var json = parser.toJson(req.file.buffer);
    json = JSON.parse(json);

    const DATAORDER = json.po.po_detail;

    const newFormat = DATAORDER.map((order, index) => {
      DeleteKeys(order);

      const newKeys = {
        NO: index + 1,
        PLU: order.plu,
        "DESKRIPSI BARANG": order.description,
        " ": order.unit,
        "": order.unit + "/" + order.conversion,
        QTY: order.qty,
        "QTY DI TERIMA": "",
        HARGA: Math.round(order.price),
        JUMLAH: "",
      };
      return newKeys;
    });

    objectToXslx(newFormat);

    writeExcelFile(newFormat);

    const file = __dirname + "/xmlToXlsx.xlsx";
    const fileName = path.basename(file);
    const mimeType = mime.getType(file);

    res.setHeader("Content-Disposition", "attachment;filename=" + fileName);
    res.setHeader("Content-Type", mimeType);

    res.download(file);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

export default router;
