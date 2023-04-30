import mongoose from "mongoose";

const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    products: [],
    amount: Number,
    shipping: Object,
    user_id: String,
    delivered: Boolean,
  },
  { timestamps: true }
);

module.exports = mongoose.models.Order || mongoose.model("Order", OrderSchema);
