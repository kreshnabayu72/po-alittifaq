import express from "express";
import multer from "multer";
import XLSX from "xlsx";
import path from "path";
import parser from "xml2json";
import { fileURLToPath } from "url";
import { dirname } from "path";
import mime from "mime";
import { OrderModel } from "../model/Order.js";

const upload = multer();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

const writeExcelFile = (json) => {
  const filePath = path.join(__dirname, "/xmlToXlsx.xlsx");
  const workSheet = XLSX.utils.json_to_sheet(json);
  const workBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workBook, workSheet, "Sheet 1");
  XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
  XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
  XLSX.writeFile(workBook, filePath);
};

router.get("/", async (req, res) => {
  try {
    const result = await OrderModel.find();
    res.send(result);
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});

router.get("/:nomor_po", async (req, res) => {
  try {
    const result = await OrderModel.findOne({ nomor_po: req.params.nomor_po });
    res.send(result);
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});

router.get("/:po/btb", async (req, res) => {
  try {
    const order = await OrderModel.findOne({ nomor_po: req.params.po });
    const newFormat = order.list_item.map((order, index) => {
      delete order["_id"];

      const newKeys = {
        NO: index + 1,
        PLU: order.plu,
        "DESKRIPSI BARANG": order.description,
        " ": order.unit,
        "": order.unit + "/" + order.conversion,
        QTY: order.qty,
        "QTY DI TERIMA": "",
        HARGA: Math.round(order.price),
        JUMLAH: order.total,
      };
      return newKeys;
    });
    newFormat.push({
      NO: "",
      PLU: "",
      "DESKRIPSI BARANG": "",
      " ": "",
      "": "",
      QTY: "",
      "QTY DI TERIMA": "",
      HARGA: "",
      JUMLAH: "",
    });
    newFormat.push({
      NO: "",
      PLU: "",
      "DESKRIPSI BARANG": "",
      " ": "",
      "": "",
      QTY: "",
      "QTY DI TERIMA": "",
      HARGA: "Total",
      JUMLAH: "",
    });
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

router.get("/:po/faktur", async (req, res) => {
  try {
    const order = await OrderModel.findOne({ nomor_po: req.params.po });
    const newFormat = order.list_item.map((order, index) => {
      delete order["_id"];

      const newKeys = {
        NO: index + 1,
        "DESKRIPSI BARANG": order.description,
        "UOM ": order.unit,
        QTY: order.qty,
        HARGA: Math.round(order.price),
        JUMLAH: order.total,
      };
      return newKeys;
    });
    newFormat.push({
      NO: "",
      "DESKRIPSI BARANG": "",
      "UOM ": "",
      QTY: "",
      HARGA: "Total",
      JUMLAH: order.total_order,
    });
    writeExcelFile(newFormat);
    console.log(newFormat);

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

// Input xml langsung disave jadi order
router.post("/add-data", upload.single("file"), async (req, res) => {
  try {
    var json = parser.toJson(req.file.buffer);
    json = JSON.parse(json);

    let orderClean = json.po.po_detail.map((barang) => {
      barang["total"] = parseInt(barang["total"]);
      barang["nama"] = barang["description"];
      delete barang["description"];
      delete barang["bonus1"];
      delete barang["bonus2"];
      delete barang["barcode"];
      delete barang["discount"];
      delete barang["ppn"];
      delete barang["ppnbm"];
      delete barang["package"];
      return barang;
    });

    const totalOrder = orderClean.map((i) => i.total).reduce((a, b) => a + b);

    let order = {
      perusahaan: json.po.po_footer.tax_name,
      cabang: json.po.po_footer.store,
      nomor_po: json.po.po_head.po_no,
      tanggal: json.po.po_head.po_date,
      expired: json.po.po_footer.expired,
      list_item: orderClean,
      total_order: totalOrder,
    };

    console.log(orderClean);

    const newOrder = new OrderModel(order);
    const result = await newOrder.save();

    res.send(result);
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});

export default router;
