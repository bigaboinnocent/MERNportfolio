import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

const signToken = (admin) =>
  jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const admin = await Admin.findOne({ email: email.toLowerCase().trim() });
  if (!admin) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const ok = await admin.comparePassword(password);
  if (!ok) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = signToken(admin);
  res.json({
    token,
    admin: { id: admin._id, email: admin.email, name: admin.name },
  });
};

export const me = async (req, res) => {
  const admin = await Admin.findById(req.adminId).select("-password");
  if (!admin) return res.status(404).json({ message: "Admin not found" });
  res.json(admin);
};
