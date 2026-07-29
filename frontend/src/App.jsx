import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/admin/Login.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import ManageAbout from "./pages/admin/ManageAbout.jsx";
import ManageProjects from "./pages/admin/ManageProjects.jsx";
import ManageExperience from "./pages/admin/ManageExperience.jsx";
import ManageEducation from "./pages/admin/ManageEducation.jsx";
import Messages from "./pages/admin/Messages.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/admin/login" element={<Login />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      >
        <Route index element={<ManageAbout />} />
        <Route path="about" element={<ManageAbout />} />
        <Route path="projects" element={<ManageProjects />} />
        <Route path="experience" element={<ManageExperience />} />
        <Route path="education" element={<ManageEducation />} />
        <Route path="messages" element={<Messages />} />
      </Route>

      <Route path="*" element={<div className="p-10 text-center">Page not found.</div>} />
    </Routes>
  );
}

export default App;
