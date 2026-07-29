// Optional: run `npm run seed` to populate sample content so the site
// isn't empty the first time you open it. Safe to skip - you can also
// add everything through the admin dashboard instead.
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import About from "./models/About.js";
import Project from "./models/Project.js";
import Experience from "./models/Experience.js";
import Education from "./models/Education.js";
import mongoose from "mongoose";

dotenv.config();

const run = async () => {
  await connectDB();

  await About.deleteMany({});
  await About.create({
    name: "Your Name",
    role: "Full-Stack Developer",
    tagline: "I build things for the web.",
    bio: "Replace this with a couple of sentences about who you are, what you work on, and what you're looking for.",
    location: "Kigali, Rwanda",
    email: "you@example.com",
    availableForWork: true,
    socials: { github: "", linkedin: "", twitter: "", website: "" },
    skills: ["JavaScript", "React", "Node.js", "MongoDB", "Express"],
  });

  await Project.deleteMany({});
  await Project.create([
    {
      title: "Sample Project One",
      description: "Short description of what this project does and the problem it solves.",
      techStack: ["React", "Node.js", "MongoDB"],
      liveUrl: "",
      repoUrl: "",
      featured: true,
      order: 1,
    },
    {
      title: "Sample Project Two",
      description: "Another short project description.",
      techStack: ["Express", "Tailwind CSS"],
      liveUrl: "",
      repoUrl: "",
      featured: false,
      order: 2,
    },
  ]);

  await Experience.deleteMany({});
  await Experience.create([
    {
      company: "Company Name",
      role: "Software Engineer",
      location: "Remote",
      startDate: "Jan 2024",
      endDate: "Present",
      description: "What you did in this role.",
      highlights: ["Shipped feature X", "Improved Y by Z%"],
      order: 1,
    },
  ]);

  await Education.deleteMany({});
  await Education.create([
    {
      institution: "University Name",
      degree: "B.Sc. Computer Science",
      fieldOfStudy: "Computer Science",
      startDate: "2020",
      endDate: "2024",
      grade: "",
      description: "",
      order: 1,
    },
  ]);

  console.log("Sample data seeded.");
  await mongoose.disconnect();
  process.exit(0);
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
