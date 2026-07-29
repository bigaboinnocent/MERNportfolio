import mongoose from "mongoose";

// Singleton document holding hero/about content
const aboutSchema = new mongoose.Schema(
  {
    name: { type: String, default: "Your Name" },
    role: { type: String, default: "Full-Stack Developer" },
    tagline: { type: String, default: "I build things for the web." },
    bio: { type: String, default: "Write a short bio about yourself here." },
    location: { type: String, default: "" },
    email: { type: String, default: "" },
    availableForWork: { type: Boolean, default: true },
    resumeUrl: { type: String, default: "" },
    socials: {
      github: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      twitter: { type: String, default: "" },
      website: { type: String, default: "" },
    },
    skills: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.model("About", aboutSchema);
