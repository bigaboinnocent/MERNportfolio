import { useEffect, useState } from "react";
import api from "../../api/axios.js";

const emptyForm = {
  title: "",
  description: "",
  techStack: "",
  imageUrl: "",
  liveUrl: "",
  repoUrl: "",
  featured: false,
  order: 0,
};

const input = "w-full mt-1 bg-transparent border border-slate/30 rounded px-4 py-2.5 focus:border-amber outline-none";
const label = "font-mono text-xs uppercase tracking-wide text-slate";

const ManageProjects = () => {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [status, setStatus] = useState("idle");

  const load = () => api.get("/projects").then(({ data }) => setProjects(data));

  useEffect(() => {
    load();
  }, []);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const startEdit = (p) => {
    setEditingId(p._id);
    setForm({ ...emptyForm, ...p, techStack: (p.techStack || []).join(", ") });
  };

  const resetForm = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("saving");
    const payload = {
      ...form,
      techStack: form.techStack.split(",").map((s) => s.trim()).filter(Boolean),
      order: Number(form.order) || 0,
    };
    try {
      if (editingId) {
        await api.put(`/projects/${editingId}`, payload);
      } else {
        await api.post("/projects", payload);
      }
      await load();
      resetForm();
      setStatus("idle");
    } catch (err) {
      setStatus("error");
    }
  };

  const onDelete = async (id) => {
    if (!confirm("Delete this project?")) return;
    await api.delete(`/projects/${id}`);
    await load();
    if (editingId === id) resetForm();
  };

  return (
    <div className="space-y-10">
      <div>
        <p className="eyebrow mb-1">manage</p>
        <h2 className="font-display text-2xl">Projects</h2>
      </div>

      <form onSubmit={onSubmit} className="space-y-4 border border-slate/20 rounded-lg p-5">
        <p className="font-mono text-xs uppercase tracking-wide text-amber">
          {editingId ? "Editing project" : "New project"}
        </p>
        <div>
          <label className={label}>Title</label>
          <input className={input} name="title" required value={form.title} onChange={onChange} />
        </div>
        <div>
          <label className={label}>Description</label>
          <textarea className={input} rows={3} name="description" required value={form.description} onChange={onChange} />
        </div>
        <div>
          <label className={label}>Tech stack (comma separated)</label>
          <input className={input} name="techStack" value={form.techStack} onChange={onChange} />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={label}>Live URL</label>
            <input className={input} name="liveUrl" value={form.liveUrl} onChange={onChange} />
          </div>
          <div>
            <label className={label}>Repo URL</label>
            <input className={input} name="repoUrl" value={form.repoUrl} onChange={onChange} />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={label}>Image URL</label>
            <input className={input} name="imageUrl" value={form.imageUrl} onChange={onChange} />
          </div>
          <div>
            <label className={label}>Order</label>
            <input className={input} type="number" name="order" value={form.order} onChange={onChange} />
          </div>
        </div>
        <label className="flex items-center gap-2 font-mono text-xs uppercase tracking-wide text-slate">
          <input type="checkbox" name="featured" checked={form.featured} onChange={onChange} />
          Featured
        </label>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={status === "saving"}
            className="px-5 py-2.5 bg-amber text-ink font-mono text-xs uppercase tracking-wide rounded hover:bg-amber/90 transition-colors disabled:opacity-50"
          >
            {editingId ? "Update project" : "Add project"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="px-5 py-2.5 border border-slate/30 font-mono text-xs uppercase tracking-wide rounded hover:border-amber hover:text-amber transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
        {status === "error" && <p className="text-red-400 text-sm font-mono">Failed to save.</p>}
      </form>

      <div className="space-y-3">
        {projects.map((p) => (
          <div key={p._id} className="flex items-center justify-between border border-slate/20 rounded-lg px-4 py-3">
            <div>
              <p className="font-display">{p.title}</p>
              <p className="font-mono text-xs text-slate">{(p.techStack || []).join(", ")}</p>
            </div>
            <div className="flex gap-3 font-mono text-xs uppercase">
              <button onClick={() => startEdit(p)} className="text-teal hover:underline">Edit</button>
              <button onClick={() => onDelete(p._id)} className="text-red-400 hover:underline">Delete</button>
            </div>
          </div>
        ))}
        {projects.length === 0 && <p className="font-mono text-sm text-slate">No projects yet.</p>}
      </div>
    </div>
  );
};

export default ManageProjects;
