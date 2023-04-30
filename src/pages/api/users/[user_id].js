import dbConnect from "@/lib/dbConnect";
import jwt from "jsonwebtoken";
import { compare, genSalt, hash, hashSync } from "bcryptjs";
const { sign } = jwt;
import User from "../../../models/User";

export default async function handler(req, res) {
  await dbConnect();
  const { email, password } = req.body;
  const { user_id } = req.query;
  //some other codes...
  // create Auth Token
  const createToken = (_id) => {
    return sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
  };
  if (req.method === "PUT") {
    try {
      if (password) {
        const salt = await genSalt(10);
        req.body.password = await hash(password, salt);
      }
      const user = await User.findByIdAndUpdate(user_id, req.body, {
        new: true,
      });
      const token = createToken(user._id);
      res.status(200).json({ user, token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    try {
      await User.findByIdAndDelete(user_id);
      res.status(200).json({ message: "User successfully deleted" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}
