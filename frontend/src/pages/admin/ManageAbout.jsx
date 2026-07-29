import { useEffect, useState } from "react";
import api from "../../api/axios.js";

const empty = {
  name: "",
  role: "",
  tagline: "",
  bio: "",
  location: "",
  email: "",
  availableForWork: true,
  resumeUrl: "",
  socials: { github: "", linkedin: "", twitter: "", website: "" },
  skills: [],
};

const ManageAbout = () => {
  const [form, setForm] = useState(empty);
  const [skillsInput, setSkillsInput] = useState("");
  const [status, setStatus] = useState("loading"); // loading | idle | saving | saved | error

  useEffect(() => {
    api.get("/about").then(({ data }) => {
      setForm({ ...empty, ...data, socials: { ...empty.socials, ...data.socials } });
      setSkillsInput((data.skills || []).join(", "));
      setStatus("idle");
    });
  }, []);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith("socials.")) {
      const key = name.split(".")[1];
      setForm((f) => ({ ...f, socials: { ...f.socials, [key]: value } }));
    } else {
      setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("saving");
    try {
      const skills = skillsInput.split(",").map((s) => s.trim()).filter(Boolean);
      const { data } = await api.put("/about", { ...form, skills });
      setForm(data);
      setStatus("saved");
      setTimeout(() => setStatus("idle"), 1500);
    } catch (err) {
      setStatus("error");
    }
  };

  if (status === "loading") return <p className="font-mono text-sm text-slate">Loading...</p>;

  const input = "w-full mt-1 bg-transparent border border-slate/30 rounded px-4 py-2.5 focus:border-amber outline-none";
  const label = "font-mono text-xs uppercase tracking-wide text-slate";

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <p className="eyebrow mb-1">edit</p>
        <h2 className="font-display text-2xl">Hero / About</h2>
      </div>

      <div>
        <label className={label}>Name</label>
        <input className={input} name="name" value={form.name} onChange={onChange} />
      </div>
      <div>
        <label className={label}>Role</label>
        <input className={input} name="role" value={form.role} onChange={onChange} />
      </div>
      <div>
        <label className={label}>Tagline</label>
        <input className={input} name="tagline" value={form.tagline} onChange={onChange} />
      </div>
      <div>
        <label className={label}>Bio</label>
        <textarea className={input} rows={4} name="bio" value={form.bio} onChange={onChange} />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={label}>Location</label>
          <input className={input} name="location" value={form.location} onChange={onChange} />
        </div>
        <div>
          <label className={label}>Contact email</label>
          <input className={input} name="email" value={form.email} onChange={onChange} />
        </div>
      </div>
      <div>
        <label className={label}>Resume URL</label>
        <input className={input} name="resumeUrl" value={form.resumeUrl} onChange={onChange} />
      </div>
      <div>
        <label className={label}>Skills (comma separated)</label>
        <input className={input} value={skillsInput} onChange={(e) => setSkillsInput(e.target.value)} />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {Object.keys(form.socials).map((key) => (
          <div key={key}>
            <label className={label}>{key}</label>
            <input className={input} name={`socials.${key}`} value={form.socials[key]} onChange={onChange} />
          </div>
        ))}
      </div>

      <label className="flex items-center gap-2 font-mono text-xs uppercase tracking-wide text-slate">
        <input type="checkbox" name="availableForWork" checked={form.availableForWork} onChange={onChange} />
        Available for work
      </label>

      <button
        type="submit"
        disabled={status === "saving"}
        className="px-5 py-2.5 bg-amber text-ink font-mono text-xs uppercase tracking-wide rounded hover:bg-amber/90 transition-colors disabled:opacity-50"
      >
        {status === "saving" ? "Saving..." : "Save changes"}
      </button>
      {status === "saved" && <p className="text-teal text-sm font-mono">Saved.</p>}
      {status === "error" && <p className="text-red-400 text-sm font-mono">Failed to save.</p>}
    </form>
  );
};

export default ManageAbout;
