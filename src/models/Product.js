import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    in_stock: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: String,
    category: String,
    short_desc: {
      type: String,
      required: true,
    },
    images: [],
    long_desc: {
      type: String,
      required: true,
    },
    sizes: [],
    colors: [],
    reviews: [],
    specs: [],
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);
