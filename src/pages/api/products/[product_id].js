import dbConnect from "@/lib/dbConnect";

import Product from "../../../models/Product";

export default async function handler(req, res) {
  await dbConnect();
  const { product_id } = req.query;
  const { skip, limit } = req.body;
  if (req.method === "DELETE") {
    try {
      await Product.findByIdAndDelete(product_id);
      res.status(200).json({ message: "Product successfully deleted" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else if (req.method === "PUT") {
    try {
      const product = await Product.findByIdAndUpdate(product_id, req.body, {
        new: true,
      });
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(400).json({ error: "Product does not exist" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else if (req.method === "GET") {
    try {
      const product = await Product.findById(product_id);
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(400).json({ error: "Product does not exist" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    const object_key = product_id;
    try {
      if (object_key != "all_fields") {
        const products = await Product.find({
          $or: [
            {
              [object_key]: {
                $regex: req.body.key_value,
                $options: "i",
              },
            },
          ],
        })
          .sort({ createdAt: 1 })
          .skip(skip)
          .limit(limit)
          .exec();
        res.status(200).json(products);
      } else {
        const products = await Product.find({
          $or: [
            {
              title: { $regex: req.body.key_value, $options: "i" },
            },
            {
              long_desc: { $regex: req.body.key_value, $options: "i" },
            },
            {
              short_desc: { $regex: req.body.key_value, $options: "i" },
            },
          ],
        })
          .sort({ createdAt: 1 })
          .skip(skip)
          .limit(limit)
          .exec();
        res.status(200).json(products);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
