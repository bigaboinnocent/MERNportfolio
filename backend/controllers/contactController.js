import Contact from "../models/Contact.js";

export const createContact = async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ message: "Name, email and message are required" });
  }
  const contact = await Contact.create({ name, email, message });
  res.status(201).json({ message: "Message sent successfully", contact });
};

export const getContacts = async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });
  res.json(contacts);
};

export const markContactRead = async (req, res) => {
  const contact = await Contact.findByIdAndUpdate(
    req.params.id,
    { read: true },
    { new: true }
  );
  if (!contact) return res.status(404).json({ message: "Message not found" });
  res.json(contact);
};

export const deleteContact = async (req, res) => {
  const contact = await Contact.findByIdAndDelete(req.params.id);
  if (!contact) return res.status(404).json({ message: "Message not found" });
  res.json({ message: "Message deleted" });
};
