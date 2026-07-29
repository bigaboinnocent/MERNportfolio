import { useEffect, useState } from "react";
import api from "../../api/axios.js";

const emptyForm = {
  institution: "",
  degree: "",
  fieldOfStudy: "",
  startDate: "",
  endDate: "",
  grade: "",
  description: "",
  order: 0,
};

const input = "w-full mt-1 bg-transparent border border-slate/30 rounded px-4 py-2.5 focus:border-amber outline-none";
const label = "font-mono text-xs uppercase tracking-wide text-slate";

const ManageEducation = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [status, setStatus] = useState("idle");

  const load = () => api.get("/education").then(({ data }) => setItems(data));

  useEffect(() => {
    load();
  }, []);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const startEdit = (item) => {
    setEditingId(item._id);
    setForm({ ...emptyForm, ...item });
  };

  const resetForm = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("saving");
    const payload = { ...form, order: Number(form.order) || 0 };
    try {
      if (editingId) {
        await api.put(`/education/${editingId}`, payload);
      } else {
        await api.post("/education", payload);
      }
      await load();
      resetForm();
      setStatus("idle");
    } catch (err) {
      setStatus("error");
    }
  };

  const onDelete = async (id) => {
    if (!confirm("Delete this entry?")) return;
    await api.delete(`/education/${id}`);
    await load();
    if (editingId === id) resetForm();
  };

  return (
    <div className="space-y-10">
      <div>
        <p className="eyebrow mb-1">manage</p>
        <h2 className="font-display text-2xl">Education</h2>
      </div>

      <form onSubmit={onSubmit} className="space-y-4 border border-slate/20 rounded-lg p-5">
        <p className="font-mono text-xs uppercase tracking-wide text-amber">
          {editingId ? "Editing entry" : "New entry"}
        </p>
        <div>
          <label className={label}>Institution</label>
          <input className={input} name="institution" required value={form.institution} onChange={onChange} />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={label}>Degree</label>
            <input className={input} name="degree" required value={form.degree} onChange={onChange} />
          </div>
          <div>
            <label className={label}>Field of study</label>
            <input className={input} name="fieldOfStudy" value={form.fieldOfStudy} onChange={onChange} />
          </div>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <label className={label}>Start year</label>
            <input className={input} name="startDate" required value={form.startDate} onChange={onChange} />
          </div>
          <div>
            <label className={label}>End year</label>
            <input className={input} name="endDate" value={form.endDate} onChange={onChange} />
          </div>
          <div>
            <label className={label}>Grade</label>
            <input className={input} name="grade" value={form.grade} onChange={onChange} />
          </div>
        </div>
        <div>
          <label className={label}>Description</label>
          <textarea className={input} rows={3} name="description" value={form.description} onChange={onChange} />
        </div>
        <div>
          <label className={label}>Order</label>
          <input className={input} type="number" name="order" value={form.order} onChange={onChange} />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={status === "saving"}
            className="px-5 py-2.5 bg-amber text-ink font-mono text-xs uppercase tracking-wide rounded hover:bg-amber/90 transition-colors disabled:opacity-50"
          >
            {editingId ? "Update entry" : "Add entry"}
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
        {items.map((item) => (
          <div key={item._id} className="flex items-center justify-between border border-slate/20 rounded-lg px-4 py-3">
            <div>
              <p className="font-display">{item.institution}</p>
              <p className="font-mono text-xs text-slate">{item.degree} · {item.startDate}–{item.endDate}</p>
            </div>
            <div className="flex gap-3 font-mono text-xs uppercase">
              <button onClick={() => startEdit(item)} className="text-teal hover:underline">Edit</button>
              <button onClick={() => onDelete(item._id)} className="text-red-400 hover:underline">Delete</button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="font-mono text-sm text-slate">No education entries yet.</p>}
      </div>
    </div>
  );
};

export default ManageEducation;
