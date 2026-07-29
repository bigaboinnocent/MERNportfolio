import { useEffect, useState } from "react";
import api from "../api/axios.js";
import Navbar from "../components/Navbar.jsx";
import Hero from "../components/Hero.jsx";
import Projects from "../components/Projects.jsx";
import Experience from "../components/Experience.jsx";
import Education from "../components/Education.jsx";
import ContactForm from "../components/ContactForm.jsx";
import Footer from "../components/Footer.jsx";

const Home = () => {
  const [about, setAbout] = useState(null);
  const [projects, setProjects] = useState(null);
  const [experience, setExperience] = useState(null);
  const [education, setEducation] = useState(null);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const [aboutRes, projectsRes, experienceRes, educationRes] = await Promise.all([
          api.get("/about"),
          api.get("/projects"),
          api.get("/experience"),
          api.get("/education"),
        ]);
        setAbout(aboutRes.data);
        setProjects(projectsRes.data);
        setExperience(experienceRes.data);
        setEducation(educationRes.data);
      } catch (err) {
        setLoadError(true);
      }
    };
    load();
  }, []);

  if (loadError) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 text-center">
        <div>
          <p className="eyebrow mb-3">connection error</p>
          <p className="text-slate max-w-md">
            Could not reach the API. Make sure the backend server is running and
            VITE_API_URL in frontend/.env points to it.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar name={about?.name} />
      <Hero about={about} />
      <Projects projects={projects} />
      <Experience items={experience} />
      <Education items={education} />
      <ContactForm email={about?.email} />
      <Footer about={about} />
    </div>
  );
};

export default Home;
