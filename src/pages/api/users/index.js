import dbConnect from "@/lib/dbConnect";
import jwt from "jsonwebtoken";
import User from "../../../models/User";
import { compare, genSalt, hash, hashSync } from "bcryptjs";
const { sign } = jwt;

import { isEmail, isStrongPassword } from "validator";

// create Auth Token
const createToken = (_id) => {
  return sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};
async function handler(req, res) {
  await dbConnect();
  const { email, password } = req.body;

  if (req.method === "POST" && req.body.name) {
    if (!email) {
      res.status(400).json({ error: "Please provide email" });
    } else if (!password) {
      res.status(400).json({ error: "Please provide password" });
    } else {
      if (!isEmail(email)) {
        return res
          .status(400)
          .json({ error: "Invalid email, try another one!" });
      }
      if (!isStrongPassword(password)) {
        return res
          .status(400)
          .json({ error: "Weak password, try a stronger one!" });
      }

      try {
        const salt = await genSalt(10);
        const hash = await hashSync(password, salt);
        if (hash) {
          req.body.password = hash;
        }
        const user = await User.create({
          email,
          ...req.body,
        });
        const token = createToken(user._id);
        res.status(200).json({ user, token });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }
  } else {
    try {
      if (!email) {
        res.status(400).json({ error: "Email is required" });
      } else if (!password) {
        res.status(400).json({ error: "Password is required" });
      }
      const user = await User.findOne({ email });
      if (!user) {
        res.status(400).json({ error: "Email does not exist" });
      }
      if (user) {
        const token = createToken(user._id);
        const validity = await compare(password, user.password);
        if (!validity) {
          res.status(400).json({ error: "Wrong password" });
        }
        if (validity) {
          res.status(200).json({ user, token });
        }
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
export default handler;
