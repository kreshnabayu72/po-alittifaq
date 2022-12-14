import mongoose from "mongoose";

const itemSchema = mongoose.Schema({
  plu: Number,
  nama: String,
  unit: String,
  conversion: String,
  qty: Number,
  price: Number,
  total: Number,
});

const orderSchema = mongoose.Schema({
  perusahaan: String,
  cabang: String,
  nomor_po: String,
  tanggal: Date,
  expired: Date,
  list_item: [itemSchema],
  total_order: Number,
});

export const OrderModel = mongoose.model("Order", orderSchema);
