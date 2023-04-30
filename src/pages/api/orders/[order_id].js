import dbConnect from "@/lib/dbConnect";

import Order from "../../../models/Order";

export default async function handler(req, res) {
  await dbConnect();
  const { order_id } = req.query;
  const { skip, limit, user_id } = req.body;
  if (req.method === "DELETE") {
    try {
      await Order.findByIdAndDelete(order_id);
      res.status(200).json({ message: "Order successfully deleted" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    const object_key = order_id;
    try {
      if (object_key != "user_id") {
        const orders = await Order.find()
          .sort({ createdAt: 1 })
          .skip(skip)
          .limit(limit)
          .exec();
        res.status(200).json(orders);
      } else {
        const orders = await Order.find({ user_id: user_id })
          .sort({ createdAt: 1 })
          .skip(skip)
          .limit(limit)
          .exec();
        res.status(200).json(orders);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
