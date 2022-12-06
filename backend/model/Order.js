import mongoose from "mongoose";

const itemSchema = mongoose.Schema({
  plu: Number,
  nama: String,
  unit: String,
  qty: Number,
  price: Number,
  total: Number,
});

export const ItemModel = mongoose.model("Item", itemSchema);
