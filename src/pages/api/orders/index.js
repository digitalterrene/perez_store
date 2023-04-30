import dbConnect from "@/lib/dbConnect";

import Order from "../../../models/Order";

async function handler(req, res) {
  await dbConnect();
  try {
    const product = await Order.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
export default handler;
