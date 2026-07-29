import About from "../models/About.js";

// About is a singleton - there is always exactly one document.
const getOrCreate = async () => {
  let doc = await About.findOne();
  if (!doc) doc = await About.create({});
  return doc;
};

export const getAbout = async (req, res) => {
  const about = await getOrCreate();
  res.json(about);
};

export const updateAbout = async (req, res) => {
  const about = await getOrCreate();
  Object.assign(about, req.body);
  await about.save();
  res.json(about);
};
