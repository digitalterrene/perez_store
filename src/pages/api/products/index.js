import dbConnect from "@/lib/dbConnect";

import Product from "../../../models/Product";

async function handler(req, res) {
  await dbConnect();

  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
export default handler;
